import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Image,
} from "react-bootstrap";
import BookingUserService from "../../../Services/UserService";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [membership, setMembership] = useState(null);
  const [isMembershipEditing, setIsMembershipEditing] = useState(false);
  const [editedMembership, setEditedMembership] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const userData = await BookingUserService.getUserById();
      setUser(userData.data);
      setEditedUser(userData.data);
      console.log(userData.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    try {
      const id = JSON.parse(localStorage.getItem("user").toString())["_id"];
      const response = await axios.get(
        `http://localhost:5000/api/membership/user/${id}`
      );
      setMembership(response.data);
      setEditedMembership(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching membership:", error);
    }
  };

  const handleEdit = () => {
    setErrorMessage(""); // Clear error message when editing starts
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validatePhoneNumber(editedUser.contactNumber)) {
      setErrorMessage("Contact number must be a valid 10-digit number.");
      return;
    }
    if (!validateEmail(editedUser.email)) {
      setErrorMessage("Email must be a valid email address.");
      return;
    }
    setErrorMessage(""); // Clear error message if validations pass

    try {
      await BookingUserService.updateUser(editedUser);
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/; // Regular expression for 10-digit number
    return phoneRegex.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleMembershipEdit = () => setIsMembershipEditing(true);

  const handleMembershipSave = async () => {
    if (!validatePhoneNumber(editedMembership.contactNumber)) {
      setErrorMessage(
        "Membership contact number must be a valid 10-digit number."
      );
      return;
    }
    
    setErrorMessage(""); // Clear error message if validations pass
  
    try {
      await axios.put(
        `http://localhost:5000/api/membership/${membership._id}`,
        editedMembership
      );
      setMembership(editedMembership);
      setIsMembershipEditing(false);
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };
  
  const handleMembershipChange = (e) => {
    setEditedMembership({
      ...editedMembership,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = () => setShowDeleteConfirmation(true);

  const confirmDeleteAccount = async () => {
    try {
      await BookingUserService.deleteBookingUser(user._id);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleApplyMembership = () => {
    navigate("/membership");
  };

  const handleDeleteMembership = async () => {
    if (window.confirm("Are you sure you want to delete your membership?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/membership/${membership._id}`
        );
        setMembership(null);
        setEditedMembership(null);
        setIsMembershipEditing(false);
      } catch (error) {
        console.error("Error deleting membership:", error);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container fluid className="py-3 bg-light min-vh-100">
      <NavigationBar />
      <Card className="mt-4">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col xs="auto">
              <Image
                src="\dp.png"
                roundedCircle
                width={100}
                height={100}
              />
            </Col>
            <Col>
              <h2 className="mb-0">{`${user.firstName} ${user.lastName}`}</h2>
              <p className="text-muted">User</p>
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-primary"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>
            </Col>
            {(membership === null && user.role !== "admin") && (
              <Col xs="auto">
                <Button
                  variant="outline-primary"
                  onClick={handleApplyMembership}
                >
                  Apply for membership
                </Button>
              </Col>
            )}
          </Row>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div> // Display error message
          )}

          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">
                    FIRST NAME
                  </Form.Label>
                  <Form.Control
                    name="firstName"
                    value={isEditing ? editedUser.firstName : user.firstName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">
                    LAST NAME
                  </Form.Label>
                  <Form.Control
                    name="lastName"
                    value={isEditing ? editedUser.lastName : user.lastName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">USERNAME</Form.Label>
                  <Form.Control
                    name="username"
                    value={isEditing ? editedUser.username : user.username}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">
                    EMAIL ADDRESS
                  </Form.Label>
                  <Form.Control
                    name="email" // Add name attribute for email
                    value={isEditing ? editedUser.email : user.email} // Enable editing
                    onChange={handleChange} // Update on change
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">
                    CONTACT NUMBER
                  </Form.Label>
                  <Form.Control
                    name="contactNumber"
                    value={
                      isEditing ? editedUser.contactNumber : user.contactNumber
                    }
                    onChange={handleChange}
                    readOnly={!isEditing}
                    plaintext={!isEditing}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="text-muted small">PASSWORD</Form.Label>
                  <Form.Control value="************" readOnly plaintext />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {membership !== null && (
            <>
              <Row className="align-items-end justify-content-end mb-4">
                <Col xs="auto">
                  <Button
                    variant="outline-primary"
                    onClick={
                      isMembershipEditing
                        ? handleMembershipSave
                        : handleMembershipEdit
                    }
                  >
                    {isMembershipEditing ? "Save Membership" : "Edit Membership"}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger" onClick={handleDeleteMembership}>
                    Delete Membership
                  </Button>
                </Col>
              </Row>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">
                        MEMBERSHIP TYPE
                      </Form.Label>
                      <Form.Control
                        value={
                          isMembershipEditing
                            ? editedMembership.membershipType
                            : membership.membershipType
                        }
                        name="membershipType"
                        onChange={handleMembershipChange}
                        readOnly={!isMembershipEditing}
                        plaintext={!isMembershipEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">
                        MEMBERSHIP PRICE
                      </Form.Label>
                      <Form.Control
                        value={
                          isMembershipEditing
                            ? editedMembership.membershipPrice
                            : membership.membershipPrice
                        }
                        name="membershipPrice"
                        onChange={handleMembershipChange}
                        readOnly={!isMembershipEditing}
                        plaintext={!isMembershipEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">
                        ADDRESS
                      </Form.Label>
                      <Form.Control
                        value={
                          isMembershipEditing
                            ? editedMembership.address
                            : membership.address
                        }
                        name="address"
                        onChange={handleMembershipChange}
                        readOnly={!isMembershipEditing}
                        plaintext={!isMembershipEditing}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="text-muted small">
                        CONTACT NUMBER
                      </Form.Label>
                      <Form.Control
                        value={
                          isMembershipEditing
                            ? editedMembership.contactNumber
                            : membership.contactNumber
                        }
                        name="contactNumber"
                        onChange={handleMembershipChange}
                        readOnly={!isMembershipEditing}
                        plaintext={!isMembershipEditing}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </>
          )}

          <Row className="mt-4">
            <Col>
              <Button variant="primary" onClick={handleLogout}>
                Log out
              </Button>
            </Col>
            <Col className="text-center">
              <Button variant="secondary">Contact Us</Button>
            </Col>
            <Col className="text-end">
              <Button variant="danger" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
              <Link to="/mainArtworkDetails">
                <button type="button" className="ml-2 btn btn-primary">
                  Artwork Details
                </button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteAccount}>
            Yes, delete my account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
