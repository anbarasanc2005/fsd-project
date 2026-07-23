import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import { Box } from "@mui/material";

/**
 * Premium admin layout – persists sidebar & topbar across all admin pages.
 * Uses the same MUI theme as the user portal for visual consistency.
 * No shopping-related components (Cart, Wishlist, etc.) present here.
 */
export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f1f5f9" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminTopbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
