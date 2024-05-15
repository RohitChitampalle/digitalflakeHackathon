import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHome, FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./nav.css"

function Sidebar() {
  return (
    <Navbar bg="light" variant="light" expand="md"className="flex-md-column" style={{ height: '91vh', width: '20%' }}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="flex-column align-items-start">
        <Nav.Link as={Link} to="/home"><FaHome /> Home</Nav.Link>
          <Nav.Link as={Link} to="/Role"><FaUser /> Role</Nav.Link>
          <Nav.Link as={Link} to="/User"><FaUsers /> Users</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
