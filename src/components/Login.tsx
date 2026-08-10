import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import type { User } from "../contexts/authContextValue";
import { API_BASE_URL } from "../APIs/client";
import {
  activateAdminAccount,
  checkAdminActivation,
  completeAdminPasswordReset,
  requestAdminPasswordReset,
} from "../APIs/auth";

type LoginMode = "login" | "activate" | "forgot" | "reset";

type LoginFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const modeCopy: Record<LoginMode, { title: string; action: string; helper: string }> = {
  login: {
    title: "Admin access",
    action: "Login",
    helper: "Use your CP email and password.",
  },
  activate: {
    title: "Create account",
    action: "Activate account",
    helper: "Enter your CP email to finalize your access.",
  },
  forgot: {
    title: "Forgot password",
    action: "Request reset",
    helper: "Enter your CP email to request a password reset.",
  },
  reset: {
    title: "Reset password",
    action: "Save new password",
    helper: "Choose a new password.",
  },
};

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken") || "";
  const resetEmail = searchParams.get("email") || "";
  const defaultMode: LoginMode = resetToken && resetEmail ? "reset" : "login";
  const [mode, setMode] = useState<LoginMode>(defaultMode);
  const [activationChecked, setActivationChecked] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: resetEmail, password: "", confirmPassword: "" },
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const copy = useMemo(() => modeCopy[mode], [mode]);

  useEffect(() => {
    if (resetEmail) setValue("email", resetEmail);
  }, [resetEmail, setValue]);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") ||
        "/secure-admin-dashboard-2024";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const setModeAndReset = (nextMode: LoginMode) => {
    setMode(nextMode);
    setError(null);
    setMessage(null);
    setActivationChecked(false);
    reset({ email: nextMode === "reset" ? resetEmail : "", password: "", confirmPassword: "" });
  };

  const finishLogin = (token: string, user: User) => {
    login(token, user);
    const redirectPath =
      sessionStorage.getItem("redirectAfterLogin") ||
      "/secure-admin-dashboard-2024";
    sessionStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath, { replace: true });
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setError(null);
      setMessage(null);
      setLoading(true);

      if (mode === "login") {
        const response = await axios.post<{ token: string; user: User }>(
          `${API_BASE_URL}/api/auth/login`,
          {
            email: data.email,
            password: data.password,
          }
        );
        finishLogin(response.data.token, response.data.user);
        return;
      }

      if (mode === "activate") {
        if (!activationChecked) {
          await checkAdminActivation(data.email);
          setActivationChecked(true);
          setMessage("Account found. Choose your password.");
          return;
        }
        const response = await activateAdminAccount(data.email, data.password, data.confirmPassword);
        finishLogin(response.token, response.user);
        return;
      }

      if (mode === "forgot") {
        const response = await requestAdminPasswordReset(data.email);
        setMessage(response.message);
        return;
      }

      if (mode === "reset") {
        const response = await completeAdminPasswordReset(
          data.email,
          resetToken,
          data.password,
          data.confirmPassword
        );
        finishLogin(response.token, response.user);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError<{ error?: string }>(err)) {
        setError(err.response?.data?.error || err.message || "Request failed. Try again.");
      } else {
        setError(err instanceof Error ? err.message : "Request failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const showPassword = mode === "login" || mode === "reset" || (mode === "activate" && activationChecked);
  const showConfirmPassword = mode === "reset" || (mode === "activate" && activationChecked);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 460, width: "100%", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            {copy.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
            {copy.helper}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Button size="small" variant={mode === "login" ? "contained" : "outlined"} onClick={() => setModeAndReset("login")}>Login</Button>
            <Button size="small" variant={mode === "activate" ? "contained" : "outlined"} onClick={() => setModeAndReset("activate")}>Create account</Button>
            <Button size="small" variant={mode === "forgot" ? "contained" : "outlined"} onClick={() => setModeAndReset("forgot")}>Forgot</Button>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="CP Email"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
              disabled={mode === "reset" && Boolean(resetEmail)}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {showPassword && (
              <TextField
                label={mode === "login" ? "Password" : "New password"}
                fullWidth
                type="password"
                margin="normal"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}

            {showConfirmPassword && (
              <TextField
                label="Confirm password"
                fullWidth
                type="password"
                margin="normal"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#EEBA2B",
                color: "#071a33",
                fontWeight: 900,
                "&:hover": { backgroundColor: "#D4A728" },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: "#071a33" }} /> : copy.action}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", cursor: "pointer", fontSize: "14px" }}
              onClick={() => navigate("/")}
            >
              Return to Homepage
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

