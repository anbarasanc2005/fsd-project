import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "./AuthContext";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/products");
      setProducts(data);
      
      const storedCart = localStorage.getItem("sg_cart");
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem("sg_wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    localStorage.setItem("sg_cart", JSON.stringify(cart));
    if (currentUser) {
      API.put("/users/cart", { cart }).catch(err => console.error("Failed to sync cart:", err));
    }
  }, [cart, currentUser]);

  useEffect(() => {
    localStorage.setItem("sg_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch cart from backend when user logs in
  useEffect(() => {
    if (currentUser) {
      API.get("/users/cart")
        .then(({ data }) => {
          if (data && data.length > 0) {
            setCart(data.map(item => ({ productId: item.product._id || item.product, quantity: item.quantity })));
          }
        })
        .catch(err => console.error("Failed to fetch user cart:", err));
    }
  }, [currentUser]);

  // Cart Methods
  const addToCart = (productId, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const getCartItems = () => {
    return cart.map(item => {
      const product = products.find(p => p._id === item.productId || p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    }).filter(Boolean);
  };

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Wishlist Methods
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const getWishlistItems = () => {
    return wishlist.map(id => products.find(p => p._id === id || p.id === id)).filter(Boolean);
  };

  const value = {
    products,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItems,
    getCartTotal,
    toggleWishlist,
    isInWishlist,
    getWishlistItems,
    cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
    wishlistCount: wishlist.length,
    loading,
    refetchProducts: fetchInitialData
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within a ShopProvider");
  return ctx;
}
