import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Stack, Step, StepLabel, Stepper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(false);

  const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId) setTracking(true);
  };

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Track Your Order</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Enter your Order ID to track the real-time status of your shipment.
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 6 }}>
          <form onSubmit={handleTrack}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField 
                fullWidth 
                placeholder="e.g. ORD-123456" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />} sx={{ px: 4, minWidth: 150 }}>
                Track
              </Button>
            </Stack>
          </form>
        </Paper>

        {tracking && (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>Order #{orderId}</Typography>
            <Stepper activeStep={2} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Box sx={{ mt: 6, p: 3, bgcolor: "rgba(37,99,235,0.05)", borderRadius: 3 }}>
              <Typography variant="subtitle1" fontWeight={700} color="primary.main">Current Status: Shipped</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Your order has been picked up by our logistics partner and is on its way to your destination. Expected delivery in 2-3 days.
              </Typography>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
