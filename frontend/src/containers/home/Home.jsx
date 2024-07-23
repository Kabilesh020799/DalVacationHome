import React, { useState, useEffect } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";
import { signOut, getCurrentUser } from 'aws-amplify/auth';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
      <header>
        <h1>Welcome to My Website</h1>
      </header>
      <main>
        <p>Homepage content...</p>
      </main>
      <footer className="App-footer">
        <ChatBot />
      </footer>
    </div>
  );
};

export default Home;
