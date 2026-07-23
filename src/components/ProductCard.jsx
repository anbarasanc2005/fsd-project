import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Stack,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { formatPrice } from "../data/mockData";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product._id);

  return (
    <Card elevation={0} className="hover-card" sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Badges */}
      <Stack direction="column" spacing={1} sx={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
        {product.isNew && (
          <Chip label="NEW" size="small" sx={{ bgcolor: "primary.main", color: "white", fontWeight: 700, fontSize: "0.7rem", height: 20 }} />
        )}
        {product.discount > 0 && (
          <Chip label={`-${product.discount}%`} size="small" sx={{ bgcolor: "error.main", color: "white", fontWeight: 700, fontSize: "0.7rem", height: 20 }} />
        )}
      </Stack>

      <IconButton 
        size="small" 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product._id);
        }}
        sx={{ 
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
          bgcolor: "white", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
          "&:hover": { bgcolor: "white", color: "error.main", transform: "scale(1.1)" },
          transition: "transform 0.2s"
        }}
      >
        {inWishlist ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>

      {/* Image Area */}
      <Box
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{ 
          height: 240, 
          overflow: "hidden", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          bgcolor: "#f8fafc",
          p: 3
        }}
      >
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
      </Box>

      {/* Content Area */}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {product.brand}
        </Typography>
        
        <Typography 
          component={RouterLink}
          to={`/product/${product._id}`}
          variant="h6" 
          fontWeight={700} 
          sx={{ 
            mb: 1, 
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
            "&:hover": { color: "primary.main" }
          }}
        >
          {product.name}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: "#fbbf24" }} />
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            ({product.reviews})
          </Typography>
        </Stack>

        <Box sx={{ mt: "auto", pt: 2, borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Box>
              {product.originalPrice && (
                <Typography variant="caption" color="text.disabled" sx={{ textDecoration: "line-through", display: "block", mb: 0.25 }}>
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
              <Typography variant="h6" color="text.primary" fontWeight={800} lineHeight={1}>
                {formatPrice(product.price)}
              </Typography>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary"
              size="small"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product._id);
              }}
              sx={{ minWidth: 0, width: 40, height: 40, borderRadius: "50%", p: 0 }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
