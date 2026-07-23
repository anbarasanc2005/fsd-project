import React, { useState } from "react";
import { Box, Container, Grid, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Contact Us</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: "auto" }}>
          Have a question or need help with your order? We're here to assist you.
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ p: 2, bgcolor: "rgba(37,99,235,0.1)", borderRadius: 3, color: "primary.main" }}><EmailOutlinedIcon fontSize="large" /></Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Email Us</Typography>
                  <Typography variant="body2" color="text.secondary">support@smartgadgets.com</Typography>
                </Box>
              </Paper>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ p: 2, bgcolor: "rgba(37,99,235,0.1)", borderRadius: 3, color: "primary.main" }}><PhoneOutlinedIcon fontSize="large" /></Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Call Us</Typography>
                  <Typography variant="body2" color="text.secondary">+91 1800 123 4567</Typography>
                </Box>
              </Paper>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ p: 2, bgcolor: "rgba(37,99,235,0.1)", borderRadius: 3, color: "primary.main" }}><LocationOnOutlinedIcon fontSize="large" /></Box>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Headquarters</Typography>
                  <Typography variant="body2" color="text.secondary">Tech Park, Bengaluru, India</Typography>
                </Box>
              </Paper>
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
              {submitted ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
                  <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>Message Sent!</Typography>
                  <Typography color="text.secondary">We will get back to you within 24 hours.</Typography>
                </Box>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>Send us a message</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><TextField label="First Name" fullWidth required /></Grid>
                    <Grid item xs={12} sm={6}><TextField label="Last Name" fullWidth required /></Grid>
                    <Grid item xs={12}><TextField label="Email Address" type="email" fullWidth required /></Grid>
                    <Grid item xs={12}><TextField label="Subject" fullWidth required /></Grid>
                    <Grid item xs={12}><TextField label="Message" multiline rows={4} fullWidth required /></Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 2, fontSize: "1.1rem" }}>
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
