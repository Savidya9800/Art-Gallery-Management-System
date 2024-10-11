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
  const [visitorCount, setVisitorCount] = useState(0); // Stores the total visitor count for the selected date
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (inputs.date) {
      fetchRemainingSlots(inputs.date);
      fetchVisitorCount(inputs.date); // Fetch visitor count for the selected date
    }
  }, [inputs.date]);

  const fetchVisitorCount = async (date) => {
    try {
      const response = await axios.get('http://localhost:5000/api/visitorCount', {
        params: { date }
      });
      setVisitorCount(response.data.count); // Update state with the visitor count
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

    // Only allow letters and spaces in these fields
    if ((name === "fname" || name === "lname" || name === "city" || name === "country") && !/^[a-zA-Z\s]*$/.test(value)) {
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

  const validateForm = () => {
    let formErrors = {};

    // Validate that all required fields are filled
    if (!inputs.date) formErrors.date = "Date is required.";
    if (!inputs.time) formErrors.time = "Time is required.";
    if (!inputs.fname) formErrors.fname = "First name is required.";
    if (!inputs.lname) formErrors.lname = "Last name is required.";
    if (!inputs.email) formErrors.email = "Email is required.";
    if (!inputs.phone) formErrors.phone = "Phone number is required.";
    if (!inputs.city) formErrors.city = "City is required.";
    if (!inputs.country) formErrors.country = "Country is required.";

    // Updated phone validation (11 digits with a "+" sign in front)
    const phonePattern = /^\+(\d{11})$/;
    if (inputs.phone && !phonePattern.test(inputs.phone)) {
      formErrors.phone = "Please enter a valid phone number starting with + and followed by 11 digits (e.g., +12345678901).";
    }

    // Validate email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (inputs.email && !emailPattern.test(inputs.email.toLowerCase())) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Check if at least one ticket is selected
    const totalTickets = inputs.tickets.reduce((sum, ticket) => sum + parseInt(ticket.count), 0);
    if (totalTickets === 0) {
      formErrors.tickets = "Please select at least one ticket.";
    }

    // Check if total slots available are exceeded
    if (remainingSlots[inputs.time] - totalTickets < 0) {
      formErrors.slots = "Not enough slots available for the selected time.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if form is not valid
    }

    try {
      const response = await axios.post('http://localhost:5000/visitors', inputs);
      alert('Visitor added successfully');
      
      // Update the remaining slots after a successful reservation
      setRemainingSlots(prevSlots => ({
        ...prevSlots,
        [inputs.time]: prevSlots[inputs.time] - inputs.tickets.reduce((sum, ticket) => sum + parseInt(ticket.count), 0)
      }));

      navigate('/bookingConfirmation', { state: { visitor: response.data.visitor } });
    } catch (err) {
      console.error('Error adding visitor:', err);
      setErrors({ submit: 'Failed to add visitor' });
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

            {inputs.date && (
              <p className="bg-white text-sm text-gray-700 mt-2">
                Available visitors for {inputs.date}: {MAX_SLOTS - visitorCount}
              </p>
            )}

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
                />
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

            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Last Name</label>
            <input
              type="text"
              name="lname"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.lname}
              required
            />

            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Email</label>
            <input
              type="email"
              name="email"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.email}
              required
            />

            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.phone}
              required
            />

            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">City</label>
            <input
              type="text"
              name="city"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.city}
              required
            />

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

          {/* Display validation errors */}
          <div className="lg:col-span-2">
            {Object.keys(errors).map((key, index) => (
              <p key={index} className="bg-white text-red-500 text-sm">
                {errors[key]}
              </p>
            ))}
          </div>

          <button
            type="submit"
            className="lg:col-span-2 bg-gray-800 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-900"
          >
            Submit
          </button>
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default AddVisitor;
