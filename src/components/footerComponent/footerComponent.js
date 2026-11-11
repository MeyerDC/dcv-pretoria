import React from "react";
import "./footerComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";

const FooterComponent = () => {
  const { language, translations } = useLanguage();
  const { rights } = translations[language].footer;

  return (
    <footer className="site-footer">
      <div className="tricolour" aria-hidden="true" />
      <p>
        &copy; DCV Pretoria {new Date().getFullYear()}. {rights}
      </p>
    </footer>
  );
};

export default FooterComponent;
