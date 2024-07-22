import React, { useState } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";
import RoomCard from "../../components/card";
import { rooms } from "./constants";
import './style.scss';
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onClickCard = (id) => {
    navigate('/room?roomId=' + id);  
  };

  return (
    <div className="home">
      <NavBar/>
      <Grid container spacing={2} className="home-cards">
        {rooms.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} onClick={() => onClickCard(room?.id)}>
            <RoomCard 
              image={room?.image}
              name={room?.name}
              beds={room?.beds}
            />
          </Grid>
        ))}
      </Grid>
      <footer className="App-footer">
        <ChatBot />
      </footer>
    </div>
  );
};

export default Home;
