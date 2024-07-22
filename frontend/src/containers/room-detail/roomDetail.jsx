import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { rooms } from '../home/constants';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomDetail = () => {
  const query = useQuery();
  const roomId = query.get('roomId');
  const room = rooms.find((room) => room?.id == roomId) || {};

  return (
    <div>
      <Box
        component="img"
        sx={{
          width: '100%',
          height: '450px',
        }}
        alt={room.name}
        src={room.image}
      />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography gutterBottom variant="h4" component="div">
            {room.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Number of beds: {room.beds}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default RoomDetail;
