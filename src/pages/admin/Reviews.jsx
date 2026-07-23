import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Button, Rating, Stack } from "@mui/material";
import DataTable from "../../components/admin/DataTable";
import { adminReviews } from "../../data/adminMockData";

export default function Reviews() {
  const [reviews, setReviews] = useState(adminReviews);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "error";
      default: return "default";
    }
  };

  const handleApprove = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "approved" } : r));
  };

  const handleReject = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" } : r));
  };

  const handleToggleFeatured = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
  };

  const columns = [
    { id: "product", label: "Product" },
    { id: "user", label: "User" },
    {
      id: "rating", label: "Rating",
      render: (row) => <Rating value={row.rating} readOnly size="small" sx={{ color: "#fbbf24" }} />
    },
    {
      id: "comment", label: "Comment",
      render: (row) => (
        <Typography variant="body2" sx={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {row.comment}
        </Typography>
      )
    },
    {
      id: "status", label: "Status",
      render: (row) => <Chip label={row.status} color={getStatusColor(row.status)} size="small" sx={{ textTransform: "capitalize" }} />
    },
    {
      id: "featured", label: "Featured",
      render: (row) => row.featured ? <Chip label="Featured" color="primary" size="small" variant="outlined" /> : "—"
    },
    {
      id: "actions", label: "Actions",
      render: (row) => (
        <Stack direction="row" spacing={0.5}>
          {row.status !== "approved" && (
            <Button size="small" color="success" onClick={() => handleApprove(row.id)}>Approve</Button>
          )}
          {row.status !== "rejected" && (
            <Button size="small" color="error" onClick={() => handleReject(row.id)}>Reject</Button>
          )}
          <Button size="small" onClick={() => handleToggleFeatured(row.id)}>
            {row.featured ? "Unfeature" : "Feature"}
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>Manage Reviews</Typography>
      <DataTable columns={columns} rows={reviews} />
    </Box>
  );
}
