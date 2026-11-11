import { useEffect, useState } from "react";
import milestones from "../data/milestones";

const PREVIEW = "#preview-";

// A milestone opened through its preview link (#preview-<id>; #helau is the
// season opening), whether or not it is enabled.
const previewed = () => {
  const { hash } = window.location;
  const id =
    hash === "#helau"
      ? "season-opening"
      : hash.startsWith(PREVIEW)
      ? hash.slice(PREVIEW.length)
      : null;
  return (id && milestones.find((m) => m.id === id)) || null;
};

export const activeMilestone = (now = Date.now()) =>
  previewed() ||
  milestones.find((m) => {
    if (!m.enabled) return false;
    const range = m.window(now);
    return Boolean(range) && now >= range[0] && now < range[1];
  }) ||
  null;

// Re-checked every second, so the page flips on the minute without a reload.
export const useActiveMilestone = () => {
  const [active, setActive] = useState(() => activeMilestone());
  useEffect(() => {
    const check = () => setActive(activeMilestone());
    const timer = setInterval(check, 1000);
    window.addEventListener("hashchange", check);
    return () => {
      clearInterval(timer);
      window.removeEventListener("hashchange", check);
    };
  }, []);
  return active;
};
