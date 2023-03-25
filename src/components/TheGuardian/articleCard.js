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
          // image={props.article.urlToImage}
          alt="the guardian"
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
  );
}
