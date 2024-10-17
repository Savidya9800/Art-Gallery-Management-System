import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';
import './BookingConfirmation.css'; // Importing the external CSS with the border styles
import jsPDF from 'jspdf';
import logo from '../../../Nav Component/logo.JPG';
import Button from 'react-bootstrap/Button';

function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { visitor } = location.state;
  const { _id, date, time, tickets, fname, lname, email, phone, city, country } = visitor;

  // Calculate total amount
  const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);

  // Format the ID to display only the last three digits
  const formattedId = `REF ` + _id.slice(-3);

  // Function to handle payment process
  const handlePayNow = () => {
    navigate("/paymentgateway");
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add a background color for the title
    doc.setFillColor(167, 143, 81);
    doc.rect(10, 10, 190, 15, "F");

    // Add title to the PDF
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230);
    doc.text("Reservation Confirmation", 14, 20);

    // Add logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 25;
    const imgHeight = 20;
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169);
    doc.line(10, 30, 200, 30);

    // Information Section Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("Reservation Details", 14, 40);

    // Details Section
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let startY = 50;
    const lineHeight = 10;

    // Add personal details
    const details = [
      `ID: ${formattedId}`,
      `Name: ${fname} ${lname}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `City: ${city}`,
      `Country: ${country}`,
      `Total Amount: Rs.${totalAmount.toFixed(2)}`,
    ];

    details.forEach((detail, index) => {
      doc.text(detail, 14, startY + index * lineHeight);
    });

    // Tickets information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 128);
    doc.text(
      "Tickets Information:",
      14,
      startY + details.length * lineHeight + 10
    );

    doc.setFontSize(12);
    tickets.forEach((ticket, index) => {
      doc.text(
        `${ticket.type}: ${ticket.count} tickets at Rs.${ticket.price} each`,
        14,
        startY + details.length * lineHeight + index * lineHeight + 20
      );
    });

    // Add line above the footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169);
    doc.line(10, footerY - 5, 200, footerY - 5);

    // Footer text (right-aligned)
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Awarna Art", pageWidth - 14, footerY, { align: "right" });
    doc.text(
      "Address: 58, Parakrama Mawatha, Wennappuwa",
      pageWidth - 14,
      footerY + 5,
      { align: "right" }
    );
    doc.text(
      "Contact: +94 765 456 789 | Email: awarnaArts@gmail.com",
      pageWidth - 14,
      footerY + 10,
      { align: "right" }
    );

    // Add line below the footer
    doc.line(10, footerY + 15, 200, footerY + 15);

    // Final save
    doc.save(`${formattedId}_Reservation_Confirmation.pdf`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="custom-confirmation-wrapper">
        <br/>
        <div className="custom-confirmation-box">
          <Button variant="dark" onClick={generatePDFReport}>
            Download PDF
          </Button>
          <h2 className="custom-confirmation-title">Reservation Confirmed</h2>
          <p className="custom-confirmation-message">
            Thank you for your reservation, {fname}! Here are your booking details:
          </p>
          <ul className="custom-details-list">
            <li>
              <strong>ID:</strong> {formattedId}
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
          <Button variant="dark" onClick={handlePayNow}>
            Pay Now
          </Button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default BookingConfirmation;
