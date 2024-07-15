import React from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import NavBar from "../navbar/navbar";

const Home = () => {
  return (
    <div>
      <NavBar/>
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
