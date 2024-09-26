import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import BookingUserService from "../../Services/UserService";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import NavigationBar from "../Nav Component/NavigationBar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

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
    const tableColumn = ["ID", "Name", "Email"];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [user._id, user.name, user.email];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Users List", 14, 15);
    doc.save("users_list.pdf");
  };

  return (
    <Container className="">
      <NavigationBar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
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
