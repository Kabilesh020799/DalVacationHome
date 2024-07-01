import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
//request access to server: https://cors-anywhere.herokuapp.com/

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  localStorage.setItem('agentId', '123245asdffsd'); //TODO: do this in login page
  const agentId = localStorage.getItem('agentId'); 

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.post(
          'https://cors-anywhere.herokuapp.com/https://us-central1-sample-311412.cloudfunctions.net/getTicketDetails',
          { agentId },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-requested-with': 'XMLHttpRequest' 
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

  const handleCloseTicket = async (ticketId) => {
    try {
      const response = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://us-central1-sample-311412.cloudfunctions.net/closeTicket',
        { ticketId },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest' 
          }
        }
      );
      console.log(`Ticket ${ticketId} closed successfully.`, response.data);

      // update the ticket status locally
      setTickets(tickets.map(ticket =>
        ticket.ticketId === ticketId ? { ...ticket, status: 'closed' } : ticket
      ));
    } catch (error) {
      console.error(`Error closing ticket ${ticketId}:`, error);
    }
  };

  console.log('tickets',tickets)
  console.log('loading',loading)

  return (
    <div className="ticket-container">
      <h1 className="heading">Tickets</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="ticket-list">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket.ticketId} className="ticket-card">
                <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
                <p><strong>Customer ID:</strong> {ticket.customerId}</p>
                <p><strong>Query:</strong> {ticket.query}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
                <button onClick={() => handleCloseTicket(ticket.ticketId)} className="close-button">Close Ticket</button>
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tickets;