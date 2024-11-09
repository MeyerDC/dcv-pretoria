import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbarComponent.css";
import logo from "../../assets/images/dcv-logo.png";
import { useLanguage } from "../language-context/language-contextComponent";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, translations } = useLanguage();

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
            {translations[language].navbar.home}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/events" className="navbar-link">
            {translations[language].navbar.events}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            {translations[language].navbar.about}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/support" className="navbar-link">
            {translations[language].navbar.support}
          </Link>
        </li>
        <li className="navbar-item">
          <button
            onClick={() => toggleLanguage("en")}
            className={`navbar-link language-toggle ${
              language === "en" ? "active" : ""
            }`}
          >
            EN
          </button>
          <button
            onClick={() => toggleLanguage("de")}
            className={`navbar-link language-toggle ${
              language === "de" ? "active" : ""
            }`}
          >
            DE
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
