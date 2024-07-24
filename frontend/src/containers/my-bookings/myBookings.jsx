import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { getBookings } from './apiUtils';
import { rooms } from '../home/constants';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  useEffect(() => {
    const getData = async() => {
      const res = await getBookings({ email });
      const finalRes = res?.map((resItem) => ({ ...resItem, ...rooms?.find((room) => room.id == resItem.id) }));
      setBookings(finalRes);
    }
    getData();
  }, []);
console.log(bookings);
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="div" gutterBottom>
          My Bookings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Room Name</TableCell>
                <TableCell>From Date</TableCell>
                <TableCell>To Date</TableCell>
                <TableCell>Number of Guests</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.bookingReference}>
                  <TableCell>{booking.bookingReference}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{new Date(booking.fromDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.toDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>
                    {booking.status === 'failed' ? (
                      <Chip variant="outlined" color="error" label={booking.status} />
                    ) : (
                      <Chip variant="outlined" color="success" label={booking.status} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant='contained' onClick={() => navigate(`/room/?roomId=${booking.id}`)} style={{ outline: 'none' }}>View</Button>
                    <Button variant='outlined' color='error' style={{ marginLeft: '20px', outline: 'none' }}>Cancel Booking</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default MyBookings;
