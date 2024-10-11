import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import logo from "../../Nav Component/logo.JPG";

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
    doc.setFillColor(167, 143, 81);
    doc.rect(10, 10, 190, 15, "F");

    // Add title to the PDF
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230);
    doc.text("Artwork Report", 14, 20);

    // Add logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 25; // Width of the logo
    const imgHeight = 20; // Height of the logo
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169);
    doc.line(10, 30, 200, 30);

    // Artist Information Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("Artist Information", 14, 40);

    // Artist Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Artist: ${name}`, 14, 50);
    doc.text(`Email: ${email}`, 14, 60);
    doc.text(`Phone Number: ${pNumber}`, 14, 70);
    doc.text(`Website: ${website}`, 14, 80);
    doc.text(`Biography: ${biography}`, 14, 90);
    doc.text(`Statement: ${statement}`, 14, 100);

    // Add a small divider
    doc.setLineWidth(0.5);
    doc.line(10, 110, 200, 110);

    // Artwork Details Section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("Artwork Details", 14, 120);

    // Artwork Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Title: ${title}`, 14, 130);
    doc.text(`Medium: ${medium}`, 14, 140);
    doc.text(`Dimensions: ${dimensions}`, 14, 150);
    doc.text(`Date: ${date}`, 14, 160);
    doc.text(`Description: ${description}`, 14, 170);

    // Add a small divider
    doc.setLineWidth(0.5);
    doc.line(10, 180, 200, 180);

    // Artwork Upload
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 128);
    doc.text("Additional Information", 14, 190);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Status: ${place}`, 14, 200);
    doc.text(`Tags: ${tags}`, 14, 210);

    // Add footer with date and page number
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("Awarna Art Gallery", pageWidth - 14, footerY, { align: "right" });
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

    // Save the PDF
    doc.save(`${title}_Artwork_Report.pdf`);
  };

  const deleteHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artwork?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/artWorks/${_id}`
      );
      if (response.status === 200) {
        alert("Artwork Rejected! and email sent!");
      }
      history("/mainArtworkDetails");
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete the artwork. Please try again.");
    }
  };

  const handleAccept = async () => {
    const updatedData = {
      accepted: true,
      place,
    };

    try {
      const response = await axios.patch(
        `http://localhost:5000/artWorks/updateart/${_id}`,
        updatedData
      );
      console.log("Artwork updated successfully:", response.data);
      if (response.status === 200) {
        alert("Artwork accepted and email sent!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating artwork:", error.response.data);
    }
  };

  // Render only if place is "promote"
  if (place !== "promote") {
    return null; // Do not render anything if place is not "promote"
  }

  return (
    <>
      <td className="p-2 border border-gray-300">{name}</td>
      <td className="p-2 border border-gray-300">{title}</td>
      <td className="p-2 border border-gray-300">{email}</td>
      <td className="p-2 border border-gray-300">{pNumber}</td>
      <td className="p-2 border border-gray-300">{statement}</td>
      <td className="p-2 border border-gray-300">{biography}</td>
      
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

      <td className="p-2 mr-0 border border-gray-300">
        <Button
          onClick={generatePDFReport}
          variant="primary"
          className="mb-1 ml-1.5 mr-0"
        >
          Generate Report
        </Button>

        <Button onClick={handleAccept} variant="success" className="ml-1 mr-1">
          Accept
        </Button>

        <Button
          onClick={deleteHandler}
          variant="danger"
          className="ml-1 -mr-14"
        >
          Reject
        </Button>
      </td>
    </>
  );
}

export default AdminArtwork;
