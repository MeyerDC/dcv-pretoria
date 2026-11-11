// Everything that changes from one Karneval to the next lives here and in
// the "event" section of components/language-context/translations.json.
import poster from "../assets/images/dcv2027.webp";

const event = {
  poster,
  // First evening, doors open (South African time). Drives the countdown.
  startsAt: "2027-02-26T18:30:00+02:00",
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
