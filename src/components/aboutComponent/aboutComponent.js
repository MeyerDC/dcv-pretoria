import React from "react";
import "./aboutComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";
import { Swoosh } from "../decorComponent/eventParts";

const AboutComponent = () => {
  const { language, translations } = useLanguage();
  const { heading, content } = translations[language].about;

  return (
    <div className="page-card about-body">
      <h1 className="page-heading">{heading}</h1>
      <Swoosh small />
      {content.split("\n").map((line, index) => (
        <p key={index}>{line.trim()}</p>
      ))}
    </div>
  );
};

export default AboutComponent;
