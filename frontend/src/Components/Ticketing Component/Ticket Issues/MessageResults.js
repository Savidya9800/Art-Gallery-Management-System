import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

const MessageResult = () => {
  const location = useLocation();
  const { message } = location.state;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    visitorID: message.visitorID,
    description: message.description
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle the update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send the PUT request to update the message
      const response = await axios.put(`http://localhost:5000/api/messages/${message._id}`, formData);

      // Display success message and navigate to the result page
      alert('Message updated successfully');
      navigate('/messageResult', { state: { message: response.data.message } });
    } catch (error) {
      console.error('Failed to update message:', error);
      alert('Error updating message');
    }
  };

  // Handle message deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        // Send the DELETE request to remove the message
        await axios.delete(`http://localhost:5000/api/messages/${message._id}`);

        // Display success message and navigate back to a list or home page
        alert('Message deleted successfully');
        navigate('/');  // Redirect to home or another list page after deletion
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert('Error deleting message');
      }
    }
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h2 className="bg-white text-xl font-semibold">Request Sent successfully....</h2>

        {!isEditing ? (
          <>
            <div className="mb-4">
              <label className="bg-white block text-sm font-medium text-gray-700">Visitor ID</label>
              <p className="bg-white py-2 px-3 text-gray-900">{message.visitorID}</p>
            </div>
            <div className="mb-4">
              <label className="bg-white block text-sm font-medium text-gray-700">Description</label>
              <p className="bg-white py-2 px-3 text-gray-900">{message.description}</p>
            </div>

            {/* Button to toggle edit mode */}
            <button onClick={toggleEdit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Edit
            </button>

            {/* Button to delete message */}
            <button onClick={handleDelete} className="ml-4 mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Delete
            </button>
          </>
        ) : (
          // Edit form when in editing mode
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="bg-white block text-sm font-medium text-gray-700">Visitor ID</label>
              <input
                type="text"
                name="visitorID"
                value={formData.visitorID}
                onChange={handleChange}
                className="py-2 px-3 text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label className="bg-white block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="py-2 px-3 text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>

            {/* Cancel button to exit edit mode */}
            <button
              type="button"
              onClick={toggleEdit}
              className="ml-4 mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      <FooterComp />
    </div>
  );
};

export default MessageResult;
