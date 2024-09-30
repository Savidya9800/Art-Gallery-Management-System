import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

function BidUpdate() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/bidding/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.IDBidder)); // Ensure the correct constant is used
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/bidding/${id}`, {
        name: String(inputs.name),
        email: String(inputs.email),
        amount: Number(inputs.amount),
      })
      .then((res) => res.data);
  };

  // Handle change with validations
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Name validation only allow text (no numbers or symbols)
    if (name === 'name' && !/^[a-zA-Z\s]*$/.test(value)) {
      alert('Name can only contain letters and spaces.');
      return;
    }

    // Amount validation no negative numbers allowed
    if (name === 'amount' && value < 0) {
      alert('Amount cannot be negative.');
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // When update button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    console.log(inputs);
    sendRequest().then(() => {
      alert('Update was successful!');
      history('/mainViewBid');
    });
  };

  return (
    <div>
      <div className='relative z-10'>
      <NavigationBar />

      </div>
      
      <div className="flex justify-center items-center h-screen">
        <div className="p-10 border-2 border-black rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl text-[#A78F51] text-center mb-6">Update Bid</h1>

          <form onSubmit={handleSubmit}>
            <label className="text-base text-gray-700 mb-2 block">Enter Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Enter Name"
              required
              className="w-full p-3 mb-4 border border-black rounded-md text-sm"
            />

            <label className="text-base text-gray-700 mb-2 block">Enter Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              placeholder="Enter Email (for contact purposes)"
              required
              className="w-full p-3 mb-4 border border-black rounded-md text-sm"
            />

            <label className="text-base text-gray-700 mb-2 block">Enter Amount</label>
            <input
              type="number"
              name="amount"
              onChange={handleChange}
              value={inputs.amount}
              placeholder="Enter Amount"
              required
              className="w-full p-3 mb-4 border border-black rounded-md text-sm"
            />

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#A78F51] text-white py-3 px-6 text-lg rounded-md hover:bg-[#8F7741] transition ease-in-out duration-300"
              >
                Update Bid Details
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterComp/>
    </div>
  );
}

export default BidUpdate;
