import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ArtBidForm from '../AdminBidForm/ArtBidForm'; // ArtBidForm to display data
import NavigationBar from '../../../Nav Component/NavigationBar';

const URL = "http://Localhost:5000/Adminbid";

// Fetch handler
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function ArtBidView() {
  const [adminAddBid, setBidAddArt] = useState([]);
  const [categoryCount, setCategoryCount] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

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
    
    //  background color
    doc.setFillColor("#FFFFFF");
    doc.rect(0, 0, 210, 297, "F"); 

   
    doc.setFontSize(22);
    doc.setTextColor(25, 25, 112); 
    doc.text("Awarná Art Gallery", 15, 20);
    
    doc.setFontSize(16);
    doc.text("Artwork Added for Bidding Report", 15, 30);

    
    const tableColumn = ["ID", "Title", "Artist Name", "Category", "Minimum Price"];
    const tableRows = [];

    adminAddBid.forEach((artwork) => {
      const artworkData = [
        artwork.id,
        artwork.title,
        artwork.artistName,
        artwork.category,
        artwork.minPrice
      ];
      tableRows.push(artworkData);
    });

    // Add table using autoTable
    doc.autoTable({
      startY: 40,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      styles: { fillColor: [255, 255, 255] }, 
      headStyles: { fillColor: [167, 143, 81] }, 
    });

    //  category summary
    doc.setTextColor(0, 0, 0); 
    doc.setFontSize(16);
    doc.text("Summary of Artworks by Category:", 15, doc.lastAutoTable.finalY + 10);

    let yPos = doc.lastAutoTable.finalY + 20;
    Object.entries(categoryCount).forEach(([category, count]) => {
      doc.setFontSize(14);
      doc.text(`${category}: ${count} artworks`, 15, yPos);
      yPos += 10;
    });

    // Footer pdf
    doc.setFontSize(12);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 15, 290); 

    // Download PDF
    doc.save("Artwork_Bid_Report.pdf");
  };

  // Search function
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredBidArt = data.adminAddBid.filter((BIDART) =>
        Object.values(BIDART).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBidAddArt(filteredBidArt);
      setNoResults(filteredBidArt.length === 0);
      calculateCategoryCount(filteredBidArt); // update category count on search
    });
  };

  return (
    <div>
      <div className='relative z-10'>
        <NavigationBar />
      </div>
      
      <div className="p-6">
        
        <div className="flex items-center bg-[#ECE6F0] border-gray-300 px-6 py-1.5 shadow-md w-96 mx-auto">
          <input
            type="text"
            name="search"
            className="bg-[#ECE6F0] w-full px-4 py-0.1 text-gray-700 focus:outline-none"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="border border-[#A78F51] text-[#A78F51] py-2 px-6 rounded-md shadow-md hover:bg-[#A78F51] hover:text-white transition duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

       
        {noResults ? (
          <div className="text-center mt-6">
            <p className="text-red-500">No Bid Art found</p>
          </div>
        ) : (
          <div className="mt-6">
           
            {adminAddBid && adminAddBid.map((BIDART, i) => (
              <div key={i}>
               
                <ArtBidForm BIDART={BIDART} />
              </div>
            ))}

           
            <button
              className="mt-6 px-4 py-2 bg-[#A78F51] text-white rounded-md shadow-md hover:bg-[#855E3E] transition duration-300"
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
