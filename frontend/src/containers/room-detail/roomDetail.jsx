import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { rooms } from '../home/constants';
import { Button, Chip } from '@mui/material';

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
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <Typography gutterBottom variant="h4" component="div">
              {room.name}
            </Typography>
            <Button variant="contained" color="primary">
              Book Now
            </Button>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {room?.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            <b>Number of beds:</b> {room.beds}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            <b>Price:</b> {room.price}
          </Typography>
          <div style={{ display:'flex', gap: '15px', marginTop: '20px' }}>
            {
              room?.amenities?.map((amenity) => <Chip key={amenity} label={amenity} color="primary" variant="outlined" />)
            }
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default RoomDetail;
