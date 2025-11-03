import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") ||
        "/secure-admin-dashboard-2024";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const response = await axios.post(
        "https://creativa-poeta-bn-phi.vercel.app/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const { token, user } = response.data;

      // Use AuthContext login method
      login(token, user);

      // Redirect to intended page or dashboard
      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") ||
        "/secure-admin-dashboard-2024";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Welcome Back!
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              autoComplete="email"
              autoFocus
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

            <TextField
              label="Password"
              fullWidth
              type="password"
              margin="normal"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#EEBA2B",
                "&:hover": {
                  backgroundColor: "#D4A728",
                },
                "&:disabled": {
                  backgroundColor: "#F5E6A3",
                  color: "#8B7355",
                },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={20}
                    sx={{ color: "#8B7355", mr: 1 }}
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <span
              style={{ color: "#EEBA2B", cursor: "pointer" }}
              onClick={() => navigate("/secure-admin-register-2024")}
            >
              Sign Up
            </span>
          </Typography>

          {/* Homepage Return Option */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                "&:hover": {
                  color: "#EEBA2B",
                  transform: "translateX(-2px)",
                },
                transition: "all 0.2s ease",
                fontSize: "14px",
              }}
              onClick={() => navigate("/")}
            >
              ← Return to Homepage
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
