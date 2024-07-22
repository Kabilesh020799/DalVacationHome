import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import SupportChat from "../../components/support-chat/SupportChat";
import ChatBot from "../../components/chat-bot/ChatBot";
//request access to server: https://cors-anywhere.herokuapp.com/

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketId, setTicketId] = useState("");
  const [showChat, setShowChat] = useState(false);

  localStorage.setItem("userId", "test@gmail.com"); //TODO: do this in login page
  localStorage.setItem("userType", "CUSTOMER"); //TODO: do this in login page
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.post(
          "https://us-central1-sample-311412.cloudfunctions.net/getTickets",
          { userId: userId, userType: userType },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        const responseData = response.data;
        console.log(responseData);

        console.log(responseData);
        setTickets(responseData["tickets"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  const handleCloseTicket = async (ticketId) => {
    console.log('close ticket button clicked')
    try {

      // Find the ticket with the given ID
      const ticket = tickets.find((ticket) => ticket.ticketId === ticketId);
            
      // Check if the ticket is already closed
      if (ticket && ticket.status === "closed") {
          alert('Ticket is already closed.');
          return; // Exit the function if the ticket is already closed
      }

      const response = await axios.post(
        "https://us-central1-sample-311412.cloudfunctions.net/closeTicket",
        { ticketId },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      console.log(`Ticket ${ticketId} closed successfully.`, response.data);

      // update the ticket status locally
      setTickets(
        tickets.map((ticket) =>
          ticket.ticketId === ticketId
            ? { ...ticket, status: "closed" }
            : ticket
        )
      );
    } catch (error) {
      console.error(`Error closing ticket ${ticketId}:`, error);
    }
  };

  function handleShowChatClick(e, ticketId) {
    e.preventDefault();
    setShowChat(true);
    setTicketId(ticketId);
  }

  function handleChatClose() {
    setShowChat(false);
    setTicketId("");
  }

  console.log(tickets);
  console.log("loading", loading);

  return (
    <div className="ticket-container">
      <h1 className="heading">Tickets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ticket-list">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.ticketId} className="ticket-card">
                <p>
                  <strong>Ticket ID:</strong> {ticket.ticketId}
                </p>
                <p>
                  <strong>Agent ID:</strong>
                  {ticket.agentId}
                </p>
                <p>
                  <strong>Customer ID:</strong> {ticket.customerId}
                </p>
                <p>
                  <strong>Status:</strong> {ticket.status}
                </p>
                <button
                  onClick={() => handleCloseTicket(ticket.ticketId)}
                  className="close-button"
                >Close Ticket</button>
                <br></br>
                <br></br>
                {ticket.status !== "closed" && (
                  <button
                    onClick={(e) => handleShowChatClick(e, ticket.ticketId)}
                  >
                    Show Chat
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
          {showChat && (
            <SupportChat
              ticketId={ticketId}
              handleChatClose={handleChatClose}
            />
          )}
          {/* <ChatBot /> */}
        </div>
      )}
    </div>
  );
};

export default Tickets;
