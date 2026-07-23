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
  FormHelperText,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Stack,
  Grid,
  LinearProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";

const NAME_REGEX = /^[A-Za-z]{2,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

const initialErrors = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: "",
};

function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;
  return score; // 0-4
}

const strengthMeta = [
  { color: "error", label: "Very Weak" },
  { color: "error", label: "Weak" },
  { color: "warning", label: "Fair" },
  { color: "info", label: "Good" },
  { color: "success", label: "Strong" },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, severity: "success", title: "", message: "" });

  const handleChange = (field) => (e) => {
    const value = field === "terms" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case "firstName":
        return NAME_REGEX.test(value.trim()) ? "" : "First name must be at least 2 letters (A-Z only)";
      case "lastName":
        return NAME_REGEX.test(value.trim()) ? "" : "Last name must be at least 2 letters (A-Z only)";
      case "email":
        return EMAIL_REGEX.test(value.trim()) ? "" : "Please enter a valid email address";
      case "phone":
        return PHONE_REGEX.test(value.trim()) ? "" : "Enter a valid 10-digit Indian phone number (starts with 6-9)";
      case "password":
        return PASSWORD_REGEX.test(value) ? "" : "8+ chars with uppercase, lowercase, number & special character";
      case "confirmPassword":
        return value === form.password && value.length > 0 ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const handleBlur = (field) => () => {
    if (field !== "confirmPassword" && !form[field]) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form[field]) }));
  };

  const showToast = (severity, title, message) => {
    setToast({ open: true, severity, title, message });
  };

  const strength = passwordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = ["firstName", "lastName", "email", "phone", "password", "confirmPassword"];
    const newErrors = { ...initialErrors };
    let failedFields = [];

    fieldsToValidate.forEach((field) => {
      const err = validateField(field, form[field]);
      newErrors[field] = err;
      if (err) failedFields.push(field);
    });

    if (!form.terms) {
      newErrors.terms = "You must agree to the terms";
      failedFields.push("terms");
    }

    setErrors(newErrors);

    if (failedFields.length > 0) {
      showToast("error", "Validation Failed", "Please fix the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);

    if (result.success) {
      showToast("success", "🎉 Account Created!", `${result.message} Redirecting to login...`);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      showToast("error", "Registration Failed", result.message);
      setErrors((prev) => ({ ...prev, email: result.message }));
    }
  };

  return (
    <Box component="main" className="gradient-form" sx={{ minHeight: "70vh", display: "flex", alignItems: "center", py: 8 }}>
      <Container maxWidth="sm">
        <Card elevation={8} sx={{ p: { xs: 3, md: 4 } }}>
          <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: "2.75rem" }}>📝</Typography>
            <Typography variant="h4" fontWeight={800}>Create Account</Typography>
            <Typography color="text.secondary">Join Smart Gadgets Store today</Typography>
          </Stack>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="👤 First Name"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="👤 Last Name"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
            </Grid>

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
              label="📱 Phone Number"
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange("phone")}
              onBlur={handleBlur("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
            />

            <TextField
              fullWidth
              label="🔑 Password"
              placeholder="Create a strong password"
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
            {form.password && (
              <Box sx={{ mt: -1, mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(strength / 4) * 100}
                  color={strengthMeta[strength].color}
                  sx={{ height: 5, borderRadius: 3 }}
                />
                <FormHelperText sx={{ color: `${strengthMeta[strength].color}.main` }}>
                  {strengthMeta[strength].label}
                </FormHelperText>
              </Box>
            )}

            <TextField
              fullWidth
              label="✅ Confirm Password"
              placeholder="Confirm your password"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm((s) => !s)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              sx={{ mt: 2, alignItems: "flex-start" }}
              control={
                <Checkbox
                  checked={form.terms}
                  onChange={handleChange("terms")}
                  sx={{ mt: -0.5 }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the <Link href="#" underline="hover">Terms of Service</Link> and{" "}
                  <Link href="#" underline="hover">Privacy Policy</Link>
                </Typography>
              }
            />
            {errors.terms && <FormHelperText error>{errors.terms}</FormHelperText>}

            <Button type="submit" fullWidth variant="contained" size="large" disabled={submitting} sx={{ py: 1.4, fontSize: "1rem", mt: 3 }}>
              {submitting ? "⏳ Creating Account..." : "Create Account"}
            </Button>

            <Divider sx={{ my: 3 }}>or</Divider>

            <Stack direction="row" spacing={1.5}>
              <Button fullWidth variant="outlined" color="inherit">🔵 Google</Button>
              <Button fullWidth variant="outlined" color="inherit">⚫ GitHub</Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 3 }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" fontWeight={700} underline="hover">
                Sign in
              </Link>
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
