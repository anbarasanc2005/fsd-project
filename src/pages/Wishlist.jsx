import React from "react";
import { 
  Box, Container, Grid, Typography, Paper, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Button
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const location = useLocation();
  const { getWishlistItems } = useShop();
  
  const wishlistItems = getWishlistItems();

  const menu = [
    { label: "My Profile", to: "/profile", icon: <PersonOutlineIcon /> },
    { label: "My Orders", to: "/orders", icon: <LocalShippingOutlinedIcon /> },
    { label: "My Wishlist", to: "/wishlist", icon: <FavoriteBorderIcon /> },
    { label: "Settings", to: "/settings", icon: <SettingsOutlinedIcon /> }
  ];

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
            <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>My Wishlist</Typography>
            
            {wishlistItems.length === 0 ? (
              <Paper elevation={0} sx={{ p: 10, textAlign: "center", borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
                <FavoriteBorderRoundedIcon sx={{ fontSize: 80, color: "rgba(0,0,0,0.1)", mb: 2 }} />
                <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>Your wishlist is empty.</Typography>
                <Button component={RouterLink} to="/products" variant="contained">Browse Products</Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {wishlistItems.map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
