import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AdminArtwork(props) {
  const { _id, name, title, place } = props.ARTWORK;
  const history = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) {
      return; // Exit the function if the user clicks "No"
    }

    try {
      await axios.delete(`http://localhost:5000/artWorks/${_id}`);
      history("/"); // Redirects after successful deletion
      history("/mainArtworkDetails");
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  return (
    <>
      <td className="p-2 border border-gray-300">{_id}</td>
      <td className="p-2 border border-gray-300">{name}</td>
      <td className="p-2 border border-gray-300">{title}</td>
      <td className="p-2 border border-gray-300">
        <label className="items-center ">
          <input
            type="radio"
            name={`place-${_id}`}
            value="bidding"
            checked={place === "bidding"}
            readOnly
            className="hidden"
          />
          <span
            className={`w-6 h-6 border-2 rounded-md mr-2 flex items-center justify-center ${
              place === "bidding"
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
          >
            {place === "bidding" && (
              <span className="w-3 h-3 bg-white rounded-full"></span>
            )}
          </span>
        </label>
      </td>
      <td className="p-2 border border-gray-300">
        <label className="flex items-center">
          <input
            type="radio"
            name={`place-${_id}`}
            value="promote"
            checked={place === "promote"}
            readOnly
            className="hidden"
          />
          <span
            className={`w-6 h-6 border-2 rounded-md mr-2 flex items-center justify-center ${
              place === "promote"
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
          >
            {place === "promote" && (
              <span className="w-3 h-3 bg-white rounded-full"></span>
            )}
          </span>
        </label>
      </td>
      {/* <td className="p-2 border border-gray-300">{description}</td> */}

      <td className="p-2 border border-gray-300">
        <Button onClick={deleteHandler} variant="primary">
          Generate Report
        </Button>{" "}
        |
        <Link to={`/mainArtworkDetails/${_id}`}>
          <Button variant="success" className="ml-1">
            Accept
          </Button>{" "}
        </Link>{" "}
        |
        <Button onClick={deleteHandler} variant="danger" className="ml-1">
          Reject
        </Button>{" "}
      </td>
    </>
  );
}

export default AdminArtwork;
