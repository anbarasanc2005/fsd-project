import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Box, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const initials = currentUser
    ? `${currentUser.firstName?.[0] || ""}${currentUser.lastName?.[0] || ""}`.toUpperCase()
    : "A";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1e293b", color: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ color: "inherit" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
        </Box>
        {/* Right: Notifications, Profile & Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Tooltip title="Notifications">
            <IconButton sx={{ color: "inherit" }} aria-label="notifications">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <Avatar alt="Admin" sx={{ width: 34, height: 34, bgcolor: "#2563eb", fontWeight: 700, fontSize: "0.85rem" }}>
              {initials}
            </Avatar>
            {currentUser && (
              <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" }, fontWeight: 500 }}>
                {currentUser.firstName}
              </Typography>
            )}
          </Box>

          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} sx={{ color: "#f87171", ml: 0.5 }} aria-label="logout">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
