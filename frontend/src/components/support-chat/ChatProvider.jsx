import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  firestore,
  query,
  where,
  collection,
  onSnapshot,
} from "../../config/firebase";
import { doc, or, setDoc } from "firebase/firestore";

const ChatContext = createContext(null);

function ChatProvider({ children }) {
  const userId = "raj@gmail.com"; // Fetch from auth
  const userType = "CUSTOMER";
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chatsRef = collection(firestore, "tickets");
    const chatsQuery = query(
      chatsRef,
      or(where("customerId", "==", userId), where("agentId", "==", userId))
    );

    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const tempCollections = [];
      querySnapshot.forEach((doc) => {
        tempCollections.push(doc.data());
      });
      console.log("Current chats: ", tempCollections);
      setLoading(false);
      setChats(tempCollections);
    });

    return () => {
      unsubscribe();
    };
  }, [userId, userType]);

  const sendMessage = async (inputMessage, currentChat, userId) => {
    const to =
      currentChat.agentId === userId
        ? currentChat.customerId
        : currentChat.agentId;

    const message = {
      from: userId,
      to: to,
      message: inputMessage,
      read: false,
    };

    currentChat.messages.push(message);
    console.log(currentChat);
    try {
      const chatDocRef = doc(firestore, "tickets", currentChat.ticketId);

      await setDoc(chatDocRef, currentChat);

      console.log("Chat saved successfully!");
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  const markAsRead = async (currentChat, userId) => {
    currentChat.messages.forEach((message) => {
      if (message.to === userId) {
        message.read = true;
      }
    });

    console.log(currentChat);

    try {
      const chatDocRef = doc(firestore, "tickets", currentChat.ticketId);

      await setDoc(chatDocRef, currentChat);

      console.log("Chat read successfully!");
    } catch (error) {
      console.error("Error saving chat:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats: chats,
        loading: loading,
        userId: userId,
        userType: userType,
        sendMessage: sendMessage,
        markAsRead: markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext };
export default ChatProvider;
