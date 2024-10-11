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

  const modalOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 1050,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalStyle = {
    maxWidth: "800px", // Increased width for better visibility
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px", // Increased padding for spacing
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  };

  const modalTitleStyle = {
    textAlign: "center",
    color: "#2b7a4c",
    fontSize: "26px", // Increased font size for title
    marginBottom: "20px",
    background: "#f1f0f0",
  };

  const buttonContainerStyle = {
    background: "#f1f0f0",
    textAlign: "center",
    marginTop: "20px",
  };

  const buttonStyle = {
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  // Component for displaying artwork details
  const ArtworkDetail = ({ label, value }) => (
    <>
      <h5 style={{ color: "#0b5ed7", background: "#f1f0f0" }}>{label}</h5>
      <p style={{ background: "#f1f0f0" }}>{value}</p>
    </>
  );

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
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={modalTitleStyle}>{selectedArtwork?.title}</h2>
            <ArtworkDetail label="Medium:" value={selectedArtwork?.medium} />
            <ArtworkDetail label="Place:" value={selectedArtwork?.place} />
            <ArtworkDetail label="Date:" value={selectedArtwork?.date} />
            <ArtworkDetail
              label="Description:"
              value={selectedArtwork?.description}
            />
            <div style={buttonContainerStyle}>
              <Button
                variant="dark"
                onClick={handleCloseModal}
                style={buttonStyle}
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
