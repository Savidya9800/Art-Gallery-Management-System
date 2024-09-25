import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
//import logo from '../../../Nav Component/logo.JPG';


const PdfGenerator = () => {
  const location = useLocation();
  const { selectedPackage, email, eventDate, artistName } = location.state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();

     // Add a background color for the title
     doc.setFillColor(167, 143, 81); // Light lavender background
     doc.rect(10, 10, 190, 15, 'F'); // Rectangle for title background
 
     // Add title to the PDF
     doc.setFontSize(22);
     doc.setTextColor(240, 237, 230); // Dark Slate Gray color for text
     doc.text('Reservation Confirmation', 14, 20);
 
     //Add logo
  /*   const pageWidth = doc.internal.pageSize.getWidth();

     const imgWidth = 25; // Width of the logo
     const imgHeight = 20; // Height of the logo
     const xPosition = pageWidth - imgWidth - 10;
     doc.addImage(logo, 'JPEG', xPosition, 10, imgWidth, imgHeight);*/

     // Add a line below the title
     doc.setLineWidth(0.5);
     doc.setDrawColor(169, 169, 169); // Gray color
     doc.line(10, 30, 200, 30);

     // Information Section Title
     doc.setFontSize(16);
     doc.setTextColor(0, 0, 128); // Navy color
     doc.text('Reservation Details', 14, 40);
 
     // Details Section
     doc.setFontSize(12);
     doc.setTextColor(0, 0, 0); // Reset to black for content
 
     let startY = 50;
     const lineHeight = 10;

      // Artist Information
      const detail = [
        `Name: ${artistName}`,
        `Email: ${email}`,
        `Event Date: ${eventDate ? new Date(eventDate).toLocaleString() : 'No Date'}`,
        `Package Name: ${selectedPackage?.name}`,
        `Includes: ${selectedPackage?.Decoration}`,
        `Total Budget: ${selectedPackage?.budget}`        
      ];

       // Add a line below the title
     doc.setLineWidth(0.5);
     doc.setDrawColor(169, 169, 169); // Gray color
     doc.line(10, 30, 200, 30);

     detail.forEach((detail, index) => {
       doc.text(detail, 14, startY + (index * lineHeight));
     });

     // Tickets information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 128); // Navy color for section title

    // Final save
    doc.save(`Confirmation.pdf`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="pdf-container p-6 bg-white shadow-lg rounded-lg">
        {/* Button aligned to the top-right */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={downloadPDF} 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Download PDF
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Confirmation</h1>

        {/* Card View for Confirmation Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Artist Information</h2>
            <p className="text-gray-700"><strong>Name:</strong> {artistName}</p>
            <p className="text-gray-700"><strong>Email:</strong> {email}</p>
            <p className="text-gray-700"><strong>Event Date:</strong> {eventDate ? new Date(eventDate).toLocaleString() : 'No Date'}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Package Details</h2>
            <p className="text-gray-700"><strong>Package Name:</strong> {selectedPackage?.name}</p>
            <p className="text-gray-700"><strong>Includes:</strong> {selectedPackage?.Decoration}</p>
            <p className="text-gray-700"><strong>Total Budget:</strong> {selectedPackage?.budget}</p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary-section mt-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <table className="summary-table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="table-cell px-4 py-2 border border-gray-300">Detail</th>
                <th className="table-cell px-4 py-2 border border-gray-300">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-cell px-4 py-2 border border-gray-300">Total Budget</td>
                <td className="table-cell px-4 py-2 border border-gray-300">{selectedPackage?.budget?.toString() || '0'}</td>
              </tr>
              <tr>
                <td className="table-cell px-4 py-2 border border-gray-300">Artist</td>
                <td className="table-cell px-4 py-2 border border-gray-300">{artistName}</td>
              </tr>
              <tr>
                <td className="table-cell px-4 py-2 border border-gray-300">Email</td>
                <td className="table-cell px-4 py-2 border border-gray-300">{email}</td>
              </tr>
              <tr>
                <td className="table-cell px-4 py-2 border border-gray-300">Event Date</td>
                <td className="table-cell px-4 py-2 border border-gray-300">{eventDate ? new Date(eventDate).toLocaleString() : 'No Date'}</td>
              </tr>
              <tr>
                <td className="table-cell px-4 py-2 border border-gray-300">Package</td>
                <td className="table-cell px-4 py-2 border border-gray-300">{selectedPackage?.name} - {selectedPackage?.Decoration}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PdfGenerator;
