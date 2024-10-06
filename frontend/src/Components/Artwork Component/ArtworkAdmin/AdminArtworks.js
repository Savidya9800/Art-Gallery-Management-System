import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import AdminArtwork from "./AdminArtwork";
import Button from "react-bootstrap/Button";

const URL = "http://localhost:5000/artWorks";

// fetchHandler to get unaccepted artworks
const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);

    // Filter artworks where accepted is false
    const unacceptedArtworks = res.data.artWorks.filter(
      (artwork) => artwork.accepted === false
    );

    return { artWorks: unacceptedArtworks }; // Return filtered artworks
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return { artWorks: [] }; // Return an empty array in case of error
  }
};
function AdminArtworks() {
  const [artWorks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]); // State for filtered artworks
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setArtworks(data.artWorks || []); // Handle undefined gracefully
      setFilteredArtworks(data.artWorks || []); // Initialize filtered artworks with all artworks
    });
  }, []);

  // Handle the search functionality
  const handleSearch = () => {
    const filtered = artWorks.filter((artwork) =>
      artwork.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArtworks(filtered); // Update the filtered artworks based on the search query
    setNoResults(filtered.length === 0); // Check if no results are found
  };

  // Handle search input change with live filtering
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Live filtering based on name as user types
    const filtered = artWorks.filter((artwork) =>
      artwork.name.toLowerCase().includes(query.toLowerCase())
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
          placeholder="Search Artworks by name"
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
              <th className="p-2 border border-gray-300">Artist</th>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Phone Number</th>
              <th className="p-2 border border-gray-300">Artist Statement</th>
              <th className="p-2 border border-gray-300">Biography</th>
              <th className="p-2 border border-gray-300">Bidding</th>
              <th className="p-2 border border-gray-300">Promote</th>
            </tr>
          </thead>

          {noResults ? (
            <div>
              <p>No Artworks Found</p>
            </div>
          ) : (
            <tbody>
              {filteredArtworks.map((ARTWORK, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <AdminArtwork ARTWORK={ARTWORK} />
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

export default AdminArtworks;
