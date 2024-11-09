import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbarComponent.css";
import logo from "../../assets/images/dcv-logo.png";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-list ${isOpen ? "open" : ""}`}>
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Startseite
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/events" className="navbar-link">
            Veranstaltungen
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            Über uns
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/support" className="navbar-link">
            Unterstützen Sie uns
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
