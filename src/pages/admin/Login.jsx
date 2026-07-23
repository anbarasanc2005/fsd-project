import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Avatar, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function AdminLogin() {
  const { login, logout, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already logged in as admin, go straight to dashboard
  if (isLoggedIn && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    const result = await login(email, password);
    if (result.success && result.user?.role === "admin") {
      navigate("/admin", { replace: true });
    } else if (result.success) {
      // Logged in but not admin — revert session
      logout();
      setError("This account does not have admin privileges.");
    } else {
      setError(result.message || "Invalid credentials");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "#1e293b", mb: 1, width: 48, height: 48 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight={700}>
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Authorized administrators only
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && (
              <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.3,
                bgcolor: "#1e293b",
                "&:hover": { bgcolor: "#0f172a" },
              }}
            >
              Sign In as Admin
            </Button>
            <Typography variant="caption" color="text.disabled" display="block" textAlign="center">
              Admin: admin@smartgadgets.com / Admin@1234
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
