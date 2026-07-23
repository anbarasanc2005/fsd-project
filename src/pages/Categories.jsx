import React from "react";
import { Box, Container, Grid, Typography, Card, CardActionArea, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { categories } from "../data/mockData";

export default function Categories() {

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 8 }}>
      <Container maxWidth="lg">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 4 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
          <Typography color="text.primary" fontWeight={600}>Categories</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" fontWeight={800} sx={{ mb: 6 }}>All Categories</Typography>

        <Grid container spacing={4}>
          {categories.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.id}>
              <Card elevation={0} className="hover-lift" sx={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", height: "100%" }}>
                <CardActionArea component={RouterLink} to={`/products?category=${c.slug}`} sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                  <Box sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", mb: 3 }}>
                    {c.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>{c.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{c.description}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
