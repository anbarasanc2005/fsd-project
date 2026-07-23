import React, { useState, useMemo } from "react";
import { 
  Box, Container, Grid, Typography, Stack, Select, MenuItem, 
  FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel,
  Slider, Button, Drawer, useMediaQuery,
  ListItem, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/mockData";
import { useShop } from "../context/ShopContext";

export default function Products() {
  const { products: allProducts } = useShop();
  const isMobile = useMediaQuery("(max-width:900px)");

  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [selectedCats, setSelectedCats] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // Dynamically extract categories from actual products
  const dynamicCategories = Array.from(new Set(allProducts.map(p => p.category))).map(name => {
    const mockCat = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    return {
      name,
      slug: name.toLowerCase(),
      icon: mockCat ? mockCat.icon : "🏷️"
    };
  });

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilterChange = (type, value) => {
    setSelectedCats(prev => 
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedCats.length > 0) {
      result = result.filter(p => selectedCats.includes(p.category));
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    return result;
  }, [allProducts, selectedCats, priceRange, sort, selectedCategory]);

  const FilterSidebar = (
    <Box sx={{ width: 280, p: 3 }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>Filters</Typography>
      
      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, textTransform: "uppercase", color: "text.secondary" }}>
        Categories
      </Typography>
      <FormGroup sx={{ mb: 4 }}>
        {dynamicCategories.map((c) => (
          <FormControlLabel 
            key={c.slug}
            control={<Checkbox checked={selectedCats.includes(c.name)} onChange={() => handleFilterChange("category", c.name)} size="small" />} 
            label={<Typography variant="body2">{c.name}</Typography>} 
          />
        ))}
      </FormGroup>

      <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 3, textTransform: "uppercase", color: "text.secondary" }}>
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={250000}
        step={5000}
        sx={{ mb: 1 }}
      />
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="caption" color="text.secondary">₹{priceRange[0]}</Typography>
        <Typography variant="caption" color="text.secondary">₹{priceRange[1]}</Typography>
      </Stack>

      <Button 
        fullWidth 
        variant="outlined" 
        onClick={() => { setSelectedCats([]); setPriceRange([0, 200000]); }}
        sx={{ mt: 2 }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  return (
    <Box component="main" sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pb: 10 }}>
      <Box sx={{ bgcolor: "white", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <Container maxWidth="xl">
          <BreadcrumbsNav items={[{ label: "Products" }]} />
          <Typography variant="h3" fontWeight={800} sx={{ mb: 4 }}>All Products</Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Desktop Sidebar */}
          <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ bgcolor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
              {FilterSidebar}
            </Box>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredProducts.length} results
              </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center">
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton 
                      selected={!selectedCategory || selectedCategory === "all"}
                      onClick={() => {
                        searchParams.set("category", "all");
                        setSearchParams(searchParams);
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>📱</ListItemIcon>
                      <ListItemText primary="All Products" />
                    </ListItemButton>
                  </ListItem>
                  {dynamicCategories.map(c => (
                    <ListItem key={c.slug} disablePadding sx={{ mb: 1 }}>
                      <ListItemButton 
                        selected={selectedCategory === c.slug}
                        onClick={() => {
                          searchParams.set("category", c.slug);
                          setSearchParams(searchParams);
                        }}
                        sx={{ borderRadius: 2 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>{c.icon}</ListItemIcon>
                        <ListItemText primary={c.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}

                {isMobile && (
                  <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => setFilterOpen(true)}>
                    Filters
                  </Button>
                )}
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
                    <MenuItem value="recommended">Recommended</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            {filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 10, bgcolor: "white", borderRadius: 4, border: "1px solid rgba(0,0,0,0.05)" }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>No products found.</Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>Try adjusting your filters, or refresh the page if the database was just connected.</Typography>
                <Button variant="contained" onClick={() => window.location.reload()}>Refresh Products</Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((p) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={p._id}>
                    <ProductCard product={p} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
        {FilterSidebar}
      </Drawer>
    </Box>
  );
}
