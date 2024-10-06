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
  const [filteredArtworks, setFilteredArtworks] = useState([]); // State for filtered artworks
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setArtworks(data.artWorks || []); // Set the initial artworks
      setFilteredArtworks(data.artWorks || []); // Initialize filtered artworks with all artworks
    });
  }, []);

  // Handle the search functionality
  const handleSearch = () => {
    const filtered = artWorks.filter((artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArtworks(filtered); // Update the filtered artworks based on the search query
    setNoResults(filtered.length === 0); // Check if no results are found
  };

  // Handle search input change with live filtering
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Live filtering based on title as user types
    const filtered = artWorks.filter((artwork) =>
      artwork.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtworks(filtered); // Update the filtered artworks based on the search query
    setNoResults(filtered.length === 0); // Check if no results are found
  };

  return (
    <div className="flex-col min-h-screen">
      <div className="relative z-10">
        <NavigationBar />
      </div>

      {/* Search Bar */}
      <div className="mt-2">
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleInputChange} // Handle input change
          placeholder="Search Artworks by Title"
          className="w-full p-2 px-3 mr-2 transition duration-300 ease-in-out bg-gray-100 border border-gray-300 rounded-lg shadow-sm ml-7 sm:w-1/2 lg:w-1/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button variant="success" onClick={handleSearch}>
          {" "}
          {/* Handle search button click */}
          Search
        </Button>
      </div>

      <div className="flex-grow p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Medium</th>
              <th className="p-2 border border-gray-300">Bidding</th>
              <th className="p-2 border border-gray-300">Promote</th>
              <th className="p-2 border border-gray-300">Date Created</th>
              <th className="p-2 border border-gray-300">Description</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>

          {noResults ? (
            <tbody>
              <tr>
                <td colSpan="7" className="text-center">
                  No Artworks Found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredArtworks.map((ARTWORK, i) => (
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
