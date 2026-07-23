import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, TextField, Button, Avatar, Divider } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState(currentUser?.firstName || "Admin");
  const [lastName, setLastName] = useState(currentUser?.lastName || "Manager");
  const [email] = useState(currentUser?.email || "admin@smartgadgets.com");
  const [phone, setPhone] = useState(currentUser?.phone || "9000000001");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Admin Profile</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, textAlign: "center" }}>
            <CardContent sx={{ py: 5 }}>
              <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2, bgcolor: "#2563eb", fontSize: "2.5rem" }}>
                {firstName[0]}{lastName[0]}
              </Avatar>
              <Typography variant="h5" fontWeight={700}>{firstName} {lastName}</Typography>
              <Typography color="text.secondary">{email}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Role: Administrator
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><TextField label="First Name" fullWidth size="small" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></Grid>
                <Grid item xs={6}><TextField label="Last Name" fullWidth size="small" value={lastName} onChange={(e) => setLastName(e.target.value)} /></Grid>
                <Grid item xs={6}><TextField label="Email" fullWidth size="small" value={email} disabled /></Grid>
                <Grid item xs={6}><TextField label="Phone" fullWidth size="small" value={phone} onChange={(e) => setPhone(e.target.value)} /></Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Change Password</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Current Password" fullWidth size="small" type="password" /></Grid>
                <Grid item xs={6}><TextField label="New Password" fullWidth size="small" type="password" /></Grid>
                <Grid item xs={6}><TextField label="Confirm Password" fullWidth size="small" type="password" /></Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={handleSave}>
                  {saved ? "✓ Saved!" : "Save Changes"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
