import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Coupons() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card elevation={2} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Coupons Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Placeholder for coupon creation, editing, and tracking.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
