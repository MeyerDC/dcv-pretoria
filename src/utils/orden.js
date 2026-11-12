import list from "../data/orden.json";
import milestones, { eventStart, eventYear } from "../data/milestones";
import { currentMilestone } from "./milestones";
import { isLive, isOn } from "./features";

// One Orden per dated milestone. They are kept in the visitor's own browser.
export const ORDEN = list
  .map((o) => ({ ...o, milestone: milestones.find((m) => m.id === o.id) }))
  .filter((o) => o.milestone && o.milestone.window(Date.now()))
  .sort((a, b) => a.milestone.window(Date.now())[0] - b.milestone.window(Date.now())[0]);

export const ORDEN_CHANGED = "dcv-orden";
const STARTER = "season-opening";

// Medals collected while the feature is still a preview are kept apart, so
// trying it out does not count once it is live.
const key = () => `dcv-orden-${isLive("orden") ? "" : "preview-"}${eventYear}`;

export const readOrden = () => {
  try {
    return JSON.parse(window.localStorage.getItem(key())) || {};
  } catch (e) {
    return {};
  }
};

const write = (earned) => {
  try {
    window.localStorage.setItem(key(), JSON.stringify(earned));
  } catch (e) {
    // Private browsing: the medals last for this visit only.
  }
  window.dispatchEvent(new Event(ORDEN_CHANGED));
};

export const resetOrden = () => write({});

// Hands out whatever is due now and returns the ids that are new.
// - The season-opening Orden is a starter for everyone until the event begins.
// - A milestone's Orden is given on its day. Preview links only count while
//   the feature itself is still a preview.
export const awardDue = (now = Date.now()) => {
  if (!isOn("orden")) return [];
  const earned = readOrden();
  const due = [];
  if (now < eventStart) due.push(STARTER);
  const { milestone, preview } = currentMilestone(now);
  if (milestone && (!preview || !isLive("orden"))) due.push(milestone.id);

  const fresh = due.filter((id) => !earned[id] && ORDEN.some((o) => o.id === id));
  if (fresh.length === 0) return [];
  fresh.forEach((id) => {
    earned[id] = now;
  });
  write(earned);
  return fresh;
};
