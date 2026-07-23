import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Guard for user‑only pages.
 *   • Guest → /login
 *   • Admin  → redirect to admin dashboard
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (isAdmin) return <Navigate to="/admin" replace />; // admin should not see user UI
  return children;
}
