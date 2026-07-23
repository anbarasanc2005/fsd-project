import React from "react";
import { Box, Container, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Welcome() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", py: 8, bgcolor: "#f8fafc" }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 4 }}>
          Welcome to Gadget Store
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* User Portal Card */}
          <Grid item xs={12} md={5}>
            <Card elevation={4} sx={{ borderRadius: 3, p: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  User Login
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Explore gadgets, shop products, manage your orders, wishlist, and profile.
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button component={RouterLink} to="/login" variant="contained" color="primary">
                    Login
                  </Button>
                  <Button component={RouterLink} to="/register" variant="outlined" color="primary">
                    Sign Up
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {/* Admin Portal Card */}
          <Grid item xs={12} md={5}>
            <Card elevation={4} sx={{ borderRadius: 3, p: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Authorized administrators only.
                </Typography>
                <Button component={RouterLink} to="/admin/login" variant="contained" color="secondary">
                  Admin Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
