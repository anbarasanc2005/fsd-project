import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, MenuItem, Stack } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import { adminBlogs } from "../../data/adminMockData";
import AddIcon from "@mui/icons-material/Add";

export default function Blogs() {
  const [blogs, setBlogs] = useState(adminBlogs);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setTitle(""); setCategory(""); setStatus("draft"); setContent("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title); setCategory(blog.category); setStatus(blog.status); setContent("");
    setOpenDialog(true);
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Delete blog post "${blog.title}"?`)) {
      setBlogs(prev => prev.filter(b => b.id !== blog.id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title || !category) { alert("Please fill required fields"); return; }
    if (editingBlog) {
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...b, title, category, status } : b));
    } else {
      setBlogs(prev => [...prev, {
        id: `b${Date.now()}`,
        title, category, status,
        author: "Admin Manager",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        tags: [],
        views: 0
      }]);
    }
    setOpenDialog(false);
  };

  const filtered = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    { id: "title", label: "Title" },
    { id: "category", label: "Category" },
    { id: "author", label: "Author" },
    {
      id: "status", label: "Status",
      render: (row) => <Chip label={row.status} color={row.status === "published" ? "success" : "warning"} size="small" sx={{ textTransform: "capitalize" }} />
    },
    { id: "views", label: "Views" },
    { id: "date", label: "Date" }
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>Manage Blogs</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>New Post</Button>
      </Stack>

      <Card sx={{ mb: 3, borderRadius: 4 }}>
        <CardContent>
          <TextField size="small" label="Search blog posts..." fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} onEdit={handleOpenEdit} onDelete={handleDelete} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSave}>
          <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="Title" fullWidth size="small" required value={title} onChange={(e) => setTitle(e.target.value)} /></Grid>
              <Grid item xs={6}>
                <TextField select label="Category" fullWidth size="small" required value={category} onChange={(e) => setCategory(e.target.value)}>
                  {["Technology", "Audio", "Tablets", "Gaming", "Wearables", "Smartphones"].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField select label="Status" fullWidth size="small" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Content" multiline rows={6} fullWidth size="small" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your blog post content here..." />
              </Grid>
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
