import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const sevenDaysAgoTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000;
    const sevenDaysAgoDate = new Date();
    sevenDaysAgoDate.setTime(sevenDaysAgoTimestamp);
    setDateFilter(dayjs(sevenDaysAgoDate));
  }, []);

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
            <TextField
              fullWidth
              name="keyword"
              label="keyword"
              type="text"
              id="keyword"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              sx={{ mt: 3 }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                fullWidth
                label="From Date"
                name="date"
                id="date"
                value={dateFilter}
                onChange={(newValue) => setDateFilter(newValue)}
                format="YYYY-MM-DD"
                sx={{ mt: 3 }}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              name="category"
              label="category"
              type="text"
              id="category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              sx={{ mt: 3 }}
            />

            <TextField
              fullWidth
              name="source"
              label="source"
              type="text"
              id="source"
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              sx={{ mt: 3 }}
            />

            <Button
              variant="outlined"
              type="submit"
              fullWidth
              startIcon={<SearchIcon />}
              sx={{ mt: 3 }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
