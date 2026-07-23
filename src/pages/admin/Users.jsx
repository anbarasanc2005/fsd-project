import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Chip, Avatar, Stack, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import API from "../../services/api";

export default function Users() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit dialog state
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/users");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "warning";
      case "suspended": return "error";
      default: return "default";
    }
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setEditRole(user.role || "user");
    setEditStatus(user.status || "active");
    setOpenEditDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      const { data } = await API.put(`/users/${editingUser._id}`, {
        role: editRole,
        status: editStatus
      });
      setUsers(users.map(u => u._id === data._id ? { ...u, ...data } : u));
      setOpenEditDialog(false);
    } catch (error) {
      alert("Failed to update user: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (user) => {
    if (user.role === "admin") {
      alert("Cannot delete an admin user.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      try {
        await API.delete(`/users/${user._id}`);
        setUsers(users.filter(u => u._id !== user._id));
      } catch (error) {
        alert("Failed to delete user: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const filtered = users.filter(u => {
    const matchesSearch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      id: "avatar", label: "User",
      render: (row) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#2563eb", fontSize: "0.85rem" }}>
            {row.firstName?.[0] || ""}{row.lastName?.[0] || ""}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{row.firstName} {row.lastName}</Typography>
            <Typography variant="caption" color="text.secondary">{row.email}</Typography>
          </Box>
        </Stack>
      )
    },
    { id: "phone", label: "Phone", render: (row) => row.phone || "N/A" },
    { id: "role", label: "Role", render: (row) => <Chip label={row.role} size="small" /> },
    { id: "wishlistCount", label: "Wishlist", render: (row) => row.wishlist?.length || 0 },
    {
      id: "status", label: "Status",
      render: (row) => <Chip label={row.status || "active"} color={getStatusColor(row.status || "active")} size="small" sx={{ textTransform: "capitalize" }} />
    },
    { id: "createdAt", label: "Registered", render: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  if (loading) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Manage Users</Typography>

      <Card sx={{ mb: 3, borderRadius: 4 }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField size="small" label="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} sx={{ flexGrow: 1, minWidth: 200 }} />
          <TextField size="small" select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 150 }}>
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>
        </CardContent>
      </Card>

      <DataTable 
        columns={columns} 
        rows={filtered} 
        onEdit={handleOpenEdit} 
        onDelete={handleDelete} 
      />

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent dividers>
          {editingUser && (
            <Stack spacing={3}>
              <Typography variant="subtitle1" fontWeight={600}>
                User: {editingUser.firstName} {editingUser.lastName} ({editingUser.email})
              </Typography>
              
              <TextField 
                select 
                label="Role" 
                value={editRole} 
                onChange={(e) => setEditRole(e.target.value)}
                fullWidth
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

              <TextField 
                select 
                label="Status" 
                value={editStatus} 
                onChange={(e) => setEditStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
