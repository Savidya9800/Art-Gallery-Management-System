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

  // Sort accepted requests by eventDate
  const sortedAcceptedRequests = acceptedRequests.sort((a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
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
      console.log('get record ', response);
      if (response.data.success) {
        alert('Login successful');
        // Navigate to RequestEventForm with email and name as state
        console.log(response.data.name);
        navigate('/requestEventForm', {
          state: {
            email: response.data.artist.email,
            name: response.data.artist.name,
          },
        });
        setShowModal(false); // Close the modal on successful login
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Server error. Please try again later.');
      console.error('Login error:', error);
    }
  };

  const handleButtonClick = () => {
    navigate('/artistLogin'); // Show the modal when the button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setEmail(''); // Clear email field
    setPassword(''); // Clear password field
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <div>
      <NavigationBar />

      <img src={bgImage} alt="Event" className="w-full h-72 object-cover rounded-lg" />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center">
          <button
            className="bg-[#A78F51] text-white font-bold py-2 px-4 rounded-full"
            onClick={handleButtonClick}
          >
            Plan Event
          </button>
        </div>
        <br />
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800 ">UPCOMING EVENT</h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search event by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 w-full max-w-md rounded"
          />
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request._id}
                className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <h2 className="bg-white text-center text-xl font-bold mb-2 text-gray-900">{request.name}</h2>
                <img src={eventImages[request.imageId - 1] || event1} alt="Event" className="w-full h-48 object-cover rounded-lg"/>
                <p className="bg-white text-gray-700">
                  <strong className="bg-white">Message:</strong> {request.message}
                </p>
                <p className="bg-white text-gray-700">
                  <strong className="bg-white">Event Date:</strong> {new Date(request.eventDate).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold">No events found</p>
          )}
        </div>
      </div>

      {/* Modal for Login */}
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl w-80">
      <h2 className="text-2xl font-bold text-center p-4 mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="p-4 mb-4">
          <label className="text-sm text-black font-semibold block mb-2">Username</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-b-2 border-black focus:outline-none p-2 w-full"
            placeholder="Username"
          />
        </div>
        <div className="p-4 mb-6">
          <label className="text-sm text-black font-semibold block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-b-2 border-black focus:outline-none p-2 w-full"
            placeholder="Password"
          />
        </div>
        <div className="text-right mb-4">
          <a href="#" className="text-xs text-black hover:underline">Forgot password?</a>
        </div>
        <div className="flex justify-center mb-6 p-4">
          <button
            type="submit"
            className="bg-[#A78F51] text-white font-bold py-2 px-6 rounded-full w-full hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
        <div className="text-center text-sm">
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
