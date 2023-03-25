import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import NewsComponent from "../components/News/NewsComponent";

import API from "../config/axiosConfig";
import Feed from "../components/Feeds/Feed";

const theme = createTheme();

export default function TheGuardian() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [dateValue, setDateValue] = React.useState(dayjs(new Date()));
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      keyword: form.get("keyword"),
      source: form.get("source"),
    };

    const isEmpty = Object.values(payload).every((x) => x === null || x === "");
    if (isEmpty) {
      alert("OBJ is empty");
      setIsLoading(false);
      return;
    }

    payload.fromDate = form.get("date");
    const response = await API.get("guardian/news", { params: payload });
    setArticles(response.data.articles);
    let copyData = { ...response.data };
    delete copyData.articles;
    setResponseData(copyData);

    setIsLoading(false);
  };

  const feedSearch = async (item) => {
    const payload = {
      [item.type]: item.feed,
      fromDate: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    const response = await API.get("news", { params: payload });
    debugger;
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>The Guardian</h1>

      <main>
        <Container maxWidth="lg">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  name="keyword"
                  label="keyword"
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  name="source"
                  label="category"
                  type="text"
                  id="source"
                  value={source}
                  onChange={(event) => setSource(event.target.value)}
                  disabled={category.length > 0}
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    fullWidth
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <NewsComponent
            articles={articles}
            data={responseData}
            keyword={keyword}
            source={source}
          />
        )}
      </main>
    </ThemeProvider>
  );
}
