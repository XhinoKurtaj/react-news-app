import React, { useState, useMemo, useEffect } from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArticleList from "./articles";
import SearchForm from "../Search/Search";
import PaginationControlled from "../Pagination/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Feed from "../Feeds/Feed";
import API from "../../config/axiosConfig";

const theme = createTheme();
export default function NewsAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = async (payload) => {
    setIsLoading(true);
    const response = await API.get("newsapi/news", { params: payload });
    setArticles(response.data.articles);
    setIsLoading(false);
  };

  const chunkOfArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = async (event, value) => {
    if (value <= Math.ceil(articles.length / itemsPerPage)) {
      setCurrentPage(value);
    }
  };

  const feedSearch = async (item) => {
    const payload = {
      [item.type]: item.feed,
      fromDate: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    const response = await API.get("newsapi/news", { params: payload });
    setArticles(response.data.articles);
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>NewsAPI</h1>
      <main>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Feed searchByFeed={feedSearch} />
              <Divider sx={{ mb: 2, mt: 2 }} />

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ArticleList articles={chunkOfArticles} />
              )}

              {articles.length > 0 ? (
                <>
                  <Divider sx={{ mb: 2, mt: 2 }} />
                  <PaginationControlled
                    currentPage={currentPage}
                    lastPage={Math.ceil(articles.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} lg={3}>
              <SearchForm onSearch={handleSearch} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
