import React, { useState } from "react";
import { Box, Container, Grid, Typography, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Divider, Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Settings() {
  const location = useLocation();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const menu = [
    { label: "My Profile", to: "/profile", icon: <PersonOutlineIcon /> },
    { label: "My Orders", to: "/orders", icon: <LocalShippingOutlinedIcon /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FavoriteBorderIcon /> },
    { label: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> }
  ];

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>My Account</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.05)", borderRadius: 4, overflow: "hidden" }}>
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
            <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Preferences & Settings</Typography>
            
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Notifications</Typography>
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Email Notifications" secondary="Receive order updates and promotions via email." />
                  <Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} color="primary" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="SMS Notifications" secondary="Get delivery updates instantly via SMS." />
                  <Switch checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} color="primary" />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 4 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Appearance</Typography>
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Dark Mode" secondary="Switch the interface to a darker theme." />
                  <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} color="primary" />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "error.main" }}>Danger Zone</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button variant="outlined" color="error">Delete Account</Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
