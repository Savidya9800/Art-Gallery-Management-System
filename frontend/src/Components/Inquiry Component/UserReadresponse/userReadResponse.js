import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost:5000/adminResponse"; // Same URL as in ViewResponse.js

export default function UserReadResponse() {
  const [responses, setResponses] = useState([]);

  // Fetch the responses when the component is mounted
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(URL);
        setResponses(res.data.responseData); // Assuming responseData is the key in the backend response
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div className="container mx-auto my-10 p-5 
     rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5">Response Page</h1>

      {/* Display the responses */}
      {responses.length > 0 ? (
        responses.map((response, index) => (
          <div key={index} className="border-b-2 mb-4 pb-4">
            <h2 className="text-xl font-semibold">Response ID: {response._id}</h2>
            <p><strong>Response:</strong> {response.response}</p>
           
          </div>
        ))
      ) : (
        <p>No responses available to display.</p>
      )}
    </div>
  );
}
