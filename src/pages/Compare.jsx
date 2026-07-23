import React from "react";
import { Box, Container, Typography, Paper, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatPrice } from "../data/mockData";
import { useShop } from "../context/ShopContext";

export default function Compare() {
  const { products: allProducts } = useShop();
  // Using 3 mock products to compare
  const products = allProducts.filter(p => p.isFeatured).slice(0, 3);

  // Collect all unique specs across the 3 products
  const allSpecs = new Set();
  products.forEach(p => {
    Object.keys(p.specs || {}).forEach(k => allSpecs.add(k));
  });
  const specKeys = Array.from(allSpecs);

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Compare Products</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          Side-by-side comparison of your selected items.
        </Typography>

        {products.length === 0 ? (
          <Paper elevation={0} sx={{ p: 10, textAlign: "center", borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
            <Typography variant="h5" color="text.secondary">No products selected for comparison.</Typography>
            <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 3 }}>Browse Products</Button>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", overflowX: "auto" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "20%", bgcolor: "#f1f5f9", fontWeight: 800 }}>Product</TableCell>
                  {products.map(p => (
                    <TableCell key={p._id} sx={{ width: "26%", textAlign: "center", p: 4 }}>
                      <Box sx={{ height: 160, display: "flex", justifyContent: "center", mb: 2 }}>
                        <img src={p.image} alt={p.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                      </Box>
                      <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>{p.name}</Typography>
                      <Typography variant="h6" color="primary.main" fontWeight={800} sx={{ mb: 2 }}>{formatPrice(p.price)}</Typography>
                      <Button component={RouterLink} to={`/product/${p._id}`} variant="contained" size="small">View Details</Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Brand row */}
                <TableRow>
                  <TableCell sx={{ bgcolor: "#f8fafc", fontWeight: 700 }}>Brand</TableCell>
                  {products.map(p => (
                    <TableCell key={p._id} sx={{ textAlign: "center" }}>{p.brand}</TableCell>
                  ))}
                </TableRow>
                
                {/* Dynamic specs rows */}
                {specKeys.map(key => (
                  <TableRow key={key}>
                    <TableCell sx={{ bgcolor: "#f8fafc", fontWeight: 700 }}>{key}</TableCell>
                    {products.map(p => (
                      <TableCell key={p._id} sx={{ textAlign: "center" }}>
                        {p.specs?.[key] || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
