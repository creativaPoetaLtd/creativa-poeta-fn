import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/secure-admin-login-2024",
}) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Re-check authentication when component mounts
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#EEBA2B", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "#666", textAlign: "center" }}>
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  // Check for valid authentication
  if (!isAuthenticated) {
    console.warn("Unauthorized access attempt to:", location.pathname);

    // Store the attempted URL for redirect after login
    sessionStorage.setItem("redirectAfterLogin", location.pathname);

    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
