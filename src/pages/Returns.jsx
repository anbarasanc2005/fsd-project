import React from "react";
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Returns() {
  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 4 }}>Returns & Exchanges</Typography>
        
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>15-Day Easy Returns</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            We want you to be completely satisfied with your purchase. If you're not, you can return or exchange eligible items within 15 days of delivery.
          </Typography>

          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Eligibility Criteria</Typography>
          <List sx={{ mb: 4 }}>
            {[
              "Item must be in original condition with all tags and packaging intact.",
              "Smartphones and laptops must not have been activated or logged into.",
              "Accessories and wearables must be unused and free of scratches.",
              "Original invoice must be provided at the time of pickup."
            ].map((text, i) => (
              <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}><KeyboardArrowRightIcon /></ListItemIcon>
                <ListItemText primary={text} primaryTypographyProps={{ color: "text.secondary" }} />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Non-Returnable Items</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Software, digital downloads, opened ear-in headphones (due to hygiene reasons), and gift cards are strictly non-returnable.
          </Typography>

          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Refund Process</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Once we receive and inspect your returned item, a refund will be initiated to your original payment method. Please allow 5-7 business days for the amount to reflect in your account.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
