import React, { useState, useEffect } from "react";
import NavigationBar from "../../Nav Component/NavigationBar";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AllMembership = () => {
    const [memberships, setMemberships] = useState([]);
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
        if(window.confirm("Are you sure you want to delete this membership?")){
            try {
                const response = await axios.delete(`http://localhost:5000/api/membership/${id}`);
                console.log(response.data);
                setMemberships(memberships.filter((membership) => membership._id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 py-3">
            <NavigationBar />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Membership Type</th>
                        <th>Membership Price</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership) => (
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
        </Container>
    );
};

export default AllMembership;
