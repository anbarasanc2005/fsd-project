import React, { useState } from "react";
import { 
  Box, Container, Grid, Typography, Stack, Button, TextField, 
  Paper, Divider, Radio, RadioGroup, FormControlLabel, FormControl
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { formatPrice } from "../data/mockData";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function Checkout() {
  const { getCartItems, getCartTotal, clearCart } = useShop();
  const { currentUser, isLoggedIn } = useAuth();
  
  const cartItems = getCartItems();
  const total = getCartTotal();
  
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : "",
    phone: currentUser?.phone || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India"
  });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert("Please login to place an order");
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id || item.id
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: total,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: total
      };

      const { data } = await API.post("/orders", orderData);
      setOrderId(data._id);
      setSuccess(true);
      clearCart();
    } catch (error) {
      alert("Failed to place order. " + (error.response?.data?.message || ""));
    }
  };

  if (success) {
    return (
      <Box sx={{ py: 15, textAlign: "center", bgcolor: "#f8fafc", minHeight: "80vh" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>Order Confirmed!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500, mx: "auto" }}>
          Thank you for your purchase. Your order #{orderId.substring(0, 8).toUpperCase()} has been placed successfully and will be delivered soon.
        </Typography>
        <Button component={RouterLink} to="/profile" variant="contained" size="large">
          Track Order
        </Button>
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ py: 15, textAlign: "center", minHeight: "60vh" }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Your cart is empty.</Typography>
        <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 2 }}>Shop Now</Button>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} sx={{ mb: 4 }}>Checkout</Typography>
        
        <Grid container spacing={6}>
          {/* Left: Forms */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>1. Shipping Information</Typography>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField label="Full Name" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address Line 1" name="street" value={shippingAddress.street} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="City" name="city" value={shippingAddress.city} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="State" name="state" value={shippingAddress.state} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="PIN Code" name="zip" value={shippingAddress.zip} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Phone Number" name="phone" value={shippingAddress.phone} onChange={handleInputChange} fullWidth required />
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>2. Payment Method</Typography>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <Box sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, p: 2, mb: 2 }}>
                    <FormControlLabel value="card" control={<Radio />} label={<Typography fontWeight={600}>Credit / Debit Card</Typography>} />
                    {paymentMethod === "card" && (
                      <Stack spacing={2} sx={{ mt: 2, pl: 4 }}>
                        <TextField label="Card Number" size="small" fullWidth />
                        <Stack direction="row" spacing={2}>
                          <TextField label="MM/YY" size="small" fullWidth />
                          <TextField label="CVV" size="small" fullWidth />
                        </Stack>
                      </Stack>
                    )}
                  </Box>
                  <Box sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, p: 2, mb: 2 }}>
                    <FormControlLabel value="upi" control={<Radio />} label={<Typography fontWeight={600}>UPI (GPay, PhonePe)</Typography>} />
                  </Box>
                  <Box sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, p: 2 }}>
                    <FormControlLabel value="cod" control={<Radio />} label={<Typography fontWeight={600}>Cash on Delivery</Typography>} />
                  </Box>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          {/* Right: Summary */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Order Summary</Typography>
              
              <Stack spacing={3} sx={{ mb: 4 }}>
                {cartItems.map(item => (
                  <Stack direction="row" spacing={2} key={item.id || item._id} alignItems="center">
                    <Box sx={{ width: 64, height: 64, bgcolor: "#f1f5f9", borderRadius: 2, p: 0.5 }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={700}>{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Qty: {item.quantity}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={700}>{formatPrice(item.price * item.quantity)}</Typography>
                  </Stack>
                ))}
              </Stack>
              
              <Divider sx={{ mb: 3 }} />
              
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight={800}>Total to Pay</Typography>
                <Typography variant="h5" fontWeight={800} color="primary.main">{formatPrice(total)}</Typography>
              </Stack>

              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth 
                sx={{ py: 1.5, fontSize: "1.1rem" }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
              <Button component={RouterLink} to="/cart" startIcon={<ArrowBackIcon />} fullWidth sx={{ mt: 2, fontWeight: 600 }}>
                Back to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
