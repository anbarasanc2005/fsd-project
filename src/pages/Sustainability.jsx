import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

export default function Sustainability() {
  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Our Commitment to the Planet</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 700, mx: "auto" }}>
          At Smart Gadgets, we believe technology should move the world forward, not hold it back. 
          Discover our initiatives for a greener future.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", textAlign: "center", height: "100%" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "rgba(34,197,94,0.1)", color: "#22c55e", mx: "auto", mb: 3 }}>
                              <NatureOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Carbon Neutral by 2030</Typography>
              <Typography color="text.secondary">
                We are actively reducing our carbon footprint across all supply chains and aiming to be 100% carbon neutral by the year 2030.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", textAlign: "center", height: "100%" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "rgba(34,197,94,0.1)", color: "#22c55e", mx: "auto", mb: 3 }}>
                              <LoopOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>E-Waste Recycling</Typography>
              <Typography color="text.secondary">
                Bring in your old gadgets to any of our partner stores and we will responsibly recycle them. Plus, get credit towards your next purchase.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", textAlign: "center", height: "100%" }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "rgba(34,197,94,0.1)", color: "#22c55e", mx: "auto", mb: 3 }}>
                              <WbSunnyOutlinedIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Renewable Energy</Typography>
              <Typography color="text.secondary">
                Our entire corporate headquarters and 80% of our warehouses are now powered entirely by solar and wind energy.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
