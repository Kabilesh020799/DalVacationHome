import React from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import Header from "../../components/header/header";
import Hotel from "../../components/hotels/hotel";

const Home = () => {
  return (
    <div className="App">
      <Header /> 
      <Hotel />
        <p>Homepage content...</p>
      <footer className="App-footer">
        <ChatBot />
      </footer>
    </div>
  );
};

export default Home;
