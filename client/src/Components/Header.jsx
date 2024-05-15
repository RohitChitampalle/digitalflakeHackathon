import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./nav.css";

function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle link click
  const handleLinkClick = () => {
    setIsLoading(true); // Set loading state to true
    // Add any other necessary logic, such as fetching data or performing other tasks

    // Simulate loading delay for 2 seconds (remove this in production)
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after 2 seconds
    }, 2000);
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      className="flex-md-column"
      style={{ height: "91vh", width: "20%" }}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="flex-column align-items-start">
          <Nav.Link as={Link} to="/home" onClick={handleLinkClick}>
            <FaHome /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/Role" onClick={handleLinkClick}>
            <FaUser /> Role
          </Nav.Link>
          <Nav.Link as={Link} to="/User" onClick={handleLinkClick}>
            <FaUsers /> Users
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {isLoading && <div className="loader">Loading...</div>}
    </Navbar>
  );
}

export default Sidebar;
