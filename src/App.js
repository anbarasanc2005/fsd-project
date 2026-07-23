import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

/** Hide Navbar & Footer on admin routes — admin has its own layout */
function AppShell() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ShopProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </ShopProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
