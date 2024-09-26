import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import BookingUserService from "../../Services/UserService";
import NavigationBar from "../Nav Component/NavigationBar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await BookingUserService.getUserById();
      setUser(userData.data);
      setEditedUser(userData.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await BookingUserService.updateUser(editedUser);
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
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

  if (!user) return <div>Loading...</div>;

  return (
    <Container fluid className="bg-light min-vh-100 py-3">
      <NavigationBar />
      <Card className="mt-4">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col xs="auto">
              <Image
                src="assets/profile.webp"
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
          </Row>

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
                  <Form.Control value={user.email} readOnly plaintext />
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
