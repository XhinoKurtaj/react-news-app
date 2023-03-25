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

export default function NewsComponent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState(props.articles);
  const [data, setData] = useState(props.data);
  const [page, setPage] = useState(data.currentPage);

  debugger;
  const handlePageChange = async (event, value) => {
    setIsLoading(true);
    event.preventDefault();
    const payload = {
      keyword: props.keyword,
      source: props.source,
      fromDate: props.fromDate,
      page: value,
    };

    const response = await API.get("guardian/news", { params: payload });
    setArticles(response.data.articles);
    let copyData = { ...response.data };
    delete copyData.articles;
    setData(copyData);
    setIsLoading(false);
    setPage(value);
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item key={article} xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    // image={props.article.urlToImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {article.webTitle}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    {article.sectionName}
                    <Typography>{article.webPublicationDate}</Typography>
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
          count={data.pages}
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
