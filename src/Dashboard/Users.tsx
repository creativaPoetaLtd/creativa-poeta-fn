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
  PersonAdd,
  PersonOff,
  People,
  VerifiedUser,
} from "@mui/icons-material";
import {
  AdminRole,
  AdminUser,
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

const roleDefinitions: Record<AdminRole, { label: string; short: string; powers: string }> = {
  super_admin: {
    label: "Superadmin",
    short: "Proprietaire racine",
    powers: "Controle total. Seul ce role peut creer, modifier, desactiver ou supprimer un admin niveau 0.",
  },
  admin_0: {
    label: "Niveau 0 - Direction",
    short: "Pouvoirs presque complets",
    powers: "Acces complet au dashboard, sauf creation ou gestion des autres niveaux 0 et du superadmin.",
  },
  admin_1: {
    label: "Niveau 1 - Operations",
    short: "Demandes et suivi client",
    powers: "Projects, demandes de visibilite, assistance, contacts, emails et suivi operationnel.",
  },
  admin_2: {
    label: "Niveau 2 - Contenu & SEO",
    short: "Blog et visibilite",
    powers: "Articles, SEO, contenus, calendrier editorial et elements lies a la visibilite.",
  },
  admin_3: {
    label: "Niveau 3 - Support & email",
    short: "Support client",
    powers: "Boite mail CP, reponses aux contacts, demandes d'assistance et messages clients.",
  },
  admin_4: {
    label: "Niveau 4 - Lecture & reporting",
    short: "Consultation",
    powers: "Lecture du dashboard, suivi des resultats et reporting sans suppression critique.",
  },
  admin_5: {
    label: "Niveau 5 - Acces limite",
    short: "Assistant limite",
    powers: "Acces tres cible a des elements assignes. Utile pour un prestataire ou assistant temporaire.",
  },
};

const defaultRole: EditableAdminRole = "admin_1";

const emptyForm: { name: string; email: string; password: string; role: EditableAdminRole } = {
  name: "",
  email: "",
  password: "",
  role: defaultRole,
};
const getUserId = (user: AdminUser) => user._id || user.id || "";

const normalizeRole = (role?: string): AdminRole => {
  if (role === "admin") return "admin_0";
  if (role === "editor") return "admin_2";
  if (role === "viewer") return "admin_4";
  return (role || "admin_5") as AdminRole;
};

export default function Users() {
  const { user: currentUser } = useAuth();
  const currentRole = normalizeRole(currentUser?.role);
  const isSuperAdmin = currentRole === "super_admin";
  const canManageUsers = isSuperAdmin || currentRole === "admin_0";

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const roleOptions = useMemo<EditableAdminRole[]>(() => {
    if (isSuperAdmin) return ["admin_0", "admin_1", "admin_2", "admin_3", "admin_4", "admin_5"];
    if (currentRole === "admin_0") return ["admin_1", "admin_2", "admin_3", "admin_4", "admin_5"];
    return [];
  }, [currentRole, isSuperAdmin]);

  const canManageRole = (targetRoleValue: string) => {
    const targetRole = normalizeRole(targetRoleValue);
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
      const role = normalizeRole(adminUser.role);
      const status = adminUser.isActive ? "active" : "inactive";
      const matchesSearch =
        !query ||
        [adminUser.name, adminUser.email, roleDefinitions[role]?.label || role]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus = !filterStatus || filterStatus === status;
      return matchesSearch && matchesStatus;
    });
  }, [filterStatus, search, users]);

  const metrics = useMemo(
    () => ({
      total: users.length,
      active: users.filter((adminUser) => adminUser.isActive).length,
      inactive: users.filter((adminUser) => !adminUser.isActive).length,
      levelZero: users.filter((adminUser) => normalizeRole(adminUser.role) === "admin_0").length,
    }),
    [users]
  );

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm({ ...emptyForm, role: roleOptions[0] || defaultRole });
    setDialogOpen(true);
  };

  const openEditDialog = (adminUser: AdminUser) => {
    const role = normalizeRole(adminUser.role);
    if (!canManageRole(role)) {
      showMessage("You cannot edit this admin level.", "error");
      return;
    }

    setEditingUser(adminUser);
    setForm({
      name: adminUser.name,
      email: adminUser.email,
      password: "",
      role: role === "super_admin" ? defaultRole : (role as EditableAdminRole),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.trim() || !form.email.trim()) {
        showMessage("Name and email are required.", "error");
        return;
      }

      if (!editingUser && !form.password.trim()) {
        showMessage("Password is required for a new admin.", "error");
        return;
      }

      if (!roleOptions.includes(form.role)) {
        showMessage("You cannot assign this admin level.", "error");
        return;
      }

      if (editingUser) {
        const id = getUserId(editingUser);
        const payload = {
          name: form.name,
          role: form.role,
          ...(form.password.trim() ? { password: form.password } : {}),
        };
        const response = await updateAdminUser(id, payload);
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
          password: form.password,
          role: form.role,
        });
        setUsers((current) => [response.user, ...current]);
        showMessage("Admin user created.");
      }

      setDialogOpen(false);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Action failed.", "error");
    }
  };

  const toggleActive = async (adminUser: AdminUser) => {
    if (!canManageRole(adminUser.role)) {
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
    if (!canManageRole(adminUser.role)) {
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

  if (!canManageUsers) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Admin Users" subtitle="Manage access and permissions." />
        <Alert severity="warning">
          This section is reserved for the superadmin and level 0 admins. Your current role is{" "}
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
        subtitle="Create, disable and manage dashboard access levels."
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
        Create the mailbox first in Infomaniak, for example prenom.nom@creativapoeta.com. Dashboard access is created here. CP Mail per-user mailbox sync still needs one secure mailbox credential per user unless we later connect an Infomaniak API.
      </Alert>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Total Admins" value={metrics.total} icon={<People />} color="#2196F3" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Active" value={metrics.active} icon={<VerifiedUser />} color="#4CAF50" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Inactive" value={metrics.inactive} icon={<PersonOff />} color="#FF5722" />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard title="Level 0" value={metrics.levelZero} icon={<Badge />} color="#EEBA2B" />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(roleDefinitions).map(([role, definition]) => (
          <Grid item xs={12} md={role === "super_admin" ? 12 : 4} key={role}>
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
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>

      <DataTable
        headers={["Name", "Email", "Role", "Status"]}
        hiddenFields={["id"]}
        rows={filteredUsers.map((adminUser) => {
          const role = normalizeRole(adminUser.role);
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
            role: <StatusChip status={roleDefinitions[role]?.label || role} variant={role === "super_admin" ? "warning" : "info"} />,
            status: (
              <StatusChip
                status={adminUser.isActive ? "active" : "inactive"}
                variant={adminUser.isActive ? "success" : "error"}
              />
            ),
          };
        })}
        customActions={(row) => {
          const adminUser = users.find((item) => getUserId(item) === row.id);
          if (!adminUser) return null;
          const manageable = canManageRole(adminUser.role);

          return (
            <>
              <MenuAction icon={<Edit />} label="Edit" onClick={() => openEditDialog(adminUser)} color={manageable ? "#EEBA2B" : "#94a3b8"} />
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
            label={editingUser ? "New password (optional)" : "Temporary password"}
            type="password"
            fullWidth
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
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
          >
            {roleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {roleDefinitions[role].label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" onClick={() => void handleSubmit()}>
            {editingUser ? "Save changes" : "Create admin"}
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
