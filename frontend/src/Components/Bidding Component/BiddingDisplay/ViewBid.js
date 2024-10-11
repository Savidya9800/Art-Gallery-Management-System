import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the artworkId from the URL
import Bids from '../Bid/Bids';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

const URL = "http://localhost:5000/bidding"; // URL for fetching bids

// Fetch bids for a specific artworkId
const fetchHandler = async (artworkId) => {
    return await axios.get(`${URL}/artwork/${artworkId}`).then((res) => res.data.Bidder); // Adjusted to match your response structure
};

function ViewBid() {
    const { id: artworkId } = useParams(); // Get artworkId from the route params
    const [Bidder, setBidder] = useState([]); // State for storing the fetched bids
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [noResults, setNoResults] = useState(false); // State for handling no results

    // Fetch bids for the selected artwork when the component is mounted
    useEffect(() => {
        if (artworkId) {
            fetchHandler(artworkId).then((data) => {
                // Sort bids by amount in descending order
                const sortedBids = data.sort((a, b) => b.amount - a.amount);
                setBidder(sortedBids); // Set sorted bids
                setNoResults(data.length === 0); // Update noResults state based on fetched data
            });
        }
    }, [artworkId]); // Effect runs when artworkId changes

    // Handle the search functionality specifically for emails
    const handleSearch = () => {
        // Filter bids based on whether the email matches the search query
        const filteredBids = Bidder.filter((IDBidder) =>
            IDBidder.email && // Ensure IDBidder has an email property
            IDBidder.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBidder(filteredBids);
        setNoResults(filteredBids.length === 0);
    };

    return (
        <div style={{ backgroundColor: '#eee8dc', minHeight: '100vh' }}>
            <NavigationBar />

            <div className="flex justify-start mb-5" style={{ marginLeft: '30px' }}>
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    name="search"
                    placeholder="Search Bidder Email"
                    className="w-full p-2 px-3 mr-2 transition duration-300 ease-in-out bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: 'auto', flexGrow: 1, maxWidth: '400px' }}
                />
                <button
                    onClick={handleSearch}
                    className="text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                    style={{ backgroundColor: '#A78F51' }}
                >
                    Search
                </button>
            </div>

            {noResults ? (
                <div style={{ fontWeight: 'bold', color: 'black', textAlign: 'left', marginLeft: '30px' }}>Currently no one bidded. Be the first to Bid!!!</div>
            ) : (
                <Bids bids={Bidder} />  // Pass all sorted bids as an array to the Bids component
            )}

            <FooterComp />
        </div>
    );
}

export default ViewBid;
