import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function ArtBidAdd() {
  const history = useNavigate();

  // Get today's date in format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  // Call insert data set
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    artistName: "",
    category: "",
    startDate: "",
    endDate: "",
    minPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // No negative numbers for minPrice validation
    if (name === "minPrice" && value < 0) {
      alert("Minimum price cannot be negative");
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // When submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that end date is not before start date and not equal to start date
    if (inputs.endDate <= inputs.startDate) {
      alert("End date must be after the start date.");
      return;
    }

    console.log(inputs);
    sendRequest().then(() => history('/adminBidView'));
  };

  // Send request
  const sendRequest = async () => {
    await axios.post("http://Localhost:5000/Adminbid", {
      title: String(inputs.title),
      description: String(inputs.description),
      artistName: String(inputs.artistName),
      category: String(inputs.category),
      startDate: new Date(inputs.startDate),
      endDate: new Date(inputs.endDate),
      minPrice: Number(inputs.minPrice),
    }).then(res => res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl text-[#A78F51] font-bold mt-10 mb-8">ADD NEW ART-WORK FOR BID</h1>
      <form onSubmit={handleSubmit} className="rounded-lg shadow-lg p-10 max-w-lg mx-auto mt-10 mb-20">

        <label className="block mb-2 font-bold text-gray-700">Title: </label>
        <input type="text" name="title" onChange={handleChange} value={inputs.title} required
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" />
        <br />

        <label className="block mb-2 font-bold text-gray-700">Description: </label>
        <textarea name="description" onChange={handleChange} value={inputs.description} required
          className="border border-black rounded-md w-full p-2 mb-4 focus:outline-none focus:border-[#A78F51]"></textarea>
        <br />

        <label className="block mb-2 font-bold text-gray-700">Artist Name: </label>
        <input type="text" name="artistName" onChange={handleChange} value={inputs.artistName} required
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" />
        <br />

        <label className="block mb-2 font-bold text-gray-700">Category: </label>
        <input type="text" name="category" onChange={handleChange} value={inputs.category} required
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" />
        <br />

        <label className="block mb-2 font-bold text-gray-700">Start Date: </label>
        <input type="date" name="startDate" onChange={handleChange} value={inputs.startDate} required
          min={today} // Minimum allowed date is today
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" />
        <br />

        <label className="block mb-2 font-bold text-gray-700">End Date: </label>
        <input type="date" name="endDate" onChange={handleChange} value={inputs.endDate} required
          min={inputs.startDate || today} // End date should be after the start date
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" />
        <br />

        <label className="block mb-2 font-bold text-gray-700">Minimum Price: </label>
        <input type="number" name="minPrice" onChange={handleChange} value={inputs.minPrice} required
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" min="0" />
        <br />

        <button className="bg-[#A78F51] text-white p-2 rounded-md w-full hover:bg-[#8f7c43] transition">Add Bid Artwork</button>

      </form>
    </div>
  );
}

export default ArtBidAdd;
