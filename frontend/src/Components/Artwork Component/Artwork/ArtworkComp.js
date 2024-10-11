import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are imported

function ArtworkComp(props) {
  const { _id, title, medium, place, date, description } = props.ARTWORK;
  const history = useNavigate();

  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedArtwork, setSelectedArtwork] = useState(null); // State for selected artwork

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) {
      return; // Exit the function if the user clicks "No"
    }

    try {
      await axios.delete(`http://localhost:5000/artWorks/${_id}`);
      window.location.reload(); // Refreshes the page after deletion
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  // Function to handle showing the modal
  const handleShowModal = () => {
    setSelectedArtwork({
      title,
      medium,
      place,
      date,
      description,
    });
    setShowModal(true);
  };

  // Function to handle hiding the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <td className="p-2 border border-gray-300">{title}</td>
      <td className="p-2 border border-gray-300">{medium}</td>
      <td className="p-2 border border-gray-300">
        <label className="items-center">
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
      <td className="p-2 border border-gray-300">{date}</td>
      <td className="p-2 border border-gray-300">{description}</td>
      <td className="p-2 border border-gray-300">
        <Button variant="primary" onClick={handleShowModal} className="mr-1">
          Details
        </Button>
        |
        <Link to={`/mainArtworkDetails/${_id}`}>
          <Button variant="primary" className="ml-1 mr-1">
            Edit
          </Button>
        </Link>
        |
        <Button onClick={deleteHandler} variant="danger" className="ml-1">
          Remove Artwork
        </Button>
      </td>

      {/* Modal for Artwork Details */}
      {showModal && (
        <div
          style={{
            position: "fixed", // Fixed position
            top: "0", // Full viewport height
            left: "0", // Full viewport width
            width: "100%", // Full width
            height: "100%", // Full height
            zIndex: 1050, // Ensure it appears above other content
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for focus
            backdropFilter: "blur(10px)", // Blur effect
            display: "flex", // Flexbox for centering
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
          }}
        >
          <div
            style={{
              maxWidth: "600px", // Limit width
              margin: "auto", // Center margin
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Light background with transparency
              padding: "30px", // Spacing inside the modal
              borderRadius: "15px", // Rounded corners
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              fontFamily: "'Arial', sans-serif", // Font style
              color: "#333", // Text color
            }}
          >
            <h2
              style={{
                textAlign: "center", // Center the title
                color: "#2b7a4c", // Tropical green color
                fontSize: "24px", // Font size for title
                marginBottom: "20px", // Space below the title
                background: "#f1f0f0", // Light gray background
              }}
            >
              {selectedArtwork?.title}
            </h2>
            <h5 style={{ color: "#2b7a4c", background: "#f1f0f0" }}>Medium:</h5>
            <p style={{ background: "#f1f0f0" }}>{selectedArtwork?.medium}</p>
            <h5 style={{ color: "#2b7a4c", background: "#f1f0f0" }}>Place:</h5>
            <p style={{ background: "#f1f0f0" }}>{selectedArtwork?.place}</p>
            <h5 style={{ color: "#2b7a4c", background: "#f1f0f0" }}>Date:</h5>
            <p style={{ background: "#f1f0f0" }}>{selectedArtwork?.date}</p>
            <h5 style={{ color: "#2b7a4c", background: "#f1f0f0" }}>
              Description:
            </h5>
            <p style={{ background: "#f1f0f0" }}>
              {selectedArtwork?.description}
            </p>
            <div
              style={{
                background: "#f1f0f0",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="dark"
                onClick={handleCloseModal}
                style={{
                  border: "none", // Remove border
                  padding: "10px 20px", // Padding for button
                  borderRadius: "5px", // Rounded button
                  color: "#fff", // White text color
                  cursor: "pointer", // Pointer on hover
                  transition: "background-color 0.3s ease", // Transition effect
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArtworkComp;
