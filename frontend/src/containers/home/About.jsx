import React from "react";
import ChatBot from "../../components/chat-bot/ChatBot";

const About = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>About Page</h1>
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

export default About;
