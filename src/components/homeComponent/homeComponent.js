import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./homeComponent.css";
import logo from "../../assets/images/dcv-logo-2027.png";
import { useLanguage } from "../language-context/language-contextComponent";
import { ELEVEN_EVENT } from "../elevenElevenComponent/elevenElevenComponent";
import CountdownComponent from "../countdownComponent/countdownComponent";
import ExpectComponent from "../expectComponent/expectComponent";
import GardeComponent from "../gardeComponent/gardeComponent";
import JoinInComponent from "../joinInComponent/joinInComponent";
import CountdownShare from "../countdownComponent/countdownShare";
import SponsorsComponent from "../sponsorsComponent/sponsorsComponent";
import MilestoneComponent from "../milestoneComponent/milestoneComponent";
import { useActiveMilestone } from "../../utils/milestones";
import { EventFacts, Motto, Swoosh, TicketButton } from "../decorComponent/eventParts";

function HomeComponent() {
  const { language, translations } = useLanguage();
  const { welcome } = translations[language].home;
  const t = translations[language].event;

  // On a milestone day the home page changes (see data/milestones.js).
  const milestone = useActiveMilestone();

  // Eleven quick taps on the jester set off the 11:11 celebration.
  const taps = useRef({ count: 0, last: 0 });
  const tapJester = () => {
    const now = Date.now();
    taps.current.count = now - taps.current.last < 1500 ? taps.current.count + 1 : 1;
    taps.current.last = now;
    if (taps.current.count === 11) {
      taps.current.count = 0;
      window.dispatchEvent(new Event(ELEVEN_EVENT));
    }
  };

  if (milestone && milestone.variant === "page") {
    return <MilestoneComponent milestone={milestone} />;
  }

  return (
    <div className="home-body">
      {milestone && milestone.variant === "banner" && (
        <p className="milestone-banner">
          {translations[language].milestones[milestone.id].text}
        </p>
      )}
      <img src={logo} alt="DCV Pretoria" className="home-logo" onClick={tapJester} />
      <p className="event-presents">{t.presents}</p>
      <h1 className="event-title">{t.title}</h1>
      <Swoosh />
      <Motto />
      <CountdownComponent />
      <CountdownShare />
      <EventFacts />
      <div className="home-actions">
        <TicketButton />
        <Link to="/events" className="dcv-btn dcv-btn-outline">
          {t.details}
        </Link>
      </div>
      <p className="home-welcome">{welcome}</p>
      <ExpectComponent />
      <JoinInComponent />
      <GardeComponent />
      <SponsorsComponent />
    </div>
  );
}

export default HomeComponent;
