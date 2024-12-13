import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import NavigationBar from '../../../Nav Component/NavigationBar';

function ArtBidUpdate() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://Localhost:5000/Adminbid/${id}`)
        .then((res) => res.data)
        .then((data) => {
          const bidArt = data.bidArt;
          bidArt.startDate = formatDate(bidArt.startDate);
          bidArt.endDate = formatDate(bidArt.endDate);
          setInputs(bidArt);
        });
    };
    fetchHandler();
  }, [id]);

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

  // Send request when details are updated (excluding image)
  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('artistName', inputs.artistName);
    formData.append('category', inputs.category);
    formData.append('startDate', inputs.startDate);
    formData.append('endDate', inputs.endDate);
    formData.append('minPrice', inputs.minPrice);

    try {
      await axios.put(`http://localhost:5000/Adminbid/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.error("Error updating : ", err);
    }
  };

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative numbers for minPrice
    if (name === "minPrice" && value < 0) {
      alert("Minimum price cannot be negative");
      return;
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before sending the request
    if (!validateDates()) {
      return;
    }

    if (!validateArtistName(inputs.artistName)) {
      alert("Artist name should only contain letters.");
      return;
    }

    if (!validateTitle(inputs.title)) {
      alert("Title should contain text or text with numbers, and no symbols.");
      return;
    }

    // Send the request if all validations pass
    sendRequest().then(() => {
      alert("Artwork details updated successfully.");
      history('/adminBidView');
    });
  };

  // Artist name validation (only letters allowed)
  const validateArtistName = (name) => /^[A-Za-z\s]+$/.test(name);

  // Title validation (allow text or text with numbers but no symbols or numbers only)
  const validateTitle = (title) => /^[A-Za-z]+[A-Za-z0-9\s]*$/.test(title);

  // Date validation function
  const validateDates = () => {
    const startDate = new Date(inputs.startDate);
    const endDate = new Date(inputs.endDate);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert("Please enter valid dates.");
      return false;
    }

    if (startDate < currentDate) {
      alert("Start date cannot be in the past. It should be the current date or a future date.");
      return false;
    }

    if (startDate >= endDate) {
      alert("End date must be after the start date.");
      return false;
    }

    return true;
  };

  return (
    <div>
      <div className='relative z-10'>
        <NavigationBar />
      </div>

      <div className="p-6">
        <h1 className="text-center text-2xl text-[#A78F51] font-bold mt-10 mb-8">UPDATE ART-WORK ADDED FOR BIDDING</h1>
        <form onSubmit={handleSubmit} className="rounded-lg shadow-lg p-10 max-w-lg mx-auto mt-10 mb-20">
          <label className="block mb-2 font-bold text-gray-700">Title: </label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            required
            className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"
          />
          <br />

          <label className="block mb-2 font-bold text-gray-700">Description: </label>
          <textarea
            name="description"
            onChange={handleChange}
            value={inputs.description}
            required
            className="border border-black rounded-md w-full p-2 mb-4 focus:outline-none focus:border-[#A78F51]"
          ></textarea>
          <br />

          <label className="block mb-2 font-bold text-gray-700">Artist Name: </label>
          <input
            type="text"
            name="artistName"
            onChange={handleChange}
            value={inputs.artistName}
            required
            className="border border-black rounded-md w-full p-2 mb-4 focus:outline-none focus:border-[#A78F51]"
          />
          <br />

          <label className="block mb-2 font-bold text-gray-700">Category: </label>
          <select
            name="category"
            onChange={handleChange}
            value={inputs.category}
            required
            className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"
          >
            <option value="sculpture">Sculpture</option>
            <option value="pottery">Pottery</option>
            <option value="ceramic">Ceramic</option>
          </select>
          <br />

          <label className="block mb-2 font-bold text-gray-700">Start Date: </label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            value={inputs.startDate}
            required
            className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"
          />
          <br />

          <label className="block mb-2 font-bold text-gray-700">End Date: </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            value={inputs.endDate}
            required
            className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"
          />
          <br />

          <label className="block mb-2 font-bold text-gray-700">Minimum Price: </label>
          <input
            type="number"
            name="minPrice"
            onChange={handleChange}
            value={inputs.minPrice}
            required
            className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]"
            min="0"
          />
          <br />

          <button className="bg-[#A78F51] text-white p-2 rounded-md w-full hover:bg-[#8f7c43] transition">Update</button>
        </form>
      </div>
    </div>
  );
}

export default ArtBidUpdate;
