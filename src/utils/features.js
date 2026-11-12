import { useEffect, useState } from "react";
import flags from "../data/features.json";

// Promotion features are switched on for everyone in data/features.json.
// Until then they only show in a browser where preview mode is on, which
// happens by opening /preview.
const KEY = "dcv-feature-preview";
const CHANGED = "dcv-features";

export const previewMode = () => {
  try {
    return window.localStorage.getItem(KEY) === "1";
  } catch (e) {
    return false;
  }
};

export const setPreviewMode = (on) => {
  try {
    if (on) window.localStorage.setItem(KEY, "1");
    else window.localStorage.removeItem(KEY);
  } catch (e) {
    // Private browsing: preview mode is not available.
  }
  window.dispatchEvent(new Event(CHANGED));
};

export const isLive = (name) => Boolean(flags[name] && flags[name].live);
export const isOn = (name) => isLive(name) || previewMode();

// Re-renders when preview mode is switched on or off.
export const useFeatures = () => {
  const [, setTick] = useState(0);
  useEffect(() => {
    const changed = () => setTick((n) => n + 1);
    window.addEventListener(CHANGED, changed);
    return () => window.removeEventListener(CHANGED, changed);
  }, []);
  return { isOn, isLive, previewMode: previewMode() };
};
