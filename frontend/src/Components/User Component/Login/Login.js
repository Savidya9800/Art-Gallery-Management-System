import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import BookingUserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await BookingUserService.loginUser({
        email: username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <Image
        src="/welcome.png"
        alt="Awarna Art Gallery"
        width={150}
        className="mb-4 " 
      />
      <h1
        className="mb-4"
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
  );
};

export default Login;
