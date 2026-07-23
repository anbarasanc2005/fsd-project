import React, { useState } from "react";
import { 
  Box, Container, Grid, Typography, Paper, Avatar, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button, Alert
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function Profile() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    phone: currentUser?.phone || "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      setMsg("");
      setError("");
      const { data } = await API.put("/users/profile", formData);
      setMsg("Profile updated successfully!");
      // We don't automatically update AuthContext currentUser here unless we use a context setter.
      // But page refresh will pick it up since the token remains valid.
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const menu = [
    { label: "My Profile", to: "/profile", icon: <PersonOutlineIcon /> },
    { label: "My Orders", to: "/orders", icon: <LocalShippingOutlinedIcon /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FavoriteBorderIcon /> },
    { label: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> }
  ];

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "US";

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>My Account</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.05)", borderRadius: 4, overflow: "hidden" }}>
              <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, bgcolor: "primary.main", color: "white" }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: "white", color: "primary.main", fontWeight: 800 }}>
                  {initials}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>{currentUser?.firstName} {currentUser?.lastName}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{currentUser?.email}</Typography>
                </Box>
              </Box>
              <List disablePadding>
                {menu.map((item) => (
                  <ListItem disablePadding key={item.to}>
                    <ListItemButton 
                      component={RouterLink} 
                      to={item.to}
                      selected={location.pathname === item.to}
                      sx={{ py: 2, "&.Mui-selected": { borderLeft: "4px solid #2563eb", bgcolor: "rgba(37,99,235,0.05)" } }}
                    >
                      <ListItemIcon sx={{ color: location.pathname === item.to ? "primary.main" : "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: location.pathname === item.to ? 700 : 500 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Personal Information</Typography>
              
              {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email Address" fullWidth value={currentUser?.email} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone Number" name="phone" fullWidth value={formData.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="New Password (leave blank to keep current)" name="password" type="password" fullWidth value={formData.password} onChange={handleChange} />
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" size="large" sx={{ px: 4 }} onClick={handleUpdate}>Save Changes</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
