import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./nav.css";
import img1 from "./logo.JPG";
import img2 from "./UserImg.png";

function NavigationBar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar expand="lg" className="navbar ">
      <Container
        fluid
        style={{ backgroundColor: "#b1a48982", paddingRight: "inherit" }}
      >
        <Link to="/mainHome">
          <Navbar.Brand>
            <img className="logo" src={img1} alt="Art Gallery Logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 me-auto my-lg-0 navbar-nav"
            style={{ maxHeight: "100px", gap: "0.5rem" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/mainHome">
              Home
              <span></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/mainGallery">
              Gallery
              <span></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/userSee">
              News Feed
              <span></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/mainBlog">
              Blog
              <span></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/shopview">
              Shop
              <span></span>
            </Nav.Link>
            <Nav.Link as={Link} to="/mainAboutUs">
              About Us
              <span></span>
            </Nav.Link>

            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/mainInquary">
                Inquiry
              </NavDropdown.Item>
              {user?.role == "artist" && (
                <NavDropdown.Item as={Link} to="/mainSellArt">
                  Sell Art
                </NavDropdown.Item>
              )}
              {user?.role == "user" && (
                <NavDropdown.Item as={Link} to="/mainBidding">
                  Buy Art
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={Link} to="/mainTickets">
                Tickets
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/mainContactUs">
                Contact Us
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <a href="/profile">
            <img
              src={img2}
              style={{ height: "50px", marginRight: "10px" }}
              alt="User"
            />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
