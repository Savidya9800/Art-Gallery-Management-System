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
      const acceptedArtworks = result.data.artWorks.filter(
        (artwork) => artwork.accepted === true
      );
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
    <div className="p-4 mx-auto ">
      {artworks.length === 0 ? (
        <p className="text-center text-gray-500">
          No artworks available at the moment. Please check back later.
        </p> // Message when no artworks are available
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <div
              key={artwork._id}
              className="p-6 transition duration-300 transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
            >
              {artwork.img && (
                <img
                  src={`http://localhost:5000/images/${artwork.img}`} // Adjust based on your image storage path
                  alt={artwork.title}
                  className="object-cover w-full mb-4 transition-transform duration-300 rounded-lg h-70 hover:scale-105"
                />
              )}

              <h2 className="mb-2 text-xl font-bold bg-white">
                {artwork.title}
              </h2>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Artist Name:</strong> {artwork.name}
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Art Medium:</strong> {artwork.medium}
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Size & Dimensions:</strong> {artwork.dimensions}
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Creation Date:</strong> {artwork.date}
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Description:</strong> {artwork.description}
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Website:</strong>{" "}
                <a
                  href={artwork.website}
                  className="text-blue-500 bg-white hover:underline"
                >
                  {artwork.website}
                </a>
              </p>
              <p className="mb-1 text-gray-700 bg-white">
                <strong className="bg-white">Tags:</strong>{" "}
                {Array.isArray(artwork.tags) ? artwork.tags.join(", ") : artwork.tags}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImgUploader;
