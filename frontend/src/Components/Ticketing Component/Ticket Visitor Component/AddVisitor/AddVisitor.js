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
  };

  const [inputs, setInputs] = useState(initialFormState);
  const [remainingSlots, setRemainingSlots] = useState(10); // State to hold remaining slots
  const [error, setError] = useState(""); // State to hold error messages
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [phoneError, setPhoneError] = useState(""); // State for phone validation error
  const navigate = useNavigate();

  useEffect(() => {
    if (inputs.date && inputs.time) {
      fetchRemainingSlots(inputs.date, inputs.time);
    }
  }, [inputs.date, inputs.time]);

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

    // Validate email field format using regex
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError(""); // Clear email error if valid
      }
    }

    // Validate phone number to accept only numbers
    if (name === "phone") {
      const phoneRegex = /^[0-9]*$/; // Regex to allow only digits
      if (!phoneRegex.test(value)) {
        setPhoneError("Phone number can only contain numbers");
      } else {
        setPhoneError(""); // Clear phone error if valid
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

    // Prevent form submission if there are validation errors
    if (emailError || phoneError) {
      alert('Please correct the errors before submitting.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/visitors', inputs);
      alert('Visitor added successfully');
      const remainingSlots = response.data.remainingSlots;
      setRemainingSlots(remainingSlots); // Update remaining slots
      navigate('/bookingConfirmation', { state: { visitor: response.data.visitor } }); // Pass the visitor data including the ID
    } catch (err) {
      console.error('Error adding visitor:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add visitor');
      }
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

      <div className="border border-black bg-white max-w-4xl mx-auto mt-10 p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border-black">
          
          {/* Left Section */}
          <div className="bg-white border-black">
            <label className=" bg-white block text-sm font-medium text-gray-700">Date</label>
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
              <option value="8.30">8.30</option>
              <option value="12.30">12.30</option>
              <option value="3.30">3.30</option>
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

          {/* Right Section */}
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
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
            <br />

            <label className="bg-white block text-sm font-medium text-gray-700 mt-4">Phone</label>
            <input
              type="tel"
              name="phone"
              className="bg-white w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.phone}
              maxLength="10"
              required
            />
            {phoneError && <p className="text-red-500 mt-2">{phoneError}</p>}
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

            <button
              type="submit"
              className="w-full mt-6 bg-[#A78F51] text-white font-semibold py-2 px-4 rounded-md"
            >
              Checkout
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default AddVisitor;
