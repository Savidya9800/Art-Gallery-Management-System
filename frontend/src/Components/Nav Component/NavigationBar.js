import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import './nav.css';
import img1 from './logo.JPG';
import img2 from './UserImg.png';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid style={{ backgroundColor:"#b1a48982", paddingRight:"inherit" }}>
        <Link to="/mainHome">
          <Navbar.Brand>
            <img className="logo" src={img1} alt="Art Gallery Logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navbar-nav"
            style={{ maxHeight: "100px", gap: "0.5rem" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/mainHome">Home</Nav.Link>
            <Nav.Link as={Link} to="/mainGallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/mainEvents">Events</Nav.Link>
            <Nav.Link as={Link} to="/mainTickets">Tickets</Nav.Link>
            <Nav.Link as={Link} to="/mainShop">Shops</Nav.Link>
            <Nav.Link as={Link} to="/mainBidding">Bidding</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/mainAboutUs">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#inquiryForm">Inquiry Form</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#somethingElse">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" style={{ marginRight: "10px" }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>      
          <img src={img2} style={{ height: "50px", marginRight: "10px" }} alt="User" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
