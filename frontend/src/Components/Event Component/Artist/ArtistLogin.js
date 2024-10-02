import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ArtistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/artist/login', { email, password });
      console.log('get record ', response);
      if (response.data.success) {
        setMessage('Login successful');
        // Navigate to RequestEventForm with email and name as state
        console.log(response.data.name)
        navigate('/requestEventForm', {
          state: {
            email: response.data.artist.email,
            name: response.data.artist.name,
          },
          
        });
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Enter Credential</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ArtistLogin;
