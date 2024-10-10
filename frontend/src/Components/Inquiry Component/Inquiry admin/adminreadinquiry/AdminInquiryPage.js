import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AdminViewInquiries from './AdminViewInquiries';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For tables in PDFs

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

        // Add title
        doc.setFontSize(22);
        doc.text('Awarna Art gallary', 14, 20);
        doc.setLineWidth(0.5);
        doc.text('Inquiry Report', 24, 40);
        doc.setDrawColor(169, 169, 169); // Gray color
        doc.line(10, 30, 200, 30);
        doc.setFontSize(22);
        doc.setTextColor(240, 237, 230); 

       

        // Table Headers
        const headers = ["ID", "Name", "Email", "inquiryType", "Inquiry Message"];
        const data = inquiryData.map(inquiry => [
            inquiry._id,
            `${inquiry.name} `,
            inquiry.email,
            inquiry.inquiryType,
            inquiry.inquiryMessage
            
        ]);

        // Create a table in the PDF
        doc.autoTable({
            head: [headers],
            body: data,
            startY: 50,
            theme: 'grid'
        });

        const finalY = doc.autoTable.previous.finalY + 10;
        const totalInquiries = inquiryData.length;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Total Inquiries: ${totalInquiries}`, 14,finalY, 0);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, finalY + 10);


          // Open the PDF in a new tab
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl); // Opens PDF in a new tab

   doc.save("InquiryReport.pdf"); // Downloads the PDF

    };

    //Search Inquiry

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        const filteredData = inquiryData.filter((inquiry) =>
            Object.values(inquiry).some((field) =>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            ))

            setInquiries(filteredData);
            setNoResults(filteredData.length === 0);
    };



    return (
        <div>
            <div className="bg-gray-200  p-4 rounded-md mb-4">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4 mb-4">
            <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                placeholder="Search Inquiry"
                className="w-full max-w-xs px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-black-400"
                ></input>

<button onClick={handleSearch} 
className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black-400">Search</button>

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

            <div className="mt-6 center justify-end">
                <button 
                    onClick={generatePDFReport} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"> Generate PDF</button>
            </div>
        </div>
    );
}
