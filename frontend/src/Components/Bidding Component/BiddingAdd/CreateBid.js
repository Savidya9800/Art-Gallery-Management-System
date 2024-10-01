import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';
import ceraImage from './cera.jpg'; 

function CreateBid() {
  const history = useNavigate();

  // Insert data set
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    amount: ""
  });

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

    console.log(inputs);
    sendRequest().then(() => {
      alert("Bid submitted successfully!");
      history('/mainViewBid')
    });
  };

  // Send request 
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/bidding", {
      name: String(inputs.name),
      email: String(inputs.email),
      amount: Number(inputs.amount)
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
            <h1 className="text-2xl text-[#A78F51] text-center mb-6">Insert Bid</h1>
            <form onSubmit={handleSubmit}>

              <label className="block text-lg text-gray-800 mb-2">Enter Name</label>
              <input type="text" name="name" onChange={handleChange} value={inputs.name} placeholder="Enter Name" required
                className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

              <label className="block text-lg text-gray-800 mb-2">Enter Email</label>
              <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Enter Email (for contact purposes)" required
                className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

              <label className="block text-lg text-gray-800 mb-2">Enter Amount</label>
              <input type="number" name="amount" onChange={handleChange} value={inputs.amount} placeholder="Enter Amount" required
                className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

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
