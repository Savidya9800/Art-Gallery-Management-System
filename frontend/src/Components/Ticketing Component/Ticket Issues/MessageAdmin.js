import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MessageAdmin = () => {
  const initialFormState = {
    visitorID: "",
    description: ""
  };

  const [inputs, setInputs] = useState(initialFormState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes and validate visitorID for numbers only
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate visitorID to accept only numbers
    if (name === "visitorID") {
      if (!/^\d*$/.test(value)) {
        setError("Visitor ID must contain only numbers");
        return;
      } else {
        setError(""); // Clear the error if the input is valid
      }
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an actual POST request to store the message in the database
      const response = await axios.post('http://localhost:5000/api/messages', inputs);

      // Display success message and navigate to the result page
      alert('Message sent successfully');
      navigate('/messageResult', { state: { message: response.data.message } });
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <div className="border border-gray-300 rounded-lg p-4 w-full">
        <h2 className="text-2xl font-semibold mb-4">Message Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Visitor ID</label>
            <input
              type="text"
              name="visitorID"
              className="w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.visitorID}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              className="w-full border border-black rounded-md py-2 px-3 text-gray-900"
              onChange={handleChange}
              value={inputs.description}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A78F51] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send Message
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default MessageAdmin;
