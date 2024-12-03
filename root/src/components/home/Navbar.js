import React from "react";
import { Link } from "react-router-dom";
import "./Navbarcss.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
