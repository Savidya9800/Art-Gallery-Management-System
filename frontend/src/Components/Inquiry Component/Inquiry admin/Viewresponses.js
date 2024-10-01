import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Viewresponses(props) {
  const { _id, response, inquirystatus } = props.RESPONSE;

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/adminResponse/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/Viewresponse"));
  };

  return (
   
      

    <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
      <div className="p-2 rounded-t-lg text-[#A78F51]">
        <h1 className="text-2xl font-bold">Response ID: {_id}</h1>
      </div>

      <div className="p-6 rounded-md mt-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Response: {response}</h1>
        </div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Status: {inquirystatus}</h1>
        </div>
       
      </div>

      <div className="flex justify-between mt-5">
        <Link to={`/updateresponse/${_id}`} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-300">
          Update
        </Link>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>

);
}
