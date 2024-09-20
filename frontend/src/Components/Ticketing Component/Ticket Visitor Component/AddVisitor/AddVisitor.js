import React, { useState } from "react";
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./AddVisitor.css"; // Import the CSS file

function AddVisitor() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    date: "",
    time: "",
    tickets: [
      { type: "Adult(Age 19+)", count: 0, price: 20 },
      { type: "Senior(Age 65+)", count: 0, price: 15 },
      { type: "Child(below 19)", count: 0, price: 10 }
    ],
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    country: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...inputs.tickets];
    newTickets[index][name] = value;
    setInputs({
      ...inputs,
      tickets: newTickets
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/visitors', inputs);
      if (response.status === 200) {
        alert('Visitor added successfully');
        history('/bookingConfirmation', { state: { visitor: response.data.visitor } }); // Pass the visitor data including the ID
      }
    } catch (err) {
      console.error('Error adding visitor:', err);
      alert('Failed to add visitor');
    }
  };

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <NavigationBar />
      <Nav />
      
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="left-section">
            <label className="form-label">Date</label><br />
            <input 
              type="date" 
              name="date" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.date} 
              max={getCurrentDate()} // Restrict to past dates
              required 
            />
            <br />

            <label className="form-label">Time</label><br />
            <select 
              name="time" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.time} 
              required
            >
              <option value="">Select Time</option>
              <option value="8.30">8.30</option>
              <option value="10.30">10.30</option>
              <option value="11.30">11.30</option>
              <option value="12.30">12.30</option>
              <option value="1.30">1.30</option>
              <option value="2.30">2.30</option>
              <option value="3.30">3.30</option>
              <option value="4.30">4.30</option>
            </select>
            <br />

            {inputs.tickets.map((ticket, index) => (
              <div key={index}>
                <label className="form-label">{ticket.type} Ticket Count</label><br />
                <input 
                  type="number" 
                  name="count" 
                  className="form-input" 
                  onChange={(e) => handleTicketChange(index, e)} 
                  value={ticket.count} 
                  required 
                />
                <br />
              </div>
            ))}
          </div>

          <div className="right-section">
            <label className="form-label">First Name</label>
            <input 
              type="text" 
              name="fname" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.fname} 
              required 
            />

            <label className="form-label">Last Name</label>
            <input 
              type="text" 
              name="lname" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.lname} 
              required 
            />

            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.email} 
              required 
            />

            <label className="form-label">Phone</label>
            <input 
              type="tel" 
              name="phone" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.phone} 
              required 
            />

            <label className="form-label">City</label>
            <input 
              type="text" 
              name="city" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.city} 
              required 
            />

            <label className="form-label">Country</label>
            <input 
              type="text" 
              name="country" 
              className="form-input" 
              onChange={handleChange} 
              value={inputs.country} 
              required 
            />

            <button type="submit" className="checkout">Checkout</button>
          </div>
        </form>
      </div>

      <FooterComp />
    </div>
  );
}

export default AddVisitor;