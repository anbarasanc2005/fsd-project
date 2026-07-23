import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ py: 15, textAlign: "center" }}>
      <Typography variant="h1" fontWeight={800} color="primary.main">404</Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>Page Not Found</Typography>
      <Button variant="contained" component={RouterLink} to="/">Go Home</Button>
    </Box>
  );
}
