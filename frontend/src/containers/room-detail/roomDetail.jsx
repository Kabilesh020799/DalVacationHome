import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Rating,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { rooms } from "../home/constants";
import { confirmBooking, getFeedbacks } from "./apiUtils";
import ChatBot from "../../components/chat-bot/ChatBot";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomDetail = () => {
  const query = useQuery();
  const roomId = query.get("roomId");
  const room = rooms.find((room) => room?.id == roomId) || {};
  const email = localStorage.getItem("email");
  const userType = localStorage.getItem("userType");

  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);

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
      guests,
    });
    setOpen(false);
  };

  const getSentiment = (sentiment) => {
    if(sentiment === 'negative') {
      return (<b style={{ color: 'red' }}>Negative</b>);
    } else if(sentiment === 'positive') {
      return (<b style={{ color: 'green' }} color="green">Positive</b>);
    } else {
      return (<b style={{ color: 'gray' }}>Neutral</b>)
    }
  };

  useEffect(() => {
    const getAllFeedbacks = async() => {
      const res = await getFeedbacks({ room_id: parseInt(roomId) }); 
      setFeedbacks(res?.data?.body);
    }
    if(roomId)  {
      getAllFeedbacks();
    }
  }, [roomId]);

  return (
    <div>
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "450px",
        }}
        alt={room.name}
        src={room.image}
      />
      <Container>
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h4" component="div">
              {room.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
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
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            {room?.amenities?.map((amenity) => (
              <Chip
                key={amenity}
                label={amenity}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="div" gutterBottom>
              Feedback
            </Typography>
            {feedbacks.map((feedback, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div">
                      {feedback.userName}
                    </Typography>
                    <Typography variant="h5" component="div">
                      { getSentiment(feedback?.sentiment_category) }
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feedback.feedback}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
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
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
            />
            <DatePicker
              label="To Date"
              sx={{ marginLeft: "20px", marginBottom: "20px" }}
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
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
      {userType !== null && userType === "Agent" ? null : <ChatBot />}
    </div>
  );
};

export default RoomDetail;
