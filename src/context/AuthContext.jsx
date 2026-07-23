import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

// ─── Local fallback users (used when backend/MongoDB is unavailable) ──────
const LOCAL_USERS_KEY = "smartgadgets_users";
const LOCAL_TOKEN_KEY = "token";
const LOCAL_USER_KEY = "smartgadgets_currentUser";

const DEFAULT_USERS = [
  {
    _id: "admin001",
    firstName: "Admin",
    lastName: "User",
    email: "admin@smartgadgets.com",
    password: "Admin@1234",
    phone: "9999999999",
    role: "admin",
  },
  {
    _id: "demo001",
    firstName: "Demo",
    lastName: "User",
    email: "demo@smartgadgets.com",
    password: "Demo@1234",
    phone: "8888888888",
    role: "user",
  },
];

function getLocalUsers() {
  try {
    const stored = localStorage.getItem(LOCAL_USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Seed default users on first visit
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  return [...DEFAULT_USERS];
}

function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

// ─── Helper: check if backend API is reachable ──────────────────────────────
async function isBackendAvailable() {
  try {
    // A quick lightweight ping — any non-404 response means backend is up
    const res = await API.post("/auth/login", { email: "__ping__", password: "__ping__" });
    return true; // Shouldn't really succeed, but if it does, backend is up
  } catch (err) {
    // If we get an HTTP response (like 401, 400, 503), the backend IS running
    if (err.response) {
      // 503 means backend is running but MongoDB is down
      if (err.response.status === 503) return false;
      return true;
    }
    // Network error = backend is not running at all
    return false;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("unknown"); // "api" or "local"

  // ─── On mount: restore session ───────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(LOCAL_TOKEN_KEY);
      const savedUser = localStorage.getItem(LOCAL_USER_KEY);

      if (token) {
        // Try backend first
        try {
          const { data } = await API.get("/auth/profile");
          setCurrentUser(data);
          setMode("api");
          setLoading(false);
          return;
        } catch {
          // Backend unreachable — fall back to local
        }
      }

      // Restore from local storage
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
          setMode("local");
        } catch {
          localStorage.removeItem(LOCAL_USER_KEY);
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  // ─── REGISTER ────────────────────────────────────────────────────────────
  const register = async (userData) => {
    // Try backend first
    try {
      const backendUp = await isBackendAvailable();
      if (backendUp) {
        const { data } = await API.post("/auth/register", {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        });
        localStorage.setItem(LOCAL_TOKEN_KEY, data.token);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
        setCurrentUser(data);
        setMode("api");
        return { success: true, message: "Your account has been created successfully." };
      }
    } catch (error) {
      // If backend returned a specific error (like "Email already exists"), surface it
      if (error.response?.data?.message) {
        return { success: false, message: error.response.data.message };
      }
    }

    // ── Fallback: register locally ──
    const users = getLocalUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (exists) {
      return { success: false, message: "Email already exists" };
    }

    const newUser = {
      _id: "user_" + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      role: "user",
    };
    users.push(newUser);
    saveLocalUsers(users);

    const safeUser = { ...newUser };
    delete safeUser.password;
    localStorage.setItem(LOCAL_TOKEN_KEY, "local_" + newUser._id);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    setMode("local");
    return { success: true, message: "Your account has been created successfully (offline mode)." };
  };

  // ─── LOGIN ───────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    // Try backend first
    try {
      const backendUp = await isBackendAvailable();
      if (backendUp) {
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem(LOCAL_TOKEN_KEY, data.token);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
        setCurrentUser(data);
        setMode("api");
        return { success: true, message: `Hello ${data.firstName}! Redirecting...`, user: data };
      }
    } catch (error) {
      if (error.response?.data?.message) {
        return {
          success: false,
          message: error.response.data.message,
          reason: "auth-failed",
        };
      }
    }

    // ── Fallback: local login ──
    const users = getLocalUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return {
        success: false,
        message: "No account found with this email address.",
        reason: "not-found",
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
        reason: "wrong-password",
      };
    }

    const safeUser = { ...user };
    delete safeUser.password;
    localStorage.setItem(LOCAL_TOKEN_KEY, "local_" + user._id);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(safeUser));
    setCurrentUser(safeUser);
    setMode("local");
    return {
      success: true,
      message: `Hello ${user.firstName}! Redirecting...`,
      user: safeUser,
    };
  };

  // ─── LOGOUT ──────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem(LOCAL_TOKEN_KEY);
    localStorage.removeItem(LOCAL_USER_KEY);
    setCurrentUser(null);
    setMode("unknown");
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    isAdmin: currentUser?.role === "admin",
    isUser: currentUser?.role === "user" || (currentUser && currentUser.role !== "admin"),
    register,
    login,
    logout,
    authMode: mode, // "api" or "local"
  };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
