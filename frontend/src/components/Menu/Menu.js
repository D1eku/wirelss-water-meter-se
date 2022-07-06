import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";


export const Menu = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home" >Sistema de medición de agua</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Tabla</Nav.Link>
            <Nav.Link href="#features">reportes</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />

    </>
  );
};

 