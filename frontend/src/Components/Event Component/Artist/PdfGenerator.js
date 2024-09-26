import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

const PdfGenerator = () => {
  const location = useLocation();
  const { selectedPackage, email, eventDate, artistName } = location.state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20; // Page margin
    const contentWidth = pageWidth - margin * 2;
    const contentHeight = 250; // Fixed height for the card

    // Draw a rectangle border around the content
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, contentWidth, contentHeight);

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Event Confirmation Summary', pageWidth / 2, margin + 20, { align: 'center' });

    // Details Section
    const details = [
      { label: "Artist", value: artistName },
      { label: "Email", value: email },
      { label: "Event Date", value: eventDate ? new Date(eventDate).toLocaleString() : 'No Date' },
      { label: "Package", value: `${selectedPackage?.name} - ${selectedPackage?.Decoration}` },
      { label: "Total Budget", value: selectedPackage?.budget?.toString() || '0' }
    ];

    let currentY = margin + 50; // Start position for details

    details.forEach(detail => {
      doc.setFont("helvetica", "normal");
      const label = `${detail.label}:`;
      const value = detail.value.toString();

      // Draw label and value, aligning the value to the right
      doc.text(label, margin + 10, currentY);
      const valueX = pageWidth - margin - doc.getTextWidth(value) - 10; // Right-align the value
      doc.text(value, valueX, currentY);

      currentY += 10; // Move to the next line
    });

    // Save the PDF
    doc.save('summary.pdf');
  };

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
