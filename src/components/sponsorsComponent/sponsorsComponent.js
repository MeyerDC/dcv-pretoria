import React from "react";
import "./sponsorsComponent.css";
import sponsors from "../../data/sponsors";
import { useLanguage } from "../language-context/language-contextComponent";
import { Swoosh } from "../decorComponent/eventParts";

const SponsorsComponent = () => {
  const { language, translations } = useLanguage();
  const { heading, thanks } = translations[language].sponsors;

  if (sponsors.length === 0) return null;

  return (
    <section className="sponsors">
      <h2 className="page-heading sponsors-heading">{heading}</h2>
      <Swoosh small />
      <p className="sponsors-thanks">{thanks}</p>
      <ul className="sponsors-grid">
        {sponsors.map((sponsor) => (
          <li key={sponsor.name}>
            <a
              className="sponsor-card"
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="sponsor-logo">
                <img src={sponsor.logo} alt="" />
              </span>
              <span className="sponsor-name">{sponsor.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SponsorsComponent;
