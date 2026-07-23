import React from "react";
import { Box, Container, Grid, Typography, Stack, IconButton, Divider, TextField, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/products" },
      { label: "Smartphones", to: "/products?category=smartphones" },
      { label: "Laptops", to: "/products?category=laptops" },
      { label: "Audio", to: "/products?category=audio" },
      { label: "Wearables", to: "/products?category=wearables" },
      { label: "Accessories", to: "/products?category=accessories" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faq" },
      { label: "Track Order", to: "/track-order" },
      { label: "Returns & Exchanges", to: "/returns" },
      { label: "Shipping Policy", to: "/shipping" },
      { label: "Warranty Info", to: "/warranty" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
      { label: "News & Press", to: "/news" },
      { label: "Sustainability", to: "/sustainability" },
    ],
  },
];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#0f172a", color: "white", pt: 10, pb: 4, mt: "auto" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 2, letterSpacing: "-0.02em" }}>
              ⚡ SMART GADGETS
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8", mb: 4, lineHeight: 1.6 }}>
              Your ultimate destination for the latest, premium, and most innovative gadgets. Experience technology like never before.
            </Typography>
            
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
              Subscribe to our newsletter
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                variant="outlined"
                placeholder="Email address"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  input: { color: "white" },
                  "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2) !important" },
                  "&.Mui-focused fieldset": { borderColor: "primary.light" },
                }}
              />
              <Button variant="contained" color="primary" sx={{ px: 3, borderRadius: 2 }}>
                Subscribe
              </Button>
            </Stack>
          </Grid>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <Grid item xs={6} sm={4} md={2} key={column.title}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                {column.title}
              </Typography>
              <Stack spacing={1.5}>
                {column.links.map((link) => (
                  <Typography
                    key={link.label}
                    component={RouterLink}
                    to={link.to}
                    variant="body2"
                    sx={{
                      color: "#94a3b8",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      "&:hover": { color: "white" },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 6 }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            &copy; {new Date().getFullYear()} Smart Gadgets Store. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <IconButton sx={{ color: "#94a3b8", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.1)" } }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "#94a3b8", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.1)" } }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "#94a3b8", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.1)" } }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: "#94a3b8", "&:hover": { color: "white", bgcolor: "rgba(255,255,255,0.1)" } }}>
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
