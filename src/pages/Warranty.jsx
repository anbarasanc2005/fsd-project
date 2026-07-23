import React from "react";
import { Box, Container, Typography, Paper, Divider, Stack } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export default function Warranty() {
  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="md">
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
          <VerifiedUserOutlinedIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h3" fontWeight={800}>Warranty Information</Typography>
        </Stack>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          We stand by the quality of our products. Learn about our warranty policies below.
        </Typography>

        <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>Standard Brand Warranty</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            All electronic devices sold on Smart Gadgets Store come with a minimum of 1-year standard manufacturer warranty starting from the date of purchase.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>What's Covered?</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            - Manufacturing defects in materials and workmanship.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            - Internal hardware failures under normal use.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>What's NOT Covered?</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            - Physical damage caused by drops, spills, or accidents.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            - Liquid damage (unless the device is explicitly rated and used within specified conditions).
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            - Normal wear and tear, including battery degradation.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>How to Claim</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            To initiate a warranty claim, please contact the respective brand's authorized service center directly with your original purchase invoice. If you need assistance locating a service center, contact our support team.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
