import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function ArticleCard(props) {
  const { article } = props;

  return (
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
  );
}
