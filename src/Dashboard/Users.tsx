import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  Checkbox,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  Badge,
  Delete,
  Edit,
  Email,
  Link as LinkIcon,
  PersonAdd,
  PersonOff,
  People,
  VerifiedUser,
} from "@mui/icons-material";
import {
  AdminPermission,
  AdminRole,
  AdminUser,
  MailboxAccess,
  createAdminPasswordResetLink,
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "../APIs/adminUsers";
import { useAuth } from "../contexts/AuthContext";
import {
  AdminNotification,
  archiveAdminNotification,
  getAdminNotifications,
  resolvePasswordResetNotification,
} from "../APIs/adminNotifications";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

type EditableAdminRole = Exclude<AdminRole, "super_admin">;

type AdminForm = {
  name: string;
  email: string;
  role: EditableAdminRole;
  sharedMailboxes: string;
  permissionsAllow: AdminPermission[];
  permissionsDeny: AdminPermission[];
};

const sharedMailboxDefaults = ["contact@creativapoeta.com", "contact@creativapoeta.be"];

const roleDefinitions: Record<AdminRole, { label: string; short: string; powers: string }> = {
  super_admin: {
    label: "Niveau 0 - Direction",
    short: "Compte principal",
    powers: "Acces complet au dashboard.",
  },
  admin_0: {
    label: "Niveau 0 - Direction",
    short: "Pouvoirs avances",
    powers: "Acces complet au dashboard, avec gestion des niveaux 1 a 5.",
  },
  admin_1: {
    label: "Niveau 1 - Operations",
    short: "Client requests",
    powers: "Projects, visibility requests, assistance, contact inbox, shared emails, internal messages and operational follow-up.",
  },
  admin_2: {
    label: "Niveau 2 - Content & SEO",
    short: "Blog and visibility",
    powers: "Articles, SEO, content, editorial calendar, internal messages and visibility-related work.",
  },
  admin_3: {
    label: "Niveau 3 - Support & email",
    short: "Client support",
    powers: "CP Mail, contact replies, assistance requests, internal messages and customer messages assigned to them.",
  },
  admin_4: {
    label: "Niveau 4 - Read & reporting",
    short: "Consultation",
    powers: "Dashboard reading, internal messages, results monitoring and reporting without critical deletion rights.",
  },
  admin_5: {
    label: "Niveau 5 - Limited access",
    short: "Limited assistant",
    powers: "Very targeted access to assigned items and internal messages. Useful for a temporary assistant or contractor.",
  },
};

const permissionOptions: Array<{ key: AdminPermission; label: string; group: string }> = [
  { key: "dashboard:read", label: "Dashboard", group: "General" },
  { key: "requests:projects", label: "Projects", group: "Requests" },
  { key: "requests:visibility", label: "Visibility tests", group: "Requests" },
  { key: "requests:assistance", label: "Assistance requests", group: "Requests" },
  { key: "contacts:read", label: "Contact inbox read", group: "Messages" },
  { key: "contacts:reply", label: "Contact inbox reply", group: "Messages" },
  { key: "email:read", label: "CP Mail read", group: "Emails" },
  { key: "email:send", label: "CP Mail send", group: "Emails" },
  { key: "email:manage", label: "CP Mail manage", group: "Emails" },
  { key: "blogs:manage", label: "Blogs", group: "Content" },
  { key: "seo:manage", label: "SEO tools", group: "Content" },
  { key: "jobs:manage", label: "Jobs", group: "System" },
  { key: "users:manage", label: "Admin users", group: "System" },
  { key: "internal:messages", label: "Internal messages", group: "Messages" },
  { key: "reports:read", label: "Reports", group: "System" },
];

const groupedPermissions = permissionOptions.reduce<Record<string, typeof permissionOptions>>((groups, permission) => {
  groups[permission.group] = groups[permission.group] || [];
  groups[permission.group].push(permission);
  return groups;
}, {});
const defaultRole: EditableAdminRole = "admin_1";
const emptyForm: AdminForm = {
  name: "",
  email: "",
  role: defaultRole,
  sharedMailboxes: sharedMailboxDefaults.join("\n"),
  permissionsAllow: [],
  permissionsDeny: [],
};

const getUserId = (user: AdminUser) => user._id || user.id || "";
const rootAdminEmails = ["admin@creativapoeta.com", "admin@cp.com"];

const isRootAdminEmail = (email?: string) =>
  Boolean(email && rootAdminEmails.includes(email.trim().toLowerCase()));

const normalizeRole = (role?: string, email?: string): AdminRole => {
  if (isRootAdminEmail(email)) return "super_admin";
  if (role === "admin") return "admin_0";
  if (role === "editor") return "admin_2";
  if (role === "viewer") return "admin_4";
  return (role || "admin_5") as AdminRole;
};

const parseSharedMailboxes = (value: string, personalEmail: string, reservedPersonalEmails: string[]): MailboxAccess[] => {
  const personal = personalEmail.trim().toLowerCase();
  const reserved = new Set(reservedPersonalEmails.map((email) => email.trim().toLowerCase()).filter(Boolean));

  return value
    .split(/[\n,;]/)
    .map((item) => item.trim().toLowerCase())
    .filter((address) => address && address !== personal && !reserved.has(address))
    .map((address) => ({ address, permission: "manage", type: "shared" }));
};

const formatSharedMailboxes = (mailboxAccess?: MailboxAccess[]) =>
  (mailboxAccess || [])
    .filter((mailbox) => mailbox.type === "shared")
    .map((mailbox) => mailbox.address)
    .join("\n");

const togglePermission = (
  values: AdminPermission[],
  permission: AdminPermission,
  checked: boolean
): AdminPermission[] =>
  checked
    ? Array.from(new Set([...values, permission]))
    : values.filter((item) => item !== permission);

export default function Users() {
  const { user: currentUser } = useAuth();
  const currentRole = normalizeRole(currentUser?.role, currentUser?.email);
  const isSuperAdmin = currentRole === "super_admin";
  const canManageUsers = isSuperAdmin || currentRole === "admin_0";

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<AdminForm>(emptyForm);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const roleOptions = useMemo<EditableAdminRole[]>(() => {
    if (isSuperAdmin) return ["admin_0", "admin_1", "admin_2", "admin_3", "admin_4", "admin_5"];
    if (currentRole === "admin_0") return ["admin_1", "admin_2", "admin_3", "admin_4", "admin_5"];
    return [];
  }, [currentRole, isSuperAdmin]);

  const canManageRole = (targetRoleValue: string, targetEmail?: string) => {
    const targetRole = normalizeRole(targetRoleValue, targetEmail);
    if (isSuperAdmin) return targetRole !== "super_admin";
    if (currentRole === "admin_0") return !["super_admin", "admin_0"].includes(targetRole);
    return false;
  };

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminUsers();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch admin users.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const data = await getAdminNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to fetch admin notifications.", "error");
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (canManageUsers) {
      void fetchUsers();
      void fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [canManageUsers]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((adminUser) => {
      const role = normalizeRole(adminUser.role, adminUser.email);
      const accountStatus = adminUser.accountStatus || (adminUser.isActive ? "active" : "disabled");
      const matchesSearch =
        !query ||
        [adminUser.name, adminUser.email, roleDefinitions[role]?.label || role]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus = !filterStatus || filterStatus === accountStatus;
      return matchesSearch && matchesStatus;
    });
  }, [filterStatus, search, users]);

  const metrics = useMemo(
    () => ({
      total: users.length,
      active: users.filter((adminUser) => (adminUser.accountStatus || (adminUser.isActive ? "active" : "disabled")) === "active").length,
      pending: users.filter((adminUser) => adminUser.accountStatus === "pending").length,
      levelZero: users.filter((adminUser) => normalizeRole(adminUser.role, adminUser.email) === "admin_0").length,
    }),
    [users]
  );

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm({ ...emptyForm, role: roleOptions[0] || defaultRole });
    setDialogOpen(true);
  };

  const openEditDialog = (adminUser: AdminUser) => {
    const role = normalizeRole(adminUser.role, adminUser.email);
    if (!canManageRole(role, adminUser.email)) {
      showMessage("You cannot edit this admin level.", "error");
      return;
    }

    setEditingUser(adminUser);
    setForm({
      name: adminUser.name,
      email: adminUser.email,
      role: role === "super_admin" ? defaultRole : (role as EditableAdminRole),
      sharedMailboxes: formatSharedMailboxes(adminUser.mailboxAccess),
      permissionsAllow: adminUser.permissionsAllow || [],
      permissionsDeny: adminUser.permissionsDeny || [],
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.trim() || !form.email.trim()) {
        showMessage("Name and email are required.", "error");
        return;
      }

      if (!roleOptions.includes(form.role)) {
        showMessage("You cannot assign this admin level.", "error");
        return;
      }

      const reservedPersonalEmails = users
        .filter((adminUser) => !editingUser || getUserId(adminUser) !== getUserId(editingUser))
        .map((adminUser) => adminUser.email);
      const mailboxAccess = parseSharedMailboxes(form.sharedMailboxes, form.email, reservedPersonalEmails);

      if (editingUser) {
        const id = getUserId(editingUser);
        const response = await updateAdminUser(id, {
          name: form.name,
          role: form.role,
          mailboxAccess,
          permissionsAllow: form.permissionsAllow,
          permissionsDeny: form.permissionsDeny,
        });
        setUsers((current) =>
          current.map((adminUser) =>
            getUserId(adminUser) === id ? { ...adminUser, ...response.user } : adminUser
          )
        );
        showMessage("Admin user updated.");
      } else {
        const response = await createAdminUser({
          name: form.name,
          email: form.email,
          role: form.role,
          mailboxAccess,
          permissionsAllow: form.permissionsAllow,
          permissionsDeny: form.permissionsDeny,
        });
        setUsers((current) => [response.user, ...current]);
        showMessage("Admin created. The account can now be activated. For CP Mail, add secure reception and sending credentials for this mailbox, then redeploy.");
      }

      setDialogOpen(false);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Action failed.", "error");
    }
  };

  const toggleActive = async (adminUser: AdminUser) => {
    if (!canManageRole(adminUser.role, adminUser.email)) {
      showMessage("You cannot change this admin level.", "error");
      return;
    }

    try {
      const id = getUserId(adminUser);
      const response = await updateAdminUser(id, { isActive: !adminUser.isActive });
      setUsers((current) =>
        current.map((item) => (getUserId(item) === id ? { ...item, ...response.user } : item))
      );
      showMessage(adminUser.isActive ? "Admin disabled." : "Admin enabled.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to update admin.", "error");
    }
  };

  const handleDeleteUser = async (adminUser: AdminUser) => {
    if (!canManageRole(adminUser.role, adminUser.email)) {
      showMessage("You cannot delete this admin level.", "error");
      return;
    }

    if (!window.confirm(`Delete admin ${adminUser.email}?`)) return;

    try {
      const id = getUserId(adminUser);
      await deleteAdminUser(id);
      setUsers((current) => current.filter((item) => getUserId(item) !== id));
      showMessage("Admin user deleted.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to delete admin.", "error");
    }
  };

  const handleResetPassword = async (adminUser: AdminUser) => {
    if (!canManageRole(adminUser.role, adminUser.email)) {
      showMessage("You cannot reset this admin password.", "error");
      return;
    }

    try {
      const id = getUserId(adminUser);
      const response = await createAdminPasswordResetLink(id);
      await navigator.clipboard?.writeText(response.resetLink);
      showMessage("Password reset link created and copied. Send it to the admin securely.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to create reset link.", "error");
    }
  };

  const handleResolvePasswordResetNotification = async (notification: AdminNotification) => {
    try {
      const id = notification._id || notification.id || "";
      const response = await resolvePasswordResetNotification(id);
      await navigator.clipboard?.writeText(response.resetLink);
      setNotifications((current) => current.filter((item) => (item._id || item.id) !== id));
      showMessage("Password reset link created and copied.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to generate reset link.", "error");
    }
  };

  const handleArchiveNotification = async (notification: AdminNotification) => {
    try {
      const id = notification._id || notification.id || "";
      await archiveAdminNotification(id);
      setNotifications((current) => current.filter((item) => (item._id || item.id) !== id));
      showMessage("Request archived.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to archive request.", "error");
    }
  };

  if (!canManageUsers) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Admin Users" subtitle="Manage access and permissions." />
        <Alert severity="warning">
          This section is reserved for authorized accounts. Your current role is{" "}
          <strong>{roleDefinitions[currentRole]?.label || currentRole}</strong>.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Admin Users" subtitle="Loading admin users..." />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Admin Users"
        subtitle="Create admins, assign levels and control mailbox access."
        action={
          <ActionButton variant="primary" startIcon={<PersonAdd />} onClick={openCreateDialog}>
            Add Admin
          </ActionButton>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Alert severity="info" sx={{ mb: 3 }}>
        Add a CP admin email, assign a level, then choose shared mailboxes only. Personal staff mailboxes stay private and are added automatically.
      </Alert>

      <Card sx={{ mb: 3, border: notifications.length ? "1px solid #f59e0b" : "1px solid #e2e8f0" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, flexWrap: "wrap", alignItems: "center", mb: notifications.length ? 2 : 0 }}>
            <Box>
              <Typography sx={{ fontWeight: 900, color: "#071a33" }}>Password reset requests</Typography>
              <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                Treat pending password reset requests and generate secure links only when needed.
              </Typography>
            </Box>
            <ActionButton variant="secondary" onClick={() => void fetchNotifications()}>
              Refresh requests
            </ActionButton>
          </Box>

          {loadingNotifications ? (
            <Typography sx={{ color: "#64748b" }}>Loading requests...</Typography>
          ) : notifications.length === 0 ? (
            <Typography sx={{ color: "#64748b" }}>No pending reset request.</Typography>
          ) : (
            <Grid container spacing={2}>
              {notifications.map((notification) => (
                <Grid item xs={12} md={6} key={notification._id || notification.id}>
                  <Card variant="outlined" sx={{ background: notification.status === "new" ? "#fff7ed" : "#fff" }}>
                    <CardContent>
                      <Typography sx={{ fontWeight: 900, color: "#071a33" }}>
                        {notification.targetName || "Admin account"}
                      </Typography>
                      <Typography sx={{ color: "#475569", fontSize: 13, mb: 1 }}>
                        {notification.targetEmail}
                      </Typography>
                      <Typography sx={{ color: "#64748b", fontSize: 12 }}>
                        Requested {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : "recently"}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                        <ActionButton variant="primary" onClick={() => void handleResolvePasswordResetNotification(notification)}>
                          Generate reset link
                        </ActionButton>
                        <ActionButton variant="secondary" onClick={() => void handleArchiveNotification(notification)}>
                          Archive
                        </ActionButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
<Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Total Admins" value={metrics.total} icon={<People />} color="#2196F3" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Active" value={metrics.active} icon={<VerifiedUser />} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Pending" value={metrics.pending} icon={<PersonOff />} color="#FF9800" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Level 0" value={metrics.levelZero} icon={<Badge />} color="#EEBA2B" />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(roleDefinitions).filter(([role]) => role !== "super_admin").map(([role, definition]) => (
          <Grid item xs={12} md={4} key={role}>
            <Card sx={{ height: "100%", border: role === currentRole ? "2px solid #EEBA2B" : "1px solid #e2e8f0" }}>
              <CardContent>
                <Typography sx={{ fontWeight: 900, color: "#071a33" }}>{definition.label}</Typography>
                <Typography sx={{ fontWeight: 800, color: "#EEBA2B", fontSize: 13, mt: 0.5 }}>
                  {definition.short}
                </Typography>
                <Typography sx={{ color: "#475569", fontSize: 13, mt: 1.2, lineHeight: 1.5 }}>
                  {definition.powers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <TextField
              label="Search admins"
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ flex: "1 1 280px" }}
            />
            <TextField
              select
              label="Status"
              size="small"
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              sx={{ width: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="disabled">Disabled</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>

      <DataTable
        headers={["Name", "Email", "Role", "Account", "Mailboxes", "Access"]}
        hiddenFields={["id"]}
        rows={filteredUsers.map((adminUser) => {
          const role = normalizeRole(adminUser.role, adminUser.email);
          const accountStatus = adminUser.accountStatus || (adminUser.isActive ? "active" : "disabled");
          const sharedCount = (adminUser.mailboxAccess || []).filter((mailbox) => mailbox.type === "shared").length;
          return {
            id: getUserId(adminUser),
            name: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <People sx={{ fontSize: 20, color: "#EEBA2B" }} />
                <Typography variant="body2" fontWeight="medium">
                  {adminUser.name}
                </Typography>
              </Box>
            ),
            email: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 20, color: "#EEBA2B" }} />
                <Typography variant="body2">{adminUser.email}</Typography>
              </Box>
            ),
            role: <StatusChip status={roleDefinitions[role]?.label || role} variant="info" />,
            account: (
              <StatusChip
                status={accountStatus}
                variant={accountStatus === "active" ? "success" : accountStatus === "pending" ? "warning" : "error"}
              />
            ),
            mailboxes: `${sharedCount} shared`,
            access: (
              <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {(adminUser.permissionsAllow || []).length > 0 && (
                  <Chip size="small" label={`+${(adminUser.permissionsAllow || []).length}`} color="success" />
                )}
                {(adminUser.permissionsDeny || []).length > 0 && (
                  <Chip size="small" label={`-${(adminUser.permissionsDeny || []).length}`} color="warning" />
                )}
                {(adminUser.permissionsAllow || []).length === 0 && (adminUser.permissionsDeny || []).length === 0 && (
                  <Typography sx={{ fontSize: 13, color: "#64748b" }}>Level defaults</Typography>
                )}
              </Box>
            ),
          };
        })}
        customActions={(row) => {
          const adminUser = users.find((item) => getUserId(item) === row.id);
          if (!adminUser) return null;
          const manageable = canManageRole(adminUser.role, adminUser.email);

          return (
            <>
              <MenuAction icon={<Edit />} label="Edit" onClick={() => openEditDialog(adminUser)} color={manageable ? "#EEBA2B" : "#94a3b8"} />
              <MenuAction icon={<LinkIcon />} label="Reset link" onClick={() => void handleResetPassword(adminUser)} color={manageable ? "#0ea5e9" : "#94a3b8"} />
              <MenuAction
                icon={<PersonOff />}
                label={adminUser.isActive ? "Disable" : "Enable"}
                onClick={() => void toggleActive(adminUser)}
                color={manageable ? "#64748b" : "#94a3b8"}
              />
              <MenuAction
                icon={<Delete />}
                label="Delete"
                onClick={() => void handleDeleteUser(adminUser)}
                color={manageable ? "#ef4444" : "#94a3b8"}
              />
            </>
          );
        }}
        emptyMessage="No admin users found"
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>
          {editingUser ? "Edit Admin" : "Create Admin"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="Name"
            fullWidth
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            label="CP Email"
            fullWidth
            disabled={Boolean(editingUser)}
            value={form.email}
            placeholder="prenom.nom@creativapoeta.com"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Admin level"
            fullWidth
            value={form.role}
            onChange={(event) =>
              setForm((current) => ({ ...current, role: event.target.value as EditableAdminRole }))
            }
            sx={{ mb: 2 }}
          >
            {roleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {roleDefinitions[role].label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Shared mailboxes"
            fullWidth
            multiline
            minRows={3}
            value={form.sharedMailboxes}
            placeholder="contact@creativapoeta.com\ncontact@creativapoeta.be"
            helperText="One common mailbox per line. Do not add staff addresses here; personal mailboxes remain private."
            onChange={(event) => setForm((current) => ({ ...current, sharedMailboxes: event.target.value }))}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 900, color: "#071a33", mb: 1 }}>
                    Add specific access
                  </Typography>
                  {Object.entries(groupedPermissions).map(([group, permissions]) => (
                    <Box key={`allow-${group}`} sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 900, color: "#64748b", textTransform: "uppercase" }}>
                        {group}
                      </Typography>
                      {permissions.map((permission) => (
                        <FormControlLabel
                          key={`allow-${permission.key}`}
                          control={
                            <Checkbox
                              size="small"
                              checked={form.permissionsAllow.includes(permission.key)}
                              onChange={(event) =>
                                setForm((current) => ({
                                  ...current,
                                  permissionsAllow: togglePermission(current.permissionsAllow, permission.key, event.target.checked),
                                  permissionsDeny: event.target.checked
                                    ? current.permissionsDeny.filter((item) => item !== permission.key)
                                    : current.permissionsDeny,
                                }))
                              }
                            />
                          }
                          label={permission.label}
                          sx={{ display: "block", m: 0 }}
                        />
                      ))}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: 900, color: "#071a33", mb: 1 }}>
                    Remove specific access
                  </Typography>
                  {Object.entries(groupedPermissions).map(([group, permissions]) => (
                    <Box key={`deny-${group}`} sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 900, color: "#64748b", textTransform: "uppercase" }}>
                        {group}
                      </Typography>
                      {permissions.map((permission) => (
                        <FormControlLabel
                          key={`deny-${permission.key}`}
                          control={
                            <Checkbox
                              size="small"
                              checked={form.permissionsDeny.includes(permission.key)}
                              onChange={(event) =>
                                setForm((current) => ({
                                  ...current,
                                  permissionsDeny: togglePermission(current.permissionsDeny, permission.key, event.target.checked),
                                  permissionsAllow: event.target.checked
                                    ? current.permissionsAllow.filter((item) => item !== permission.key)
                                    : current.permissionsAllow,
                                }))
                              }
                            />
                          }
                          label={permission.label}
                          sx={{ display: "block", m: 0 }}
                        />
                      ))}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" onClick={() => void handleSubmit()}>
            {editingUser ? "Save changes" : "Create pending admin"}
          </ActionButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
