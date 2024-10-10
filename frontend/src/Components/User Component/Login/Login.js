import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import BookingUserService from "../../../Services/UserService"; // Assuming the user service is needed for normal users/artists
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded admin credentials (username: password)
  const adminCredentials = {
    "admin1@example.com": "admin1password",
    "admin2@example.com": "admin2password",
    "admin3@example.com": "admin3password",
    "admin4@example.com": "admin4password",
    "admin5@example.com": "admin5password",
    "admin6@example.com": "admin6password",
    "admin7@example.com": "admin7password",
    "admin8@example.com": "admin8password",
  };

  // List of admin users and their corresponding dashboard routes
  const adminUsers = {
    "admin1@example.com": "/mainArtworkDetails",
    "admin2@example.com": "/visitor-count",
    "admin3@example.com": "/admin3-dashboard",
    "admin4@example.com": "/admin4-dashboard",
    "admin5@example.com": "/admin5-dashboard",
    "admin6@example.com": "/admin6-dashboard",
    "admin7@example.com": "/admin7-dashboard",
    "admin8@example.com": "/admin8-dashboard",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    // Check if the entered username exists in hardcoded admin credentials
    if (adminCredentials[username] && adminCredentials[username] === password) {
      // Admin login: Save to localStorage and redirect to the corresponding dashboard
      localStorage.setItem(
        "user",
        JSON.stringify({ email: username, role: "admin" })
      );
      localStorage.setItem("token", "dummy_token");
      localStorage.setItem("email", username);

      if (adminUsers[username]) {
        navigate(adminUsers[username]); // Redirect to the admin dashboard
      } else {
        setError("No dashboard assigned to this user.");
      }
    } else {
      // Fallback to user/artist login using the BookingUserService
      try {
        const response = await BookingUserService.loginUser({
          email: username,
          password,
        });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", username);

        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // Redirect to user/artist dashboard
        }
      } catch (err) {
        console.error(err);
        setError("Invalid username or password");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-100">
      <Container className="bg-gray-100 d-flex flex-column align-items-center justify-content-center vh-100">
        <Image
          src="/welcome.png"
          alt="Awarna Art Gallery"
          width={150}
          className="mb-4 "
        />
        <h1
          className="mb-3"
          style={{ fontSize: "24px", color: "#a49256", background: "#f8f8f8" }}
        >
          Welcome Back to Awarna Art Gallery!
        </h1>
        <Form
          onSubmit={handleLogin}
          style={{ width: "300px", background: "#f8f8f8" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderColor: "#d1b77d" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: "#d1b77d" }}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#c5b899" : "#a49256",
              borderColor: loading ? "#c5b899" : "#a49256",
            }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Log in"}
          </Button>
        </Form>
        <p
          className="mt-3"
          style={{ fontSize: "14px", color: "#333", background: "#f8f8f8" }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#a49256",
              textDecoration: "none",
              background: "#f8f8f8",
            }}
          >
            Register here
          </a>
        </p>
      </Container>
    </div>
  );
};

export default Login;
