import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import "./joinInComponent.css";
import site from "../../data/site.json";
import { eventEnd, eventYear } from "../../data/milestones";
import { googleCalendarLink, icsBlob } from "../../utils/calendar";
import { useFeatures } from "../../utils/features";
import { saveFile, whatsappLink } from "../../utils/share";
import { Swoosh } from "../decorComponent/eventParts";
import { useLanguage } from "../language-context/language-contextComponent";

// "Join in": ways to pass the Karneval on and take part before the event.
const JoinInComponent = () => {
  const { isOn } = useFeatures();
  const { language, translations } = useLanguage();
  const on = isOn("joinIn") && Date.now() < eventEnd;

  // The page is drawn after it loads, so a link to #mitmachen has to be
  // scrolled to by hand.
  const section = useRef(null);
  useEffect(() => {
    if (on && window.location.hash === "#mitmachen" && section.current) {
      section.current.scrollIntoView();
    }
  }, [on]);

  if (!on) return null;

  const t = translations[language].joinIn;
  const e = translations[language].event;
  const date = `${e.date} ${e.month}`;
  const fill = (text) => text.replace("{year}", eventYear).replace("{date}", date);
  const calendar = {
    title: fill(t.calendarTitle),
    location: `${e.venue}, ${e.address}`,
    details: e.motto.join(" "),
  };

  return (
    <section className="join-in" id="mitmachen" ref={section}>
      <h2 className="section-heading">{t.heading}</h2>
      <Swoosh small />
      <ul className="join-in-grid">
        <li>
          <a
            className="join-in-tile"
            href={whatsappLink(`${fill(t.whatsappText)} ${site.url}`)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="join-in-icon">
              <Icon.MessageCircle />
            </span>
            <strong>{t.whatsapp}</strong>
            <span>{t.whatsappSub}</span>
          </a>
        </li>
        <li>
          <div className="join-in-tile">
            <span className="join-in-icon">
              <Icon.Calendar />
            </span>
            <button
              type="button"
              className="join-in-action"
              onClick={() => saveFile(icsBlob(calendar), `dcv-karneval-${eventYear}.ics`)}
            >
              <strong>{t.calendar}</strong>
            </button>
            <span>{fill(t.calendarSub)}</span>
            <a href={googleCalendarLink(calendar)} target="_blank" rel="noreferrer">
              {t.google}
            </a>
          </div>
        </li>
        {isOn("orden") && (
          <li>
            <Link className="join-in-tile" to="/orden">
              <span className="join-in-icon">
                <Icon.Award />
              </span>
              <strong>{t.orden}</strong>
              <span>{t.ordenSub}</span>
            </Link>
          </li>
        )}
        {isOn("nameCard") && (
          <li>
            <Link className="join-in-tile" to="/narrenname">
              <span className="join-in-icon">
                <Icon.Star />
              </span>
              <strong>{t.nameCard}</strong>
              <span>{t.nameCardSub}</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default JoinInComponent;
