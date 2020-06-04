import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => (
  <Navbar bg="light" expand="md">
    <Navbar.Brand href="/">Would You Rather</Navbar.Brand>
    <Navbar.Toggle aria-controls="main-nav" />
    <Navbar.Collapse id="main-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/add">New Question</Nav.Link>
        <Nav.Link href="/leaderboard">Leader Board</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header;