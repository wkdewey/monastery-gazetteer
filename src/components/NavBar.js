import React from "react";
import {
  Nav,
  Navbar,
  NavLink,
  NavItem,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const NavBar = () => {
  return (
    <Navbar color="light">
      <NavbarBrand>American Ancestries</NavbarBrand>
      <NavbarToggler></NavbarToggler>
      <Nav className="mr-auto" tabs>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/places">Places</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/ancestry_groups">Ancestry Groups</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/places/new">New Place</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
