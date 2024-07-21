import React, { useState } from "react";
import ChatBot from "../../components/chat-bot/ChatBot";
import SupportChat from "../../components/support-chat/SupportChat";

const Home = () => {
  // Move this logic to tickets screen after discussing with Shrav
  const ticketId = "dab2af70-bb4a-4729-9082-f3c5afcb167e";
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Website</h1>
        {!showChat && (
          <button onClick={() => setShowChat(true)}>Show Chat</button>
        )}
        {showChat && (
          <SupportChat ticketId={ticketId} setShowChat={setShowChat} />
        )}
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
