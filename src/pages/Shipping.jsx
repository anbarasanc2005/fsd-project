import React from "react";
import { Box, Container, Typography, Paper, Grid, Avatar } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PublicIcon from "@mui/icons-material/Public";

export default function Shipping() {
  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Shipping Policy</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: "auto" }}>
          Everything you need to know about our delivery times, methods, and costs.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                <LocalShippingIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>Free Delivery</Typography>
              <Typography variant="body2" color="text.secondary">Enjoy free standard shipping on all orders over ₹999.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                <AccessTimeIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>Fast Dispatch</Typography>
              <Typography variant="body2" color="text.secondary">Orders placed before 2 PM are dispatched the same day.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: "center", border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                <PublicIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>Nationwide Coverage</Typography>
              <Typography variant="body2" color="text.secondary">We deliver to over 20,000 PIN codes across India.</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Delivery Timeframes</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Standard Shipping:</strong> 3-5 business days.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Express Delivery:</strong> 1-2 business days (Available in select metro cities).
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Once your order has been dispatched, you will receive a tracking link via email and SMS. 
            Delivery times are indicative and can occasionally vary due to unforeseen circumstances like weather or logistical delays.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
