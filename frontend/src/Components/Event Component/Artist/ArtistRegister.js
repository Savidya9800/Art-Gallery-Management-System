import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import FooterComp from '../../Nav Component/FooterComp';
import NavigationBar from '../../Nav Component/NavigationBar';

const ArtistRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/artist/register', formData);
      setSuccess(response.data.message);
      setError(null);
      setFormData({ name: '', email: '', password: '' });  // Reset form fields
    } catch (err) {
      setError('Error registering user');
      setSuccess(null);
      console.error('Registration error:', err);
    }
  };

  return (
    <div>
    <NavigationBar/>
    <div className="flex items-center justify-center">
      <div className="bg-[#FAF3E0] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-center text-2xl font-bold text-[#B69E51] mb-6">Register Artist</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Enter Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B69E51]"
              placeholder="Enter Name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Enter Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B69E51]"
              placeholder="Enter Email (for contact purposes)"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#B69E51]"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B69E51] text-white py-2 rounded-lg font-semibold hover:bg-[#9F8944] transition-colors duration-300"
          >
            Save
          </button>
        </form>

        {success && <p className="mt-4 text-green-500">{success}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
    <FooterComp/>
    </div>
  );
};

export default ArtistRegister;
