import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";


export default function Viewinquiries(props) {
  const { _id, name, email, date, inquiryType, inquiryMessage, inquirystatus } =
    props.INQUIRY;

  const history = useNavigate();
  const navigate = useNavigate();

  // Delete function
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/inquiry/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/inquiries"));
  };

  return (
    <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
      <div className="p-2 rounded-t-lg text-[#A78F51]">
        <h1 className="text-2xl font-bold">Inquiry ID: {_id}</h1>
      </div>

      {/* Remove bg-gray-50 to make the background transparent */}
      <div className="p-6 rounded-md mt-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Name: {name}</h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Email: {email}
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Date: {date}</h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Inquiry Type: {inquiryType}
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Inquiry Message: {inquiryMessage}
          </h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">
            Status: {inquirystatus}
          </h1>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <Link
          to={`/updateInquiry/${_id}`}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
        >
          Update
        </Link>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>

      <div className="flex justify-between mt-5">
        {/* Show Update and Delete buttons based on inquiry status */}
        {inquirystatus === "Pending" && (
          <>
            <Link
              to={`/updateInquiry/${_id}`}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300"
            >
              Update
            </Link>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </>
        )}

        {/* Only show Delete button if the inquiry is Pending */}
        {inquirystatus === "Pending" && (
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
            onClick={deleteHandler}
          >
            Delete
          </button>
        )}

        {/* Hide buttons if inquiry status is Resolved */}
        {inquirystatus === "Resolved" && (
          <p className="text-gray-500 text-sm italic">
            This inquiry has been resolved.
          </p>
        )}

<button
                        onClick={() => navigate(`/ViewResponse/${_id}`)} // Pass inquiry ID to the ViewResponse route
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 border border-black transition duration-200">
                        Status
                    </button>
      </div>
    </div>
  );
}
