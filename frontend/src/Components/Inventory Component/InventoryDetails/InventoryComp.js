import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopComp from "../Inventory/ShopComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import logo from "../../Nav Component/logo.JPG";
import { useNavigate } from 'react-router-dom';


const URL = "http://localhost:5000/inventory";



const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function InventoryComp() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Inventory data:", data.inventory);
      setInventory(data.inventory);
    });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(167, 143, 81); 
    doc.rect(10, 10, 190, 15, "F"); 

    // Title: Inventory List
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230);
    doc.text("Inventory List", 14, 20);


    // Table with Inventory Data
    const inventoryData = inventory.map((item) => [
      `PID${item._id.slice(-4)}`,
      item.productname || "N/A",
      item.price || "N/A",
      item.itemCount || "N/A",
      new Date(item.date).toLocaleDateString() || "N/A",
      item.image ? item.image : "No Image" // Include image filename or "No Image"
    ]);

    doc.autoTable({
      head: [["Product Code", "Product Name", "Price", "Item Count", "Date", "Image"]],
      body: inventoryData.length > 0 ? inventoryData : [["No inventory items found"]],
      startY: 40,
      theme: "grid",
      headStyles: {
        fillColor: [165, 143, 81], 
        textColor: [255, 255, 255], 
        fontStyle: "bold", 
      },
    });

    // Add logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 25; 
    const imgHeight = 20; 
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);
  
    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); 
    doc.line(10, 30, 200, 30);
  
      
    // Add line above the footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); 
    doc.line(10, footerY - 5, 200, footerY - 5); 


    // Footer text (right-aligned)
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); 
  
    doc.text("Art Gallery Name", pageWidth - 14, footerY, { align: "right" });
    doc.text(
      "Address: 58, Parakrama Mawatha, Wennappuwa",
      pageWidth - 14,
      footerY + 5,
      { align: "right" }
    );
    doc.text(
      "Contact: +94 765 456 789 | Email: awarnaArts@gmail.com",
      pageWidth - 14,
      footerY + 10,
      { align: "right" }
    );
  
    // Add line below the footer
    doc.line(10, footerY + 15, 200, footerY + 15); 
   
    // Save the PDF
    doc.save("inventory-list.pdf");
  };

  const filteredInventory = inventory.filter((item) => {
    const formattedId =  `PID${item._id.slice(-4)}`;
    return(
      formattedId.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      item.productname.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });

  return (
    <div>
      <div className="relative z-10 ">
        <NavigationBar />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Inventory List</h1>
        
        <div className="flex items-center justify-between mb-4"> {/* Align items vertically */}
  <input
    type="text"
    placeholder="Search Items"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border border-gray-400 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#A78F51] transition duration-200" // Adjusted border color and added focus styles
  />
  
  <div className="flex items-center space-x-4">
    <button
      onClick={generatePDF}
      className="bg-[#A78F51] hover:bg-[#8e7b44] text-white font-bold py-1 px-4 rounded transition duration-200"
    >
      Download PDF
    </button>

    <button
      className="bg-[#A78F51] hover:bg-[#8e7b44] text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
      onClick={() => Navigate('/addinventoryform')}
    >
      Add item
    </button>
  </div>
</div>

        <div className="overflow-x-auto">
          <table id="inventory-table" className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Product Code</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Product Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Item Count</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Image</th> {/* New Image Column */}
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory?.length > 0 ? (
                inventory.map((INVENTORY) => (
                  <ShopComp key={INVENTORY._id} INVENTORY={INVENTORY} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default InventoryComp;
