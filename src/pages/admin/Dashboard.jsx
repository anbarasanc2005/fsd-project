import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Divider, Avatar, Box, CircularProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import API from "../../services/api";
import { formatCurrency } from "../../data/adminMockData";

const StatCard = ({ title, value, icon, color }) => (
  <Card elevation={3} sx={{ borderRadius: 4, p: 2, display: "flex", alignItems: "center" }}>
    <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
    <Box>
      <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" fontWeight={700}>{value}</Typography>
    </Box>
  </Card>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/dashboard");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;
  if (!stats) return <Box sx={{ p: 5 }}>Failed to load stats. Check database connection.</Box>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Revenue" value={formatCurrency(stats.revenue.total)} icon={<TrendingUpIcon />} color="#10b981" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Orders" value={stats.orders.total} icon={<ShoppingBagIcon />} color="#2563eb" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Users" value={stats.users.total} icon={<PeopleIcon />} color="#8b5cf6" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Products" value={stats.products.total} icon={<BarChartIcon />} color="#f59e0b" />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card elevation={2} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Orders</Typography>
              <Divider sx={{ mb: 2 }} />
              {stats.orders.recent?.length === 0 ? (
                 <Typography variant="body2" color="text.secondary">No recent orders found.</Typography>
              ) : (
                stats.orders.recent?.map((order) => (
                  <Box key={order._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">
                      <strong>{order._id.substring(0, 8)}</strong> — {order.orderItems[0]?.name} {order.user ? `(${order.user.firstName})` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{formatCurrency(order.totalPrice)}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Products</Typography>
              <Divider sx={{ mb: 2 }} />
              {stats.products.top?.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No sales data yet.</Typography>
              ) : (
                stats.products.top?.map((item) => (
                  <Box key={item._id?._id || item._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">{item._id?.name || "Unknown Product"}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.totalSold} sold</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Notifications</Typography>
              <Divider sx={{ mb: 2 }} />
              {stats.notifications?.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No new notifications.</Typography>
              ) : (
                stats.notifications?.map((notif) => (
                  <Box key={notif._id} sx={{ mb: 1 }}>
                    <Typography variant="subtitle2"><strong>{notif.type}</strong></Typography>
                    <Typography variant="body2" color="text.secondary">{notif.message}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Chart Visual */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Revenue</Typography>
              <Divider sx={{ mb: 2 }} />
              {stats.revenue.monthly?.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No revenue data yet.</Typography>
              ) : (
                stats.revenue.monthly?.map((item) => (
                  <Box key={item._id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" sx={{ width: 60 }}>Month {item._id}</Typography>
                    <Box sx={{ flexGrow: 1, mx: 1, bgcolor: "#f1f5f9", borderRadius: 1, height: 20 }}>
                      <Box sx={{ width: `${Math.min((item.revenue / 500000) * 100, 100)}%`, bgcolor: "#2563eb", height: "100%", borderRadius: 1, transition: "width 0.5s" }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ width: 80, textAlign: "right" }}>{formatCurrency(item.revenue)}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
