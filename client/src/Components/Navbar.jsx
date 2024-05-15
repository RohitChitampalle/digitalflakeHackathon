import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./nav.css"

const CustomNavbar = () => {
  return (
  <Navbar className='container-nav' bg="purple" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Header</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
  );
};

export default CustomNavbar;
