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
        <a href="https://www.instagram.com/dcv.pretoria/">
          <Icon.Instagram className="icon-ig" />
        </a>
        <a href="https://www.facebook.com/share/zpH9XFFATVyH1hqk/?mibextid=qi2Omg">
          <Icon.Facebook className="icon-fb" />
        </a>
        <p>&copy; DCV Pretoria 2024. {rights}</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
