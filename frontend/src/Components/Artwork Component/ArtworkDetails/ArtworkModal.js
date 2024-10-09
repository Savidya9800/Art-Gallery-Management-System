import React from "react";
import { Modal, Button } from "react-bootstrap";

const ArtworkModal = ({ show, handleClose, artwork }) => {
  if (!artwork) return null; // If there's no artwork, return null

  return (
    <Modal show={show} onHide={handleClose} centered className="bg-white rounded-lg shadow-lg">
      <Modal.Header closeButton className="text-white bg-blue-600">
        <Modal.Title className="text-lg font-bold">{artwork.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-6 text-gray-800 bg-white">
        <div className="mb-3">
          <strong className="text-blue-600">Title:</strong> {artwork.title}
        </div>
        <div className="mb-3">
          <strong className="text-blue-600">Medium:</strong> {artwork.medium}
        </div>
        <div className="mb-3">
          <strong className="text-blue-600">Dimensions:</strong> {artwork.dimensions}
        </div>
        <div className="mb-3">
          <strong className="text-blue-600">Date Created:</strong> {artwork.date}
        </div>
        <div className="mb-3">
          <strong className="text-blue-600">Description:</strong> {artwork.description}
        </div>
        <div className="mb-3">
          <strong className="text-blue-600">Place:</strong> {artwork.place}
        </div>
        {/* Add other fields as necessary */}
      </Modal.Body>
      <Modal.Footer className="bg-gray-100">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="text-white transition duration-300 ease-in-out bg-gray-600 rounded-lg hover:bg-gray-700"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArtworkModal;
