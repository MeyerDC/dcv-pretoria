// Everything that changes from one Karneval to the next lives here and in
// the "event" section of components/language-context/translations.json.
import posterEn from "../assets/images/dcv2027-en.webp";
import posterDe from "../assets/images/dcv2027-de.webp";

const event = {
  // One poster per language.
  poster: { en: posterEn, de: posterDe },
  // First evening, doors open (South African time). Drives the countdown.
  startsAt: "2027-02-26T18:30:00+02:00",
  // Last evening (South African date). With startsAt it sets the milestone
  // dates in data/milestones.js.
  lastDay: "2027-02-28",
  // Date ticket sales open, e.g. "2026-12-01"; drives the "tickets on sale"
  // milestone. Leave null until known.
  ticketsOnSaleFrom: null,
  // Set to the ticket-shop URL once sales open; while null the site shows
  // "Tickets coming soon" instead of a buy button.
  ticketUrl: null,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Deutsche+Internationale+Schule+Pretoria",
  // Optional per-evening rows, e.g.
  // { date: { en: "26 February", de: "26. Februar" },
  //   title: { en: "Kids Carnival", de: "Kinderkarneval" },
  //   ticketUrl: "https://..." }
  sessions: [],
};

export default event;
