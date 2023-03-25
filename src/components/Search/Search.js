import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Search as SearchIcon } from "@mui/icons-material";
import dayjs from "dayjs";

const theme = createTheme();
export default function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [dateFilter, setDateFilter] = useState(dayjs(new Date()));
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const payload = {
      keyword: keyword,
      date: dayjs(dateFilter).format("YYYY-MM-DD"),
      category: categoryFilter,
      source: sourceFilter,
    };
    onSearch(payload);
  };

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="lg">
          <Box
            component="form"
            noValidate
            onSubmit={handleSearch}
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
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    fullWidth
                    label="From Date"
                    name="date"
                    id="date"
                    value={dateFilter}
                    onChange={(newValue) => setDateFilter(newValue)}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  fullWidth
                  name="category"
                  label="category"
                  type="text"
                  id="category"
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  fullWidth
                  name="source"
                  label="source"
                  type="text"
                  id="source"
                  value={sourceFilter}
                  onChange={(event) => setSourceFilter(event.target.value)}
                />
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
      </main>
    </ThemeProvider>
  );
}
