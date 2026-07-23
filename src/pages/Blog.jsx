import React from "react";
import { Box, Container, Grid, Typography, Card, CardActionArea, CardMedia, CardContent, Chip } from "@mui/material";
import { getBlogPosts } from "../data/mockData";

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "80vh", py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={800} textAlign="center" sx={{ mb: 2 }}>Tech Blog</Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: "auto" }}>
          Insights, reviews, and the latest trends from the world of technology.
        </Typography>

        <Grid container spacing={4}>
          {posts.map(post => (
            <Grid item xs={12} md={4} key={post.id}>
              <Card elevation={0} className="hover-lift" sx={{ borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", height: "100%", display: "flex", flexDirection: "column" }}>
                <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <CardMedia component="img" height="240" image={post.image} alt={post.title} />
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Typography variant="caption" color="primary" fontWeight={700} sx={{ mb: 1, display: "block" }}>
                      {post.date}
                    </Typography>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 2, lineHeight: 1.4 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.excerpt}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
