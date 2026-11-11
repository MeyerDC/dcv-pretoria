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
  // One row per day. "day" is the South African date; the weekday and date
  // shown on the site are worked out from it. Add ticketUrl to a row to give
  // that day its own buy button; a row without one shows no button.
  sessions: [
    {
      day: "2027-02-26",
      title: { en: "Prinzenball and German Evening", de: "Prinzenball und Deutscher Abend" },
    },
    {
      day: "2027-02-27",
      title: { en: "International Evening", de: "Internationaler Abend" },
    },
    {
      day: "2027-02-28",
      title: { en: "Kehraus", de: "Kehraus" },
    },
  ],
};

export default event;
