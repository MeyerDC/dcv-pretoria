import React from "react";
import "./aboutComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";

const AboutComponent = () => {
  const { language, translations } = useLanguage();
  const { heading, content } = translations[language].about;

  return (
    <div className="about-body">
      <h1 className="about-heading">{heading}</h1>
      <p>
        {content.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AboutComponent;
