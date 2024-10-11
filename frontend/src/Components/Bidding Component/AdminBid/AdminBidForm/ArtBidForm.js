import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ArtBidForm(props) {
  const { _id, title, description, artistName, category, startDate, endDate, minPrice, image } = props.BIDART;
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

  // Helper function to get formatted ID
  const formatId = (id) => {
    // Extract the last three characters and prepend "BA"
    return `BA${id.slice(-3)}`;
  };

  // Delete function
  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
    if (confirmDelete) {
      await axios.delete(`http://Localhost:5000/Adminbid/${_id}`)
        .then(res => res.data)
        .then(() => history("/adminBidView"));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-black mx-auto my-5 max-w-2xl">
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title and ID */}
        <div className="mb-4 col-span-1 md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Title: {title}</h1>
          <h2 className="text-lg text-gray-600">ID: {formatId(_id)}</h2>
        </div>

        {/* Image Display */}
        {image && (
          <div className="mb-4 col-span-1">
            <img
              src={`http://Localhost:5000/images/${image}`}
              alt={title}
              className="w-full h-60 object-cover rounded-md shadow-sm"
            />
          </div>
        )}

        {/* Description and Details */}
        <div className="grid grid-cols-1 gap-4 col-span-1 md:col-span-1">
          <p className="text-base text-gray-700"><strong>Description:</strong> {description}</p>
          <p className="text-base text-gray-700"><strong>Artist Name:</strong> {artistName}</p>
          <p className="text-base text-gray-700"><strong>Category:</strong> {category}</p>
          <p className="text-base text-gray-700"><strong>Start Date:</strong> {formatDate(startDate)}</p>
          <p className="text-base text-gray-700"><strong>End Date:</strong> {formatDate(endDate)}</p>
          <p className="text-base text-gray-700"><strong>Minimum Price:</strong> Rs.{minPrice}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5 col-span-1 md:col-span-2">
          <Link
            to={`/adminBidView/${_id}`}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
          >
            Update
          </Link>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArtBidForm;
