import React, { useState, useEffect } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";
import RoomCard from "../../components/card";
import { rooms } from "./constants";
import './style.scss';
import Grid from "@mui/material/Grid";
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickCard = (id) => {
    navigate('/room/?roomId=' + id);  
  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };

  useEffect(() => {
    const checkUser = async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  return (
    <div className="home">
      <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
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
