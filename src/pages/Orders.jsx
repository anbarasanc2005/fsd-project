import React, { useState, useEffect } from "react";
import { 
  Box, Container, Grid, Typography, Stack, Paper, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Chip, Divider, Button, CircularProgress
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { formatPrice } from "../data/mockData";
import API from "../services/api";

export default function Orders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch my orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  const menu = [
    { label: "My Profile", to: "/profile", icon: <PersonOutlineIcon /> },
    { label: "My Orders", to: "/orders", icon: <LocalShippingOutlinedIcon /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FavoriteBorderIcon /> },
    { label: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "success";
      case "shipped": return "info";
      case "packed": return "warning";
      case "confirmed": return "primary";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>My Account</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.05)", borderRadius: 4, overflow: "hidden" }}>
              <List disablePadding>
                {menu.map((item) => (
                  <ListItem disablePadding key={item.to}>
                    <ListItemButton 
                      component={RouterLink} 
                      to={item.to}
                      selected={location.pathname === item.to}
                      sx={{ py: 2, "&.Mui-selected": { borderLeft: "4px solid #2563eb", bgcolor: "rgba(37,99,235,0.05)" } }}
                    >
                      <ListItemIcon sx={{ color: location.pathname === item.to ? "primary.main" : "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: location.pathname === item.to ? 700 : 500 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>Order History</Typography>
            
            {loading ? (
              <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>
            ) : orders.length === 0 ? (
              <Paper elevation={0} sx={{ p: 5, textAlign: "center", borderRadius: 4 }}>
                <Typography variant="body1" color="text.secondary">You have no orders yet.</Typography>
                <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 2 }}>Start Shopping</Button>
              </Paper>
            ) : (
              orders.map(order => (
                <Paper key={order._id} elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", mb: 4 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Order #{order._id.substring(0, 10).toUpperCase()}</Typography>
                      <Typography variant="body2" fontWeight={600}>Placed on {new Date(order.createdAt).toLocaleDateString()}</Typography>
                    </Box>
                    <Chip label={order.status || "Pending"} color={getStatusColor(order.status)} size="small" />
                  </Stack>
                  <Divider sx={{ mb: 3 }} />
                  
                  {order.orderItems.map((item, index) => (
                    <Stack key={index} direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center" sx={{ mb: 2 }}>
                      <Box sx={{ width: 100, height: 100, bgcolor: "#f1f5f9", borderRadius: 2, p: 1 }}>
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={800}>{formatPrice(item.price)}</Typography>
                      <Button variant="outlined" size="small">Invoice</Button>
                    </Stack>
                  ))}
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h5" color="primary.main" fontWeight={800}>{formatPrice(order.totalPrice)}</Typography>
                  </Stack>
                </Paper>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
