import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArtBidForm from "../AdminBidForm/ArtBidForm"; // ArtBidForm to display data
import NavigationBar from "../../../Nav Component/NavigationBar";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/Adminbid"; // Ensure URL is correct (case-sensitive)

// Fetch handler
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ArtBidView() {
  const [adminAddBid, setBidAddArt] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      setBidAddArt(data.adminAddBid);
      calculateCategoryCount(data.adminAddBid);
    });
  }, []);

  // Calculate the count of artworks by category
  const calculateCategoryCount = (data) => {
    const count = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    setCategoryCount(count);
  };

  // PDF generation function using jsPDF
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor("#FFFFFF");
    doc.rect(0, 0, 210, 297, "F");

    // Header
    doc.setFontSize(22);
    doc.setTextColor(25, 25, 112);
    doc.text("Awarná Art Gallery", 15, 20);

    // Quote
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("“Experience every masterpiece”", 15, 30);

    doc.setFontSize(16);
    doc.text("Artwork Added for Bidding Report", 15, 50);

    const tableColumn = [
      "ID",
      "Title",
      "Artist Name",
      "Category",
      "Minimum Price",
    ];

    const tableRows = [];

    adminAddBid.forEach((artwork) => {
      const artworkData = [
        artwork.id,
        artwork.title,
        artwork.artistName,
        artwork.category,
        artwork.minPrice,
      ];
      tableRows.push(artworkData);
    });

    // Add table using autoTable
    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      styles: { fillColor: [255, 255, 255] },
      headStyles: { fillColor: [167, 143, 81] },
    });

    // Category summary
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(
      "Summary of Artworks by Category:",
      15,
      doc.lastAutoTable.finalY + 10
    );

    let yPos = doc.lastAutoTable.finalY + 20;
    Object.entries(categoryCount).forEach(([category, count]) => {
      doc.setFontSize(14);
      doc.text(`${category}: ${count} artworks`, 15, yPos);
      yPos += 10;
    });

    // Footer
    const footerText = [
      "Awarná Art Gallery",
      "Address: 58, Parakrama Mawatha, Wennappuwa",
      "Contact: +94 765 456 789 | Email: awarnaArts@gmail.co",
    ];

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 200); // Set footer text color to light gray
    const footerY = doc.internal.pageSize.getHeight() - 40; // Adjust footer position as necessary

    footerText.forEach((line, index) => {
      doc.text(line, 15, footerY + index * 10); // Increment Y position for each line
    });

    // Download PDF
    doc.save("Artwork_Bid_Report.pdf");
  };

  // Search function
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const searchTerm = searchQuery.toLowerCase(); // Use the full search query

      const filteredBidArt = data.adminAddBid.filter((BIDART) => {
        // Check if the artwork title includes the search term
        return BIDART.title.toLowerCase().includes(searchTerm);
      });

      setBidAddArt(filteredBidArt);
      setNoResults(filteredBidArt.length === 0);
      calculateCategoryCount(filteredBidArt); // Update category count on search
    });
  };

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>

      <div className="p-6">
        {/* Container for Add New Record and Search Bar */}
        <div className="flex justify-center mb-4 space-x-4">
        <button
            className="px-4 py-2 text-white transition duration-300 bg-[#A78F51] rounded-md shadow-md hover:bg-[#bfa35d]"
            onClick={() => navigate("/adminArtworksBid")}
          >
            Requested Artworks
          </button>
          {/* Add New Record Button */}
          <button
            className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500"
            onClick={() => navigate("/adminArtBidAdd")}
          >
            + Add New Record
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-[#ECE6F0] border border-gray-300 px-4 py-2 shadow-md rounded-md">
            <input
              type="text"
              name="search"
              className="w-full px-4 py-2 text-gray-700 bg-transparent focus:outline-none rounded-l-md"
              placeholder="Search by Title"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 text-white transition duration-300 bg-green-600 shadow-md rounded-r-md hover:bg-green-500"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {noResults ? (
          <div className="mt-6 text-center">
            <p className="text-red-500">No Bid Art found</p>
          </div>
        ) : (
          <div className="mt-6">
            {adminAddBid &&
              adminAddBid.map((BIDART, i) => (
                <div key={i}>
                  <ArtBidForm BIDART={BIDART} />
                </div>
              ))}

            {/* Generate PDF Button */}
            <button
              className="px-4 py-2 mt-6 mr-5 text-white transition duration-300 bg-blue-700 rounded-md shadow-md hover:bg-blue-600"
              onClick={generatePDF}
            >
              Download Summary Report
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default ArtBidView;
