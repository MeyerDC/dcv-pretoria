import React from "react";
import "./supportComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";
import { Swoosh } from "../decorComponent/eventParts";

const SupportComponent = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const { heading, bankDetails, accountHolder, bank, accountNumber, branchCode, contactDetails, email } = t.support;

  return (
    <div className="page-card support-body">
      <h1 className="page-heading">{t.navbar.support}</h1>
      <Swoosh small />
      <p className="support-lead">{heading}</p>

      <h2>{bankDetails}</h2>
      <dl className="support-list">
        <dt>{accountHolder}</dt>
        <dd>DEUTSCHER CARNEVALS VEREIN CLUB</dd>
        <dt>{bank}</dt>
        <dd>FNB</dd>
        <dt>{accountNumber}</dt>
        <dd>63116276337</dd>
        <dt>{branchCode}</dt>
        <dd>210835</dd>
      </dl>

      <h2>{contactDetails}</h2>
      <dl className="support-list">
        <dt>{email}</dt>
        <dd>
          <a href="mailto:dcv.pretoria@gmail.com">dcv.pretoria@gmail.com</a>
        </dd>
      </dl>
    </div>
  );
};

export default SupportComponent;
