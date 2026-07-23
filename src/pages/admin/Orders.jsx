import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Divider, Stack, CircularProgress } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import API from "../../services/api";
import { formatCurrency } from "../../data/adminMockData";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleFullUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/orders/${selectedOrder._id}/admin`, {
        status: selectedOrder.status,
        isPaid: selectedOrder.isPaid,
        shippingAddress: selectedOrder.shippingAddress
      });
      setOrders(prev => prev.map(o => o._id === data._id ? { ...o, ...data } : o));
      setSelectedOrder(null);
      alert("Order updated successfully!");
    } catch (error) {
      alert("Failed to update order details: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (order) => {
    if (window.confirm(`Are you sure you want to delete order ${order._id}? This action cannot be undone.`)) {
      try {
        await API.delete(`/orders/${order._id}`);
        setOrders(prev => prev.filter(o => o._id !== order._id));
        if (selectedOrder && selectedOrder._id === order._id) {
          setSelectedOrder(null);
        }
      } catch (error) {
        alert("Failed to delete order: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "success";
      case "shipped": return "info";
      case "packed": return "warning";
      case "confirmed": return "primary";
      case "pending": return "default";
      case "cancelled": return "error";
      case "returned": return "error";
      case "refunded": return "secondary";
      default: return "default";
    }
  };

  const filteredOrders = orders.filter(o => {
    const custName = o.user ? `${o.user.firstName} ${o.user.lastName}`.toLowerCase() : "";
    const prodName = o.orderItems?.[0]?.name?.toLowerCase() || "";
    const matchesSearch = custName.includes(search.toLowerCase()) || o._id.toLowerCase().includes(search.toLowerCase()) || prodName.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { id: "_id", label: "Order ID", render: (row) => row._id.substring(0, 10) },
    { id: "customer", label: "Customer", render: (row) => row.user ? `${row.user.firstName} ${row.user.lastName}` : "Guest" },
    { id: "product", label: "Product", render: (row) => row.orderItems?.[0]?.name || "N/A" },
    { 
      id: "amount", 
      label: "Amount", 
      render: (row) => formatCurrency(row.totalPrice) 
    },
    { 
      id: "status", 
      label: "Status", 
      render: (row) => (
        <Chip label={row.status || "Pending"} color={getStatusColor(row.status)} size="small" sx={{ textTransform: "capitalize" }} />
      ) 
    },
    { id: "createdAt", label: "Date", render: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  if (loading) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>Manage Orders</Typography>
      
      <Card sx={{ mb: 3, borderRadius: 4 }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            size="small"
            label="Search orders..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <TextField
            size="small"
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="packed">Packed</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      <DataTable 
        columns={columns} 
        rows={filteredOrders} 
        onEdit={(row) => setSelectedOrder({...row})}
        onDelete={handleDelete}
      />

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>Edit Order Details - {selectedOrder._id}</DialogTitle>
            <DialogContent dividers>
              <form id="edit-order-form" onSubmit={handleFullUpdate}>
                <Stack spacing={3}>
                  <Box display="flex" gap={4} flexWrap="wrap">
                    <Box flex={1} minWidth={250}>
                      <Typography variant="h6" gutterBottom>Customer</Typography>
                      <Typography variant="body1" fontWeight={600}>{selectedOrder.user ? `${selectedOrder.user.firstName} ${selectedOrder.user.lastName}` : "Guest"}</Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>{selectedOrder.shippingAddress?.phone}</Typography>
                      
                      <Typography variant="h6" gutterBottom>Status</Typography>
                      <TextField 
                        select 
                        label="Payment Status" 
                        value={selectedOrder.isPaid ? "Paid" : "Unpaid"}
                        onChange={(e) => setSelectedOrder({...selectedOrder, isPaid: e.target.value === "Paid"})}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                      >
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </TextField>
                      <TextField 
                        select 
                        label="Order Status" 
                        value={selectedOrder.status}
                        onChange={(e) => setSelectedOrder({...selectedOrder, status: e.target.value})}
                        fullWidth
                        size="small"
                      >
                        {["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"].map(st => (
                          <MenuItem key={st} value={st}>{st}</MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <Box flex={1} minWidth={250}>
                      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
                      <Stack spacing={2}>
                        <TextField 
                          label="Full Name" 
                          size="small" 
                          value={selectedOrder.shippingAddress?.fullName || ""}
                          onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, fullName: e.target.value}})}
                        />
                        <TextField 
                          label="Street" 
                          size="small" 
                          value={selectedOrder.shippingAddress?.street || ""}
                          onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, street: e.target.value}})}
                        />
                        <Box display="flex" gap={2}>
                          <TextField 
                            label="City" 
                            size="small" 
                            fullWidth
                            value={selectedOrder.shippingAddress?.city || ""}
                            onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, city: e.target.value}})}
                          />
                          <TextField 
                            label="State" 
                            size="small" 
                            fullWidth
                            value={selectedOrder.shippingAddress?.state || ""}
                            onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, state: e.target.value}})}
                          />
                        </Box>
                        <Box display="flex" gap={2}>
                          <TextField 
                            label="ZIP" 
                            size="small" 
                            fullWidth
                            value={selectedOrder.shippingAddress?.zip || ""}
                            onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, zip: e.target.value}})}
                          />
                          <TextField 
                            label="Country" 
                            size="small" 
                            fullWidth
                            value={selectedOrder.shippingAddress?.country || ""}
                            onChange={(e) => setSelectedOrder({...selectedOrder, shippingAddress: {...selectedOrder.shippingAddress, country: e.target.value}})}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  
                  <Divider />
                  <Typography variant="h6">Order Items</Typography>
                  {selectedOrder.orderItems?.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={800}>{formatCurrency(item.price)}</Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                     <Typography variant="h6">Total Price</Typography>
                     <Typography variant="h6" fontWeight={800}>{formatCurrency(selectedOrder.totalPrice)}</Typography>
                  </Box>
                </Stack>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)}>Cancel</Button>
              <Button type="submit" form="edit-order-form" variant="contained" color="primary">Save Changes</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
