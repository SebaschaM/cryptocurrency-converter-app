import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#3498DB",
    },
    secondary: {
      main: "#95A5A6",
    },
    error: {
      main: "#E74C3C",
    },
    warning: {
      main: "#F39C12",
    },
    info: {
      main: "#3498DB",
    },
    success: {
      main: "#2ECC71",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      color: "#ffffff",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      color: "#ffffff",
      textTransform: "uppercase",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.17rem",
    },
    h4: {
      fontSize: "1rem",
    },
    h5: {
      fontSize: "0.83rem",
    },
    h6: {
      fontSize: "0.67rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
