import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get inquiryID from the URL
import Viewresponses from './Viewresponses';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

const URL = "http://localhost:5000/adminResponse"; // Base URL for fetching responses

// Fetch responses for a specific inquiryId
const fetchHandler = async (inquiryID) => {
    return await axios.get(`${URL}/inquiry/${inquiryID}`).then((res) => res.data.Responses);
};

function ViewResponse() {
    const { id: inquiryID } = useParams(); // Get inquiryID from the route params
    const [responseData, setResponses] = useState([]); // State for storing the fetched responses
    const [noResults, setNoResults] = useState(false); // State for handling no results

    // Fetch responses for the selected inquiry when the component is mounted
    useEffect(() => {
        if (inquiryID) {
            fetchHandler(inquiryID).then((data) => {
                setResponses(data); // Set fetched responses directly
                setNoResults(data.length === 0); // Update noResults state based on fetched data
            });
        }
    }, [inquiryID]); // Effect runs when inquiryID changes

    return (
        <div style={{ backgroundColor: '#eee8dc', minHeight: '100vh' }}>
            <NavigationBar />

            <div className="border-0 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-4xl">
                <h1 className="text-center text-3xl font-semibold text-gray-700 mb-8">Admin Responses</h1>

                {/* Conditional rendering based on noResults state */}
                {noResults ? (
                    <div style={{ fontWeight: 'bold', color: 'black', textAlign: 'center' }}>No responses found for this inquiry.</div>
                ) : (
                    <div>
                        {responseData && responseData.map((response, i) => (
                            <Viewresponses key={i} RESPONSE={response} />  // Render Viewresponses component for each response
                        ))}
                    </div>
                )}
            </div>

            <FooterComp />
        </div>
    );
}

export default ViewResponse;
