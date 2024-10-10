import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import NavigationBar from '../../../Nav Component/NavigationBar';
import bidImage from './bid.jpg'; 

function ArtBidAdd() {
  const history = useNavigate();

  // today date in  yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  // call insert data 
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    artistName: "",
    category: "", // Set default category
    startDate: "",
    endDate: "",
    minPrice: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // No negative numbers   validate
    if (name === "minPrice" && value < 0) {
      alert("Minimum price cannot be negative");
      return;
    }

    // artist name validation no numbers or symbols  only letters
    if (name === "artistName") {
      const artistNameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
      if (!artistNameRegex.test(value)) {
        alert("Artist name can only contain letters and spaces.");
        return;
      }
    }

    // title validation allow letters and numbers , no symbols and not only numbers
    if (name === "title") {
      const titleRegex = /^[A-Za-z0-9\s]+$/; // Allows letters, numbers, and spaces
      const numbersOnlyRegex = /^[0-9]+$/; // Checks if it's only numbers
      if (!titleRegex.test(value)) {
        alert("Title can only contain letters and numbers (no symbols).");
        return;
      }
      if (numbersOnlyRegex.test(value)) {
        alert("Title cannot be only numbers.");
        return;
      }
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // When submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate that end date is not before start date and not equal to start date
    if (inputs.endDate <= inputs.startDate) {
      alert("End date must be after the start date.");
      return;
    }

    console.log(inputs);
    sendRequest().then(() =>{
      alert("Artwork added for bidding successfully!");
       history('/adminBidView'); 
      });
  };

 // Send request
 const sendRequest = async () => {
  const formData = new FormData();
  
  formData.append('title', inputs.title);
  formData.append('description', inputs.description);
  formData.append('artistName', inputs.artistName);
  formData.append('category', inputs.category);
  formData.append('startDate', inputs.startDate);
  formData.append('endDate', inputs.endDate);
  formData.append('minPrice', inputs.minPrice);

  if (image) {
    formData.append('image', image);
  }

  // Log FormData content
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  await axios.post("http://localhost:5000/Adminbid", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
};

  return (
    <div>
      <div className='relative z-10'>
      <NavigationBar />
      </div>
       
      <div className="p-6 flex flex-col md:flex-row justify-center items-center"> 
       
        <div className="md:w-5/3 flex justify-center mb-6 md:mb-0"> 
          <img src={bidImage} alt="Bidding" className="rounded-lg shadow-lg w-4/5 h-auto" /> 
        </div>

       
        <div className="md:w-1/2">
          <h1 className="text-center text-2xl text-[#A78F51] font-bold mb-8">ADD NEW ART-WORK FOR BID</h1>
          <form onSubmit={handleSubmit} className="rounded-lg shadow-lg p-10 max-w-lg mx-auto">

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
            <select name="category" onChange={handleChange} value={inputs.category} required
              className="border border-black rounded-md w-full p-1 mb-4 focus:outline-none focus:border-[#A78F51]">
              <option value="" disabled>--- Choose ---</option> 
              <option value="Sculpture">Sculpture</option>
              <option value="Pottery">Pottery</option>
              <option value="Ceramic">Ceramic</option>
            </select>
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

            <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Upload Image (Optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

            <button className="bg-[#A78F51] text-white p-2 rounded-md w-full hover:bg-[#8f7c43] transition">Add Bid Artwork</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtBidAdd;
