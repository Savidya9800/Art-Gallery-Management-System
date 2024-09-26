import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function ArtBidUpdate() {
  const [inputs, setInputs] = useState({}); 
  const history = useNavigate();
  const id = useParams().id;

  // Convert date to yyyy-mm-dd format
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://Localhost:5000/Adminbid/${id}`)
        .then((res) => res.data)
        .then((data) => {
          const bidArt = data.bidArt;
          // Format the start and end dates before setting the state
          bidArt.startDate = formatDate(bidArt.startDate);
          bidArt.endDate = formatDate(bidArt.endDate);
          setInputs(bidArt);
        });
    };
    fetchHandler();
  }, [id]);

  // Send request when details are updated and sent to the database
  const sendRequest = async () => {
    await axios.put(`http://Localhost:5000/Adminbid/${id}`, {
      title: String(inputs.title),
      description: String(inputs.description),
      artistName: String(inputs.artistName),
      category: String(inputs.category),
      startDate: new Date(inputs.startDate),
      endDate: new Date(inputs.endDate),
      minPrice: Number(inputs.minPrice),
    }).then((res) => res.data);
  };

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // no negative numbers for minPrice validation is here
    if (name === "minPrice" && value < 0) {
      alert("Minimum price cannot be negative");
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Date validation function
  const validateDates = () => {
    const startDate = new Date(inputs.startDate);
    const endDate = new Date(inputs.endDate);
    const currentDate = new Date(); // Get  current date


    currentDate.setHours(0, 0, 0, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert("Please enter valid dates.");
      return false;
    }

    // 1. Validate start date is not in the past
    if (startDate < currentDate) {
      alert("Start date cannot be in the past. It should be the current date or a future date.");
      return false;
    }

    // 2. Validate end date is always after the start date
    if (startDate >= endDate) {
      alert("End date must be after the start date.");
      return false;
    }

    return true;
  };

  // Handle submit when the update button is clicked
  const handleSubmit = (e) => {
    e.preventDefault();

    // Date validation check before submitting
    if (!validateDates()) {
      return;  // Stop  form submission if validation fails
    }

    console.log(inputs);
    sendRequest().then(() => history('/adminBidView'));
  };

  return (
    <div className="p-6 ">
      <h1 className="text-center text-2xl text-[#A78F51] font-bold mt-10 mb-8 ">UPDATE ART-WORK ADDED FOR BIDDING</h1> 
      <form onSubmit={handleSubmit} className="rounded-lg shadow-lg p-10 max-w-lg mx-auto mt-10 mb-20">
 
        <label className="block mb-2 font-bold text-gray-700">Title: </label>
        <input type="text" name="title" onChange={handleChange} value={inputs.title} required 
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"/>
        <br></br>
  
        <label className="block mb-2 font-bold text-gray-700">Description: </label>
        <textarea name="description" onChange={handleChange} value={inputs.description} required
          className="border border-black rounded-md w-full p-2 mb-4 focus:outline-none focus:border-[#A78F51]">
        </textarea>
        <br></br>
  
        <label className="block mb-2 font-bold text-gray-700">Artist Name: </label>
        <input type="text" name="artistName" onChange={handleChange} value={inputs.artistName} required 
          className="border border-black rounded-md w-full p-2 mb-4 focus:outline-none focus:border-[#A78F51]"/>
        <br></br>

        <label className="block mb-2 font-bold text-gray-700">Category: </label>
        <input type="text" name="category" onChange={handleChange} value={inputs.category} required 
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"/>
        <br></br>

        <label className="block mb-2 font-bold text-gray-700">Start Date: </label>
        <input type="date" name="startDate" onChange={handleChange} value={inputs.startDate} required 
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"/>
        <br></br>

        <label className="block mb-2 font-bold text-gray-700">End Date: </label>
        <input type="date" name="endDate" onChange={handleChange} value={inputs.endDate} required 
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"/>
        <br></br>
  
        <label className="block mb-2 font-bold text-gray-700">Minimum Price: </label>
        <input type="number" name="minPrice" onChange={handleChange} value={inputs.minPrice} required 
          className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]" min="0"/>
        <br></br>
 
        <button className="bg-[#A78F51] text-white p-2 rounded-md w-full hover:bg-[#8f7c43] transition">Update</button>
      </form>
    </div>
  );
}

export default ArtBidUpdate;
