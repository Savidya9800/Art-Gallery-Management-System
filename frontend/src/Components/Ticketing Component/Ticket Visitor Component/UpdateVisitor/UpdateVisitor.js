import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../../Nav Component/NavigationBar";
import FooterComp from "../../../Nav Component/FooterComp";

const Visitor = () => {
  const { id } = useParams(); // Get the visitor ID from the URL parameters
  const navigate = useNavigate();

  // State for form data, including date and time
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    date: "", // Field for the date
    time: "", // Field for the time
  });

  const [ticketData, setTicketData] = useState([]);
  const [availableSlots, setAvailableSlots] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({}); // State for storing validation errors

  // Fetch visitor details including the date
  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/visitors/${id}`
        );
        if (response.status === 200) {
          const {
            fname,
            lname,
            email,
            phone,
            city,
            country,
            tickets,
            date,
            time,
          } = response.data.visitor;
          // Update state with fetched visitor data including date and time
          setFormData({
            fname,
            lname,
            email,
            phone,
            city,
            country,
            date,
            time,
          });
          setTicketData(tickets);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching visitor:", err);
        setError("Failed to fetch visitor");
        setLoading(false);
      }
    };

    fetchVisitor();
  }, [id]);

  // Fetch available slots when the date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]); // Trigger when date changes

  const fetchAvailableSlots = async (selectedDate) => {
    try {
      const response = await axios.get("http://localhost:5000/remainingSlots", {
        params: { date: selectedDate },
      });
      setAvailableSlots(response.data.slots);
    } catch (err) {
      console.error("Error fetching available slots:", err);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTickets = [...ticketData];
    updatedTickets[index][name] = parseInt(value, 10); // Ensure ticket count is a number
    setTicketData(updatedTickets);
  };

  // Validation logic for form fields
  const validateForm = () => {
    let errors = {};

    // Regex to allow only alphabetic characters and spaces
    const namePattern = /^[a-zA-Z\s]+$/;

    // Regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex to check for uppercase letters
    const upperCasePattern = /[A-Z]/;

    // Regex for phone number validation (format: +94766643497)
    const phonePattern = /^\+94\d{9}$/;

    if (!formData.fname) {
      errors.fname = "First Name is required";
    } else if (!namePattern.test(formData.fname)) {
      errors.fname = "First Name should only contain letters";
    }

    if (!formData.lname) {
      errors.lname = "Last Name is required";
    } else if (!namePattern.test(formData.lname)) {
      errors.lname = "Last Name should only contain letters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    } else if (upperCasePattern.test(formData.email)) {
      errors.email = "Email should not contain uppercase letters";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      errors.phone = "Phone number must be in the format +94766643497";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const updateVisitor = async () => {
    if (validateForm()) {
      // Calculate the total number of tickets being updated (new count from user input)
      const totalNewTickets = ticketData.reduce((total, ticket) => total + ticket.count, 0);
  
      // Fetch already booked tickets for the selected time
      const alreadyBookedTickets = ticketData.reduce((total, ticket) => {
        return total + (ticket.time === formData.time ? ticket.count : 0);
      }, 0);
  
      // Available slots for the selected time
      const remainingAvailableSlots = availableSlots[formData.time];
  
      // Check if total updated tickets (already booked + new) exceed available slots
      if (totalNewTickets + alreadyBookedTickets > remainingAvailableSlots) {
        alert(
          `You currently have ${alreadyBookedTickets} tickets booked, and there are ${remainingAvailableSlots} slots remaining. You can only add up to ${
            remainingAvailableSlots - alreadyBookedTickets
          } more tickets.`
        );
        return; // Prevent form submission
      }
  
      try {
        // Merge new ticket data with existing visitor data
        const updatedVisitor = { ...formData, tickets: ticketData };
  
        // Send PUT request to update visitor data
        const response = await axios.put(
          `http://localhost:5000/visitors/${id}`,
          updatedVisitor
        );
        if (response.status === 200) {
          alert("Visitor updated successfully");
          navigate("/visitorDetails");
        }
      } catch (err) {
        console.error("Error updating visitor:", err);
        alert("Failed to update visitor");
      }
    } else {
      alert("Please fix the validation errors before submitting.");
    }
  };
  
  
  

  // Loading and error handling
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="bg-white max-w-4xl mx-auto p-3 mt-5 shadow-md rounded-md border border-black">
        <h2 className="bg-white text-2xl font-semibold text-gray-800 mb-6 text-center">
          Visitor Details
        </h2>
        {formErrors.fname && <p className="text-red-500">{formErrors.fname}</p>}{" "}
        {/* Display error message for first name */}
        {formErrors.lname && (
          <p className="text-red-500">{formErrors.lname}</p>
        )}{" "}
        {/* Display error message for last name */}
        {formErrors.email && (
          <p className="text-red-500">{formErrors.email}</p>
        )}{" "}
        {/* Display error message for email */}
        {formErrors.phone && (
          <p className="text-red-500">{formErrors.phone}</p>
        )}{" "}
        {/* Display error message for phone number */}
        <form className="bg-white grid grid-cols-1 gap-6 lg:grid-cols-2">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />

          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          />
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="bg-white w-full border border-black p-3 rounded-md"
            required
          >
            <option value="">Select Time</option>
            <option value="8.30" disabled={availableSlots["8.30"] <= 0}>
              8.30{" "}
              {availableSlots["8.30"] <= 0
                ? "(Full)"
                : `(Remaining: ${availableSlots["8.30"] || 10})`}
            </option>
            <option value="12.30" disabled={availableSlots["12.30"] <= 0}>
               12.30{" "}
              {availableSlots["12.30"] <= 0
                ? "(Full)"
                : `(Remaining: ${availableSlots["12.30"] || 10})`}
            </option>
            <option value="4.30" disabled={availableSlots["4.30"] <= 0}>
              4.30{" "}
              {availableSlots["4.30"] <= 0
                ? "(Full)"
                : `(Remaining: ${availableSlots["4.30"] || 10})`}
            </option>
          </select>
        </form>
        
        <h3 className="bg-white text-xl font-semibold text-gray-800 mt-10 mb-4">
          Ticket Information
        </h3>
        <table className="bg-white min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-white">
              <th className="bg-white border border-black p-2 text-left">Type</th>
              <th className="bg-white border border-black p-2 text-left">Count</th>
              <th className="bg-white border border-black p-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket, index) => (
              <tr key={index} className="bg-white text-gray-700">
                <td className="bg-white border border-black p-2">{ticket.type}</td>
                <td className="bg-white border border-black p-2">
                  <input
                    type="number"
                    name="count"
                    value={ticket.count}
                    onChange={(e) => handleTicketChange(index, e)}
                    min={1} // Ensures that the count cannot go below 1
                    className="bg-white w-full border border-black p-2 rounded-md"
                    required
                  />
                </td>
                <td className="bg-white border border-black p-2">Rs {ticket.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="text-center mt-5">
          <button
            type="button"
            onClick={updateVisitor}
            className="bg-black hover:bg-green-700 text-white font-bold w-full py-2 px-4 rounded"
          >
            Update Visitor
          </button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Visitor;
