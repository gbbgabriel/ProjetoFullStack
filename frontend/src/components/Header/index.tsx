import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {
  return (
<>
  <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/users">Users</Nav.Link>
        <Nav.Link href="/users">Address</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
</>
  );
}

export default Header;
