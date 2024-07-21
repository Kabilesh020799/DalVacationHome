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

  const closeChatWindow = (e) => {
    e.preventDefault();
    handleChatClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputMessage("");
    ongoingChats.sendMessage(inputMessage, currentChat, ongoingChats.userId);
  };

  return (
    <div className="chat-window">
      <div className="chat-nav">
        <button className="close-button" onClick={closeChatWindow}>
          Close
        </button>
      </div>
      <div className="chat-content">
        {currentChat.messages.map((ch, index) => {
          return (
            <div
              className={
                ch.from === ongoingChats.userId
                  ? "content-right"
                  : "content-left"
              }
              key={ch.message}
            >
              {ch.message}
            </div>
          );
        })}
      </div>
      <div className="chat-input">
        <input
          onChange={(e) => setInputMessage(e.currentTarget.value)}
          value={inputMessage}
        ></input>
        <button disabled={inputMessage === ""} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default SupportChat;
