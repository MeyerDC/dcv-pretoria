import React from "react";
import * as Icon from "react-feather";
import "./gardeComponent.css";
import garde from "../../data/garde";
import { useLanguage } from "../language-context/language-contextComponent";

const GardeComponent = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].garde;

  return (
    <section className="garde">
      <div className="garde-card">
        <h2 className="garde-heading">
          {t.heading} <em>{t.wanted}</em>
        </h2>
        <p className="garde-text">{t.text}</p>
        <ul className="garde-facts">
          <li>
            <Icon.Calendar />
            {t.when}
          </li>
          <li>
            <Icon.Clock />
            {t.time}
          </li>
          <li>
            <Icon.MapPin />
            {t.where}
          </li>
        </ul>
        <a className="dcv-btn garde-call" href={garde.phoneLink}>
          <Icon.Phone />
          <span>
            {t.signUp} {garde.contactName} ·{" "}
            <span className="garde-phone">{garde.phoneDisplay}</span>
          </span>
        </a>
        <p className="garde-helau">{t.helau}</p>
      </div>
    </section>
  );
};

export default GardeComponent;
