import React from "react";
import { Box, Container, Typography, Grid, Card, Chip, Stack } from "@mui/material";

const missionVisionValues = [
  { icon: "🎯", title: "Our Mission", border: "#2563eb", text: "Provide high-quality electronic gadgets with affordable pricing, genuine warranty and excellent customer service to every customer." },
  { icon: "👁️", title: "Our Vision", border: "#7c3aed", text: "Become India's most trusted and customer-friendly online electronics shopping destination for all gadget needs." },
  { icon: "⭐", title: "Our Values", border: "#16a34a", text: "Quality, Innovation, Customer Satisfaction, Honesty, Fast Delivery and Continuous Improvement." },
];

const whyCustomersChooseUs = [
  { icon: "✅", title: "Genuine Products", color: "#1d4ed8", bg: "linear-gradient(135deg,#eff6ff,#eef2ff)", text: "100% original products with official manufacturer warranty." },
  { icon: "🚚", title: "Fast Delivery", color: "#15803d", bg: "linear-gradient(135deg,#ecfdf5,#f0fdf4)", text: "Quick and secure delivery service across India." },
  { icon: "💰", title: "Best Prices", color: "#b45309", bg: "linear-gradient(135deg,#fffbeb,#fefce8)", text: "Affordable pricing with exciting seasonal offers and discounts." },
  { icon: "🎧", title: "24×7 Support", color: "#7c3aed", bg: "linear-gradient(135deg,#f5f3ff,#faf5ff)", text: "Dedicated customer support whenever you need assistance." },
];

const achievements = [
  { value: "50K+", label: "Happy Customers", grad: "linear-gradient(135deg,#2563eb,#1d4ed8)" },
  { value: "10K+", label: "Products Sold", grad: "linear-gradient(135deg,#16a34a,#047857)" },
  { value: "100+", label: "Top Brands", grad: "linear-gradient(135deg,#f59e0b,#ca8a04)" },
  { value: "24×7", label: "Customer Support", grad: "linear-gradient(135deg,#ef4444,#dc2626)" },
];

const whatSetsUsApart = [
  { icon: "🏆", title: "Premium Quality", text: "We source only the best products from trusted brands worldwide." },
  { icon: "🤝", title: "Trust & Transparency", text: "Honest pricing, clear policies, and no hidden charges." },
  { icon: "🌍", title: "Pan India Reach", text: "Delivering to most cities and towns across India." },
];

export default function About() {
  return (
    <Box component="main">
      {/* ===== HERO ===== */}
      <Box className="gradient-hero" sx={{ color: "white", py: { xs: 8, md: 10 }, px: 2, textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, fontWeight: 800 }}>
            About Smart Gadgets Store
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.9, fontWeight: 400 }}>
            Delivering the Latest Technology with Quality, Trust and Affordable Prices.
          </Typography>
        </Container>
      </Box>

      {/* ===== WHO WE ARE ===== */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Card elevation={4} sx={{ p: { xs: 3, md: 6 } }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" fontWeight={700}>About Us</Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>Who We Are</Typography>
              <Box sx={{ width: 64, height: 4, bgcolor: "primary.main", borderRadius: 2, mt: 2, mb: 3 }} />
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Smart Gadgets Store is one of India's trusted electronics shopping destinations. We offer premium
                smartphones, laptops, smart watches, wireless earbuds, gaming accessories, tablets, chargers, power
                banks and many more modern gadgets from leading brands at affordable prices.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
                Our goal is to provide genuine products with manufacturer warranty, secure payment, fast delivery and
                outstanding customer service to ensure the best shopping experience.
              </Typography>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
                <Chip label="✅ 100% Genuine" color="success" variant="outlined" />
                <Chip label="🔒 Secure Payment" color="primary" variant="outlined" />
                <Chip label="🚚 Fast Delivery" sx={{ color: "#7c3aed", borderColor: "#7c3aed" }} variant="outlined" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="about-img" sx={{ p: 5, textAlign: "center", borderRadius: 4 }}>
                <Typography sx={{ fontSize: "5rem" }}>🏪</Typography>
                <Typography variant="h6" color="primary.dark" fontWeight={700} sx={{ mt: 2 }}>Since 2020</Typography>
                <Typography color="text.secondary">Trusted by 50K+ Customers</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {/* ===== MISSION / VISION / VALUES ===== */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Grid container spacing={3}>
          {missionVisionValues.map((m) => (
            <Grid item xs={12} md={4} key={m.title}>
              <Card elevation={2} className="hover-card" sx={{ p: 4, borderTop: `4px solid ${m.border}`, height: "100%" }}>
                <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>{m.icon}</Typography>
                <Typography variant="h6" fontWeight={700}>{m.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>{m.text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== WHY CUSTOMERS CHOOSE US ===== */}
      <Box sx={{ bgcolor: "white", py: 9, borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
            Why Customers <Box component="span" color="primary.main">Choose Us</Box>
          </Typography>
          <Grid container spacing={3}>
            {whyCustomersChooseUs.map((f) => (
              <Grid item xs={12} sm={6} md={3} key={f.title}>
                <Card elevation={0} className="hover-card" sx={{ background: f.bg, textAlign: "center", p: 3, height: "100%" }}>
                  <Typography sx={{ fontSize: "2.5rem" }}>{f.icon}</Typography>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ color: f.color, mt: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{f.text}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== ACHIEVEMENTS ===== */}
      <Container maxWidth="lg" sx={{ py: 9 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
          Our <Box component="span" color="primary.main">Achievements</Box>
        </Typography>
        <Grid container spacing={3}>
          {achievements.map((a) => (
            <Grid item xs={12} sm={6} md={3} key={a.label}>
              <Card
                className="stat-circle"
                sx={{ backgroundImage: a.grad, color: "white", textAlign: "center", p: 4 }}
              >
                <Typography variant="h4" fontWeight={800}>{a.value}</Typography>
                <Typography sx={{ mt: 1, opacity: 0.9 }}>{a.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== WHAT SETS US APART ===== */}
      <Box sx={{ bgcolor: "#f8fafc", py: 9, borderTop: "1px solid #f1f5f9" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" sx={{ mb: 6 }}>
            What <Box component="span" color="primary.main">Sets Us Apart</Box>
          </Typography>
          <Grid container spacing={3}>
            {whatSetsUsApart.map((w) => (
              <Grid item xs={12} md={4} key={w.title}>
                <Card elevation={1} sx={{ p: 3, textAlign: "center", height: "100%" }}>
                  <Typography sx={{ fontSize: "2.25rem", mb: 1 }}>{w.icon}</Typography>
                  <Typography fontWeight={700}>{w.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{w.text}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
