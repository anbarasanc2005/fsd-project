// ============================================================
// ADMIN MOCK DATA — Realistic ecommerce business data
// ============================================================

export const adminUsers = [
  { id: "u1", firstName: "Demo", lastName: "User", email: "demo@smartgadgets.com", phone: "9876543210", role: "user", status: "active", orders: 3, wishlistCount: 5, registeredAt: "2026-01-15", avatar: "" },
  { id: "u2", firstName: "Priya", lastName: "Sharma", email: "priya@example.com", phone: "9123456789", role: "user", status: "active", orders: 7, wishlistCount: 12, registeredAt: "2026-02-20", avatar: "" },
  { id: "u3", firstName: "Arjun", lastName: "Mehta", email: "arjun@example.com", phone: "9234567890", role: "user", status: "active", orders: 2, wishlistCount: 3, registeredAt: "2026-03-05", avatar: "" },
  { id: "u4", firstName: "Sneha", lastName: "Kapoor", email: "sneha@example.com", phone: "9345678901", role: "user", status: "inactive", orders: 0, wishlistCount: 8, registeredAt: "2026-03-18", avatar: "" },
  { id: "u5", firstName: "Rahul", lastName: "Gupta", email: "rahul@example.com", phone: "9456789012", role: "user", status: "active", orders: 15, wishlistCount: 20, registeredAt: "2025-12-01", avatar: "" },
  { id: "u6", firstName: "Aisha", lastName: "Khan", email: "aisha@example.com", phone: "9567890123", role: "user", status: "active", orders: 4, wishlistCount: 6, registeredAt: "2026-04-10", avatar: "" },
  { id: "u7", firstName: "Dev", lastName: "Patel", email: "dev@example.com", phone: "9678901234", role: "user", status: "suspended", orders: 1, wishlistCount: 2, registeredAt: "2026-05-22", avatar: "" },
  { id: "u8", firstName: "Meera", lastName: "Nair", email: "meera@example.com", phone: "9789012345", role: "user", status: "active", orders: 9, wishlistCount: 14, registeredAt: "2026-01-30", avatar: "" },
];

export const adminOrders = [
  { id: "ORD-847291", userId: "u5", customer: "Rahul Gupta", email: "rahul@example.com", product: "iPhone 16 Pro", items: 1, amount: 129999, status: "delivered", paymentStatus: "paid", date: "2026-10-24", address: "12 MG Road, Bengaluru, 560001" },
  { id: "ORD-391823", userId: "u2", customer: "Priya Sharma", email: "priya@example.com", product: "Sony WH-1000XM5", items: 1, amount: 29990, status: "in_transit", paymentStatus: "paid", date: "2026-10-22", address: "45 Andheri West, Mumbai, 400058" },
  { id: "ORD-203948", userId: "u1", customer: "Demo User", email: "demo@smartgadgets.com", product: "MacBook Pro 14\"", items: 1, amount: 169900, status: "processing", paymentStatus: "paid", date: "2026-10-20", address: "7 Sector 18, Noida, 201301" },
  { id: "ORD-559102", userId: "u3", customer: "Arjun Mehta", email: "arjun@example.com", product: "Samsung Galaxy S25 Ultra", items: 2, amount: 259998, status: "pending", paymentStatus: "pending", date: "2026-10-19", address: "22 Park Street, Kolkata, 700016" },
  { id: "ORD-774320", userId: "u6", customer: "Aisha Khan", email: "aisha@example.com", product: "Apple Watch Series 10", items: 1, amount: 41900, status: "delivered", paymentStatus: "paid", date: "2026-10-17", address: "3 Civil Lines, Hyderabad, 500001" },
  { id: "ORD-660811", userId: "u8", customer: "Meera Nair", email: "meera@example.com", product: "Dell XPS 15", items: 1, amount: 189999, status: "cancelled", paymentStatus: "refunded", date: "2026-10-15", address: "56 Anna Nagar, Chennai, 600040" },
  { id: "ORD-112934", userId: "u5", customer: "Rahul Gupta", email: "rahul@example.com", product: "AirPods Pro (2nd Gen)", items: 1, amount: 24900, status: "delivered", paymentStatus: "paid", date: "2026-10-12", address: "12 MG Road, Bengaluru, 560001" },
  { id: "ORD-889341", userId: "u2", customer: "Priya Sharma", email: "priya@example.com", product: "iPad Pro 13-inch", items: 1, amount: 129900, status: "processing", paymentStatus: "paid", date: "2026-10-10", address: "45 Andheri West, Mumbai, 400058" },
  { id: "ORD-445621", userId: "u8", customer: "Meera Nair", email: "meera@example.com", product: "Google Pixel 9 Pro", items: 1, amount: 99999, status: "in_transit", paymentStatus: "paid", date: "2026-10-08", address: "56 Anna Nagar, Chennai, 600040" },
  { id: "ORD-332100", userId: "u1", customer: "Demo User", email: "demo@smartgadgets.com", product: "Bose QuietComfort Ultra", items: 1, amount: 35900, status: "delivered", paymentStatus: "paid", date: "2026-10-05", address: "7 Sector 18, Noida, 201301" },
];

