import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export default function Viewinquiries(props) {
  const { _id, name, email, date, inquiryType, inquiryMessage } =
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
      </div>

      <div className="flex justify-between mt-5">/////////////////////
<button
                        onClick={() => navigate(`/ViewResponse/${_id}`,{state:{isAdmin:false}})} // Pass inquiry ID to the ViewResponse route
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 border border-black transition duration-200">
                        Status
                    </button>
      </div>
    </div>
  );
}
