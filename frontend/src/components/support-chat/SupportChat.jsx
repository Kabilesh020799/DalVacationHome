import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./ChatProvider";
import "./style.css";

function SupportChat({ ticketId, handleChatClose }) {
  const ongoingChats = useContext(ChatContext);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (ongoingChats.loading) {
      return;
    }

    ongoingChats.markAsRead(currentChat, ongoingChats.userId);
  });

  if (ongoingChats.loading) {
    return <div>Loading chats...</div>;
  }
  const currentChat = ongoingChats.chats.find(
    (chat) => chat.ticketId === ticketId
  );

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const closeChatWindow = (e) => {
    e.preventDefault();
    setInputMessage("");
    handleChatClose();
  };

  const handleKeyDown = (e) => {
    console.log("key down");
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    setInputMessage("");
    ongoingChats.sendMessage(inputMessage, currentChat, ongoingChats.userId);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <button className="close-button-bot" onClick={closeChatWindow}>
          X
        </button>
      </div>
      <div className="chat-messages-support">
        {currentChat.messages.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${
              chat.from === ongoingChats.userId ? "user" : "bot"
            }`}
          >
            <span className="chat-sender">{chat.from}</span>
            <div
              className={`chat-content ${
                chat.from === ongoingChats.userId ? "user" : "bot"
              }`}
            >
              {chat.from === ongoingChats.userId ? (
                chat.message
              ) : (
                <span dangerouslySetInnerHTML={{ __html: chat.message }} />
              )}
            </div>
            <span className="chat-time">{new Date().toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default SupportChat;
