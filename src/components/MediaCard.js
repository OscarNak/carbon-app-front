import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  const {
      name,
      content,
      imgUrl,
      buttonName,
      page
  } = props

  return (
    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        component="img"
        height="220"
        image={imgUrl}
        alt="figure"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} 
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          <Link style={{textDecoration: "none", color: "blue"}} to={`/${page}`}>
            {buttonName}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
