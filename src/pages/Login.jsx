import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useAuth } from "../context/AuthContext";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const initialForm = { email: "", password: "" };
const initialErrors = { email: "", password: "" };

export default function Login() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: "success", title: "", message: "" });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validateField = (field, value) => {
    if (field === "email") {
      return EMAIL_REGEX.test(value.trim()) ? "" : "Please enter a valid email address";
    }
    if (field === "password") {
      return PASSWORD_REGEX.test(value)
        ? ""
        : "Password must be 8+ chars with uppercase, lowercase, number & special char";
    }
    return "";
  };

  const handleBlur = (field) => () => {
    if (!form[field]) return; // don't show error before the user types anything
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));
  };

  const showToast = (severity, title, message) => {
    setToast({ open: true, severity, title, message });
  };

  /** Validate form and return true if valid */
  const validateForm = () => {
    const emailError = validateField("email", form.email);
    const passwordError = validateField("password", form.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      showToast("error", "Validation Failed", "Please check your email and password format.");
      return false;
    }
    return true;
  };

  /** Normal user login */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    const result = await login(form.email, form.password);
    setSubmitting(false);

    if (result.success) {
      // If user is admin, reject from normal login
      if (result.user && result.user.role === "admin") {
        logout(); // revert session
        showToast("error", "Access Denied", "Admin accounts must use the Admin Login button.");
        return;
      }
      showToast("success", "🎉 Welcome Back!", result.message);
      setTimeout(() => navigate("/", { replace: true }), 300);
    } else {
      showToast("error", result.reason === "wrong-password" ? "Incorrect Password" : "Account Not Found", result.message);
      setErrors((prev) => ({
        ...prev,
        password: result.reason === "wrong-password" ? "Incorrect password" : "",
        email: result.reason === "not-found" ? "No account with this email" : "",
      }));
    }
  };



  return (
    <Box component="main" className="gradient-form" sx={{ minHeight: "70vh", display: "flex", alignItems: "center", py: 8 }}>
      <Container maxWidth="xs">
        <Card elevation={8} sx={{ p: { xs: 3, md: 4 } }}>
          <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: "2.75rem" }}>🔐</Typography>
            <Typography variant="h4" fontWeight={800}>Welcome Back!</Typography>
            <Typography color="text.secondary">Sign in to your account</Typography>
          </Stack>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="📧 Email Address"
              placeholder="your@email.com"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />

            <TextField
              fullWidth
              label="🔑 Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5, mb: 2 }}>
              <FormControlLabel
                control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label={<Typography variant="body2">Remember Me</Typography>}
              />
              <Link href="#" variant="body2" underline="hover">Forgot Password?</Link>
            </Stack>

            {/* ── User Login Button ── */}
            <Button type="submit" fullWidth variant="contained" size="large" disabled={submitting} sx={{ py: 1.4, fontSize: "1rem" }}>
              {submitting ? "⏳ Signing in..." : "Sign In"}
            </Button>

            {/* ── Divider ── */}
            <Divider sx={{ my: 2.5 }}>
              <Typography variant="caption" color="text.secondary">OR</Typography>
            </Divider>

            {/* ── Admin Login Button ── */}
            <Button
              component={RouterLink}
              to="/admin/login"
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<AdminPanelSettingsIcon />}
              sx={{
                py: 1.2,
                fontSize: "0.95rem",
                borderColor: "#475569",
                color: "#475569",
                "&:hover": {
                  borderColor: "#1e293b",
                  bgcolor: "rgba(15,23,42,0.04)",
                  color: "#1e293b",
                },
              }}
            >
              Admin Login
            </Button>

            <Divider sx={{ my: 2.5 }}>
              <Typography variant="caption" color="text.secondary">SOCIAL</Typography>
            </Divider>

            <Stack direction="row" spacing={1.5}>
              <Button fullWidth variant="outlined" color="inherit">🔵 Google</Button>
              <Button fullWidth variant="outlined" color="inherit">⚫ GitHub</Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" fontWeight={700} underline="hover">
                Create one
              </Link>
            </Typography>

            <Typography variant="caption" color="text.disabled" display="block" textAlign="center" sx={{ mt: 2 }}>
              Demo: demo@smartgadgets.com / Demo@1234
            </Typography>
            <Typography variant="caption" color="text.disabled" display="block" textAlign="center" sx={{ mt: 0.5 }}>
              Admin: admin@smartgadgets.com / Admin@1234
            </Typography>
          </Box>
        </Card>
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          sx={{ borderRadius: 3 }}
        >
          <strong>{toast.title}</strong>
          <br />
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
