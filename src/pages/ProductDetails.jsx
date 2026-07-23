import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { 
  Box, Container, Grid, Typography, Stack, Button, Rating, 
  Divider, Chip, IconButton, Table, TableBody, TableCell, 
  TableRow, Paper, CircularProgress
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import { formatPrice } from "../data/mockData";
import { useShop } from "../context/ShopContext";
import API from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper to fix relative URLs breaking on nested routes like /product/:id
  const getImageUrl = (url) => {
    if (!url) return "";
    const trimmedUrl = String(url).trim();
    if (trimmedUrl.startsWith("http") || trimmedUrl.startsWith("data:") || trimmedUrl.startsWith("/")) {
      return trimmedUrl;
    }
    return "/" + trimmedUrl;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        
        // Prioritize the main image, but fallback to the first thumbnail if needed
        let initialImage = data.image || (data.images && data.images.length > 0 ? data.images[0] : null);
        setActiveImage(initialImage || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80");
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ py: 15, textAlign: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ py: 15, textAlign: "center", minHeight: "80vh" }}>
        <Typography variant="h4" color="text.secondary">Product not found.</Typography>
        <Button component={RouterLink} to="/products" variant="contained" sx={{ mt: 3 }}>
          Back to Shop
        </Button>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ bgcolor: "white", pb: 10 }}>
      {/* Top Breadcrumb */}
      <Box sx={{ bgcolor: "#f8fafc", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <Container maxWidth="lg">
          <BreadcrumbsNav 
            items={[
              { label: "Products", to: "/products" },
              { label: product.category, to: `/products?category=${product.category?.toLowerCase()}` },
              { label: product.name }
            ]} 
          />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={8}>
          {/* Left: Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" }, gap: 2 }}>
              {/* Thumbnails */}
              <Stack direction={{ xs: "row", sm: "column" }} spacing={2} sx={{ width: { xs: "100%", sm: 80 } }}>
                {Array.from(new Set([product.image, ...(product.images || [])])).filter(Boolean).map((img, i) => {
                  return (
                  <Box 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    sx={{ 
                      width: 80, height: 80, 
                      borderRadius: 2, 
                      overflow: "hidden",
                      border: activeImage === img ? "2px solid #2563eb" : "1px solid rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      bgcolor: "#f8fafc",
                      p: 1
                    }}
                  >
                    <img src={getImageUrl(img)} alt={`thumb-${i}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </Box>
                  );
                })}
              </Stack>
              
              {/* Main Image */}
              <Box sx={{ flex: 1, bgcolor: "#f8fafc", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 4, height: { xs: 300, sm: 500 } }}>
                <img src={getImageUrl(activeImage || product?.image)} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </Box>
            </Box>
          </Grid>

          {/* Right: Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" color="primary" fontWeight={700} sx={{ letterSpacing: 1 }}>
                {product.brand}
              </Typography>
              <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2, letterSpacing: "-0.02em" }}>
                {product.name}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Rating value={product.rating || 5} precision={0.1} readOnly size="medium" sx={{ color: "#fbbf24" }} />
                <Typography variant="body2" color="text.secondary" fontWeight={600}>
                  {product.rating || 5} ({product.reviews || 0} reviews)
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body2" color={product.stock > 0 ? "success.main" : "error.main"} fontWeight={700} display="flex" alignItems="center">
                  <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 0.5 }} /> {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="flex-end" spacing={2}>
                <Typography variant="h3" fontWeight={800}>
                  {formatPrice(product.price)}
                </Typography>
                {product.originalPrice && (
                  <Typography variant="h5" color="text.disabled" sx={{ textDecoration: "line-through", pb: 0.5 }}>
                    {formatPrice(product.originalPrice)}
                  </Typography>
                )}
                {product.discount > 0 && (
                  <Chip label={`Save ${product.discount}%`} color="error" size="small" sx={{ fontWeight: 700, mb: 1 }} />
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Inclusive of all taxes</Typography>
            </Box>

            <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8, mb: 4 }}>
              {product.description}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 5 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                onClick={() => addToCart(product._id || product.id)}
                disabled={product.stock === 0}
                startIcon={<AddShoppingCartIcon />}
                sx={{ flex: 1, py: 2, fontSize: "1.1rem" }}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <IconButton 
                size="large" 
                onClick={() => toggleWishlist(product._id || product.id)}
                sx={{ 
                  border: "2px solid rgba(0,0,0,0.1)", 
                  borderRadius: 3, 
                  width: 60, height: 60, 
                  color: isInWishlist(product._id || product.id) ? "error.main" : "inherit",
                  borderColor: isInWishlist(product._id || product.id) ? "error.main" : "rgba(0,0,0,0.1)",
                  "&:hover": { borderColor: "error.main", color: "error.main" } 
                }}
              >
                {isInWishlist(product._id || product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Stack>

            <Paper elevation={0} sx={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: 3, p: 3, mb: 4, bgcolor: "#f8fafc" }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocalShippingOutlinedIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>Free & Fast Delivery</Typography>
                  <Typography variant="body2" color="text.secondary">Enter postal code for delivery availability.</Typography>
                </Box>
              </Stack>
            </Paper>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Specifications</Typography>
                <Table size="small">
                  <TableBody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)", py: 1.5, color: "text.secondary", fontWeight: 600, width: "30%" }}>
                          {key}
                        </TableCell>
                        <TableCell sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)", py: 1.5, fontWeight: 500 }}>
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
