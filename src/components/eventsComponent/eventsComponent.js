import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./eventsComponent.css";
import event from "../../data/event";
import { useLanguage } from "../language-context/language-contextComponent";
import { EventFacts, Motto, Swoosh, TicketButton } from "../decorComponent/eventParts";

const EventsComponent = () => {
  const [showPoster, setShowPoster] = useState(false);
  const { language, translations } = useLanguage();
  const t = translations[language].event;

  return (
    <div className="event-body">
      <div className="event-top">
        <button
          type="button"
          className="event-poster"
          onClick={() => setShowPoster(true)}
          title={t.posterHint}
        >
          <img src={event.poster[language]} alt={t.posterAlt} />
        </button>
        <div className="event-intro">
          <p className="event-presents">{t.presents}</p>
          <h1 className="event-title">{t.title}</h1>
          <Swoosh />
              <Motto />
          <div className="event-cta">
            <TicketButton />
          </div>
        </div>
      </div>

      <EventFacts />

      {event.sessions.length > 0 && (
        <ul className="event-sessions">
          {event.sessions.map((session) => (
            <li className="event-session" key={session.title.en}>
              <span className="event-session-date">{session.date[language]}</span>
              <span className="event-session-title">{session.title[language]}</span>
              <TicketButton url={session.ticketUrl} />
            </li>
          ))}
        </ul>
      )}

      <Modal show={showPoster} onHide={() => setShowPoster(false)} centered size="lg">
        <Modal.Body onClick={() => setShowPoster(false)}>
          <img className="modal-image" src={event.poster[language]} alt={t.posterAlt} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventsComponent;