export const adminAnalytics = {
  revenue: {
    total: 2847392,
    thisMonth: 487200,
    lastMonth: 421800,
    growth: 15.4,
  },
  orders: {
    total: 1284,
    pending: 47,
    processing: 120,
    delivered: 982,
    cancelled: 135,
  },
  users: {
    total: 8420,
    newThisMonth: 312,
    active: 7100,
    growth: 8.2,
  },
  products: {
    total: 156,
    outOfStock: 8,
    lowStock: 23,
  },
  revenueChart: [
    { month: "May", revenue: 280000 },
    { month: "Jun", revenue: 310000 },
    { month: "Jul", revenue: 295000 },
    { month: "Aug", revenue: 380000 },
    { month: "Sep", revenue: 421800 },
    { month: "Oct", revenue: 487200 },
  ],
  ordersChart: [
    { month: "May", orders: 180 },
    { month: "Jun", orders: 210 },
    { month: "Jul", orders: 195 },
    { month: "Aug", orders: 255 },
    { month: "Sep", orders: 278 },
    { month: "Oct", orders: 310 },
  ],
  topCategories: [
    { name: "Smartphones", sales: 420, revenue: 1200000 },
    { name: "Laptops", sales: 210, revenue: 980000 },
    { name: "Audio", sales: 380, revenue: 420000 },
    { name: "Wearables", sales: 160, revenue: 280000 },
    { name: "Tablets", sales: 114, revenue: 420000 },
  ],
};

export const adminReviews = [
  { id: "r1", product: "iPhone 16 Pro", user: "Rahul Gupta", rating: 5, comment: "Absolutely stunning device. The camera is a game changer!", status: "approved", date: "2026-10-23", featured: true },
  { id: "r2", product: "Sony WH-1000XM5", user: "Priya Sharma", rating: 4, comment: "Best noise cancellation I've ever used. Minor complaint: earcups could be softer.", status: "pending", date: "2026-10-21", featured: false },
  { id: "r3", product: "Dell XPS 15", user: "Arjun Mehta", rating: 3, comment: "Great display but gets too hot during gaming.", status: "pending", date: "2026-10-19", featured: false },
  { id: "r4", product: "Apple Watch Series 10", user: "Aisha Khan", rating: 5, comment: "Thinner than ever, health features are incredible!", status: "approved", date: "2026-10-17", featured: true },
  { id: "r5", product: "AirPods Pro", user: "Meera Nair", rating: 5, comment: "The spatial audio is magical. Worth every penny.", status: "approved", date: "2026-10-14", featured: false },
  { id: "r6", product: "MacBook Pro 14", user: "Dev Patel", rating: 2, comment: "Overpriced for what it offers. Keyboard feels cheap.", status: "rejected", date: "2026-10-10", featured: false },
];

export const adminCoupons = [
  { id: "c1", code: "SAVE10", type: "percentage", value: 10, minOrder: 5000, used: 142, limit: 500, status: "active", expiry: "2026-12-31" },
  { id: "c2", code: "FLAT500", type: "fixed", value: 500, minOrder: 10000, used: 89, limit: 200, status: "active", expiry: "2026-11-30" },
  { id: "c3", code: "APPLE15", type: "percentage", value: 15, minOrder: 80000, used: 23, limit: 100, status: "active", expiry: "2026-10-31" },
  { id: "c4", code: "WELCOME20", type: "percentage", value: 20, minOrder: 2000, used: 500, limit: 500, status: "exhausted", expiry: "2026-09-30" },
  { id: "c5", code: "FLASH2K", type: "fixed", value: 2000, minOrder: 50000, used: 12, limit: 50, status: "active", expiry: "2026-11-05" },
];

export const adminSupportTickets = [
  { id: "TKT-001", user: "Rahul Gupta", subject: "Order delayed by 5 days", status: "open", priority: "high", date: "2026-10-24" },
  { id: "TKT-002", user: "Priya Sharma", subject: "Wrong product delivered", status: "in_progress", priority: "urgent", date: "2026-10-22" },
  { id: "TKT-003", user: "Arjun Mehta", subject: "Refund not received", status: "resolved", priority: "medium", date: "2026-10-20" },
  { id: "TKT-004", user: "Sneha Kapoor", subject: "Cannot apply coupon code", status: "open", priority: "low", date: "2026-10-19" },
  { id: "TKT-005", user: "Demo User", subject: "App crashes on checkout", status: "in_progress", priority: "high", date: "2026-10-18" },
];

