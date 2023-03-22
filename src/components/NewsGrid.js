import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import Container from "@mui/material/Container";

import NewsCard from "./NewsCard";

export default function NewsGrid(props) {
  const articles = props.articles;

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const currentItems = articles.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    if (value <= Math.ceil(articles.length / itemsPerPage)) {
      setPage(value);
    }
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {currentItems.map((article) => (
            <Grid item key={article} xs={12} sm={6} md={4}>
              <NewsCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <br />
      <Stack spacing={2} style={{ alignItems: "center" }}>
        <Pagination
          count={Math.ceil(articles.length / itemsPerPage)}
          page={page}
          variant="outlined"
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
        />
      </Stack>
    </>
  );
}
