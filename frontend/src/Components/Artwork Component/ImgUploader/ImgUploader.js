import React, { useEffect, useState } from "react";
import axios from "axios";

function ImgUploader() {
  const [artworks, setArtworks] = useState([]); // State to hold the artworks

  // Function to fetch artworks
  const getArtWorks = async () => {
    try {
      const result = await axios.get("http://localhost:5000/artWorks"); // Change to your API endpoint
      console.log("Retrieved artworks:", result.data.artWorks);

      // Filter artworks where accepted is true
      const acceptedArtworks = result.data.artWorks.filter((artwork) => artwork.accepted === true);
      setArtworks(acceptedArtworks); // Update the state with filtered artworks
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  // Fetch artworks on component mount
  useEffect(() => {
    getArtWorks();
  }, []);

  return (
    <div>
      {artworks.length === 0 ? (
        <p>No artworks found.</p> // Message when no artworks are available
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <div key={artwork._id} className="p-4 border rounded">
              <h2 className="text-lg font-bold">{artwork.title}</h2>
              <p><strong>Artist:</strong> {artwork.name}</p>
              <p><strong>Medium:</strong> {artwork.medium}</p>
              <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
              <p><strong>Date:</strong> {artwork.date}</p>
              <p><strong>Description:</strong> {artwork.description}</p>
              <p><strong>Price:</strong> ${artwork.price}</p>
              <p><strong>Tags:</strong> {artwork.tags}</p>
              {artwork.img && (
                <img
                  src={`http://localhost:5000/images/${artwork.img}`} // Adjust based on your image storage path
                  alt={artwork.title}
                  className="mt-2"
                  height={100}
                  width={100}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImgUploader;
