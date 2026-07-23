import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ArticleIcon from "@mui/icons-material/Article";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssessmentIcon from "@mui/icons-material/Assessment";
import WebIcon from "@mui/icons-material/Web";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";

const DRAWER_WIDTH = 260;

const navItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon />, end: true },
  { label: "Analytics", path: "/admin/analytics", icon: <AnalyticsIcon /> },
  { label: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
  { label: "Products", path: "/admin/products", icon: <StoreIcon /> },
  { label: "Categories", path: "/admin/categories", icon: <CategoryIcon /> },
  { label: "Users", path: "/admin/users", icon: <PeopleIcon /> },
  { label: "Reviews", path: "/admin/reviews", icon: <RateReviewIcon /> },
  { label: "Blogs", path: "/admin/blogs", icon: <ArticleIcon /> },
];

const bottomItems = [
  { label: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
  { label: "Profile", path: "/admin/profile", icon: <PersonIcon /> },
  { label: "Notifications", path: "/admin/notifications", icon: <NotificationsIcon /> },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const toggle = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "A";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : 72,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          color: "#cbd5e1",
          borderRight: "none",
          overflowX: "hidden",
          transition: "width 0.25s ease",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: open ? 2.5 : 1,
          py: 2,
          minHeight: 64,
        }}
      >
        {open && (
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            ⚡ Admin Panel
          </Typography>
        )}
        <IconButton onClick={toggle} sx={{ color: "#94a3b8" }}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 1 }} />

      {/* Main Navigation */}
      <List sx={{ flexGrow: 1, pt: 1, px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.end || false}
            sx={{
              borderRadius: 2,
              mb: 0.3,
              py: 1,
              px: open ? 2 : 1.5,
              justifyContent: open ? "initial" : "center",
              color: "inherit",
              "&.active": {
                bgcolor: "rgba(37,99,235,0.2)",
                color: "#60a5fa",
                "& .MuiListItemIcon-root": { color: "#60a5fa" },
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <Tooltip title={open ? "" : item.label} placement="right" arrow>
              <ListItemIcon sx={{ color: "inherit", minWidth: open ? 36 : "auto", justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {open && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }} />}
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mx: 1 }} />

      {/* Bottom Section */}
      <List sx={{ px: 1, pb: 1 }}>
        {bottomItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 0.3,
              py: 1,
              px: open ? 2 : 1.5,
              justifyContent: open ? "initial" : "center",
              color: "inherit",
              "&.active": {
                bgcolor: "rgba(37,99,235,0.2)",
                color: "#60a5fa",
                "& .MuiListItemIcon-root": { color: "#60a5fa" },
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <Tooltip title={open ? "" : item.label} placement="right" arrow>
              <ListItemIcon sx={{ color: "inherit", minWidth: open ? 36 : "auto", justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {open && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 500 }} />}
          </ListItemButton>
        ))}

        {/* Logout Button — calls logout() function, not a NavLink */}
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            mb: 0.3,
            py: 1,
            px: open ? 2 : 1.5,
            justifyContent: open ? "initial" : "center",
            color: "#f87171",
            "&:hover": {
              bgcolor: "rgba(239,68,68,0.1)",
            },
          }}
        >
          <Tooltip title={open ? "" : "Logout"} placement="right" arrow>
            <ListItemIcon sx={{ color: "inherit", minWidth: open ? 36 : "auto", justifyContent: "center" }}>
              <LogoutIcon />
            </ListItemIcon>
          </Tooltip>
          {open && <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: 600 }} />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
