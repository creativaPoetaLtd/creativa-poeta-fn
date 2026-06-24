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

const roleOptions: AdminRole[] = ["super_admin", "admin", "editor", "viewer"];

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "admin" as AdminRole,
};

const getUserId = (user: AdminUser) => user._id || user.id || "";

export default function Users() {
  const { user: currentUser } = useAuth();
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

  const isSuperAdmin = currentUser?.role === "super_admin";

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
    if (isSuperAdmin) {
      void fetchUsers();
    } else {
      setLoading(false);
    }
  }, [isSuperAdmin]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((adminUser) => {
      const status = adminUser.isActive ? "active" : "inactive";
      const matchesSearch =
        !query ||
        [adminUser.name, adminUser.email, adminUser.role]
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
      superAdmins: users.filter((adminUser) => adminUser.role === "super_admin").length,
    }),
    [users]
  );

  const openCreateDialog = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (adminUser: AdminUser) => {
    setEditingUser(adminUser);
    setForm({
      name: adminUser.name,
      email: adminUser.email,
      password: "",
      role: adminUser.role,
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
        const response = await createAdminUser(form);
        setUsers((current) => [response.user, ...current]);
        showMessage("Admin user created.");
      }

      setDialogOpen(false);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Action failed.", "error");
    }
  };

  const toggleActive = async (adminUser: AdminUser) => {
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

  if (!isSuperAdmin) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Admin Users" subtitle="Manage access and permissions." />
        <Alert severity="warning">
          This section is reserved for the super admin. Your current role is{" "}
          <strong>{currentUser?.role || "unknown"}</strong>.
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
        subtitle="Create, disable and manage dashboard access."
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
          <DashboardCard title="Super Admins" value={metrics.superAdmins} icon={<Badge />} color="#EEBA2B" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Search admins"
              size="small"
              fullWidth
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
        rows={filteredUsers.map((adminUser) => ({
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
          role: <StatusChip status={adminUser.role} variant={adminUser.role === "super_admin" ? "warning" : "info"} />,
          status: (
            <StatusChip
              status={adminUser.isActive ? "active" : "inactive"}
              variant={adminUser.isActive ? "success" : "error"}
            />
          ),
        }))}
        customActions={(row) => {
          const adminUser = users.find((item) => getUserId(item) === row.id);
          if (!adminUser) return null;

          return (
            <>
              <MenuAction icon={<Edit />} label="Edit" onClick={() => openEditDialog(adminUser)} color="#EEBA2B" />
              <MenuAction
                icon={<PersonOff />}
                label={adminUser.isActive ? "Disable" : "Enable"}
                onClick={() => void toggleActive(adminUser)}
                color="#64748b"
              />
              <MenuAction
                icon={<Delete />}
                label="Delete"
                onClick={() => void handleDeleteUser(adminUser)}
                color="#ef4444"
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
            label="Email"
            fullWidth
            disabled={Boolean(editingUser)}
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            label={editingUser ? "New password (optional)" : "Password"}
            type="password"
            fullWidth
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Role"
            fullWidth
            value={form.role}
            onChange={(event) =>
              setForm((current) => ({ ...current, role: event.target.value as AdminRole }))
            }
          >
            {roleOptions.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
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
