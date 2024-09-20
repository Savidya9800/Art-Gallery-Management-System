import React, { useState } from "react";
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";

 // Import the CSS file

function AddTicketInfo() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    date: "",
    time: "",
    ticketType: "",
    count: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history('/addTicketInfo'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/ticketInfo", {
      fname: String(inputs.fname),
      lname: String(inputs.lname),
      email: String(inputs.email),
      phone: String(inputs.phone),
      city: String(inputs.city),
      country: String(inputs.country),
    }).then(res => res.data);
  };

  return (
    <div>
      <NavigationBar />
      <Nav />
      
      <div className="container">
        <div className="left-section">
          <h1 className="title">Add Visitor</h1>
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit}>
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
          </form>
        </div>
      </div>

      <FooterComp />
    </div>
  );
}

export default AddVisitor;
