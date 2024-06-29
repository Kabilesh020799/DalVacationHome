import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const agentId = "123245asdffsd"; // Replace with your agentId

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.post(
          'https://cors-anywhere.herokuapp.com/https://us-central1-sample-311412.cloudfunctions.net/getTicketDetails',
          { agentId },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-requested-with': 'XMLHttpRequest' // Add x-requested-with header
            }
          }
        );
        const responseData = JSON.parse(response.data.body);
        console.log(responseData)
        setTickets(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, [agentId]);
  const handleCloseTicket = (ticketId) => {
    // Implement closing ticket logic here (if needed)
    console.log(`Closing ticket ${ticketId}`);
    // Example: You might want to update ticket status in backend or locally.
  };

  console.log('tickets',tickets)
  console.log('loading',loading)

  return (
    <div>
      <h1>Tickets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {tickets.length>0? (tickets.map(ticket => 
            <div key={ticket.ticketId}>
              <p>Ticket ID: {ticket.ticketId}</p>
              <p>Customer ID: {ticket.customerId}</p>
              <p>Agent ID: {ticket.agentId}</p>
              <p>Agent Name: {ticket.agentName}</p>
              <p>Query: {ticket.query}</p>
              <button onClick={() => handleCloseTicket(ticket.ticketId)}>Close Ticket</button>
            </div>
          )):""}
        </div>
      )}
    </div>
  );
};

export default Tickets;