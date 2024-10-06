import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import BookingUserService from "../../../Services/UserService"; // Ensure this import is necessary or remove it.
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import NavigationBar from "../../Nav Component/NavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminUsers = () => {
  const [memberships, setMemberships] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/membership")
      .then((response) => response.json())
      .then((data) => setMemberships(data));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-membership/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this membership?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/membership/${id}`);
        console.log(response.data);
        setMemberships(memberships.filter((membership) => membership._id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Membership Type", "Membership Price", "Name", "Address", "Contact Number"];
    const tableRows = [];

    memberships.forEach((membership) => {
      const membershipData = [membership.membershipType, membership.membershipPrice, membership.name, membership.address, membership.contactNumber];
      tableRows.push(membershipData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Memberships List", 14, 15);
    doc.save("memberships_list.pdf");
  };

  // Filtered memberships based on search query
  const filteredMemberships = memberships.filter((membership) =>
    membership.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    membership.membershipType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="">
      <NavigationBar />
      <Form className="mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search members by name or membership type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Membership Type</th>
            <th>Membership Price ($) </th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMemberships.map((membership) => (
            <tr key={membership._id}>
              <td>{membership.membershipType}</td>
              <td>{membership.membershipPrice}</td>
              <td>{membership.name}</td>
              <td>{membership.address}</td>
              <td>{membership.contactNumber}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(membership._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(membership._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={generatePDF} className="mt-3">
        Generate PDF
      </Button>
    </Container>
  );
};

export default AdminUsers;