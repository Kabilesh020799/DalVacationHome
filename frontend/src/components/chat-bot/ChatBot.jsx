import { useState, useContext } from "react";
import "./Chatbot.css";
import ChatBotContext from "./ChatBotContext";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const { messages, addMessage, isOpen, toggleChat } = useContext(ChatBotContext);

  const handleSend = async () => {
    if (input.trim()) {
      addMessage({ type: "user", text: input });
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();
      addMessage({ type: "bot", text: data.response });
      setInput("");
    }
  };

  return (
    <div className={`chat-container ${isOpen ? "open" : ""}`}>
      <div className="chat-header">
        <h4>Chatbot</h4>
        <button onClick={toggleChat}>Close</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? "Hide" : "Chat"}
      </button>
    </div>
  );
};

export default Chatbot;
