import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Visitor.css';
import FooterComp from '../../../Nav Component/FooterComp';
import NavigationBar from '../../../Nav Component/NavigationBar';

function Visitor(props) {
  const { _id, date, time, tickets, fname, lname, email, phone, city, country } = props.visitor;
  const history = useNavigate();

  const deleteVisitor = async () => {
    try {
      await axios.delete(`http://localhost:5000/visitors/${_id}`);
      alert("Visitor deleted successfully!");
      history("/"); // Redirect to home
      history("/visitorDetails"); // Redirect to the visitor details page
    } catch (err) {
      console.error("Error deleting visitor:", err);
      alert("Failed to delete visitor. Please try again.");
    }
  };
  

  // Calculate total amount
  const totalAmount = tickets.reduce((acc, ticket) => acc + (ticket.count * ticket.price), 0);

  return (
    
    <div>      
      <div className="visitor-container"> 
        <table className="visitor-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{_id}</td>
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
                  <td>${ticket.price}</td>
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
              <td>${totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <button className="delete-btn" onClick={deleteVisitor}>Delete</button>
        <Link to={`/visitorDetails/${_id}`} className="update-link">Update</Link>
      </div>
      
    </div>
  );
}

export default Visitor;