import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ArticleCard(props) {
  const { article } = props;
  const goToArticle = () => {
    window.open(article.webUrl, "_blank", "noreferrer");
  };

  return (
    <Card className="root" onClick={goToArticle}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://1000logos.net/wp-content/uploads/2021/03/The-Guardian-logo-500x325.jpg"
          alt="the guardian alt"
        />
        <CardContent className="content">
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="cart-title"
          >
            {article.webTitle}
          </Typography>
        </CardContent>
        <div className="footer">
          <Typography variant="body2" color="textSecondary" component="p">
            {article.sectionName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(article.webPublicationDate).toDateString()}
          </Typography>
        </div>
      </CardActionArea>
    </Card>

    // <Card className="root">
    //   <CardActionArea onClick={goToArticle}>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={
    //         "https://1000logos.net/wp-content/uploads/2021/03/The-Guardian-logo-500x325.jpg"
    //       }
    //       alt="the guardians alt"
    //     />
    //     <CardContent className="content">
    //       <Typography
    //         gutterBottom
    //         variant="h5"
    //         component="h2"
    //         className="cart-title"
    //       >
    //         {article.webTitle}
    //       </Typography>
    //     </CardContent>
    //     <div className="footer">
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         {article.sectionName}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         {new Date(article.webPublicationDate).toDateString()}
    //       </Typography>
    //     </div>
    //   </CardActionArea>
    // </Card>
  );
}
