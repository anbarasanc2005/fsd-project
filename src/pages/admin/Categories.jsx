import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import { categories as initialCategories } from "../../data/mockData";
import { useShop } from "../../context/ShopContext";
import AddIcon from "@mui/icons-material/Add";

export default function Categories() {
  const [cats, setCats] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const { products } = useShop();

  const getProductCount = (categoryName) => {
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  const handleOpenAdd = () => {
    setEditingCat(null);
    setName(""); setSlug(""); setIcon(""); setDescription("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setName(cat.name); setSlug(cat.slug); setIcon(cat.icon); setDescription(cat.description || "");
    setOpenDialog(true);
  };

  const handleDelete = (cat) => {
    if (window.confirm(`Delete category "${cat.name}"?`)) {
      setCats(prev => prev.filter(c => c.id !== cat.id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !slug || !icon) { alert("Please fill all required fields"); return; }
    if (editingCat) {
      setCats(prev => prev.map(c => c.id === editingCat.id ? { ...c, name, slug, icon, description } : c));
    } else {
      setCats(prev => [...prev, { id: `c${Date.now()}`, name, slug, icon, description }]);
    }
    setOpenDialog(false);
  };

  const filtered = cats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { id: "icon", label: "Icon", render: (row) => <Typography sx={{ fontSize: "1.5rem" }}>{row.icon}</Typography> },
    { id: "name", label: "Name" },
    { id: "slug", label: "Slug" },
    { id: "description", label: "Description" },
    { id: "productCount", label: "Products", render: (row) => getProductCount(row.name) }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>Manage Categories</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>Add Category</Button>
      </Stack>

      <Card sx={{ mb: 3, borderRadius: 4 }}>
        <CardContent>
          <TextField size="small" label="Search categories..." fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} onEdit={handleOpenEdit} onDelete={handleDelete} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>{editingCat ? "Edit Category" : "Add Category"}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="Category Name" fullWidth size="small" required value={name} onChange={(e) => setName(e.target.value)} /></Grid>
              <Grid item xs={12}><TextField label="Slug" fullWidth size="small" required value={slug} onChange={(e) => setSlug(e.target.value)} /></Grid>
              <Grid item xs={12}><TextField label="Icon (Emoji)" fullWidth size="small" required value={icon} onChange={(e) => setIcon(e.target.value)} /></Grid>
              <Grid item xs={12}><TextField label="Description" multiline rows={2} fullWidth size="small" value={description} onChange={(e) => setDescription(e.target.value)} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
