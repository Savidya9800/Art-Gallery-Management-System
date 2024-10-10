import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

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
      history("/"); // Redirects after successful deletion
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  const handleViewAll = () => {
    setSelectedArtwork(props.ARTWORK); // Set the selected artwork
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
    setSelectedArtwork(null); // Clear the selected artwork
  };

  // Handle the update of artwork after modal submission
  const handleUpdateArtwork = (updatedArtwork) => {
    // Update the local artwork state with the new data
    props.ARTWORK = { ...props.ARTWORK, ...updatedArtwork }; // Update props.ARTWORK directly
  };

  // ArtworkModal component
  const ArtworkModal = ({ show, handleClose, artwork, onUpdate }) => {
    const handleSubmit = () => {
      // Logic for submitting any updates to the artwork goes here
      const updatedArtwork = {
        title: artwork.title, // Add logic to handle the update
        medium: artwork.medium,
        place: artwork.place,
        date: artwork.date,
        description: artwork.description,
      };
      onUpdate(updatedArtwork); // Call the update handler with new data
      handleClose(); // Close the modal after updating
    };

    return (
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{artwork?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Medium:</strong> {artwork?.medium}</p>
          <p><strong>Date Created:</strong> {artwork?.date}</p>
          <p><strong>Description:</strong> {artwork?.description}</p>
          {/* Add more fields or edit fields as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <td className="p-2 border border-gray-300">{title}</td>
      <td className="p-2 border border-gray-300">{medium}</td>
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
              place === "bidding" ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}
          >
            {place === "bidding" && <span className="w-3 h-3 bg-white rounded-full"></span>}
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
              place === "promote" ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}
          >
            {place === "promote" && <span className="w-3 h-3 bg-white rounded-full"></span>}
          </span>
        </label>
      </td>
      <td className="p-2 border border-gray-300">{date}</td>
      <td className="p-2 border border-gray-300">{description}</td>
      <td className="p-2 border border-gray-300">
        <Button onClick={handleViewAll} variant="primary" className="mr-1">
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
      {/* Artwork Modal */}
      {showModal && selectedArtwork && (
        <ArtworkModal
          show={showModal}
          handleClose={handleCloseModal}
          artwork={selectedArtwork}
          onUpdate={handleUpdateArtwork} // Pass the update handler to the modal
        />
      )}
    </>
  );
}

export default ArtworkComp;
