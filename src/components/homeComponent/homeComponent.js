import React from "react";
import "./homeComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";

function HomeComponent() {
  const { language, translations } = useLanguage();
  const { welcome } = translations[language].home;

  return (
    <div className="home-body">
      <h1>{welcome}</h1>
    </div>
  );
}

export default HomeComponent;
