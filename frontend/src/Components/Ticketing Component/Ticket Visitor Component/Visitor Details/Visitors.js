import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Visitor from '../Visitor/Visitor';
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import Button from 'react-bootstrap/Button';


const URL = 'http://localhost:5000/visitors'; // Corrected URL

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return null;
  }
}

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.visitors) {
        setVisitors(data.visitors);
      }
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredVisitors = data.visitors.filter((visitor) =>
        visitor._id.includes(searchQuery) || // Check if search query matches the ID
        visitor.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.lname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVisitors(filteredVisitors);
      setNoResult(filteredVisitors.length === 0);
    });
  };

  const handleSendReport = (visitor) => {
    const phoneNumber = visitor.phone; 
    const ticketDetails = visitor.tickets.map(ticket => 
      `${ticket.type}: ${ticket.count} ticket(s) at Rs.${ticket.price} each`
    ).join('\n'); // Create a formatted string for tickets

    const visitorDetails = `Visitor Details:\nName: ${visitor.fname} ${visitor.lname}\nEmail: ${visitor.email}\nPhone: ${visitor.phone}\nDate: ${visitor.date}\nTime: ${visitor.time}\nAddress: ${visitor.city}, ${visitor.country}\n\nTicket Information:\n${ticketDetails}`;
    
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(visitorDetails)}`;

    window.open(WhatsAppUrl, "_blank");
  };

  return (
    <div>
      <NavigationBar />
      
      <br />
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users Details by ID, First Name, or Last Name"
        className="ml-10 border rounded-md py-3 px-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <Button
        onClick={handleSearch}
        variant="success"
      >
        Search
      </Button>

      {noResult ? (
        <div>
          <p>No result found</p>
        </div>
      ) : (
        <div>
          {visitors.length > 0 ? (
            visitors.map((visitor, i) => (
              <div key={i}>
                <button
                  onClick={() => handleSendReport(visitor)}
                  className="ml-5 bg-green-500 text-white font-semibold py-2 px-4 rounded-md mt-2"
                >
                  Send Report
                </button>
                
                <Visitor visitor={visitor} />
                
              </div>
            ))
          ) : (
            <p>No visitors available.</p>
          )}
        </div>
      )}
      <FooterComp />
    </div>
  );
}

export default Visitors;
