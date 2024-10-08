import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import ArtworkComp from "../Artwork/ArtworkComp";
import Button from "react-bootstrap/Button";

const URL = "http://localhost:5000/artWorks";

// fetchHandler
const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return { artWorks: [] }; // Return an empty array in case of error
  }
};

function ArtworksComp() {
  const [artWorks, setArtworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setArtworks(data.artWorks || []); // Handle undefined gracefully
    });
  }, []);

  // Search Functionality
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const artworksList = data.artWorks || []; // Ensure artWorks is an array
      const filteredArtworks = artworksList.filter((artwork) =>
        Object.values(artwork).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setArtworks(filteredArtworks);
      setNoResults(filteredArtworks.length === 0);
    });
  };

  return (
    <div className="flex-col min-h-screen">
     <div className="relative z-10">
        <NavigationBar />
</div>

      {/* Search Bar */}
      <div className="mt-2">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Artworks Details"
          className="w-full p-2 px-3 mr-2 transition duration-300 ease-in-out bg-gray-100 border border-gray-300 rounded-lg shadow-sm ml-7 sm:w-1/2 lg:w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <Button onClick={handleSearch} variant="success">
          Search
        </Button>
      </div>


      <div className="flex-grow p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Submission ID</th>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Medium</th>
              <th className="p-2 border border-gray-300">Bidding</th>
              <th className="p-2 border border-gray-300">Promote</th>
              <th className="p-2 border border-gray-300">Description</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>

          {noResults ? (
            <div>
              <p>No Artworks Found</p>
            </div>
          ) : (
            <tbody>
              {artWorks.map((ARTWORK, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <ArtworkComp ARTWORK={ARTWORK} />
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <FooterComp />
    </div>
  );
}

export default ArtworksComp;
