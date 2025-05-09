import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const RoomCard = ({ image, name, beds }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Number of beds: {beds}
          </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoomCard;
