import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/Nav";
import Button from "@mui/material/Button";
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

import Feed from "../components/Feeds/Feed";

const theme = createTheme();

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      keyword: form.get("keyword"),
      source: form.get("source"),
      category: form.get("category"),
    };

    const isEmpty = Object.values(payload).every((x) => x === null || x === "");
    if (isEmpty) {
      alert("OBJ is empty");
      setIsLoading(false);
      return;
    }
    payload.fromDate = form.get("date");

    const response = await API.get("news", { params: payload });
    setArticles(response.data.articles);

    setIsLoading(false);
  };

  const formatDate = () => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const feedSearch = async (item) => {
    const payload = {
      [item.type]: item.feed.trim(),
      fromDate: formatDate().trim(),
    };
    const response = await API.get("news", { params: payload });
    debugger;
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />

      <main>
        <Container maxWidth="lg">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} lg={3}>
                <TextField
                  fullWidth
                  name="keyword"
                  label="keyword"
                  type="text"
                  id="keyword"
                  value={criteria}
                  onChange={(event) => setCriteria(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  fullWidth
                  name="source"
                  label="source"
                  type="text"
                  id="source"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  disabled={category.length > 0}
                />
              </Grid>

              <Grid item xs={12} lg={3}>
                <TextField
                  fullWidth
                  name="category"
                  label="category"
                  type="text"
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  disabled={source.length > 0}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="From Date"
                    name="date"
                    id="date"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
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

        <Feed searchByFeed={feedSearch} />

        <br />
        <Divider variant="middle" />
        {isLoading ? <LoadingSpinner /> : <NewsGrid articles={articles} />}
      </main>
    </ThemeProvider>
  );
}
