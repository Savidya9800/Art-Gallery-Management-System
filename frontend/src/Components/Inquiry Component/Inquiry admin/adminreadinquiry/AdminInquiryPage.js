import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AdminViewInquiries from './AdminViewInquiries';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For tables in PDFs
import NavigationBar from '../../../Nav Component/NavigationBar';

const URL = "http://localhost:5000/inquiry";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

export default function AdminInquiryPage() {
    const [inquiryData, setInquiries] = useState([]);
    const ComponentsRef = useRef();

    useEffect(() => {
        fetchHandler().then((data) => setInquiries(data.inquiryData));
    }, []);

    const generatePDFReport = () => {
        const doc = new jsPDF();
    
        // Add a background color for the title
        doc.setFillColor(167, 143, 81); // Set the fill color to a brownish color
        doc.rect(10, 10, 190, 15, "F"); // Draw the rectangle for the background
    
        // Add title to the PDF
        doc.setFontSize(22);
        doc.setTextColor(240, 237, 230); // Set the text color to a light color
        doc.text("Total inquiries with department", 14, 20); // Title position
    
        // Add logo (make sure to replace 'logoImage' with your actual image data)
        const logoImage = "data:image/jpeg;base64,..."; // Replace with actual Base64 string of your logo
        const imgWidth = 25; 
        const imgHeight = 20; 
        const xPosition = doc.internal.pageSize.getWidth() - imgWidth - 10; // Position the logo on the right side
        const yPosition = 12; // Position the logo vertically
        doc.addImage(logoImage, 'JPEG', xPosition, yPosition, imgWidth, imgHeight); // Add logo image
    
        // Table Headers
        const headers = ["ID", "Name", "Email", "Inquiry Type", "Inquiry Message"];
        const data = inquiryData.map(inquiry => [
            inquiry._id,
            `${inquiry.name}`,
            inquiry.email,
            inquiry.inquiryType,
            inquiry.inquiryMessage
        ]);
    
        // Create a table in the PDF
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 40, // Adjust the starting Y position of the table
            theme: 'grid'
        });
    
        const finalY = doc.autoTable.previous.finalY + 10;
        const totalInquiries = inquiryData.length;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Total Inquiries: ${totalInquiries}`, 14, finalY);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, finalY + 10);
    
        // Open the PDF in a new tab
        const pdfUrl = doc.output('bloburl');
        window.open(pdfUrl);
    
        // Download the PDF
        doc.save("InquiryReport.pdf");
    };
    
    // Search Inquiry
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        const filteredData = inquiryData.filter((inquiry) =>
            Object.values(inquiry).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            ));

        setInquiries(filteredData);
        setNoResults(filteredData.length === 0);
    };

    return (
        <div>
            <div className='relative z-10'>
                <NavigationBar />
            </div>

            <div className="flex justify-center p-4 rounded-md mb-4"> {/* Centering the header */}
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4 mb-4 p-8">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="search"
                    placeholder="Search Inquiry"
                    className="w-full max-w-xs px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-black-400 text-black bg-white" 
                />

                <button onClick={handleSearch}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black-400">
                    Search
                </button>
            </div>
            <br />

            {noResults && <p>No Inquiry found</p>}

            <div ref={ComponentsRef}>
                {inquiryData && inquiryData.map((INQUIRY, i) => (
                    <div key={i}>
                        <AdminViewInquiries INQUIRY={INQUIRY} />
                    </div>
                ))}
            </div>

            <div className="mt-6 center justify-end p-8">
                <button
                    onClick={generatePDFReport} className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400"> Generate PDF</button>
            </div>
        </div>
    );
}
