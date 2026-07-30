import { useState } from "react";
import { Alert, Box, Card, CardContent, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { LockReset, Security } from "@mui/icons-material";
import { changeAdminPassword } from "../APIs/auth";
import { ActionButton, DashboardCard, PageHeader } from "./components/DashboardComponents";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleChangePassword = async () => {
    try {
      if (!currentPassword || !password || !confirmPassword) {
        showMessage("All password fields are required.", "error");
        return;
      }
      if (password !== confirmPassword) {
        showMessage("The new passwords do not match.", "error");
        return;
      }
      if (password.length < 8) {
        showMessage("The new password must contain at least 8 characters.", "error");
        return;
      }

      setLoading(true);
      await changeAdminPassword(currentPassword, password, confirmPassword);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      showMessage("Password changed successfully.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to change password.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="Settings" subtitle="Manage your admin account and security." />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Account security" value="Active" icon={<Security />} color="#4CAF50" />
        </Grid>
      </Grid>

      <Card sx={{ maxWidth: 720 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
            <LockReset sx={{ color: "#EEBA2B" }} />
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#071a33" }}>
              Change password
            </Typography>
          </Box>

          <TextField
            label="Current password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="New password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm new password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            sx={{ mb: 3 }}
          />
          <ActionButton variant="primary" onClick={() => void handleChangePassword()} disabled={loading}>
            {loading ? "Saving..." : "Save new password"}
          </ActionButton>
        </CardContent>
      </Card>

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
