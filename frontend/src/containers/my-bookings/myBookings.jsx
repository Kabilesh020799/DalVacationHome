import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getBookings, postFeedback } from "./apiUtils";
import { rooms } from "../home/constants";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../components/chat-bot/ChatBot";

const FeedbackModal = ({ open, handleClose, handleSubmit, feedback, setFeedback }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your feedback for this booking.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Feedback"
          type="text"
          fullWidth
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    const getData = async () => {
      const res = await getBookings({ email });
      const finalRes = res?.map((resItem) => ({
        ...resItem,
        ...rooms?.find((room) => room.id == resItem.id),
      }));
      setBookings(finalRes);
    };
    getData();
  }, [email]);

  const handleOpen = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFeedback("");
  };
console.log(selectedBooking)
  const handleSubmit = () => {
    console.log(`Feedback for booking ${selectedBooking.bookingReference}: ${feedback}`);
    postFeedback({
      bookingref: selectedBooking?.bookingReference,
      feedback,
      room_id: selectedBooking?.id,
      sentiment_category: ""
    })
    handleClose();
  };

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
                <TableCell style={{ fontWeight: "bold" }}>Booking ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Room Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>From Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>To Date</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Number of Guests</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.bookingReference}>
                  <TableCell>{booking.bookingReference || "-"}</TableCell>
                  <TableCell>{booking.name || "-"}</TableCell>
                  <TableCell>
                    {new Date(booking.fromDate).toLocaleDateString() || "-"}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.toDate).toLocaleDateString() || "-"}
                  </TableCell>
                  <TableCell>{booking.guests || "-"}</TableCell>
                  <TableCell>
                    {booking.status === "failed" ? (
                      <Chip variant="outlined" color="error" label={booking.status} />
                    ) : (
                      <Chip variant="outlined" color="success" label={booking.status} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/room/?roomId=${booking.id}`)}
                      style={{ outline: "none" }}
                    >
                      View
                    </Button>
                    {booking.status !== "failed" ? (
                      <Button
                        variant="outlined"
                        color="success"
                        style={{ marginLeft: "20px", outline: "none" }}
                        onClick={() => handleOpen(booking)}
                      >
                        Feedback
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ChatBot />
      <FeedbackModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </Container>
  );
};

export default MyBookings;
