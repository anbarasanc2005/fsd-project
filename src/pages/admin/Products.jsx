import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, TextField, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Stack, Checkbox, FormControlLabel, CircularProgress } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import API from "../../services/api";
import { categories, brands, formatPrice } from "../../data/mockData";
import AddIcon from "@mui/icons-material/Add";

export default function Products() {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form fields
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName("");
    setBrand("");
    setCategory("");
    setPrice("");
    setOriginalPrice("");
    setStock("");
    setIsNew(false);
    setDescription("");
    setImageUrl("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || "");
    setStock(product.stock || 10);
    setIsNew(product.isNewProduct || false);
    setDescription(product.description || "");
    setImageUrl(product.image || "");
    setOpenDialog(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      try {
        await API.delete(`/products/${product._id}`);
        setProductList(prev => prev.filter(p => p._id !== product._id));
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !brand || !category || !price || !stock) {
      alert("Please fill all required fields");
      return;
    }

    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const productData = {
      name, brand, category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discount,
      stock: Number(stock),
      isNewProduct: isNew,
      description,
      image: imageUrl || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    };

    try {
      if (editingProduct) {
        // Update
        const { data } = await API.put(`/products/${editingProduct._id}`, { ...productData, description: description || "No description provided." });
        setProductList(prev => prev.map(p => p._id === editingProduct._id ? data : p));
      } else {
        // Add
        const { data } = await API.post(`/products`, { ...productData, description: description || "No description provided." });
        setProductList(prev => [data, ...prev]);
      }
      setOpenDialog(false);
    } catch (error) {
      alert("Failed to save product: " + (error.response?.data?.message || error.message));
      console.error(error);
    }
  };

  const filtered = productList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const columns = [
    { 
      id: "image", 
      label: "Image", 
      render: (row) => (
        <Box sx={{ width: 40, height: 40, bgcolor: "#f1f5f9", borderRadius: 1.5, p: 0.5, overflow: "hidden" }}>
          <img src={row.image} alt={row.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </Box>
      )
    },
    { id: "name", label: "Name" },
    { id: "brand", label: "Brand" },
    { id: "category", label: "Category" },
    { 
      id: "price", 
      label: "Price", 
      render: (row) => formatPrice(row.price) 
    },
    { id: "stock", label: "Stock" }
  ];

  if (loading) return <Box sx={{ p: 5, textAlign: 'center' }}><CircularProgress /></Box>;

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>Manage Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add Product
        </Button>
      </Stack>

      <Card sx={{ mb: 3, borderRadius: 4 }}>
        <CardContent sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            size="small"
            label="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <TextField
            size="small"
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(c => (
              <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      <DataTable 
        columns={columns} 
        rows={filtered} 
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Product Name" fullWidth size="small" required value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField select label="Brand" fullWidth size="small" required value={brand} onChange={(e) => setBrand(e.target.value)}>
                  {brands.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select label="Category" fullWidth size="small" required value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map(c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField label="Selling Price (₹)" type="number" fullWidth size="small" required value={price} onChange={(e) => setPrice(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Original Price (₹)" type="number" fullWidth size="small" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Stock Qty" type="number" fullWidth size="small" required value={stock} onChange={(e) => setStock(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Checkbox checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />} label="New Arrival" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Image URL" fullWidth size="small" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Description" multiline rows={3} fullWidth size="small" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Product</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
