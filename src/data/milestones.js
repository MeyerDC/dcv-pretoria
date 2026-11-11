// Milestones: days on which the home page changes. All times are South
// African time (UTC+2 all year), the same moment for every visitor.
//
//   enabled   true  -> goes live by itself on its date
//             false -> only reachable through its preview link (see /preview)
//   variant   "page"   -> replaces the home page
//             "banner" -> a strip above the normal home page
//   window    returns [start, end] in ms, or null when it has no date yet
//   showNext  show the "coming up" block with motto, countdown and facts
//
// The wording of each one is under "milestones" in translations.json.
// When two overlap, the one higher in this list wins.
import event from "./event";

const DAY = 24 * 60 * 60 * 1000;
const SA_OFFSET = 2 * 60 * 60 * 1000;

// SA calendar day number of a moment, and the moment an SA day begins.
export const saDay = (ms) => Math.floor((ms + SA_OFFSET) / DAY);
const dayStart = (day) => day * DAY - SA_OFFSET;
const wholeDays = (firstDay, count = 1) => [dayStart(firstDay), dayStart(firstDay + count)];

// Easter Sunday as a day number (anonymous Gregorian algorithm). The German
// Karneval days are counted back from it.
const easterDay = (year) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day) / DAY;
};

const start = new Date(event.startsAt).getTime();
const firstDay = saDay(start);
const lastDay = saDay(new Date(`${event.lastDay}T12:00:00+02:00`).getTime());
export const eventYear = new Date(start + SA_OFFSET).getUTCFullYear();
const easter = easterDay(eventYear);

const daysToGo = (n) => () => wholeDays(firstDay - n);
const beforeEaster = (n) => () => wholeDays(easter - n);

const milestones = [
  {
    id: "tonight",
    enabled: false,
    variant: "page",
    showNext: true,
    window: () => wholeDays(firstDay, lastDay - firstDay + 1),
  },
  {
    id: "event-week",
    enabled: false,
    variant: "page",
    showNext: true,
    window: () => wholeDays(firstDay - 4, 4),
  },
  {
    id: "thanks",
    enabled: false,
    variant: "page",
    showNext: false,
    window: () => wholeDays(lastDay + 1, 14),
  },
  {
    id: "tickets",
    enabled: false,
    variant: "page",
    showNext: true,
    // Three days from the date in event.ticketsOnSaleFrom.
    window: () =>
      event.ticketsOnSaleFrom
        ? wholeDays(saDay(new Date(`${event.ticketsOnSaleFrom}T12:00:00+02:00`).getTime()), 3)
        : null,
  },
  { id: "days-11", enabled: false, variant: "page", showNext: true, window: daysToGo(11) },
  { id: "days-50", enabled: false, variant: "page", showNext: true, window: daysToGo(50) },
  { id: "days-100", enabled: false, variant: "page", showNext: true, window: daysToGo(100) },
  {
    id: "season-opening",
    enabled: true,
    variant: "page",
    showNext: true,
    // Every year: 11.11. from 11:11 until midnight.
    window: (now) => {
      const year = new Date(now + SA_OFFSET).getUTCFullYear();
      const day = Date.UTC(year, 10, 11) / DAY;
      return [dayStart(day) + (11 * 60 + 11) * 60 * 1000, dayStart(day + 1)];
    },
  },
  { id: "weiberfastnacht", enabled: false, variant: "page", showNext: true, window: beforeEaster(52) },
  { id: "rosenmontag", enabled: false, variant: "page", showNext: true, window: beforeEaster(48) },
  { id: "veilchendienstag", enabled: false, variant: "banner", window: beforeEaster(47) },
  { id: "aschermittwoch", enabled: false, variant: "page", showNext: true, window: beforeEaster(46) },
];

export default milestones;
