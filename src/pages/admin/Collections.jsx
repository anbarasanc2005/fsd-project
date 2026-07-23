import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function Collections() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card elevation={2} sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collections Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Placeholder for managing product collections.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
