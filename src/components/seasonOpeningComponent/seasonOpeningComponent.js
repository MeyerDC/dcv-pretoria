import React from "react";
import { Link } from "react-router-dom";
import "./seasonOpeningComponent.css";
import logo from "../../assets/images/dcv-logo-2027.png";
import { useLanguage } from "../language-context/language-contextComponent";
import { ConfettiRain } from "../elevenElevenComponent/elevenElevenComponent";
import CountdownComponent from "../countdownComponent/countdownComponent";
import SponsorsComponent from "../sponsorsComponent/sponsorsComponent";
import { EventFacts, Motto, Swoosh } from "../decorComponent/eventParts";

// The home page on 11.11. from 11:11 until midnight (South African time).
function SeasonOpeningComponent() {
  const { language, translations } = useLanguage();
  const t = translations[language].seasonOpening;
  const e = translations[language].event;

  return (
    <div className="season-body">
      <div className="season-rain">
        <ConfettiRain />
      </div>
      <img src={logo} alt="DCV Pretoria" className="season-logo" />
      <p className="season-kicker">{t.kicker}</p>
      <h1 className="season-clock">11:11</h1>
      <p className="season-title">{t.title}</p>
      <p className="season-helau">{t.helau}</p>
      <Swoosh />
      <p className="season-text">{t.text}</p>

      <section className="season-next">
        <p className="event-presents">{t.next}</p>
        <h2 className="season-karneval">{e.title} 2027</h2>
        <Motto />
        <CountdownComponent />
        <EventFacts />
        <div className="home-actions">
          <Link to="/events" className="dcv-btn dcv-btn-outline">
            {e.details}
          </Link>
        </div>
      </section>
      <SponsorsComponent />
    </div>
  );
}

export default SeasonOpeningComponent;
