import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    // Load existing chat data from local storage on component mount
    const storedChatData = JSON.parse(localStorage.getItem("chatData")) || [];
    setChatData(storedChatData);
    // TODO remove this
    localStorage.setItem("email", "test@gmail.com");
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    let requestText = inputText.trim();
    let sessionId = localStorage.getItem("email").replace(/[^a-zA-Z0-9]/g, "");
    if (
      inputText.trim().toLowerCase() === "yes" ||
      inputText.trim().toLowerCase() === "no"
    ) {
      requestText = requestText + ":" + localStorage.getItem("email");
    }

    // Make POST API call to backend
    try {
      const response = await axios.post(
        "https://xalxtayttk.execute-api.us-east-1.amazonaws.com/prod/recognize",
        { requestText, sessionId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      console.log(responseData);
      // Update chat data
      const updatedChat = [
        ...chatData,
        { message: inputText.trim(), fromUser: true },
        { message: responseData, fromUser: false },
      ];

      setChatData(updatedChat);

      // Save updated chat data to local storage
      localStorage.setItem("chatData", JSON.stringify(updatedChat));

      // Clear input
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="chat-messages">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${chat.fromUser ? "user" : "bot"}`}
            >
              {chat.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      {!isOpen && (
        <div className="chat-icon" onClick={toggleChat}>
          Chat
        </div>
      )}
    </div>
  );
};

export default ChatBot;
