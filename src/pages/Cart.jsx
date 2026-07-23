import React, { useState } from "react";
import { 
  Box, Container, Grid, Typography, Stack, Button, IconButton, 
  Divider, TextField, Card, Paper 
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { formatPrice } from "../data/mockData";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { getCartItems, getCartTotal, updateQuantity, removeFromCart } = useShop();
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const cartItems = getCartItems();
  const subtotal = getCartTotal();
  const discount = discountApplied ? Math.min(2500, subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setDiscountApplied(true);
    } else {
      alert("Invalid coupon code. Try 'SAVE10'.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 100, color: "rgba(0,0,0,0.1)", mb: 3 }} />
          <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Your Cart is Empty</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button component={RouterLink} to="/products" variant="contained" size="large" sx={{ px: 5, py: 1.5, fontSize: "1.1rem" }}>
            Start Shopping
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 4 }}>Shopping Cart</Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 3 }}>
              {cartItems.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ p: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, alignItems: { sm: "center" } }}>
                    <Box 
                      component={RouterLink} 
                      to={`/product/${item._id || item.id}`}
                      sx={{ width: 100, height: 100, bgcolor: "#f1f5f9", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}
                    >
                      <img src={item.image} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography component={RouterLink} to={`/product/${item._id || item.id}`} variant="h6" fontWeight={700} sx={{ textDecoration: "none", color: "text.primary", "&:hover": { color: "primary.main" } }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{item.brand}</Typography>
                      <Typography variant="h6" fontWeight={800}>{formatPrice(item.price)}</Typography>
                    </Box>

                    <Stack direction={{ xs: "row", sm: "column" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} spacing={2} sx={{ minWidth: 120 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 999, px: 1, py: 0.5 }}>
                        <IconButton size="small" onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} disabled={item.quantity <= 1}><RemoveIcon fontSize="small" /></IconButton>
                        <Typography fontWeight={700}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}><AddIcon fontSize="small" /></IconButton>
                      </Stack>
                      <Button onClick={() => removeFromCart(item._id || item.id)} startIcon={<DeleteOutlineIcon />} color="error" size="small" sx={{ fontWeight: 600 }}>Remove</Button>
                    </Stack>
                  </Box>
                  {index < cartItems.length - 1 && <Divider />}
                </Box>
              ))}
            </Card>

            <Button component={RouterLink} to="/products" startIcon={<ArrowBackIcon />} sx={{ fontWeight: 600 }}>
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Order Summary</Typography>
              
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography fontWeight={600}>{formatPrice(subtotal)}</Typography>
                </Stack>
                {discountApplied && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Discount (SAVE10)</Typography>
                    <Typography color="success.main" fontWeight={600}>-{formatPrice(discount)}</Typography>
                  </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography color="success.main" fontWeight={600}>Free</Typography>
                </Stack>
              </Stack>
              
              <Divider sx={{ mb: 3 }} />
              
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={800}>Total</Typography>
                <Typography variant="h5" fontWeight={800} color="primary.main">{formatPrice(total)}</Typography>
              </Stack>

              {!discountApplied && (
                <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                  <TextField 
                    placeholder="Coupon Code" 
                    size="small" 
                    fullWidth 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} 
                  />
                  <Button variant="outlined" onClick={handleApplyCoupon} sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}>Apply</Button>
                </Stack>
              )}

              <Button component={RouterLink} to="/checkout" variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.5, fontSize: "1.1rem" }}>
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
