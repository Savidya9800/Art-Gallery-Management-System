import React, { useState, useEffect } from "react";
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddVisitor() {
  const MAX_SLOTS = 10; // Maximum number of visitors per date
  const initialFormState = {
    date: "",
    time: "",
    tickets: [
      { type: "Adult(Age 19+)", count: 0, price: 1550 },
      { type: "Senior(Age 65+)", count: 0, price: 1300 },
      { type: "Child(below 19)", count: 0, price: 950 }
    ],
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    country: ""
  };

  const [inputs, setInputs] = useState(initialFormState);
  const [remainingSlots, setRemainingSlots] = useState({}); // Stores remaining slots per time
  const [visitorCount, setVisitorCount] = useState(0);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    if (inputs.date) {
      fetchRemainingSlots(inputs.date);
    }
  }, [inputs.date]);

  useEffect(() => {
    fetchVisitorCount(); // Fetch total visitor count
  }, []);

  const fetchVisitorCount = async (date) => {
    try {
      const response = await axios.get('http://localhost:5000/api/visitorCount', {
        params: { date }
      });
      setVisitorCount(response.data.count); // Update state with the count
    } catch (err) {
      console.error('Error fetching visitor count:', err);
    }
  };

  const fetchRemainingSlots = async (date) => {
    try {
      const response = await axios.get('http://localhost:5000/remainingSlots', {
        params: { date }
      });
      setRemainingSlots(response.data.slots); // Store the remaining slots per time slot for the selected date
    } catch (err) {
      console.error('Error fetching remaining slots:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "fname" || name === "lname" || name === "city" || name === "country") && !/^[a-zA-Z\s]*$/.test(value)) {
      return; 
    }
    
    // Validate phone number to allow only exactly 10 digits
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) {
        return;
      }
    }

    if (name === "email") {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; 
      const lowercasedEmail = value.toLowerCase();
      if (!emailPattern.test(lowercasedEmail)) {
        setError("Please enter a valid email addres");
      } else {
        setError(""); 
      }

      setInputs({
        ...inputs,
        [name]: lowercasedEmail, // Set the email in lowercase
      });
      return;
    }
  
  

    setInputs({
      ...inputs,
      [name]: value,
    });
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
    
    // Validate that all required fields are filled
    if (!inputs.date || !inputs.time || !inputs.fname || !inputs.lname || !inputs.email || !inputs.phone || !inputs.city || !inputs.country) {
      setError("Please fill all fields.");
      return;
    }

    // Check if the phone number is exactly 10 digits
    if (inputs.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Check if at least one ticket is selected
    const totalTickets = inputs.tickets.reduce((sum, ticket) => sum + parseInt(ticket.count), 0);
    if (totalTickets === 0) {
      setError("Please select at least one ticket.");
      return;
    }

    // Check if total slots available are exceeded
    if (remainingSlots[inputs.time] - totalTickets < 0) {
      setError("Not enough slots available for the selected time.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/visitors', inputs);
      alert('Visitor added successfully');
      
      // Update the remaining slots after a successful reservation
      setRemainingSlots(prevSlots => ({
        ...prevSlots,
        [inputs.time]: prevSlots[inputs.time] - totalTickets
      }));

      navigate('/bookingConfirmation', { state: { visitor: response.data.visitor } });
    } catch (err) {
      console.error('Error adding visitor:', err);
      setError('Failed to add visitor');
    }
  };

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
      <div className="border border-black bg-white max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border-black">
          <div className="bg-white border-black">
            <label className="bg-white block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.date}
              min={getCurrentDate()}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4 mb-2">Time</label>
            <select
              name="time"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.time}
              required
            >
              <option value="">Select Time</option>
              <option value="8.30" disabled={remainingSlots["8.30"] <= 0}>8.30 {remainingSlots["8.30"] <= 0 ? "(Full)" : `(Remaining: ${remainingSlots["8.30"] || 10})`}</option>
              <option value="12.30" disabled={remainingSlots["12.30"] <= 0}>12.30 {remainingSlots["12.30"] <= 0 ? "(Full)" : `(Remaining: ${remainingSlots["12.30"] || 10})`}</option>
              <option value="3.30" disabled={remainingSlots["3.30"] <= 0}>3.30 {remainingSlots["3.30"] <= 0 ? "(Full)" : `(Remaining: ${remainingSlots["3.30"] || 10})`}</option>
            </select>
            <br />
            {inputs.date && inputs.time && remainingSlots[inputs.time] !== undefined && (
              <p className="bg-white text-sm text-gray-700 mt-2">
                Remaining slots for {inputs.date} at {inputs.time}: {remainingSlots[inputs.time]}
              </p>
            )}
            {inputs.tickets.map((ticket, index) => (
              <div key={index}>
                <label className="bg-white block text-sm font-medium text-gray-700 mt-4">
                  {ticket.type} Ticket Count
                </label>
                <input
                  type="number"
                  name="count"
                  className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
                  onChange={(e) => handleTicketChange(index, e)}
                  max={10}
                  min={0}
                  value={ticket.count}
                  required
                />
                <br />
              </div>
            ))}
          </div>

          <div className="bg-white border-black">
            <label className="bg-white block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.fname}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Last Name</label>
            <input
              type="text"
              name="lname"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.lname}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Email</label>
            <input
              type="email"
              name="email"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.email}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Phone</label>
            <input
              type="tel"
              name="phone"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.phone}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">City</label>
            <input
              type="text"
              name="city"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.city}
              required
            />
            <br />
            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Country</label>
            <input
              type="text"
              name="country"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.country}
              required
            />
          </div>
        </form>

        {error && (
          <div className="bg-white text-red-500 mt-4 text-center">{error}</div>
        )}

        <div className="bg-white mt-6">
          <button
            className="bg-black text-white py-2 px-6 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default AddVisitor;
