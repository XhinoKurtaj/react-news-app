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
import { useSelector, useDispatch } from "react-redux";

import Feed from "../Feeds/Feed";
import API from "../../config/axiosConfig";
import { addNewsApi } from "../../redux/reducer";
import { getLastSevenDays } from "../../Utils/Helper";


const theme = createTheme();
export default function NewsAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const dataArticles = useSelector((state) => state.NewsReducer.NewsAPI);
  useEffect(() => {
    if (Object.keys(dataArticles).length !== 0) {
      setArticles(dataArticles.articles);
    }
  }, [dataArticles]);

  const handleSearch = async (payload) => {
    setIsLoading(true);
    const response = await API.get("newsapi/news", { params: payload });
    dispatch(addNewsApi({ articles: response.data.articles }));
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
    setIsLoading(true);

    const sevenDaysAgo = dayjs(new Date(getLastSevenDays())).format(
      "YYYY-MM-DD"
    );
    const payload = {
      [item.type]: item.feed,
      date: sevenDaysAgo,
    };
    const response = await API.get("newsapi/news", { params: payload });
    setArticles(response.data.articles);
    dispatch(addNewsApi({ articles: response.data.articles }));
    setIsLoading(false);
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
