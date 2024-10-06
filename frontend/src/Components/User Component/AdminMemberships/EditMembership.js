import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import NavigationBar from "../../Nav Component/NavigationBar";

const EditMembership = () => {
    const { id } = useParams();
    const [membership, setMembership] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/membership/${id}`)
            .then((response) => setMembership(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMembership({ ...membership, [name]: value });

        // Update membership price based on selected type
        if (name === "membershipType") {
            const price = value === "Monthly" ? 15 : value === "Annual" ? 130 : 0;
            setMembership((prev) => ({ ...prev, membershipPrice: price }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/membership/${id}`, membership)
            .then((response) => {
                console.log(response.data);
                alert("Membership updated successfully");
                navigate("/admin");
            })
            .catch((error) => console.error(error));
    };

    return (
        <Container fluid className="bg-light min-vh-100 py-3">
            <NavigationBar />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMembershipType">
                    <Form.Label>Membership Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="membershipType"
                        value={membership.membershipType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select...</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Annual">Annual</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMembershipPrice">
                    <Form.Label>Membership Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="membershipPrice"
                        value={membership.membershipPrice}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={membership.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={membership.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="contactNumber"
                        value={membership.contactNumber}
                        readOnly // Making it not editable
                    />
                </Form.Group>
                <div className="mb-3" /> {/* Adding a gap above the button */}
                <Button type="submit">Update Membership</Button>
            </Form>
        </Container>
    );
};

export default EditMembership;
