import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const { cartCount, wishlistCount } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "";

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 2 : 0}
        sx={{
          top: 0,
          zIndex: (t) => t.zIndex.appBar,
          bgcolor: scrolled ? "rgba(255, 255, 255, 0.9)" : "white",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          color: "text.primary",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 80, justifyContent: "space-between" }}>
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <Typography
                component={RouterLink}
                to="/"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textDecoration: "none",
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                ⚡ SMART GADGETS
              </Typography>
            </Stack>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Button
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    disableRipple
                    sx={{
                      borderRadius: 999,
                      px: 2.5,
                      py: 1,
                      color: active ? "primary.main" : "text.secondary",
                      fontWeight: active ? 700 : 600,
                      bgcolor: active ? "rgba(37, 99, 235, 0.08)" : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(37, 99, 235, 0.04)",
                        color: "primary.main",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}
            </Box>

            {/* Action Icons */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                <SearchRoundedIcon />
              </IconButton>
              
              <IconButton component={RouterLink} to="/wishlist" sx={{ color: "text.primary", display: { xs: "none", sm: "inline-flex" }, "&:hover": { color: "error.main" } }}>
                <Badge badgeContent={wishlistCount} color="error">
                  <FavoriteBorderRoundedIcon />
                </Badge>
              </IconButton>
              
              <IconButton component={RouterLink} to="/cart" sx={{ color: "text.primary", "&:hover": { color: "primary.main" } }}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 2, display: { xs: "none", sm: "block" } }} />

              {isLoggedIn ? (
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5, display: { xs: "none", sm: "flex" } }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontWeight: 700, fontSize: "0.9rem" }}>
                    {initials}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  startIcon={<PersonOutlineRoundedIcon />}
                  sx={{ display: { xs: "none", sm: "flex" }, ml: 1, borderRadius: 999 }}
                >
                  Sign In
                </Button>
              )}
            </Stack>

            {/* User Menu */}
            <Menu 
              anchorEl={anchorEl} 
              open={!!anchorEl} 
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1.5, minWidth: 200, borderRadius: 3 }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={700}>{currentUser?.firstName} {currentUser?.lastName}</Typography>
                <Typography variant="caption" color="text.secondary">{currentUser?.email}</Typography>
              </Box>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem component={RouterLink} to="/profile" onClick={() => setAnchorEl(null)}>
                Profile
              </MenuItem>
              <MenuItem component={RouterLink} to="/orders" onClick={() => setAnchorEl(null)}>
                My Orders
              </MenuItem>
              <MenuItem component={RouterLink} to="/wishlist" onClick={() => setAnchorEl(null)}>
                Wishlist
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Sign Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ===== MOBILE DRAWER ===== */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2, display: "flex", flexDirection: "column", height: "100%" }} role="presentation">
          <Box sx={{ px: 3, pb: 2, pt: 1 }}>
            <Typography variant="h6" fontWeight={800} color="primary.main">⚡ SMART GADGETS</Typography>
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1, pt: 2 }}>
            {navLinks.map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={link.to}
                  selected={location.pathname === link.to}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ borderRadius: 2, mx: 1, mb: 0.5 }}
                >
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: location.pathname === link.to ? 700 : 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ p: 2, pb: 4 }}>
            <Divider sx={{ mb: 2 }} />
            {isLoggedIn ? (
              <>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3, px: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>{initials}</Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>{currentUser.firstName}</Typography>
                    <Typography variant="caption" color="text.secondary">{currentUser.email}</Typography>
                  </Box>
                </Stack>
                <Button fullWidth variant="outlined" color="error" onClick={() => { setDrawerOpen(false); handleLogout(); }}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Stack spacing={1}>
                <Button fullWidth variant="contained" component={RouterLink} to="/login" onClick={() => setDrawerOpen(false)}>
                  Sign In
                </Button>
                <Button fullWidth variant="outlined" component={RouterLink} to="/register" onClick={() => setDrawerOpen(false)}>
                  Create Account
                </Button>
              </Stack>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
