import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import ArtworkComp from "../Artwork/ArtworkComp";
import Button from "react-bootstrap/Button";

const URL = "http://localhost:5000/artWorks";
const email = localStorage.getItem("email");

// fetchHandler
const fetchHandler = async () => {
  try {
    const res = await axios.get(`${URL}`, {
      params: { email }, // Pass the email as a query parameter
    });
    console.log(email);
    console.log(res.data); // Log the full response

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
  const [sortOption, setSortOption] = useState(""); // State for sorting option

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

  // Handle sorting functionality
  const handleSort = (option) => {
    setSortOption(option);

    const sorted = [...filteredArtworks].sort((a, b) => {
      if (option === "bidding") {
        // Sort to show artworks with "bidding" first
        return a.place === "bidding" && b.place !== "bidding" ? -1 : 1;
      } else if (option === "promote") {
        // Sort to show artworks with "promote" first
        return a.place === "promote" && b.place !== "promote" ? -1 : 1;
      }
      return 0;
    });
    setFilteredArtworks(sorted); // Update the artworks with the sorted ones
  };

  return (
    <div className="flex-col min-h-screen">
      <div className="relative z-10">
        <NavigationBar />
      </div>

      <div className="flex justify-between mt-2">
        {/* Search Bar */}
        <div className="mt-2">
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleInputChange} // Handle input change
            placeholder="Search Artworks by Title"
            className="p-2 px-3 mr-2 transition duration-300 ease-in-out bg-gray-100 border border-gray-300 rounded-lg shadow-sm ml-7 w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button variant="success" onClick={handleSearch}>
            {" "}
            {/* Handle search button click */}
            Search
          </Button>
        </div>

        {/* Sort By Dropdown */}
        <div className="mt-4 ml-8 mr-8">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)} // Handle sorting change
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select</option>
            <option value="bidding">Bidding</option>{" "}
            <option value="promote">Promote</option>{" "}
          </select>
        </div>
      </div>

      <div className="flex-grow p-4 mb-10">
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
