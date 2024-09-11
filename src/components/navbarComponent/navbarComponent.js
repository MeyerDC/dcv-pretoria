import React from "react";
import { Link } from "react-router-dom";
import "./navbarComponent.css";
import logo from "../../assets/images/dcv-logo.png";

function NavbarComponent() {
  return (
    <nav className="navbar">
      <Link to="/home">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/events" className="navbar-link">
            Events
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/support" className="navbar-link">
            Support us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
