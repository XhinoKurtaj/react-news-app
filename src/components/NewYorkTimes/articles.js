import { Grid } from "@mui/material";
import ArticleCard from "./articleCard";
import "../../styles/main.css";

export default function ArticleList({ articles }) {
  return (
    <Grid container spacing={2} className="scroll">
      {articles.map((article, _id) => (
        <Grid item key={_id} xs={12} sm={6} md={4}>
          <ArticleCard key={_id} article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
