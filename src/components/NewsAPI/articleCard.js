import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

import "../../styles/main.css";

export default function ArticleCard(props) {
  const goToArticle = () => {
    window.open(props.article.article, "_blank", "noreferrer");
  };
  return (
    <Card className="root" onClick={goToArticle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.article.urlToImage}
          alt="newsapi alt"
        />
        <CardContent className="content">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="cart-title"
          >
            {props.article.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="card-body"
            component="p"
          >
            {props.article.description}
          </Typography>
        </CardContent>
        <div className="footer">
          <Typography variant="body2" color="textSecondary" component="p">
            {props.article.author}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(props.article.publishedAt).toDateString()}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}
