import React, { useState, useMemo, useEffect } from "react";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";

import ArticleList from "./articles";
import SearchForm from "../Search/Search";
import PaginationControlled from "../Pagination/Pagination";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Feed from "../Feeds/Feed";
import API from "../../config/axiosConfig";
import { addTheGuardian } from "../../redux/reducer";
import { getLastSevenDays } from "../../Utils/Helper";

const theme = createTheme();
export default function TheGuardian() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [seachData, setSearchData] = useState({});

  const dispatch = useDispatch();
  const dataArticles = useSelector((state) => state.NewsReducer.TheGuardian);

  useEffect(() => {
    if (Object.keys(dataArticles).length !== 0) {
      setArticles(dataArticles.articles);
      setTotalResults(dataArticles.totalResults);
      setCurrentPage(dataArticles.currentPage);
      setLastPage(dataArticles.lastPage);
    }
  }, [dataArticles]);

  const __updateStates = (response) => {
    setArticles(response.data.articles);
    setTotalResults(response.data.totalResults);
    setCurrentPage(response.data.currentPage);
    setLastPage(response.data.lastPage);
  };

  const __dispatchToState = (response) => {
    const storeData = {
      articles: response.data.articles,
      totalResults: response.data.totalResults,
      currentPage: response.data.currentPage,
      lastPage: response.data.lastPage,
    };
    dispatch(addTheGuardian(storeData));
  };

  const handleSearch = async (payload) => {
    setIsLoading(true);
    setSearchData(payload);
    payload.currentPage = currentPage;
    const response = await API.get("guardian/news", { params: payload });
    __dispatchToState(response);
    __updateStates(response);
    setIsLoading(false);
  };

  const handlePageChange = async (event, value) => {
    setIsLoading(true);
    const payload = {
      ...seachData,
      page: value,
    };
    const response = await API.get("guardian/news", { params: payload });
    response.data.currentPage = value;
    __updateStates(response);
    setIsLoading(false);
  };

  const feedSearch = async (item) => {
    setIsLoading(true);
    const sevenDaysAgo = dayjs(new Date(getLastSevenDays())).format(
      "YYYY-MM-DD"
    );
    const payload = {
      [item.type]: item.feed,
      date: sevenDaysAgo,
    };
    setSearchData(payload);
    const response = await API.get("guardian/news", { params: payload });
    __dispatchToState(response);
    __updateStates(response);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>The Guardian</h1>
      <main>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Feed searchByFeed={feedSearch} />
              <Divider sx={{ mb: 2, mt: 2 }} />
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ArticleList articles={articles} />
              )}
              {articles.length > 0 ? (
                <>
                  <Divider sx={{ mb: 2, mt: 2 }} />
                  <PaginationControlled
                    currentPage={currentPage}
                    lastPage={lastPage}
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
