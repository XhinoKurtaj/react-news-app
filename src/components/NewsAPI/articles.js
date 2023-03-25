import { Grid } from "@mui/material";
import ArticleCard from "./articleCard";

export default function ArticleList({ articles }) {
  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid item key={article._id} xs={12} sm={6} md={4}>
          <ArticleCard article={article} />
        </Grid>
      ))}
    </Grid>
  );
}