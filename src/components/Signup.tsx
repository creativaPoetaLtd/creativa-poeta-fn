import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Box, Card, CardContent, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

type SignupFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post("https://creativapoeta-bn.onrender.com/api/auth/signup", {
        name: data.fullName,  // Map fullName to name (API expects "name")
        email: data.email,
        password: data.password,
        role: "user", // Default role (adjust as needed)
      });

      setMessage(response.data.message || "Signup successful!");
      navigate("/login");

    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
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
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Create Account
          </Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
            Sign up to get started!
          </Typography>

          {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("fullName", { required: "Full Name is required", minLength: { value: 3, message: "At least 3 characters" } })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2, py: 1.5 }} 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign Up"}
            </Button>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Already have an account? 
            <span 
              style={{ color: "#1976D2", cursor: "pointer" }} 
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
