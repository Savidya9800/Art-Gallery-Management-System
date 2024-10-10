import React, { useState } from "react";
import { Container, Form, Button, Image, Alert } from "react-bootstrap";
import BookingUserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Validation functions remain the same...
  const validateMobile = (contactNumber) => {
    const mobilePattern = /^[0-9]{10}$/; // Regular expression for exactly 10 digits
    if (!mobilePattern.test(contactNumber)) {
      return "Contact number must be exactly 10 digits.";
    }
    return null;
  };

  // Function to validate names and username
  const validateNamesAndUsername = (name, fieldName) => {
    if (/^\d/.test(name)) {
      return `${fieldName} cannot start with a number.`;
    }
    if (/^\d+$/.test(name)) {
      return `${fieldName} cannot contain all numbers.`;
    }
    return null;
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (!emailPattern.test(email)) {
      return "Enter a valid email address.";
    }
    return null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation logic remains the same...
    const firstNameError = validateNamesAndUsername(formData.firstName, "First name");
    if (firstNameError) {
      setError(firstNameError);
      return;
    }

    // Validate last name
    const lastNameError = validateNamesAndUsername(formData.lastName, "Last name");
    if (lastNameError) {
      setError(lastNameError);
      return;
    }

    // Validate username
    const usernameError = validateNamesAndUsername(formData.username, "Username");
    if (usernameError) {
      setError(usernameError);
      return;
    }

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Phone number validation
    const mobileError = validateMobile(formData.contactNumber);
    if (mobileError) {
      setError(mobileError);
      return;
    }

    try {
      await BookingUserService.registerUser(formData);
      alert("User registered successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Container className="bg-gray-100 d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="p-4 m-4 bg-gray-100 rounded shadow-lg"
          style={{ maxWidth: "900px", width: "100%" }} // Set maxWidth to 900px and ensure full width
        >
          <div className="mb-5 text-center bg-gray-100">
            <Image
              src="/welcome.png"
              alt="Awarna Art Gallery"
              width={200}
              className="mx-auto d-block "
            />
            <h2 className="mt-4 text-[#9a7b4f] font-serif font-bold text-4xl bg-gray-100">
              Welcome to Awarna Art Gallery!
            </h2>
            <p className="bg-gray-100 text-muted">Create your profile</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="bg-gray-100">
            <Form.Group className="mb-4 ">
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md " // Tailwind classes
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="flex justify-around bg-gray-100">
                <Form.Check
                  type="radio"
                  label="Artist"
                  name="role"
                  value="artist"
                  checked={formData.role === "artist"}
                  onChange={handleChange}
                  className="bg-gray-100"
                />
                <Form.Check
                  type="radio"
                  label="User (Buyer/Bidder)"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  className="bg-gray-100"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-4/5 p-3 mx-auto mt-2 border-2 border-gray-300 rounded-md"
              />
            </Form.Group>

            <Button
              variant="dark"
              type="submit"
              className="bg-[#9a7b4f] w-full mt-4"
            >
              Register
            </Button>
          </Form>

          <div className="mt-4 text-center bg-gray-100">
            <small className="bg-gray-100">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#9a7b4f] no-underline bg-gray-100"
              >
                Log in
              </a>
            </small>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreateProfile;
