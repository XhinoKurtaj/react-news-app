import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
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
import { addNewYorkTimes } from "../../redux/reducer";
import { getLastSevenDays } from "../../Utils/Helper";

const theme = createTheme();
export default function NewYorkTimes() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [seachData, setSearchData] = useState({});
  const [notFoundArticle, setNotFoundArticle] = useState(false);

  const dispatch = useDispatch();
  const dataArticles = useSelector((state) => state.NewsReducer.NewYorkTimes);

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
    dispatch(addNewYorkTimes(storeData));
  };

  const handleSearch = async (payload) => {
    setNotFoundArticle(false);
    setIsLoading(true);
    setSearchData(payload);
    payload.currentPage = currentPage;
    const response = await API.get("newyourktimes/news", { params: payload });
    if (response.data.articles.length == 0) {
      setIsLoading(false);
      setNotFoundArticle(true);
    } else {
      __dispatchToState(response);
      __updateStates(response);
      setIsLoading(false);
    }
  };

  const handlePageChange = async (event, value) => {
    setIsLoading(true);
    const payload = {
      ...seachData,
      page: value,
    };
    const response = await API.get("newyourktimes/news", { params: payload });
    response.data.currentPage = value;
    __updateStates(response);
    setIsLoading(false);
  };

  const feedSearch = async (item) => {
    setNotFoundArticle(false);
    setIsLoading(true);
    const sevenDaysAgo = dayjs(new Date(getLastSevenDays())).format(
      "YYYY-MM-DD"
    );
    const payload = {
      [item.type]: item.feed,
      date: sevenDaysAgo,
    };
    const response = await API.get("newyourktimes/news", { params: payload });
    if (response.data.articles.length == 0) {
      setIsLoading(false);
      setNotFoundArticle(true);
    } else {
      __dispatchToState(response);
      __updateStates(response);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>New York Times</h1>
      <main>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <Feed searchByFeed={feedSearch} />
              <Divider sx={{ mb: 2, mt: 2 }} />

              {notFoundArticle ? (
                <main className="center-content">
                  <Typography>
                    <b>
                      Sorry we couldn't find any article that match your
                      criteria!
                    </b>
                  </Typography>
                </main>
              ) : (
                ""
              )}

              {isLoading ? (
                <main className="center-content">
                  <LoadingSpinner />
                </main>
              ) : (
                <ArticleList articles={articles} />
              )}

              {articles.length > 0 ? (
                <>
                  <Divider sx={{ mb: 2, mt: 2 }} />
                  <PaginationControlled
                    currentPage={currentPage}
                    lastPage={lastPage > 200 ? 200 : lastPage}
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
