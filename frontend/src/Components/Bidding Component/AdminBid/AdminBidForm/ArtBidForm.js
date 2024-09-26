import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ArtBidForm(props) {
  
  const { _id, title, description, artistName, category, startDate, endDate, minPrice } = props.BIDART;
  const history = useNavigate();

  // Helper function to format date to yyyy-mm-dd
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  // Delete function
  const deleteHandler = async () => {
    await axios.delete(`http://Localhost:5000/Adminbid/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/adminBidView"));
  };

  return (
    <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
      <div className="p-2 rounded-t-lg text-[#A78F51]">
        <h1 className="text-2xl font-bold">ID: { _id }</h1>
        <h1 className="text-2xl font-bold">Title: { title }</h1>
      </div>
      <p className="text-base text-gray-800 my-2">Description: { description }</p>
      <p className="text-base text-gray-800 my-2">Artist Name: { artistName }</p>
      <p className="text-base text-gray-800 my-2">Category: { category }</p>
      <p className="text-base text-gray-800 my-2">Start Date: { formatDate(startDate) }</p>
      <p className="text-base text-gray-800 my-2">End Date: { formatDate(endDate) }</p>
      <p className="text-base text-gray-800 my-2">Minimum Price: { minPrice }</p>

      <div className="flex justify-between mt-5">
        <Link to={`/adminBidView/${_id}`} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300">Update</Link>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default ArtBidForm;
