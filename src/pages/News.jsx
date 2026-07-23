import React from "react";
import { Box, Container, Typography, Paper, Divider, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function News() {
  const newsItems = [
    { date: "Oct 22, 2026", title: "Smart Gadgets Store expands to 50 new cities across India.", tag: "Expansion" },
    { date: "Oct 10, 2026", title: "Announcing our new partnership with Apple for exclusive product launches.", tag: "Partnership" },
    { date: "Sep 28, 2026", title: "Smart Gadgets wins 'Best E-Commerce Platform 2026' at TechAwards.", tag: "Award" },
  ];

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>News & Press</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          Stay updated with the latest announcements from Smart Gadgets.
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
          {newsItems.map((item, index) => (
            <Box key={index}>
              <Box sx={{ py: 3 }}>
                <Typography variant="caption" color="primary" fontWeight={700} sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                  {item.tag} &bull; {item.date}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 1, mb: 2 }}>
                  {item.title}
                </Typography>
                <Button variant="text" color="primary" endIcon={<ArrowForwardIcon />} sx={{ p: 0, fontWeight: 700 }}>
                  Read Press Release
                </Button>
              </Box>
              {index < newsItems.length - 1 && <Divider />}
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  );
}
