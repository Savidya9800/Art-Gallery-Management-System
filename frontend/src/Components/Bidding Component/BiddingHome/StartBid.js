import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

function StartBid() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all bid details
  useEffect(() => {
    axios
      .get("http://localhost:5000/Adminbid")
      .then((response) => {
        setBids(response.data.adminAddBid); // Adjust based on your backend response structure
      })
      .catch((err) => {
        console.error(err);
        setError("Error retrieving bids");
      });
  }, []);

  // Helper function to format date to yyyy-mm-dd
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <div className="relative z-10">
        <NavigationBar />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">.......Start Bidding.......</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bids.map((bid, index) => (
          <div
            key={index}
            className="border-2 border-black shadow-lg rounded-lg p-4 bg-opacity-70 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
           
            <h2 className="text-2xl font-semibold text-[#A78F51] mb-2">
              Title: {bid.title} 
            </h2>
            <p className="text-sm text-gray-600">
              <strong>ID:</strong> BA{bid._id.slice(-3)} {/*  last 3 characters of ID with prefix BA */}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Description:</strong> {bid.description}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Artist Name:</strong> {bid.artistName}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Category:</strong> {bid.category}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Start Date:</strong> {formatDate(bid.startDate)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>End Date:</strong> {formatDate(bid.endDate)}
            </p>
            <p className="text-lg font-bold text-red-500">
              <strong>Minimum Price:</strong> Rs.{bid.minPrice}
            </p>

            {/* Display the image */}
            {bid.image && (
              <div className="my-4">
                <h1 className="text-lg text-gray-800">Image:</h1>
                <img
                  src={`http://localhost:5000/images/${bid.image}`} 
                  alt={bid.title}
                  className="w-80 h-30 object-cover rounded-md shadow-md"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Link
                to={`/mainCreateBid/${bid._id}`} // Path for creating a bid
                state={{ title: bid.title, minPrice: bid.minPrice }} // Pass the title as state
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
              >
                Bid
              </Link>
              <Link
                to={`/mainViewBid/${bid._id}`} // Path for status (view bid)
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
              >
                Status
              </Link>
            </div>
          </div>
        ))}
      </div>
      <FooterComp />
    </div>
  );
}

export default StartBid;
