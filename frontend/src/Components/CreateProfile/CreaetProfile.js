import React, { useState } from "react";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import BookingUserService from "../../Services/UserService";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    contactNumber: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await BookingUserService.registerUser(formData);
      alert("User registered successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "600px" }} // Increased the maxWidth to 600px
      >
        <div className="text-center mb-4">
          <Image src="/welcome.png" alt="Awarna Art Gallery" width={200} />
          <h2
            className="mt-3"
            style={{
              color: "#9a7b4f",
              fontFamily: "Times New Roman, Times, serif",
            }}
          >
            Welcome to Awarna Art Gallery!
          </h2>
          <p className="text-muted">Create your profile</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-around">
              <Form.Check
                type="radio"
                label="Artist"
                name="role"
                value="artist"
                checked={formData.role === "artist"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="User (Buyer/Bidder)"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#9a7b4f", borderColor: "#9a7b4f" }}
          >
            Register
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Or already have an account?{" "}
            <a
              href="/login"
              style={{ color: "#9a7b4f", textDecoration: "none" }}
            >
              Log in
            </a>
          </small>
        </div>
      </div>
    </Container>
  );
};

export default CreateProfile;
