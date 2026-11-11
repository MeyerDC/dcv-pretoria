import React from "react";
import * as Icon from "react-feather";
import event from "../../data/event";
import { useLanguage } from "../language-context/language-contextComponent";

// Red and gold brush strokes, as under "KARNEVAL" on the poster.
export const Swoosh = ({ small }) => (
  <svg
    className={`swoosh ${small ? "swoosh-small" : ""}`}
    viewBox="0 0 560 40"
    aria-hidden="true"
  >
    <path d="M6 30 C150 4 380 2 554 14" fill="none" stroke="#17130f" strokeWidth="5" strokeLinecap="round" />
    <path d="M60 30 C210 12 400 10 540 22" fill="none" stroke="#d2161e" strokeWidth="5" strokeLinecap="round" />
    <path d="M110 35 C250 22 400 20 520 30" fill="none" stroke="#f2b01e" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// The motto in script, with its last word in red as on the medal.
export const Motto = () => {
  const { language, translations } = useLanguage();
  const lines = translations[language].event.motto;

  return (
    <p className="event-motto">
      {lines.map((line, i) => {
        const cut = line.lastIndexOf(" ") + 1;
        return (
          <span key={line}>
            {i < lines.length - 1 ? (
              line
            ) : (
              <>
                {line.slice(0, cut)}
                <em>{line.slice(cut)}</em>
              </>
            )}
          </span>
        );
      })}
    </p>
  );
};

export const EventFacts = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].event;

  return (
    <div className="event-facts">
      <div className="event-fact">
        <Icon.Calendar />
        <h2 className="event-fact-label">{t.dateLabel}</h2>
        <p className="event-fact-big">{t.date}</p>
        <p className="event-fact-sub">{t.month}</p>
      </div>
      <div className="event-fact">
        <Icon.Clock />
        <h2 className="event-fact-label">{t.timeLabel}</h2>
        <p className="event-fact-big">{t.time}</p>
        <p className="event-fact-note">{t.programme}</p>
        <p className="event-fact-big">{t.programmeTime}</p>
      </div>
      <div className="event-fact">
        <Icon.MapPin />
        <h2 className="event-fact-label">{t.venueLabel}</h2>
        <p className="event-fact-venue">{t.venue}</p>
        <p className="event-fact-address">{t.address}</p>
        <p>
          <a href={event.mapsUrl} target="_blank" rel="noreferrer">
            {t.directions}
          </a>
        </p>
      </div>
    </div>
  );
};

// Midday on a session's day, so the date is the same in every time zone.
const sessionDate = (session) => new Date(`${session.day}T12:00:00+02:00`);

// The session on today's South African date, if there is one.
export const todaysSession = (now = new Date()) => {
  const today = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return event.sessions.find((session) => session.day === today) || null;
};

// What happens on which day.
export const Sessions = () => {
  const { language } = useLanguage();
  if (event.sessions.length === 0) return null;
  const format = new Intl.DateTimeFormat(language, {
    timeZone: "Africa/Johannesburg",
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <ul className="event-sessions">
      {event.sessions.map((session) => (
        <li className="event-session" key={session.day}>
          <span className="event-session-date">{format.format(sessionDate(session))}</span>
          <span className="event-session-title">{session.title[language]}</span>
          {session.ticketUrl && <TicketButton url={session.ticketUrl} />}
        </li>
      ))}
    </ul>
  );
};

export const TicketButton = ({ url = event.ticketUrl }) => {
  const { language, translations } = useLanguage();
  const t = translations[language].event;

  return url ? (
    <a className="dcv-btn" href={url} target="_blank" rel="noreferrer">
      {t.buyTickets}
    </a>
  ) : (
    <span className="dcv-btn dcv-btn-soon">{t.ticketsSoon}</span>
  );
};
