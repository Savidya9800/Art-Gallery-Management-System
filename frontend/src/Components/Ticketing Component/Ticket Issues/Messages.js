import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";  
import FooterComp from "../../Nav Component/FooterComp";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all messages when the component loads
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/messages");
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Handle message deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`http://localhost:5000/api/messages/${id}`);
        setMessages(messages.filter((message) => message._id !== id)); // Update state to remove deleted message
        alert("Message deleted successfully");
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      }
    }
  };

  // Handle marking message as done
  const handleDone = async (id) => {
    try {
      const updatedMessages = messages.map((message) =>
        message._id === id ? { ...message, done: !message.done } : message
      );
      setMessages(updatedMessages);

      // Optionally, make an API request to save the updated "done" status in the database
      await axios.put(`http://localhost:5000/api/messages/${id}`, {
        done: updatedMessages.find((msg) => msg._id === id).done,
      });
    } catch (error) {
      console.error("Error updating message:", error);
      alert("Failed to update message");
    }
  };

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NavigationBar/>
      <h2 className="text-xl font-semibold mb-4">All Messages</h2>
      <table className="bg-white border-collapse border border-black w-full">
        <thead>
          <tr>
            <th className="bg-white border border-black px-2 py-1 w-1/4">Visitor ID</th>
            <th className="bg-white border border-black px-2 py-1 w-1/3">Description</th>
            <th className="bg-white border border-black px-2 py-1 w-1/6">Done</th>
            <th className="bg-white border border-black px-2 py-1 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message._id}>
              <td className="bg-white border border-black px-2 py-1">{message.visitorID}</td>
              <td className="bg-white border border-black px-2 py-1">{message.description}</td>
              <td className="bg-white border border-black px-2 py-1">
                {message.done ? "Yes" : "No"}
              </td>
              <td className="bg-white border border-black px-2 py-1">
                <button
                  onClick={() => handleDone(message._id)}
                  className={`px-2 py-1 rounded-md ${
                    message.done
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-500 text-white hover:bg-gray-600"
                  }`}
                >
                  {message.done ? "Undone" : "Done"}
                </button>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FooterComp/>
    </div>
  );
};

export default Messages;
