import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";

// Core Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Product & Shopping Pages
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Categories from "../pages/Categories";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Compare from "../pages/Compare";

// Support & Info Pages
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import TrackOrder from "../pages/TrackOrder";
import Returns from "../pages/Returns";
import Shipping from "../pages/Shipping";
import Warranty from "../pages/Warranty";
import Careers from "../pages/Careers";
import Blog from "../pages/Blog";
import News from "../pages/News";
import Sustainability from "../pages/Sustainability";

// User Dashboard Pages
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Settings from "../pages/Settings";

// Admin Pages
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminOrders from "../pages/admin/Orders";
import AdminProducts from "../pages/admin/Products";
import AdminCategories from "../pages/admin/Categories";
import AdminUsers from "../pages/admin/Users";
import AdminReviews from "../pages/admin/Reviews";
import AdminBlogs from "../pages/admin/Blogs";
import AdminAnalytics from "../pages/admin/Analytics";
import AdminBrands from "../pages/admin/Brands";
import AdminCollections from "../pages/admin/Collections";
import AdminCoupons from "../pages/admin/Coupons";
import AdminInventory from "../pages/admin/Inventory";
import AdminSupport from "../pages/admin/Support";
import AdminReports from "../pages/admin/Reports";
import AdminHomepageManager from "../pages/admin/HomepageManager";
import AdminNotifications from "../pages/admin/Notifications";
import AdminSettings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/Profile";

// Utility
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      
      {/* Shopping */}
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/compare" element={<Compare />} />
      
      {/* Support & Content */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/warranty" element={<Warranty />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/news" element={<News />} />
      <Route path="/sustainability" element={<Sustainability />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected User Dashboard */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

      {/* Admin Login (no layout wrapper, standalone page) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel (protected, uses AdminLayout) */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="collections" element={<AdminCollections />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="support" element={<AdminSupport />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="homepage" element={<AdminHomepageManager />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
