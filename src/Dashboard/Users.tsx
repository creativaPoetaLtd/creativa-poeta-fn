import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
    powers: "Projects, visibility requests, assistance, contact inbox, shared emails and operational follow-up.",
  },
  admin_2: {
    label: "Niveau 2 - Content & SEO",
    short: "Blog and visibility",
    powers: "Articles, SEO, content, editorial calendar and visibility-related work.",
  },
  admin_3: {
    label: "Niveau 3 - Support & email",
    short: "Client support",
    powers: "CP Mail, contact replies, assistance requests and customer messages assigned to them.",
  },
  admin_4: {
    label: "Niveau 4 - Read & reporting",
    short: "Consultation",
    powers: "Dashboard reading, results monitoring and reporting without critical deletion rights.",
  },
  admin_5: {
    label: "Niveau 5 - Limited access",
    short: "Limited assistant",
    powers: "Very targeted access to assigned items. Useful for a temporary assistant or contractor.",
  },
};

const defaultRole: EditableAdminRole = "admin_1";
const emptyForm: AdminForm = {
  name: "",
  email: "",
  role: defaultRole,
  sharedMailboxes: sharedMailboxDefaults.join("\n"),
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

const parseSharedMailboxes = (value: string): MailboxAccess[] =>
  value
    .split(/[\n,;]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .map((address) => ({ address, permission: "manage", type: "shared" }));

const formatSharedMailboxes = (mailboxAccess?: MailboxAccess[]) =>
  (mailboxAccess || [])
    .filter((mailbox) => mailbox.type === "shared")
    .map((mailbox) => mailbox.address)
    .join("\n");

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

  useEffect(() => {
    if (canManageUsers) {
      void fetchUsers();
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

      const mailboxAccess = parseSharedMailboxes(form.sharedMailboxes);

      if (editingUser) {
        const id = getUserId(editingUser);
        const response = await updateAdminUser(id, {
          name: form.name,
          role: form.role,
          mailboxAccess,
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
        });
        setUsers((current) => [response.user, ...current]);
        showMessage("Admin created. They can now click Create account and choose their own password.");
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

  if (!canManageUsers) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Admin Users" subtitle="Manage access and permissions." />
        <Alert severity="warning">
          This section is reserved for level 0 admins. Your current role is{" "}
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
        Add a CP admin email, assign a level, then choose which shared mailboxes this person can access.
      </Alert>

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
        headers={["Name", "Email", "Role", "Account", "Mailboxes"]}
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
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
            helperText="One shared mailbox per line. The personal mailbox is always private and added automatically."
            onChange={(event) => setForm((current) => ({ ...current, sharedMailboxes: event.target.value }))}
          />
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


