import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';
import ceraImage from './cera.jpg'; 

function CreateBid() {
  const history = useNavigate();
  const { id: artworkId } = useParams(); // Extract the artwork ID from URL
  const location = useLocation(); // Get location to retrieve state
  const { title, minPrice } = location.state || {}; // Extract the title from state

  // Insert data set
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    amount: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    //only allow text no numbers or symbols
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      alert("Name can only contain letters and spaces.");
      return;
    }

    // amount validation no negative numbers allowed
    if (name === "amount" && value < 0) {
      alert("Amount cannot be negative.");
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit button when click
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    //validate the amount is greater than minimum price
    if (Number(inputs.amount) <= Number(minPrice)) {
      setErrorMessage(`Amount should be higher than Rs.${minPrice}`);
      return;
    }

    console.log(inputs);
    sendRequest().then(() => {
      alert("Bid submitted successfully!");
      history(`/mainViewBid/${artworkId}`); // Redirect to view bid page with artwork ID
    });
  };

  // Send request 
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/bidding", {
      name: String(inputs.name),
      email: String(inputs.email),
      amount: Number(inputs.amount),
      artworkId: artworkId // Include artwork ID in the request
    }).then(res => res.data);
  };

  return (
    <div>
      <div className='relative z-10'>
      <NavigationBar />
      </div>
    
      <div className="flex justify-center items-center h-screen">
        <div className="flex w-[80%] mx-auto shadow-lg border-2 border-black rounded-lg">
          
          <div className="w-1/2">
            <img src={ceraImage} alt="Ceramic Art" className="w-full h-full object-cover rounded-l-lg" />
          </div>

          <div className="w-1/2 p-10">
           
            <h1 className="text-3xl text-[#A78F51] text-center mb-6">{title ? `Insert Bid : ${title}` : 'Insert Bid'}</h1>


            <form onSubmit={handleSubmit}>
              <input type="hidden" name="artworkId" value={artworkId} />

              <label className="block text-lg text-gray-800 mb-2">Enter Name</label>
              <input type="text" name="name" onChange={handleChange} value={inputs.name} placeholder="Enter Name" required
                className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

              <label className="block text-lg text-gray-800 mb-2">Enter Email</label>
              <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Enter Email (for contact purposes)" required
                className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

<label className="block text-lg text-gray-800 mb-2">Enter Amount (Minimum: Rs.{minPrice})</label>
              <input type="number" name="amount" onChange={handleChange} value={inputs.amount} placeholder={`Enter Amount (>= Rs.${minPrice})`} required
                className="w-full p-2 mb-2 border border-black rounded-md text-sm" />

             
              {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}

              <div className="text-center">
                <button type="submit" className="bg-[#A78F51] text-white px-5 py-3 rounded-md transition duration-300 hover:bg-[#8F7741] text-lg">
                  Submit bid
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default CreateBid;
