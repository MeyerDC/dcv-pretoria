import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbarComponent.css";
import logo from "../../assets/images/dcv-logo-2027.png";
import * as Icon from "react-feather";
import { useLanguage } from "../language-context/language-contextComponent";

const LINKS = [
  { to: "/", key: "home" },
  { to: "/events", key: "events" },
  { to: "/about", key: "about" },
  { to: "/support", key: "support" },
];

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, translations } = useLanguage();
  const close = () => setIsOpen(false);

  return (
    <nav className="site-nav">
      <Link to="/" className="site-nav-brand" onClick={close}>
        <img src={logo} alt="DCV Pretoria" className="site-nav-logo" />
        <span>DCV Pretoria</span>
      </Link>
      <button
        className="site-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <Icon.X /> : <Icon.Menu />}
      </button>
      <ul className={`site-nav-list ${isOpen ? "open" : ""}`}>
        {LINKS.map(({ to, key }) => (
          <li key={key}>
            <NavLink to={to} end className="site-nav-link" onClick={close}>
              {translations[language].navbar[key]}
            </NavLink>
          </li>
        ))}
        <li className="language-switch">
          {["en", "de"].map((code) => (
            <button
              key={code}
              onClick={() => toggleLanguage(code)}
              className={`language-toggle ${language === code ? "active" : ""}`}
              aria-pressed={language === code}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </li>
        <li className="social-media-links">
          <a href="https://www.instagram.com/dcv.pretoria/" aria-label="Instagram" target="_blank" rel="noreferrer">
            <Icon.Instagram />
          </a>
          <a href="https://www.facebook.com/share/zpH9XFFATVyH1hqk/?mibextid=qi2Omg" aria-label="Facebook" target="_blank" rel="noreferrer">
            <Icon.Facebook />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
