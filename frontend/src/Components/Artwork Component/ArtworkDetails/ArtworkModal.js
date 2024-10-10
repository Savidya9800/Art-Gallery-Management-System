import React from "react";
import { Button } from "react-bootstrap";

const ArtworkModal = ({ show, handleClose, artwork }) => {
  if (!artwork || !show) return null; // If there's no artwork or modal isn't shown, return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-auto max-w-md p-5 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-2 border-b border-gray-300">
          <h3 className="text-lg font-bold text-blue-600">{artwork.title}</h3>
          <button
            className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
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
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
