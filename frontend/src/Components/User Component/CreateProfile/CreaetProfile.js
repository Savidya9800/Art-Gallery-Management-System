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
    const { name, value } = e.target; // Properly destructure name and value from e.target
  
    // Validation for username, first name, and last name
    if (name === "username" || name === "firstName" || name === "lastName") {
      if (/^\d/.test(value)) {
        setError(`${name === "username" ? "Username" : name === "firstName" ? "First name" : "Last name"} cannot start with a number.`);
        return; // Prevent updating the state with invalid value
      } else {
        setError(""); // Clear the error if valid
      }
    }
  
    setFormData({
      ...formData,
      [name]: value, // Correctly update formData with the destructured name and value
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

  /* To add admin, and change role as "admin" in line 13 
   const adminData = { ...formData, role: "admin" };

    try {
      await BookingUserService.registerUser(adminData); // Register admin
      alert("Admin registered successfully!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };
 */

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="bg-white p-5 rounded shadow-lg"
        style={{ maxWidth: "900px", width: "100%" }} // Set maxWidth to 900px and ensure full width
        
      >
        <div className="text-center mb-5">
          <Image
            src="/welcome.png"
            alt="Awarna Art Gallery"
            width={200}
            className="mx-auto d-block"
          />
          <h2
            className="mt-4"
            style={{
              color: "#9a7b4f",
              fontFamily: "Times New Roman, Times, serif",
              fontWeight: "bold",
              fontSize: "36px", 
            }}
          >
            Welcome to Awarna Art Gallery!
          </h2>
          <p className="text-muted">Create your profile</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%", // Explicitly set width to 80%
                margin: "0 auto", // Center input fields
                display: "block",
              }}
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
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
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
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
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
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
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
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
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

          <Form.Group className="mb-4">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
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
              className="p-3"
              style={{
                borderColor: "#ced4da",
                borderWidth: "2px",
                borderRadius: "8px",
                width: "80%",
                margin: "0 auto",
                display: "block",
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#9a7b4f",
              borderColor: "#9a7b4f",
              padding: "12px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </Form>

        <div className="text-center mt-4">
          <small>
            Already have an account?{" "}
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


