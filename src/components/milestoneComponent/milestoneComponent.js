import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./milestoneComponent.css";
import logo from "../../assets/images/dcv-logo-2027.png";
import event from "../../data/event";
import { eventYear } from "../../data/milestones";
import { useLanguage } from "../language-context/language-contextComponent";
import { ConfettiRain } from "../elevenElevenComponent/elevenElevenComponent";
import CountdownComponent from "../countdownComponent/countdownComponent";
import ExpectComponent from "../expectComponent/expectComponent";
import GardeComponent from "../gardeComponent/gardeComponent";
import SponsorsComponent from "../sponsorsComponent/sponsorsComponent";
import {
  EventFacts,
  Motto,
  Sessions,
  Swoosh,
  TicketButton,
  todaysSession,
} from "../decorComponent/eventParts";

// {date} and {year} in milestone wording are filled in from the event.
export const fillIn = (text, e) =>
  (text || "").replace("{date}", e.date).replace("{year}", eventYear);

// The home page on a milestone day (see data/milestones.js).
function MilestoneComponent({ milestone }) {
  const { language, translations } = useLanguage();
  const e = translations[language].event;
  const common = translations[language].milestones.common;
  const t = translations[language].milestones[milestone.id];
  const badge = fillIn(t.badge, e);
  // On the days themselves the title names what is on today (in a preview on
  // any other day: the first one).
  const session = milestone.namesSession ? todaysSession() || event.sessions[0] : null;
  const title = session ? `${common.today} ${session.title[language]}` : fillIn(t.title, e);
  // The longer the word on the badge, the smaller it is set, so it always
  // fits a phone screen.
  const length = Math.max(badge.length, 1);
  const badgeSize = `clamp(2.4rem, ${Math.min(26, 90 / length)}vw, ${Math.min(11, 44 / length)}rem)`;

  // A burst of confetti on arrival: 11 seconds, then it fades out and goes,
  // so the page stays easy to read.
  const [rain, setRain] = useState("on");
  useEffect(() => {
    setRain("on");
    const fade = setTimeout(() => setRain("fading"), 11000);
    const stop = setTimeout(() => setRain("off"), 14000);
    return () => {
      clearTimeout(fade);
      clearTimeout(stop);
    };
  }, [milestone.id]);

  return (
    <div className="season-body">
      {rain !== "off" && (
        <div className={`season-rain ${rain === "fading" ? "season-rain-fading" : ""}`}>
          <ConfettiRain />
        </div>
      )}
      <img src={logo} alt="DCV Pretoria" className="season-logo" />
      <p className="season-kicker">{fillIn(t.kicker, e)}</p>
      <h1 className="season-clock" style={{ fontSize: badgeSize }}>
        {badge}
      </h1>
      <p className="season-title">{title}</p>
      <p className="season-helau">{fillIn(t.shout, e)}</p>
      <Swoosh />
      {t.text && <p className="season-text">{fillIn(t.text, e)}</p>}

      {milestone.showNext && (
        <section className="season-next">
          {t.next !== "" && <p className="event-presents">{t.next || common.next}</p>}
          <h2 className="season-karneval">
            {e.title} {eventYear}
          </h2>
          <Motto />
          <CountdownComponent />
          <EventFacts />
          {milestone.showSessions && <Sessions />}
          <div className="home-actions">
            <TicketButton />
            <Link to="/events" className="dcv-btn dcv-btn-outline">
              {e.details}
            </Link>
          </div>
        </section>
      )}
      {milestone.showNext && <ExpectComponent />}
      {milestone.showNext && <GardeComponent />}
      <SponsorsComponent />
    </div>
  );
}

export default MilestoneComponent;
