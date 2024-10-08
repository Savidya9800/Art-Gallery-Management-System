import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import BookingUserService from "../../../Services/UserService";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import NavigationBar from "../../Nav Component/NavigationBar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await BookingUserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Full Name", "Email", "Contact Number"];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [`${user.firstName} ${user.lastName}`, user.email, user.contactNumber]; // Ensure user has a contact number
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Users List", 14, 15);
    doc.save("users_list.pdf");
  };

  // Filtered users based on search query
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="">
      <NavigationBar />
      <Form className="mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td> {/* Ensure this field exists in the user object */}
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
