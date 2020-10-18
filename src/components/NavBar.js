import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/places">Places</NavLink>
      <NavLink to="/ancestrygroups">Ancestry Groups</NavLink>
      <NavLink to="/places/new">New Place</NavLink>
    </div>
  );
};

export default NavBar;
