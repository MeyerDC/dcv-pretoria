import React from "react";
import "./supportComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";

const SupportComponent = () => {
  const { language, translations } = useLanguage();
  const { heading, bankDetails, accountHolder, bank, accountNumber, branchCode, contactDetails, email } = translations[language].support;

  return (
    <div className="support-body">
      <p>{heading}</p>
      <div className="banking-details">
        <h2>{bankDetails}</h2>
        <p>{accountHolder}: DEUTSCHER CARNEVALS VEREIN CLUB</p>
        <p>{bank}: FNB</p>
        <p>{accountNumber}: 63116276337</p>
        <p>{branchCode}: 210835</p>
      </div>
      <div className="contact-details">
        <h2>{contactDetails}</h2>
        <p>
          {email}:{" "}
          <a href="mailto:dcv.pretoria@gmail.com">dcv.pretoria@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default SupportComponent;
