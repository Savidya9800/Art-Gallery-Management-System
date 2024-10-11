import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Viewinquiries from './ViewInquiries';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

const URL = "http://localhost:5000/inquiry";
const email = localStorage.getItem('email');

const fetchHandler = async () => {
    try {
        const response = await axios.post(`${URL}/i/${email}`);
        console.log(response.data); // Log the full response
        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return null; // Return null in case of error
    }
};

export default function ViewInquiry() {
    const [inquiryData, setInquiryData] = useState(null); // Initialize state

    useEffect(() => {
        fetchHandler().then((data) => {
            if (data && data.inquiryData) { // Ensure data is valid
                setInquiryData(data.inquiryData); // Set inquiry data
            } else {
                setInquiryData([]); // Set to an empty array if no data found
            }
        });
    }, []);

    return (
        <div>
            <NavigationBar />
            <br />
            <div>
                {inquiryData && inquiryData.length > 0 ? ( // Check if inquiryData is not null and has items
                    inquiryData.map((inquiry, i) => (
                        <Viewinquiries key={i} INQUIRY={inquiry} /> // Pass each inquiry object individually
                    ))
                ) : (
                    <p>No inquiries found.</p> // Handle the case when no inquiries are found
                )}
            </div>
            <FooterComp />
        </div>
    );
}
