import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

const EventManagerRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching event requests on component mount
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

  // Updating the status of requests
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/requestEvent/updatestatus/${id}`, { status });
      setRequests(
        requests.map((request) => (request._id === id ? { ...request, status } : request))
      );
    } catch (error) {
      setError('Error updating request status');
      console.error('Error updating request status:', error);
    }
  };

  // Filtering requests by status
  const pendingRequests = requests.filter((request) => request.status === 'pending');
  const acceptedRequests = requests.filter((request) => request.status === 'Accepted');
  const rejectedRequests = requests.filter((request) => request.status === 'Rejected');

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-4">All Event Requests</h1>

        {/* Pending Requests */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-yellow-600">Pending Requests</h2>
        {pendingRequests.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full max-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Event Name</th>
                  <th className="px-4 py-2 border-b text-left">Artist</th>
                  <th className="px-4 py-2 border-b text-left">Email</th>
                  <th className="px-4 py-2 border-b text-left">Mobile Number</th>
                  <th className="px-4 py-2 border-b text-left">Member Count</th>
                  <th className="px-4 py-2 border-b text-left">Budget</th>
                  <th className="px-4 py-2 border-b text-left">Package</th>
                  <th className="px-4 py-2 border-b text-left">Message</th>
                  <th className="px-4 py-2 border-b text-left">Event Date</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{request.name}</td>
                    <td className="px-4 py-2 border-b">{request.artist}</td>
                    <td className="px-4 py-2 border-b">{request.email}</td>
                    <td className="px-4 py-2 border-b">{request.mobileNumber}</td>
                    <td className="px-4 py-2 border-b">{request.memberCount}</td>
                    <td className="px-4 py-2 border-b">{request.budget}</td>
                    <td className="px-4 py-2 border-b">{request.packageName}</td>
                    <td className="px-4 py-2 border-b">{request.message}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(request.eventDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex flex-col">
                        <button
                          onClick={() => updateStatus(request._id, 'Accepted')}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(request._id, 'Rejected')}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition mt-2"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No pending requests</p>
        )}

        {/* Accepted Requests */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-green-800">Accepted Requests</h2>
        {acceptedRequests.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full max-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Event Name</th>
                  <th className="px-4 py-2 border-b text-left">Artist</th>
                  <th className="px-4 py-2 border-b text-left">Email</th>
                  <th className="px-4 py-2 border-b text-left">Mobile Number</th>
                  <th className="px-4 py-2 border-b text-left">Member Count</th>
                  <th className="px-4 py-2 border-b text-left">Budget</th>
                  <th className="px-4 py-2 border-b text-left">Package</th>
                  <th className="px-4 py-2 border-b text-left">Message</th>
                  <th className="px-4 py-2 border-b text-left">Event Date</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {acceptedRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{request.name}</td>
                    <td className="px-4 py-2 border-b">{request.artist}</td>
                    <td className="px-4 py-2 border-b">{request.email}</td>
                    <td className="px-4 py-2 border-b">{request.mobileNumber}</td>
                    <td className="px-4 py-2 border-b">{request.memberCount}</td>
                    <td className="px-4 py-2 border-b">{request.budget}</td>
                    <td className="px-4 py-2 border-b">{request.packageName}</td>
                    <td className="px-4 py-2 border-b">{request.message}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(request.eventDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        {request.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => updateStatus(request._id, 'Rejected')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No accepted requests</p>
        )}

        {/* Rejected Requests */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-red-800">Rejected Requests</h2>
        {rejectedRequests.length > 0 ? (
          <div className="overflow-auto">
            <table className="w-full max-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Event Name</th>
                  <th className="px-4 py-2 border-b text-left">Artist</th>
                  <th className="px-4 py-2 border-b text-left">Email</th>
                  <th className="px-4 py-2 border-b text-left">Mobile Number</th>
                  <th className="px-4 py-2 border-b text-left">Member Count</th>
                  <th className="px-4 py-2 border-b text-left">Budget</th>
                  <th className="px-4 py-2 border-b text-left">Package</th>
                  <th className="px-4 py-2 border-b text-left">Message</th>
                  <th className="px-4 py-2 border-b text-left">Event Date</th>
                  <th className="px-4 py-2 border-b text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rejectedRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{request.name}</td>
                    <td className="px-4 py-2 border-b">{request.artist}</td>
                    <td className="px-4 py-2 border-b">{request.email}</td>
                    <td className="px-4 py-2 border-b">{request.mobileNumber}</td>
                    <td className="px-4 py-2 border-b">{request.memberCount}</td>
                    <td className="px-4 py-2 border-b">{request.budget}</td>
                    <td className="px-4 py-2 border-b">{request.packageName}</td>
                    <td className="px-4 py-2 border-b">{request.message}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(request.eventDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No rejected requests</p>
        )}
      </div>
      <FooterComp />
    </div>
  );
};

export default EventManagerRequest;
