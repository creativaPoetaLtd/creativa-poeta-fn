import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
  confirmAdminMfaSetup,
  requestAdminPasswordReset,
  startAdminMfaSetup,
  verifyAdminMfa,
  type AuthenticatedResponse,
  type PrimaryAuthResponse,
} from "../APIs/auth";

type LoginMode = "login" | "activate" | "forgot" | "reset";
type MfaStage = "setup" | "verify" | "recovery" | "recoveryCodes" | null;

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
  const [mfaStage, setMfaStage] = useState<MfaStage>(null);
  const [challengeToken, setChallengeToken] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [setupQrCode, setSetupQrCode] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [recoverySaved, setRecoverySaved] = useState(false);
  const [pendingSession, setPendingSession] = useState<AuthenticatedResponse | null>(null);
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
    setMfaStage(null);
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

  const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError<{ error?: string; message?: string }>(err)) {
      return err.response?.data?.error || err.response?.data?.message || err.message || "Request failed. Try again.";
    }
    return err instanceof Error ? err.message : "Request failed. Try again.";
  };

  const handlePrimaryAuth = async (response: PrimaryAuthResponse) => {
    if ("token" in response) {
      finishLogin(response.token, response.user as User);
      return;
    }
    setChallengeToken(response.challengeToken);
    setMfaCode("");
    if (!response.mfaSetupRequired) {
      setMfaStage("verify");
      return;
    }
    const setup = await startAdminMfaSetup(response.challengeToken);
    setSetupQrCode(setup.qrCodeDataUrl);
    setSetupKey(setup.setupKey);
    setMfaStage("setup");
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setError(null);
      setMessage(null);
      setLoading(true);

      if (mode === "login") {
        const response = await axios.post<PrimaryAuthResponse>(
          `${API_BASE_URL}/api/auth/login`,
          {
            email: data.email,
            password: data.password,
          }
        );
        await handlePrimaryAuth(response.data);
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
        await handlePrimaryAuth(response);
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
        await handlePrimaryAuth(response);
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const submitMfa = async () => {
    try {
      setError(null);
      setLoading(true);
      if (mfaStage === "setup") {
        const response = await confirmAdminMfaSetup(challengeToken, mfaCode);
        setPendingSession(response);
        setRecoveryCodes(response.recoveryCodes);
        setMfaStage("recoveryCodes");
      } else {
        const response = await verifyAdminMfa(
          challengeToken,
          mfaStage === "recovery" ? { recoveryCode: mfaCode } : { code: mfaCode }
        );
        finishLogin(response.token, response.user as User);
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const finishMfaEnrollment = () => {
    if (pendingSession && recoverySaved) finishLogin(pendingSession.token, pendingSession.user as User);
  };

  const showPassword = mode === "login" || mode === "reset" || (mode === "activate" && activationChecked);
  const showConfirmPassword = mode === "reset" || (mode === "activate" && activationChecked);

  const mfaPanel = mfaStage ? (
    <>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        {mfaStage === "setup"
          ? "Protect this account"
          : mfaStage === "recoveryCodes"
            ? "Save your recovery codes"
            : "Security verification"}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
        {mfaStage === "setup"
          ? "Scan the QR code with your authenticator app, then enter the 6-digit code."
          : mfaStage === "recoveryCodes"
            ? "Store these one-time codes in a secure place. They will not be shown again."
            : mfaStage === "recovery"
              ? "Enter one unused recovery code."
              : "Enter the 6-digit code from your authenticator app."}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {mfaStage === "setup" && (
        <Stack spacing={2} alignItems="center">
          <Box
            component="img"
            src={setupQrCode}
            alt="Authenticator setup QR code"
            sx={{ width: 220, maxWidth: "100%", borderRadius: 1 }}
          />
          <Box sx={{ width: "100%", p: 1.5, bgcolor: "#f4f6f8", borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">Manual setup key</Typography>
            <Typography sx={{ fontFamily: "monospace", overflowWrap: "anywhere", userSelect: "all" }}>
              {setupKey}
            </Typography>
          </Box>
        </Stack>
      )}

      {mfaStage === "recoveryCodes" ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1,
              p: 2,
              bgcolor: "#f4f6f8",
              borderRadius: 1,
            }}
          >
            {recoveryCodes.map((code) => (
              <Typography key={code} sx={{ fontFamily: "monospace", textAlign: "center", userSelect: "all" }}>
                {code}
              </Typography>
            ))}
          </Box>
          <FormControlLabel
            sx={{ mt: 2, alignItems: "flex-start" }}
            control={<Checkbox checked={recoverySaved} onChange={(event) => setRecoverySaved(event.target.checked)} />}
            label="I have stored these recovery codes securely."
          />
          <Button
            variant="contained"
            fullWidth
            disabled={!recoverySaved}
            onClick={finishMfaEnrollment}
            sx={{ mt: 1.5, py: 1.5, backgroundColor: "#EEBA2B", color: "#071a33", fontWeight: 900 }}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <TextField
            label={mfaStage === "recovery" ? "Recovery code" : "Authentication code"}
            value={mfaCode}
            onChange={(event) => setMfaCode(event.target.value)}
            fullWidth
            margin="normal"
            autoFocus
            autoComplete="one-time-code"
            inputProps={{ inputMode: mfaStage === "recovery" ? "text" : "numeric" }}
          />
          <Button
            variant="contained"
            fullWidth
            disabled={loading || !mfaCode.trim()}
            onClick={submitMfa}
            sx={{ mt: 1.5, py: 1.5, backgroundColor: "#EEBA2B", color: "#071a33", fontWeight: 900 }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: "#071a33" }} /> : mfaStage === "setup" ? "Enable MFA" : "Verify"}
          </Button>
          {mfaStage !== "setup" && (
            <Button
              fullWidth
              onClick={() => {
                setError(null);
                setMfaCode("");
                setMfaStage(mfaStage === "recovery" ? "verify" : "recovery");
              }}
              sx={{ mt: 1 }}
            >
              {mfaStage === "recovery" ? "Use authenticator code" : "Use a recovery code"}
            </Button>
          )}
        </>
      )}
    </>
  ) : null;

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
          {mfaPanel || (
          <>
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
          </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

