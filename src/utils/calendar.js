import event from "../data/event";
import site from "../data/site.json";

// One all-day entry from the first to the last day of the Karneval.
const compact = (isoDay) => isoDay.replace(/-/g, "");
const firstDay = () =>
  new Date(new Date(event.startsAt).getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 10);
// Calendar end dates are exclusive: the day after the last day.
const dayAfterLast = () =>
  new Date(new Date(`${event.lastDay}T12:00:00Z`).getTime() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

const escapeIcs = (text) => text.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

export const icsBlob = ({ title, location, details }) => {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DCV Pretoria//Karneval//DE",
    "BEGIN:VEVENT",
    `UID:karneval-${compact(firstDay())}@${site.host}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(firstDay())}`,
    `DTEND;VALUE=DATE:${compact(dayAfterLast())}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(`${details}\n${site.url}`)}`,
    `URL:${site.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Blob([lines.join("\r\n")], { type: "text/calendar" });
};

export const googleCalendarLink = ({ title, location, details }) =>
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(title)}` +
  `&dates=${compact(firstDay())}/${compact(dayAfterLast())}` +
  `&location=${encodeURIComponent(location)}` +
  `&details=${encodeURIComponent(`${details}\n${site.url}`)}`;
