import React, { useState, useMemo, useEffect } from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArticleList from "./articles";
import SearchForm from "../Search/Search";
import PaginationControlled from "../Pagination/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import API from "../../config/axiosConfig";

const theme = createTheme();
export default function TheGuardian() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [seachData, setSearchData] = useState({});

  const handleSearch = async (payload) => {
    setIsLoading(true);
    setSearchData(payload);
    payload.currentPage = currentPage;

    const response = await API.get("guardian/news", { params: payload });
    setArticles(response.data.articles);
    setTotalResults(response.data.totalResults);
    setResultsPerPage(response.data.resultsPerPage);
    setCurrentPage(response.data.currentPage);
    setLastPage(response.data.lastPage);
    setIsLoading(false);
  };

  const handlePageChange = async (event, value) => {
    setIsLoading(true);
    const payload = {
      ...seachData,
      page: value,
    };

    const response = await API.get("guardian/news", { params: payload });

    setArticles(response.data.articles);
    setTotalResults(response.data.totalResults);
    setResultsPerPage(response.data.resultsPerPage);
    setCurrentPage(value);
    setLastPage(response.data.lastPage);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>The Guardian</h1>
      <main>
        <Container maxWidth="lg">
          <SearchForm onSearch={handleSearch} />
          <br />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <ArticleList articles={articles} />
              <br />
            </>
          )}

          {articles.length > 0 ? (
            <PaginationControlled
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={handlePageChange}
            />
          ) : (
            ""
          )}
        </Container>
      </main>
    </ThemeProvider>
  );
}
