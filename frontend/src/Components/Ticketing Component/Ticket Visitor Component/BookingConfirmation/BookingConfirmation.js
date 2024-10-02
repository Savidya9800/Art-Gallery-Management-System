import React from 'react';
import { useLocation } from 'react-router-dom';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';
import './BookingConfirmation.css'; // Importing the redeveloped external CSS
import jsPDF from 'jspdf';
import logo from '../../../Nav Component/logo.JPG';

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

  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add a background color for the title
    doc.setFillColor(167, 143, 81); // Light lavender background
    doc.rect(10, 10, 190, 15, 'F'); // Rectangle for title background

    // Add title to the PDF
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230); // Dark Slate Gray color for text
    doc.text('Reservation Confirmation', 14, 20);

    //Add logo
    const pageWidth = doc.internal.pageSize.getWidth();

    const imgWidth = 25; // Width of the logo
    const imgHeight = 20; // Height of the logo
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, 'JPEG', xPosition, 10, imgWidth, imgHeight);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); // Gray color
    doc.line(10, 30, 200, 30);

    // Information Section Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Navy color
    doc.text('Reservation Details', 14, 40);

    // Details Section
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for content

    let startY = 50;
    const lineHeight = 10;

    // Add personal details
    const details = [
      `ID: ${_id}`,
      `Name: ${fname} ${lname}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `City: ${city}`,
      `Country: ${country}`,
      `Total Amount: Rs.${totalAmount.toFixed(2)}`
    ];

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); // Gray color
    doc.line(10, 30, 200, 30);

    details.forEach((detail, index) => {
      doc.text(detail, 14, startY + (index * lineHeight));
    });

    // Tickets information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 128); // Navy color for section title
    doc.text('Tickets Information:', 14, startY + (details.length * lineHeight) + 10);

    doc.setFontSize(12);
    tickets.forEach((ticket, index) => {
      doc.text(
        `${ticket.type}: ${ticket.count} tickets at Rs.${ticket.price} each`,
        14,
        startY + (details.length * lineHeight) + (index * lineHeight) + 20
      );
    });

    // Final save
    doc.save(`${_id}_Reservation_Confirmation.pdf`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="custom-confirmation-wrapper">
        <button className="custom-pdf-button" onClick={generatePDFReport}>
          Download PDF
        </button>

        <div className="custom-confirmation-box">
          <h2 className="custom-confirmation-title">Reservation Confirmed</h2>
          <p className="custom-confirmation-message">
            Thank you for your reservation, {fname}! Here are your booking details:
          </p>
          <ul className="custom-details-list">
            <li>
              <strong>ID:</strong> {_id}
            </li>
            <li>
              <strong>Name:</strong> {fname} {lname}
            </li>
            <li>
              <strong>Email:</strong> {email}
            </li>
            <li>
              <strong>Phone:</strong> {phone}
            </li>
            <li>
              <strong>Date:</strong> {date}
            </li>
            <li>
              <strong>Time:</strong> {time}
            </li>
            {tickets.map((ticket, index) => (
              <li key={index}>
                <strong>{ticket.type}:</strong> {ticket.count} tickets at Rs.{ticket.price} each
              </li>
            ))}
            <li>
              <strong>City:</strong> {city}
            </li>
            <li>
              <strong>Country:</strong> {country}
            </li>
            <li>
              <strong>Total Amount:</strong> Rs.{totalAmount.toFixed(2)}
            </li>
          </ul>

          <button className="custom-pay-button" onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default BookingConfirmation;
