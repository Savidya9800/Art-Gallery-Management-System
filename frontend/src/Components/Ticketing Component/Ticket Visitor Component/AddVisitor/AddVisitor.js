import React, { useState, useEffect } from "react";
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddVisitor() {
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
  const [remainingSlots, setRemainingSlots] = useState(10);
  const [visitorCount, setVisitorCount] = useState(0); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();


  useEffect(() => {
    if (inputs.date && inputs.time) {
      fetchRemainingSlots(inputs.date, inputs.time);
    }
  }, [inputs.date, inputs.time]);

  useEffect(() => {
    fetchVisitorCount();
  }, []);

  const fetchVisitorCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/visitorCount');
      setVisitorCount(response.data.count);
    } catch (err) {
      console.error('Error fetching visitor count:', err);
    }
  };

  const fetchRemainingSlots = async (date, time) => {
    try {
      const response = await axios.get('http://localhost:5000/visitorCountForSlot', {
        params: { date, time }
      });
      const count = response.data.count;
      setRemainingSlots(10 - count);
    } catch (err) {
      console.error('Error fetching remaining slots:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        return;
      }
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
    const totalTickets = inputs.tickets.reduce((sum, ticket) => sum + parseInt(ticket.count), 0);
    
    if (totalTickets + visitorCount > 10) {
      setError("The total number of visitors exceeds the limit of 10 for this time slot.");
      return; 
    }

    try {
      const response = await axios.post('http://localhost:5000/visitors', inputs);
      alert('Visitor added successfully');
      const remainingSlots = response.data.remainingSlots;
      setRemainingSlots(remainingSlots);
      navigate('/bookingConfirmation', { state: { visitor: response.data.visitor } });
    } catch (err) {
      console.error('Error adding visitor:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add visitor');
      }
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
              <option value="8.30" disabled={remainingSlots <= 0}>8.30</option>
              <option value="12.30" disabled={remainingSlots <= 0}>12.30</option>
              <option value="3.30" disabled={remainingSlots <= 0}>3.30</option>
            </select>
            <br />
            {inputs.date && inputs.time && (
              <p className="bg-white text-sm text-gray-700 mt-2">
                Remaining slots for {inputs.date} at {inputs.time}: {remainingSlots}
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
              maxLength="10"
              pattern="[0-9]*"
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
            <br />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-[#A78F51]  text-white mt-6 py-2 px-4 rounded hover:bg-[#A78F51] "
            >
              Add Visitor
            </button>
          </div>
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default AddVisitor;