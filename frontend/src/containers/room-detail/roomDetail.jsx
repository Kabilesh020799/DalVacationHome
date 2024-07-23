import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Typography, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { rooms } from '../home/constants';
import NavBar from '../navbar/navbar';
import { confirmBooking } from './apiUtils';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomDetail = () => {
  const query = useQuery();
  const roomId = query.get('roomId');
  const room = rooms.find((room) => room?.id == roomId) || {};
  const email = localStorage.getItem("email");
  
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmBooking({
      email,
      roomId,
      fromDate,
      toDate,
    })
    setOpen(false);
  }

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
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book {room.name}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
            <DatePicker
              label="To Date"
              sx={{ marginLeft: '20px', marginBottom: '20px' }}
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
            />
          </LocalizationProvider>
          <TextField
            label="Number of Guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomDetail;
