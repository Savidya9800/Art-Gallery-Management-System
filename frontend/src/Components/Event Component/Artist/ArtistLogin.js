import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ArtistLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/artist/login', { email, password });
      if (response.data.success) {
        setMessage('Login successful');
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: '#f8f8f8' }}>
      <Image
        src="/welcome.png" // Replace this with the actual image path
        alt="Awarna Art Gallery"
        width={150}
        className="mb-4"
      />
      <h1 className="mb-4" style={{ fontSize: '24px', color: '#a49256', background: '#f8f8f8' }}>
        Welcome Back to Awarna Art Gallery!
      </h1>
      <Form onSubmit={handleLogin} style={{ width: '300px', background: '#f8f8f8' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderColor: '#d1b77d' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: '#d1b77d' }}
          />
        </Form.Group>

        {message && <Alert variant="danger">{message}</Alert>}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#c5b899' : '#a49256',
            borderColor: loading ? '#c5b899' : '#a49256',
          }}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Log in'}
        </Button>
      </Form>
      <p className="mt-3" style={{ fontSize: '14px', color: '#333', background: '#f8f8f8' }}>
        Don't have an account?{' '}
        <a href="/register" style={{ color: '#a49256', textDecoration: 'none', background: '#f8f8f8' }}>
          Register here
        </a>
      </p>
    </Container>
  );
}

export default ArtistLogin;
