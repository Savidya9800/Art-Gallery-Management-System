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
      <div className='relative z-10'>
      <NavigationBar />
      </div>
      
      <h1 className="text-3xl font-bold mb-6 text-center">Available Bids</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bids.map((bid, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 shadow-md rounded-lg p-4"
          >
            {/* Display the bid details */}
            <h2 className="text-xl font-bold text-[#A78F51] mb-2">
              Title: {bid.title}
            </h2>
            <p>
              <strong>ID:</strong> {bid._id}
            </p>
            <p>
              <strong>Description:</strong> {bid.description}
            </p>
            <p>
              <strong>Artist Name:</strong> {bid.artistName}
            </p>
            <p>
              <strong>Category:</strong> {bid.category}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDate(bid.startDate)}
            </p>
            <p>
              <strong>End Date:</strong> {formatDate(bid.endDate)}
            </p>
            <p>
              <strong>Minimum Price:</strong>{" "}
              <span className="text-red-500">Rs.{bid.minPrice}</span>
            </p>

            
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
