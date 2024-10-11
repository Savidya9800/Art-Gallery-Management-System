import React, { useEffect, useState } from "react";
import axios from "axios";
import Viewinquiries from "./ViewInquiries";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

const URL = "http://localhost:5000/inquiry";
const email = localStorage.getItem("email");

const fetchHandler = async () => {
  try {
    const response = await axios.post(`${URL}/i/${email}`);
    console.log(response.data); // Log the full response
    return response.data; // Make sure this contains the inquiryData you expect
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return null; // Return null in case of error
  }
};

export default function ViewInquiry() {
  const [inquiryData, setInquiryData] = useState(null); // Initialize as null

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.inquiryData) {
        // Check if inquiryData exists
        setInquiryData(data.inquiryData); // Set the inquiry object directly
      } else {
        setInquiryData(null); // Set to null if data is not in expected format
      }
    });
  }, []);

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <br />
      <div>
        {inquiryData ? ( // Check if inquiryData is not null
          <Viewinquiries INQUIRY={inquiryData} /> // Directly pass the inquiry object
        ) : (
          <p>No inquiries found.</p> // Handle empty state
        )}
      </div>
      <FooterComp />
    </div>
  );
}
