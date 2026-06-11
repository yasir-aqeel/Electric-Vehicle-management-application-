/* eslint-disable react/prop-types */
import React from "react";
import { Menu } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F172A",
      dark: "#020617",
      light: "#E2E8F0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2E7D5B",
      dark: "#14532D",
      light: "#DCFCE7",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#DC2626",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F4F7FB",
    },
    // Add or update the following lines to modify the text field colors
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    // Optionally, you can also update the border color for the outlined text fields
    action: {
      active: "#94A3B8",
    },
  },
  typography: {
    // Override the default font family for all elements
    fontFamily:
      '"Inter", "IBM Plex Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

    // Override specific elements' typography
    h1: {
      fontSize: "2.625rem", // Change this to your desired font size
      fontWeight: 600, // Change this to your desired font weight
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "#64748B",
    },
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F7FB",
        },
      },
    },
    // overrides any componet you want here
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#FFFFFF",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2E7D5B",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#64748B",
          fontWeight: 800,
          fontSize: "0.75rem",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 48,
          height: 24,
          padding: 0,
          display: "flex",
        },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              opacity: 1,
              backgroundColor: "#74993F",
            },
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#52d869",
            border: "6px solid #fff",
          },
        },
        thumb: {
          width: 20,
          height: 20,
          boxShadow: "none",
        },
        track: {
          borderRadius: 24 / 2,
          opacity: 1,
          backgroundColor: "#707070",
        },
      },
    },
  },
});

export const dropdownColors = {
  main: "#F9F9F9",
  light: "#D7D7DB",
  border: "#eaeaea",
  dark: "#7a7a7a",
  boxShadow:
    "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
};

export const StyledMenu = ({ sx, ...props }) => (
  React.createElement(Menu, {
    ...props,
    sx: [
      {
        width: {
          xl: "22.5%",
          lg: "23%",
          md: "33.5%",
          sm: "96%",
          xs: "100%",
        },
        "& .MuiPaper-root": {
          borderRadius: "6px",
          color: dropdownColors.dark,
          backgroundColor: dropdownColors.main,
          border: `1px solid ${dropdownColors.border}`,
          width: "100%",
          boxShadow: dropdownColors.boxShadow,
          "&:hover": {
            border: `1px solid ${dropdownColors.dark}`,
          },
          "& .MuiMenu-list": {
            padding: "4px 0",
            width: "100%",
          },
          "& .MuiMenuItem-root": {
            width: "100%",
            borderColor: dropdownColors.border,
            "&:hover": {
              backgroundColor: dropdownColors.border,
              borderColor: dropdownColors.dark,
            },
            "&:active": {
              color: "#000",
              border: `1px solid ${dropdownColors.border}`,
            },
          },
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ],
  })
);

export default theme;
