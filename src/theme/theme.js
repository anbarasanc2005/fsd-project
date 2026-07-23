import { createTheme, alpha } from "@mui/material/styles";

const primary = {
  main: "#2563eb",
  light: "#60a5fa",
  dark: "#1d4ed8",
  contrastText: "#ffffff",
};

const secondary = {
  main: "#6366f1",
  light: "#818cf8",
  dark: "#4338ca",
  contrastText: "#ffffff",
};

const background = {
  default: "#fafafa",
  paper: "#ffffff",
};

const text = {
  primary: "#0f172a",
  secondary: "#475569",
  disabled: "#94a3b8",
};

const theme = createTheme({
  palette: {
    primary,
    secondary,
    background,
    text,
    success: { main: "#10b981" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    info: { main: "#3b82f6" },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 800, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.015em" },
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontWeight: 600 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Pill shape for modern premium feel
          padding: "8px 24px",
          transition: "all 0.2s ease-in-out",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${primary.main}, ${secondary.main})`,
          "&:hover": {
            background: `linear-gradient(135deg, ${primary.dark}, ${secondary.dark})`,
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none", // Avoid weird MUI elevation overlay in dark mode if we ever switch
        },
        elevation1: { boxShadow: "0 2px 10px rgba(0,0,0,0.04)" },
        elevation2: { boxShadow: "0 4px 20px rgba(0,0,0,0.06)" },
        elevation3: { boxShadow: "0 8px 30px rgba(0,0,0,0.08)" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s ease",
            "&:hover fieldset": {
              borderColor: alpha(primary.main, 0.5),
            },
            "&.Mui-focused fieldset": {
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          padding: 12,
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
