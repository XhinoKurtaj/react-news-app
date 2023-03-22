import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Nav";
import axios from "axios";
import Button from "@mui/material/Button";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import LoadingSpinner from "../components/LoadingSpinner";
import NewsGrid from "../components/NewsGrid";

import API from "../config/axiosConfig";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [value, setValue] = React.useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/news", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setIsLoading(false);
  //       setArticles(response.data.articles);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload = {
      criteria: form.get("keyword"),
      fromDate: form.get("date"),
      source: form.get("source"),
      category: form.get("category"),
    };

    const response = await API.get("news", { params: payload });
    setArticles(response.data.articles);

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />

      <main>
        <Container maxWidth="sm">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="keyword"
                  label="keyword"
                  type="text"
                  id="keyword"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="source"
                  label="source"
                  type="text"
                  id="source"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="category"
                  label="category"
                  type="text"
                  id="category"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="From Date"
                    name="date"
                    id="date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
        </Container>

        <Divider variant="middle" />
        <br />
        {isLoading ? <LoadingSpinner /> : <NewsGrid articles={articles} />}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
