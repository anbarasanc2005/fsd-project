export const categories = [
  { id: "c1", name: "Smartphones", slug: "smartphones", icon: "📱", description: "Latest models from top brands." },
  { id: "c2", name: "Laptops", slug: "laptops", icon: "💻", description: "High-performance machines for work and play." },
  { id: "c3", name: "Audio", slug: "audio", icon: "🎧", description: "Premium headphones and speakers." },
  { id: "c4", name: "Wearables", slug: "wearables", icon: "⌚", description: "Smartwatches and fitness trackers." },
  { id: "c5", name: "Accessories", slug: "accessories", icon: "🔌", description: "Essential tech add-ons." },
  { id: "c6", name: "Tablets", slug: "tablets", icon: "📱", description: "Portable powerhouses for creativity." },
  { id: "c7", name: "Smart Home", slug: "smart-home", icon: "🏠", description: "Automate your living space." },
  { id: "c8", name: "Gaming", slug: "gaming", icon: "🎮", description: "Next-gen consoles and gear." },
];

export const brands = ["Apple", "Samsung", "Sony", "Dell", "Google", "Microsoft", "Bose", "Asus", "Nothing", "OnePlus"];

export const products = [];

export const deals = [
  { id: "d1", title: "Apple Days Sale", description: "Up to 15% off on all MacBooks and iPads.", image: "https://m.media-amazon.com/images/I/618d5bS2lUL._SX679_.jpg", endDate: "2026-10-31T23:59:59" },
  { id: "d2", title: "Audio Fest", description: "Flat ₹5000 off on Sony & Bose premium headphones.", image: "https://m.media-amazon.com/images/I/61vJtKabIQL._SX679_.jpg", endDate: "2026-11-05T23:59:59" },
  { id: "d3", title: "Gaming Weekend", description: "Get 3 free games with PS5 or Xbox.", image: "https://m.media-amazon.com/images/I/51051FiD9AQ._SX679_.jpg", endDate: "2026-10-25T23:59:59" },
];

export const faqs = [
  { question: "What is your return policy?", answer: "We offer a 15-day return policy on all electronics, provided they are in original condition with intact packaging." },
  { question: "Do you offer international shipping?", answer: "Currently, we only ship within India. We are looking to expand internationally soon." },
  { question: "How can I track my order?", answer: "You can track your order using the 'Track Order' page by entering your Order ID, or checking your account dashboard." },
  { question: "Are your products authentic?", answer: "Yes, 100%. We are authorized retailers for all the brands we carry. Every product comes with an official brand warranty." },
];

export const blogPosts = [
  { id: "b1", title: "The Future of AI in Smartphones", date: "Oct 20, 2026", image: "https://m.media-amazon.com/images/I/71CXhVhpM0L._SX679_.jpg", excerpt: "How Apple and Google are changing the way we interact with our phones using localized AI models." },
  { id: "b2", title: "Top 5 Noise Canceling Headphones in 2026", date: "Oct 15, 2026", image: "https://m.media-amazon.com/images/I/51rPq4Ttb+L._SX679_.jpg", excerpt: "We compare Sony, Bose, Apple, and Sennheiser to find the ultimate quiet space for your ears." },
  { id: "b3", title: "Is the iPad Pro a laptop replacement?", date: "Oct 10, 2026", image: "https://m.media-amazon.com/images/I/61bM-P4gWQL._SX679_.jpg", excerpt: "With the M4 chip, the iPad Pro has more power than ever. But does it have the software?" }
];

// Helper methods

export const getDeals = () => deals;
export const getFaqs = () => faqs;
export const getBlogPosts = () => blogPosts;

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
