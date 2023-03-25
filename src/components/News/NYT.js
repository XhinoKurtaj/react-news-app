import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import API from "../../config/axiosConfig";

export default function NewsComponentNYT(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState(props.articles);

  const [page, setPage] = useState(1);
  // const [data, setData] = useState(props.data);
  // const [page, setPage] = useState(data.currentPage);

  debugger;
  const handlePageChange = async (event, value) => {
    setIsLoading(true);
    event.preventDefault();
    const payload = {
      keyword: props.keyword,
      // source: props.source,
      // fromDate: props.fromDate,
      page: value,
    };

    const response = await API.get("newyourktimes/news", { params: payload });
    debugger;
    setArticles(response.data.response.docs);
    setIsLoading(false);
    setPage(value);
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item key={article._id} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://www.nytimes.com/${article.multimedia[0]?.url}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {article.headline.main}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.abstract}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {article.byline.original}
                    <Typography>{article.pub_date}</Typography>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <br />
      <Stack spacing={2} style={{ alignItems: "center" }}>
        <Pagination
          count={200}
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
