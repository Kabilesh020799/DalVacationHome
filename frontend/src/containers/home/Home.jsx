import React, { useState, useEffect } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";
import { signOut, getCurrentUser } from 'aws-amplify/auth';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }

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


  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       await currentAuthenticatedUser();
  //       setIsLoggedIn(true);
  //     } catch {
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkUser();
  // }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
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
