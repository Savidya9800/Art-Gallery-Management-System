import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../Nav Component/NavigationBar';
import imgevent from '../Artist/event.jpg'

function UserSee() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/requestEvent/getrequests');
        setRequests(response.data);
      } catch (error) {
        setError('Error fetching requests');
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter accepted requests
  const acceptedRequests = requests.filter(request => request.status === 'Accepted');

  // Sort accepted requests by eventDate
  const sortedAcceptedRequests = acceptedRequests.sort((a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <div>
      <NavigationBar/>

      <img src={imgevent} alt="Event" className="w-full h-72 object-cover rounded-lg" />
      
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800 ">UPCOMING EVENT</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {sortedAcceptedRequests.map((request) => (
          <div key={request._id} className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{request.name}</h2>
            <p className="text-gray-700"><strong>Email:</strong> {request.email}</p>
            <p className="text-gray-700"><strong>Mobile Number:</strong> {request.mobileNumber}</p>
            <p className="text-gray-700"><strong>Member Count:</strong> {request.memberCount}</p>
            <p className="text-gray-700"><strong>Budget:</strong> Rs.{request.budget}</p>
            <p className="text-gray-700"><strong>Message:</strong> {request.message}</p>
            <p className="text-gray-700"><strong>Event Date:</strong> {new Date(request.eventDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default UserSee;
