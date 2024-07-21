import React, { useState } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";

const Home = () => {
  // Move this logic to tickets screen after discussing with Shrav

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Website</h1>
      </header>
      <main className="App-main">
        <p>Homepage content...</p>
      </main>
      <footer className="App-footer">
        <ChatBot />
      </footer>
    </div>
  );
};

export default Home;
