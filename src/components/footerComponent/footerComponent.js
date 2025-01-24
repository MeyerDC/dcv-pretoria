import React from "react";
import "./footerComponent.css";
import * as Icon from "react-feather";
import { useLanguage } from "../language-context/language-contextComponent";

const FooterComponent = () => {
  const { language, translations } = useLanguage();
  const { rights } = translations[language].footer;

  return (
    <footer>
      <div className="social-media-links">
        <p>&copy; DCV Pretoria 2024. {rights}</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
