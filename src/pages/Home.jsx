import React from "react";
import { Box, Container, Typography, Button, Grid, Stack, Card, CardActionArea, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import { categories } from "../data/mockData";
import { useShop } from "../context/ShopContext";

export default function Home() {
  const { products } = useShop();
  const featured = products.filter(p => p.isFeatured);

  return (
    <Box component="main">
      {/* ===== HERO SECTION ===== */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 10, md: 14 },
          bgcolor: "#f8fafc",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative Blur Backgrounds */}
        <Box sx={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(255,255,255,0) 70%)", filter: "blur(40px)" }} />
        <Box sx={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(255,255,255,0) 70%)", filter: "blur(40px)" }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} className="animate-fade-in stagger-1">
              <Box sx={{ display: "inline-block", px: 2, py: 0.5, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", borderRadius: 999, mb: 3, fontWeight: 700, fontSize: "0.85rem" }}>
                Introducing the Future
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "4.5rem" }, lineHeight: 1.1, mb: 3 }}>
                Experience Tech <br /> Like Never Before.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", mb: 5, maxWidth: "90%" }}>
                Discover our curated collection of premium smartphones, powerful laptops, and next-gen wearables designed to elevate your everyday life.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 1.5, px: 4, fontSize: "1rem" }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayCircleOutlineIcon />}
                  sx={{ py: 1.5, px: 4, fontSize: "1rem", borderColor: "rgba(0,0,0,0.1)", color: "text.primary", "&:hover": { borderColor: "primary.main" } }}
                >
                  Watch Video
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} className="animate-fade-in stagger-2">
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src="https://techcmantix.com/wp-content/uploads/2024/04/Electronics-Communication-industry.webp"
                  alt="Hero Gadget"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 6,
                    boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
                    transform: "perspective(1000px) rotateY(-5deg)",
                    transition: "transform 0.5s",
                    "&:hover": { transform: "perspective(1000px) rotateY(0deg)" }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== CATEGORIES ===== */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionHeader
          title="Browse by Category"
          subtitle="Explore our wide range of premium gadgets tailored for your lifestyle."
          actionText="View All"
          actionLink="/categories"
        />
        <Grid container spacing={3}>
          {categories.map((c, i) => (
            <Grid item xs={12} sm={6} md={2.4} key={c.id}>
              <Card elevation={0} className="hover-lift" sx={{ bgcolor: "#f8fafc", borderRadius: 4, border: "1px solid rgba(0,0,0,0.03)" }}>
                <CardActionArea component={RouterLink} to={`/products?category=${c.slug}`} sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Typography sx={{ fontSize: "3rem", mb: 2 }}>{c.icon}</Typography>
                  <Typography variant="subtitle1" fontWeight={700}>{c.name}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== FEATURED PRODUCTS ===== */}
      <Box sx={{ bgcolor: "white", py: 10, borderTop: "1px solid rgba(0,0,0,0.03)" }}>
        <Container maxWidth="lg">
          <SectionHeader
            title="Featured Products"
            subtitle="Handpicked premium devices that stand out from the rest."
            actionText="Shop All"
            actionLink="/products"
          />
          <Grid container spacing={4}>
            {featured.slice(0, 4).map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== PREMIUM BANNER ===== */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            bgcolor: "#0f172a",
            color: "white",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center"
          }}
        >
          <Box sx={{ p: { xs: 5, md: 8 }, flex: 1, zIndex: 1 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Unleash the Pro.</Typography>
            <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, opacity: 0.8, maxWidth: 400 }}>
              The new MacBook Pro with M3 Max. Mind-blowing performance, beautiful XDR display.
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ py: 1.5, px: 4 }}>
              Buy Now
            </Button>
          </Box>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              objectFit: "cover",
              opacity: 0.8,
              maskImage: "linear-gradient(to right, transparent, black 30%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)"
            }}
          />
        </Box>
      </Container>

      {/* ===== BENEFITS ===== */}
      <Box sx={{ bgcolor: "#f8fafc", py: 10, borderTop: "1px solid rgba(0,0,0,0.03)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                🚚
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>Free Shipping</Typography>
              <Typography variant="body2" color="text.secondary">On all orders over ₹999 across India.</Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                🛡️
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>1 Year Warranty</Typography>
              <Typography variant="body2" color="text.secondary">Brand warranty on all electronics.</Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                💳
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>Secure Payments</Typography>
              <Typography variant="body2" color="text.secondary">Encrypted payment gateways for safety.</Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: "rgba(37,99,235,0.1)", color: "primary.main", mx: "auto", mb: 2 }}>
                🎧
              </Avatar>
              <Typography variant="h6" fontWeight={700} gutterBottom>24/7 Support</Typography>
              <Typography variant="body2" color="text.secondary">Dedicated customer service team.</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
