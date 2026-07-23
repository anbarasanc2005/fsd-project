import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Switch, FormControlLabel, Divider } from "@mui/material";

export default function Settings() {
  const [siteName, setSiteName] = useState("Smart Gadgets Store");
  const [siteEmail, setSiteEmail] = useState("support@smartgadgets.com");
  const [sitePhone, setSitePhone] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("INR");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableReviews, setEnableReviews] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Site Settings</Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>General</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Site Name" fullWidth size="small" value={siteName} onChange={(e) => setSiteName(e.target.value)} /></Grid>
                <Grid item xs={12}><TextField label="Contact Email" fullWidth size="small" value={siteEmail} onChange={(e) => setSiteEmail(e.target.value)} /></Grid>
                <Grid item xs={12}><TextField label="Contact Phone" fullWidth size="small" value={sitePhone} onChange={(e) => setSitePhone(e.target.value)} /></Grid>
                <Grid item xs={12}><TextField label="Currency" fullWidth size="small" value={currency} onChange={(e) => setCurrency(e.target.value)} /></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature Toggles */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Features</Typography>
              <FormControlLabel control={<Switch checked={enableNotifications} onChange={(e) => setEnableNotifications(e.target.checked)} />} label="Enable Email Notifications" />
              <Divider sx={{ my: 1 }} />
              <FormControlLabel control={<Switch checked={enableReviews} onChange={(e) => setEnableReviews(e.target.checked)} />} label="Enable Product Reviews" />
              <Divider sx={{ my: 1 }} />
              <FormControlLabel control={<Switch checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} color="warning" />} label="Maintenance Mode" />
            </CardContent>
          </Card>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Social Links</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Instagram" fullWidth size="small" defaultValue="https://instagram.com/smartgadgets" /></Grid>
                <Grid item xs={12} md={4}><TextField label="Twitter / X" fullWidth size="small" defaultValue="https://x.com/smartgadgets" /></Grid>
                <Grid item xs={12} md={4}><TextField label="YouTube" fullWidth size="small" defaultValue="https://youtube.com/@smartgadgets" /></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Settings"}
        </Button>
        <Button variant="outlined">Reset to Defaults</Button>
      </Box>
    </Box>
  );
}
