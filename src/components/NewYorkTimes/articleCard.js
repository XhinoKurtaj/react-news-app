import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ArticleCard(props) {
  const { article } = props;

  return (
    <Card className="root">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`https://www.nytimes.com/${article.multimedia[0]?.url}`}
          alt="new york times alt"
        />
        <CardContent className="content">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="cart-title"
          >
            {article.headline.main}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="card-body"
            component="p"
          >
            {article.abstract}
          </Typography>
        </CardContent>
        <div className="footer">
          <Typography variant="body2" color="textSecondary" component="p">
            {article.byline.original}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(article.pub_date).toDateString()}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
}
