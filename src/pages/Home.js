import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "rgb(241 248 252)",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}
