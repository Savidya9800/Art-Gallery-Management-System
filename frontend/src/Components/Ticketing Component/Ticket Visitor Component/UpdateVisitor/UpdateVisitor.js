import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';

const Visitor = () => {
  const { id } = useParams(); // Get the visitor ID from the URL parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    fname: '',
    lname: '',
    email: '',
    phone: '',
    city: '',
    country: ''
  });

  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/visitors/${id}`);
        if (response.status === 200) {
          const { fname, lname, email, phone, city, country, tickets } = response.data.visitor;
          setFormData({ fname, lname, email, phone, city, country });
          setTicketData(tickets);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching visitor:', err);
        setError('Failed to fetch visitor');
        setLoading(false);
      }
    };

    fetchVisitor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const updateVisitor = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/visitors/${id}`, formData);
      if (response.status === 200) {
        alert('Visitor updated successfully');
        navigate("/visitorDetails");
      }
    } catch (err) {
      console.error('Error updating visitor:', err);
      alert('Failed to update visitor');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div>
    <NavigationBar/>
    <div className="bg-white max-w-4xl mx-auto p-3 mt-5 shadow-md rounded-md border border-black">
      <h2 className="bg-white text-2xl font-semibold text-gray-800 mb-6 text-center">Visitor Details</h2>
      <form className="bg-white grid grid-cols-1 gap-6 lg:grid-cols-2">
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          placeholder="First Name"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          placeholder="Last Name"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          className="bg-white w-full border border-black p-3 rounded-md"
          required
        />
        <button
          type="button"
          onClick={updateVisitor}
          className="lg:col-span-2 w-full bg-[#A78F51] text-white font-semibold py-3 px-4 rounded-md"
        >
          Update Visitor
        </button>
      </form>

      <h3 className="bg-white text-xl font-semibold text-gray-800 mt-10 mb-4">Ticket Information</h3>
      <table className="bg-white min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="bg-white border border-black p-2 text-left">Type</th>
            <th className="bg-white border border-black p-2 text-left">Count</th>
            <th className="bg-white border border-black p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket, index) => (
            <tr key={index} className="bg-white text-gray-700">
              <td className="bg-white border border-black p-2">{ticket.type}</td>
              <td className="bg-white border border-black p-2">{ticket.count}</td>
              <td className="bg-white border border-black p-2">${ticket.price}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
    <FooterComp/>
    </div>
  );
};

export default Visitor;
