import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';
import './BookingConfirmation.css'; // Importing the redeveloped external CSS
import { useReactToPrint } from 'react-to-print';

function BookingConfirmation() {
  const location = useLocation();
  const { visitor } = location.state;
  const { _id, date, time, tickets, fname, lname, email, phone, city, country } = visitor;

  // Calculate total amount
  const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);

  // Function to handle payment process
  const handlePayNow = () => {
    alert('Redirecting to payment gateway...');
  };

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    alert('Generating PDF...');
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    DocumentTitle: "Reservation Confirmation",
    onAfterPrint: () => alert("Successfully downloaded")
  });

  return (
    <div>
      <NavigationBar />
      <div className="custom-confirmation-wrapper">


        <button className="custom-pdf-button" onClick={handlePrint}>Download PDF</button>


        <div className="custom-confirmation-box">
         <div ref={componentRef}>
          <h2 className="custom-confirmation-title">Reservation Confirmed</h2>
          <p className="custom-confirmation-message">
            Thank you for your reservation, {fname}! Here are your booking details:
          </p>
          <ul className="custom-details-list">
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
          
          <div className="custom-button-wrapper">
          </div>
            <button className="custom-pay-button" onClick={handlePayNow}>Pay Now</button>
          </div>
          
        </div>

      </div>
      <FooterComp />
    </div>
  );
}

export default BookingConfirmation;