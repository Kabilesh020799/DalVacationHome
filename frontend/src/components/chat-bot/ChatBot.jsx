import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  let email = localStorage.getItem("email");
  if (email == null) {
    email = "";
  }

  useEffect(() => {
    // clear this storage on logout
    const storedChatData = JSON.parse(localStorage.getItem("chatData")) || [];
    setChatData(storedChatData);
  }, [email]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

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

    setLoading(true);

    let requestText = inputText.trim();
    let sessionId = "";
    if (email !== "") {
      sessionId = email.replace(/[^a-zA-Z0-9]/g, "").substring(0, 5);
    }

    if (
      inputText.trim().toLowerCase() === "yes" ||
      inputText.trim().toLowerCase() === "no"
    ) {
      requestText = requestText + ":" + email;
    }

    if (sessionId === "") {
      sessionId = "xalxtayttk";
    }

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
      const timestamp = new Date().toLocaleTimeString();

      const updatedChat = [
        ...chatData,
        { message: inputText.trim(), fromUser: true, time: timestamp },
        { message: responseData, fromUser: false, time: timestamp },
      ];

      setChatData(updatedChat);
      localStorage.setItem("chatData", JSON.stringify(updatedChat));
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {
        !isOpen ? (
          <div className="chat-icon" onClick={toggleChat}>
            Bot
          </div>
        ) : (
          <div className={`chatbot ${isOpen ? "open" : ""}`}>
          <div className="chat-header">
            <button className="close-button-bot" onClick={handleClose}>
              X
            </button>
          </div>
          <div className="chat-messages">
            {chatData.map((chat, index) => (
              <div
                key={index}
                className={`chat-message ${chat.fromUser ? "user" : "bot"}`}
              >
                <span className="chat-sender">
                  {chat.fromUser ? "User" : "Bot"}
                </span>
                <div className={`chat-content ${chat.fromUser ? "user" : "bot"}`}>
                  {chat.fromUser ? (
                    chat.message
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: chat.message }} />
                  )}
                </div>
                <span className="chat-time">{chat.time}</span>
              </div>
            ))}
            {loading && (
              <div className="chat-message loading">
                <span className="chat-sender">Bot</span>
                <span>Loading...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          </div>
      )}
    </div>
  );
};

export default ChatBot;
