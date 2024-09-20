import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Visitor Details</h2>
      <form>
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <button type="button" onClick={updateVisitor}>Update Visitor</button>
      </form>
      <h3>Ticket Information</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.type}</td>
              <td>{ticket.count}</td>
              <td>${ticket.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visitor;