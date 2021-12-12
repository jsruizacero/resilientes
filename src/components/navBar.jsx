import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Nav className='bg-dark d-flex justify-content-around mb-4 nav py-3'>
      <NavItem>
        <Link to="/">Inicio</Link>
      </NavItem>
      <NavItem>
        <Link to="/usuarios">Usuarios</Link>
      </NavItem>
      <NavItem>
        <Link to="/proyectos">Proyectos</Link>
      </NavItem>
    </Nav>
  );
};
