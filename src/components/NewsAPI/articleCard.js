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
          image={props.article.urlToImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.article.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.article.author}
          <Typography>{props.article.publishedAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
