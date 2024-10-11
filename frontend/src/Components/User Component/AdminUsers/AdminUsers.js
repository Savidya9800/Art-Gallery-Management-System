import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import BookingUserService from "../../../Services/UserService";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios";
import logo from "../../Nav Component/logo.JPG";
import { useNavigate } from "react-router-dom";


const AdminUsers = () => {
  const navigate = useNavigate();
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

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) { // Ask for confirmation before deleting
      try {
        const response = await axios.delete(`http://localhost:5000/api/user/${userId}`); // Use axios to send DELETE request
        console.log(response.data); // Log the response data for debugging
        setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from the local state
      } catch (error) {
        console.error("Error deleting user:", error.message); // Handle any errors
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(167, 143, 81); 
    doc.rect(10, 10, 190, 15, "F"); 

    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230); 
    doc.text("Users List", 14, 20);

    // Add logo (logo.png)
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 25; 
    const imgHeight = 20; 
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);

    // Add line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); 
    doc.line(10, 30, 200, 30);

    // Table
    const tableColumn = ["Full Name", "Email", "Contact Number"];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [`${user.firstName} ${user.lastName}`, user.email, user.contactNumber];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 35 });

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); 
    doc.line(10, footerY - 5, 200, footerY - 5);

    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);

    doc.text("Art Gallery Name", pageWidth - 14, footerY, { align: "right" });
    doc.text("Address: 58, Parakrama Mawatha, Wennappuwa", pageWidth - 14, footerY + 5, { align: "right" });
    doc.text("Contact: +94 765 456 789 | Email: awarnaArts@gmail.com", pageWidth - 14, footerY + 10, { align: "right" });

    doc.line(10, footerY + 15, 200, footerY + 15);

    // Save the PDF
    doc.save("users_list.pdf");
};


  // Filtered users based on search query
  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
    <Container>
      
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
      <Button variant="success" onClick={() => navigate("/adminMember")} className="mb-3">Membership</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Actions</th> {/* Column for the delete button */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteUser(user._id)} // Call delete function on button click
                >
                  DELETE
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
    </div>
  );
};

export default AdminUsers;

