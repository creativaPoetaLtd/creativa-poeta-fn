import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setError(null);

      const response = await axios.post("https://creativapoeta-bn.onrender.com/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard"); // Redirect to dashboard
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid credentials. Try again.");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f6f8" }}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Welcome Back!
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              fullWidth
              type="password"
              margin="normal"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
              Login
            </Button>
          </form>

          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <span style={{ color: "#1976D2", cursor: "pointer" }} onClick={() => navigate("/register")}>
              Sign Up
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
