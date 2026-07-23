import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";

const categories = [
  { icon: "📱", title: "Smartphones", text: "Latest models from Apple, Samsung, OnePlus" },
  { icon: "💻", title: "Laptops", text: "HP, Dell, Lenovo, Apple MacBooks" },
  { icon: "⌚", title: "Smart Watches", text: "Fitness tracking, Bluetooth calling" },
  { icon: "🎧", title: "Headphones & Earbuds", text: "Wireless, noise cancellation, deep bass" },
  { icon: "🔌", title: "Accessories", text: "Chargers, power banks, cases, keyboards" },
  { icon: "🏷️", title: "Offers", text: "Special discounts, combo deals, cashback" },
];

const featuredRows = [
  { no: 1, name: "iPhone 16 Pro", brand: "Apple", price: "₹1,29,999", warranty: "1 Year" },
  { no: 2, name: "Samsung Galaxy S25", brand: "Samsung", price: "₹89,999", warranty: "1 Year" },
  { no: 3, name: "OnePlus 13", brand: "OnePlus", price: "₹69,999", warranty: "1 Year" },
  { no: 4, name: "HP Pavilion Laptop", brand: "HP", price: "₹62,999", warranty: "2 Years" },
  { no: 5, name: "Dell Inspiron", brand: "Dell", price: "₹58,999", warranty: "2 Years" },
  { no: 6, name: "Lenovo IdeaPad", brand: "Lenovo", price: "₹55,999", warranty: "2 Years" },
  { no: 7, name: "Noise Smart Watch", brand: "Noise", price: "₹4,999", warranty: "1 Year" },
  { no: 8, name: "boAt Airdopes", brand: "boAt", price: "₹2,499", warranty: "1 Year" },
];

export default function Product() {
  return (
    <Box component="main">
      {/* ===== HERO ===== */}
      <Box className="gradient-hero" sx={{ color: "white", py: { xs: 8, md: 10 }, px: 2, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, fontWeight: 800 }}>
            Our Product Collection
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.9, fontWeight: 400 }}>
            Premium gadgets from top brands – all genuine, with warranty.
          </Typography>
        </Container>
      </Box>

      {/* ===== CATEGORIES ===== */}
      <Container maxWidth="lg" sx={{ py: 9 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>All Categories</Typography>
        <Grid container spacing={3}>
          {categories.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.title}>
              <Card elevation={2} className="hover-card" sx={{ height: "100%", border: "1px solid #f1f5f9" }}>
                <CardActionArea sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Typography sx={{ fontSize: "3.5rem", mb: 1.5 }}>{c.icon}</Typography>
                  <Typography variant="h6" fontWeight={700}>{c.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{c.text}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ===== FEATURED PRODUCTS TABLE ===== */}
        <Typography variant="h4" textAlign="center" sx={{ mt: 10, mb: 5 }}>Featured Products</Typography>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { bgcolor: "primary.main", color: "white", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" } }}>
                <TableCell>S.No</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Warranty</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {featuredRows.map((row) => (
                <TableRow key={row.no} hover>
                  <TableCell>{row.no}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.warranty}</TableCell>
                  <TableCell>
                    <Chip label="Available" size="small" color="success" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
