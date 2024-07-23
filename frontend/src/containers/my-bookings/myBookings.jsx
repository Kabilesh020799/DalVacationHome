import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import NavBar from '../navbar/navbar';

const sampleBookings = [
  {
    id: '1',
    roomName: 'Deluxe Room',
    fromDate: '2023-08-01T00:00:00Z',
    toDate: '2023-08-05T00:00:00Z',
    guests: 2,
  },
  {
    id: '2',
    roomName: 'Executive Room',
    fromDate: '2023-09-10T00:00:00Z',
    toDate: '2023-09-15T00:00:00Z',
    guests: 3,
  },
  {
    id: '3',
    roomName: 'Suite',
    fromDate: '2023-10-01T00:00:00Z',
    toDate: '2023-10-07T00:00:00Z',
    guests: 4,
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(sampleBookings);
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.roomName}</TableCell>
                  <TableCell>{new Date(booking.fromDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.toDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.guests}</TableCell>
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
