import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import logo from '../../Nav Component/logo.JPG';

function AdminArtwork(props) {
  const {
    _id,
    name,
    email,
    pNumber,
    website,
    biography,
    statement,
    title,
    medium,
    dimensions,
    date,
    description,
    place,
    tags,
    price,
  } = props.ARTWORK;
  const history = useNavigate();

  // Function to generate PDF report
  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Add a background color for the title
    doc.setFillColor(167, 143, 81); // Light lavender background
    doc.rect(10, 10, 190, 15, "F"); // Rectangle for title background

    // Add title to the PDF
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230); // Dark Slate Gray color for text
    doc.text("Artwork Report", 14, 20);

    //Add logo
    const pageWidth = doc.internal.pageSize.getWidth();

    const imgWidth = 25; // Width of the logo
    const imgHeight = 20; // Height of the logo
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); // Gray color
    doc.line(10, 30, 200, 30);

    // Artist Information Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Navy color
    doc.text("Artist Information", 14, 40);

    // Artist Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for content
    doc.text(`Submission ID: ${_id}`, 14, 50);
    doc.text(`Artist: ${name}`, 14, 60);
    doc.text(`Email: ${email}`, 14, 70);
    doc.text(`Phone Number: ${pNumber}`, 14, 80);
    doc.text(`Website: ${website}`, 14, 90);
    doc.text(`Biography: ${biography}`, 14, 100);
    doc.text(`Statement: ${statement}`, 14, 110);

    // Add a small divider
    doc.setLineWidth(0.5);
    doc.line(10, 120, 200, 120);

    // Artwork Details Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Navy color
    doc.text("Artwork Details", 14, 130);

    // Artwork Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for content
    doc.text(`Title: ${title}`, 14, 140);
    doc.text(`Medium: ${medium}`, 14, 150);
    doc.text(`Dimensions: ${dimensions}`, 14, 160);
    doc.text(`Date: ${date}`, 14, 170);
    doc.text(`Description: ${description}`, 14, 180);

    // Add a small divider
    doc.setLineWidth(0.5);
    doc.line(10, 190, 200, 190);

    // Artwork Upload
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128); // Navy color
    doc.text("Additional Information", 14, 200);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for content
    doc.text(`Status: ${place}`, 14, 210);
    doc.text(`Tags: ${tags}`, 14, 220);
    doc.text(`Price: ${price}`, 14, 230);

    // Add footer with date and page number
    doc.setFontSize(10);
    doc.setTextColor(169, 169, 169); // Gray color
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 285); // Current date
    doc.text(`Page 1 of 1`, 180, 285); // Page number

    // Save the PDF
    doc.save(`${title}_Artwork_Report.pdf`);
  };

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) {
      return; // Exit the function if the user clicks "No"
    }

    try {
      await axios.delete(`http://localhost:5000/artWorks/${_id}`);
      history("/"); // Redirects after successful deletion
      history("/mainArtworkDetails");
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  return (
    <>
      <td className="p-2 border border-gray-300">{_id}</td>
      <td className="p-2 border border-gray-300">{name}</td>
      <td className="p-2 border border-gray-300">{title}</td>
      <td className="p-2 border border-gray-300">
        <label className="items-center ">
          <input
            type="radio"
            name={`place-${_id}`}
            value="bidding"
            checked={place === "bidding"}
            readOnly
            className="hidden"
          />
          <span
            className={`w-6 h-6 border-2 rounded-md mr-2 flex items-center justify-center ${
              place === "bidding"
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
          >
            {place === "bidding" && (
              <span className="w-3 h-3 bg-white rounded-full"></span>
            )}
          </span>
        </label>
      </td>
      <td className="p-2 border border-gray-300">
        <label className="flex items-center">
          <input
            type="radio"
            name={`place-${_id}`}
            value="promote"
            checked={place === "promote"}
            readOnly
            className="hidden"
          />
          <span
            className={`w-6 h-6 border-2 rounded-md mr-2 flex items-center justify-center ${
              place === "promote"
                ? "bg-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
          >
            {place === "promote" && (
              <span className="w-3 h-3 bg-white rounded-full"></span>
            )}
          </span>
        </label>
      </td>

      <td className="p-2 border border-gray-300">
        <Button onClick={generatePDFReport} variant="primary" className="mr-1">
          Generate Report
        </Button>
        |
        <Link to={`/mainArtworkDetails/${_id}`}>
          <Button variant="success" className="ml-1 mr-1">
            Accept
          </Button>
        </Link>
        |
        <Button onClick={deleteHandler} variant="danger" className="ml-1">
          Reject
        </Button>
      </td>
    </>
  );
}

export default AdminArtwork;
