import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Visitor.css';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';
import Button from 'react-bootstrap/Button';

function Visitor(props) {
  const { _id, date, time, tickets, fname, lname, email, phone, city, country } = props.visitor;
  const history = useNavigate();

  const deleteVisitor = async () => {
    try {
      await axios.delete(`http://localhost:5000/visitors/${_id}`);
      alert("Visitor deleted successfully!");

      const visitorName = `${fname} ${lname}`;
      const message = `Hello ${visitorName}, Reservation has successfully been cancelled. Please contact us for further assistance.`;

      const phoneNumber = phone; 
      const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      window.open(WhatsAppUrl, "_blank");

      history("/");
      history("/visitorDetails");
    } catch (err) {
      console.error("Error deleting visitor:", err);
      alert("Failed to delete visitor. Please try again.");
    }
  };

  // Calculate total amount
  const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);

  // Extract last three digits of the _id
  const displayId = `REF ` + _id.slice(-3); // Get the last three characters of the _id

  return (
    <div>      
      <div className="visitor-container"> 
        <table className="visitor-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{displayId}</td> 
            </tr>
            <tr>
              <th>First Name</th>
              <td>{fname}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{lname}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{phone}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>{time}</td>
            </tr>
            {tickets.map((ticket, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>Ticket Type</th>
                  <td>{ticket.type}</td>
                </tr>
                <tr>
                  <th>Count</th>
                  <td>{ticket.count}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>Rs {ticket.price}</td>
                </tr>
              </React.Fragment>
            ))}
            <tr>
              <th>City</th>
              <td>{city}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{country}</td>
            </tr>
            <tr>
              <th>Total Amount</th>
              <td>Rs {totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <Button variant="danger" onClick={deleteVisitor}>Delete</Button>
        <Link to={`/visitorDetails/${_id}`} className="update-link">Update</Link>
      </div>
    </div>
  );
}

export default Visitor;
