import React, { useState } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";
import { Card } from "@mui/material";

const Home = () => {
  // Move this logic to tickets screen after discussing with Shrav

  return (
    <div>
      <NavBar/>
      <header>
        <h1>Welcome to My Website</h1>
      </header>
      <main>
        <p>Homepage content...</p>
      </main>
      <div>
        <Card
          image='https://example.com/room-image.jpg'
          name='Deluxe Room'
          beds={2}
        />
      </div>
      <footer className="App-footer">
        <ChatBot />
      </footer>
    </div>
  );
};

export default Home;
