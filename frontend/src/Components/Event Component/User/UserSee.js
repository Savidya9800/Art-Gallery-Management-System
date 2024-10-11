import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../Nav Component/NavigationBar';
import bgImage from '../User/Gallery.jpeg';
import { useNavigate } from 'react-router-dom';
import FooterComp from '../../Nav Component/FooterComp';

import event1 from './Event1.jpeg';
import event2 from './Event2.jpeg';
import event3 from './Event3.jpeg';
import event4 from './Event4.jpeg';
import event5 from './Event5.jpeg';
import event6 from './Event6.jpeg';
import event7 from './Event7.jpeg';
import event8 from './Event8.jpeg';

function UserSee() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent'); // New state for sorting order
  const navigate = useNavigate();

  const eventImages = [event1, event2, event3, event4, event5, event6, event7, event8];

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

  // Sort accepted requests based on the selected sortOrder
  const sortedAcceptedRequests = acceptedRequests.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.eventDate) - new Date(a.eventDate); // Sort by most recent
    }
    return new Date(a.eventDate) - new Date(b.eventDate); // Sort by oldest
  });

  // Filter the sorted requests based on the search term
  const filteredRequests = sortedAcceptedRequests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/artist/login', { email, password });
      if (response.data.success) {
        alert('Login successful');
        navigate('/requestEventForm', {
          state: {
            email: response.data.artist.email,
            name: response.data.artist.name,
          },
        });
        setShowModal(false);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Server error. Please try again later.');
      console.error('Login error:', error);
    }
  };

  const handleButtonClick = () => {
    navigate('/artistLogin');
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
    setPassword('');
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Update the sort order based on dropdown selection
  };

  // if (loading) return <p className="text-lg font-semibold text-center">Loading...</p>;
  if (error) return <p className="font-semibold text-center text-red-500">{error}</p>;

  return (
    <div>
      <NavigationBar />

      <img src={bgImage} alt="Event" className="object-cover w-full rounded-lg h-72" />

      <div className="max-w-6xl p-6 mx-auto">
        <div className="flex justify-center">
          <button
            className="bg-[#A78F51] text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleButtonClick}
          >
            Plan Event
          </button>
        </div>
        <br />
        <h1 className="mb-6 text-5xl font-extrabold text-center text-gray-800">UPCOMING EVENTS</h1>

        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search event by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Dropdown for sorting */}
        <div className="flex mb-6 justify-left">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full max-w-xs p-2 border border-gray-300 rounded"
          >
            <option value="recent">Sort by Most Recent</option>
            <option value="oldest">Sort by Oldest</option>
          </select>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request, index) => (
            <div
              key={request._id}
              className="p-6 transition-shadow duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl"
            >
              <h2 className="mb-2 text-xl font-bold text-center text-gray-900 bg-white">{request.name}</h2>
              <img
                src={eventImages[index % eventImages.length]} // Dynamically assign image based on index
                alt="Event"
                className="object-cover w-full h-48 rounded-lg"
              />
              <p className="text-gray-700 bg-white">
                <strong className="bg-white">Message:</strong> {request.message}
              </p>
              <p className="text-gray-700 bg-white">
                <strong className="bg-white">Event Date:</strong> {new Date(request.eventDate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Login */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-xl w-80">
            <h2 className="p-4 mb-6 text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="p-4 mb-4">
                <label className="block mb-2 text-sm font-semibold text-black">Username</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border-b-2 border-black focus:outline-none"
                  placeholder="Username"
                />
              </div>
              <div className="p-4 mb-6">
                <label className="block mb-2 text-sm font-semibold text-black">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border-b-2 border-black focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4 text-right">
                <a href="#" className="text-xs text-black hover:underline">Forgot password?</a>
              </div>
              <div className="flex justify-center p-4 mb-6">
                <button
                  type="submit"
                  className="bg-[#A78F51] text-white font-bold py-2 px-6 rounded-full w-full hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </div>
              <div className="text-sm text-center">
                Don't have an account? <a href="/artistRegister" className="text-black hover:underline">SignUp</a>
              </div>
            </form>
          </div>
        </div>
      )}

      <FooterComp />
    </div>
  );
}

export default UserSee;
