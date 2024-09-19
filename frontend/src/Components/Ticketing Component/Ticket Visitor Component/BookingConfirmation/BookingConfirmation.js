import React from 'react';
import { useLocation } from 'react-router-dom';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';

function BookingConfirmation() {
  const location = useLocation();
  const { visitor } = location.state;
  const { _id, date, time, tickets, fname, lname, email, phone, city, country } = visitor;

  // Calculate total amount
  const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);

  return (
    <div>
      <NavigationBar />
      <div className="confirmation-container">
        <h2>Reservation Confirmed</h2>
        <p>Thank you for your reservation. Here are your booking details:</p>
        <ul>
          <li><strong>ID:</strong> {_id}</li>
          <li><strong>Name:</strong> {fname} {lname}</li>
          <li><strong>Email:</strong> {email}</li>
          <li><strong>Phone:</strong> {phone}</li>
          <li><strong>Date:</strong> {date}</li>
          <li><strong>Time:</strong> {time}</li>
          {tickets.map((ticket, index) => (
            <li key={index}><strong>{ticket.type}:</strong> {ticket.count} tickets at ${ticket.price} each</li>
          ))}
          <li><strong>City:</strong> {city}</li>
          <li><strong>Country:</strong> {country}</li>
          <li><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</li>
        </ul>
      </div>
      <FooterComp />
    </div>
  );
}

export default BookingConfirmation;