export const adminNotifications = [
  { id: "n1", type: "order", message: "New order #ORD-559102 placed for ₹2,59,998", time: "2 min ago", read: false },
  { id: "n2", type: "user", message: "New user registered: Aisha Khan", time: "15 min ago", read: false },
  { id: "n3", type: "review", message: "New review pending approval for Sony WH-1000XM5", time: "1 hr ago", read: false },
  { id: "n4", type: "stock", message: "⚠️ Low stock alert: Asus ROG Zephyrus (2 units left)", time: "2 hrs ago", read: true },
  { id: "n5", type: "order", message: "Order #ORD-660811 has been cancelled", time: "3 hrs ago", read: true },
  { id: "n6", type: "ticket", message: "Support ticket TKT-002 marked urgent", time: "5 hrs ago", read: true },
];

export const adminActivityLogs = [
  { id: "l1", action: "Product Updated", detail: "iPhone 16 Pro price changed to ₹1,29,999", user: "Admin Manager", time: "2026-10-24 14:32" },
  { id: "l2", action: "Order Status Changed", detail: "ORD-847291 marked as Delivered", user: "Admin Manager", time: "2026-10-24 12:15" },
  { id: "l3", action: "User Suspended", detail: "Dev Patel (dev@example.com) account suspended", user: "Admin Manager", time: "2026-10-23 09:45" },
  { id: "l4", action: "Coupon Created", detail: "FLASH2K coupon created (₹2000 off, min ₹50000)", user: "Admin Manager", time: "2026-10-22 16:00" },
  { id: "l5", action: "Review Approved", detail: "Review for Apple Watch Series 10 approved & featured", user: "Admin Manager", time: "2026-10-21 11:20" },
  { id: "l6", action: "Blog Published", detail: `"The Future of AI in Smartphones" published`, user: "Admin Manager", time: "2026-10-20 10:00" },
];

export const adminBlogs = [
  { id: "b1", title: "The Future of AI in Smartphones", category: "Technology", status: "published", author: "Admin Manager", date: "Oct 20, 2026", tags: ["AI", "Smartphones"], views: 1240 },
  { id: "b2", title: "Top 5 Noise Canceling Headphones in 2026", category: "Audio", status: "published", author: "Admin Manager", date: "Oct 15, 2026", tags: ["Audio", "Review"], views: 890 },
  { id: "b3", title: "Is the iPad Pro a laptop replacement?", category: "Tablets", status: "draft", author: "Admin Manager", date: "Oct 10, 2026", tags: ["iPad", "Productivity"], views: 0 },
  { id: "b4", title: "Gaming Laptops Under ₹1.5 Lakh in 2026", category: "Gaming", status: "draft", author: "Admin Manager", date: "Oct 25, 2026", tags: ["Gaming", "Laptops"], views: 0 },
];

export const adminBanners = [
  { id: "bn1", title: "iPhone 16 Pro Launch", subtitle: "The Future is Here", image: "https://m.media-amazon.com/images/I/81SigpKqUaL._SX679_.jpg", status: "active", page: "homepage", position: "hero" },
  { id: "bn2", title: "Diwali Sale — Up to 30% Off", subtitle: "Shop the best deals", image: "https://m.media-amazon.com/images/I/51051FiD9AQ._SX679_.jpg", status: "active", page: "homepage", position: "banner2" },
  { id: "bn3", title: "Galaxy S25 Ultra", subtitle: "Experience the Next Era", image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._SX679_.jpg", status: "inactive", page: "homepage", position: "banner3" },
];

export const adminInventory = [
  { id: "p10", name: "Asus ROG Zephyrus G14", category: "Laptops", stock: 2, threshold: 5, status: "critical" },
  { id: "p15", name: "PlayStation 5 Pro", category: "Gaming", stock: 12, threshold: 10, status: "low" },
  { id: "p7", name: "Dell XPS 15", category: "Laptops", stock: 25, threshold: 10, status: "ok" },
  { id: "p3", name: "MacBook Pro 14\"", category: "Laptops", stock: 15, threshold: 10, status: "ok" },
  { id: "p16", name: "Xbox Series X", category: "Gaming", stock: 20, threshold: 10, status: "ok" },
  { id: "p5", name: "Apple Watch Series 10", category: "Wearables", stock: 80, threshold: 20, status: "ok" },
  { id: "p13", name: "iPad Pro 13\" (M4)", category: "Tablets", stock: 40, threshold: 15, status: "ok" },
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
