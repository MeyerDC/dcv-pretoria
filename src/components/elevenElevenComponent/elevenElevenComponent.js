import React, { useEffect, useState } from "react";
import "./elevenElevenComponent.css";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../language-context/language-contextComponent";
import { isSeasonOpening, isSeasonOpeningPreview } from "../../utils/seasonOpening";

// 11:11 – the Karneval minute. While the visitor's clock reads 11:11 the
// site throws confetti; on 11 November it also announces the new session.
// Tapping the jester on the home page 11 times (or opening the site with
// #1111) sets it off for 11 seconds at any time.
export const ELEVEN_EVENT = "dcv-1111";

const COLOURS = ["ink", "red", "gold"];
const PIECES = Array.from({ length: 111 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  delay: ((i * 53) % 40) / 10,
  duration: 3 + ((i * 29) % 30) / 10,
  size: 7 + ((i * 17) % 9),
  colour: COLOURS[i % 3],
  round: i % 4 === 0,
}));

export const ConfettiRain = () => (
  <div className="eleven-rain" aria-hidden="true">
    {PIECES.map((p) => (
      <span
        key={p.id}
        className={`eleven-piece confetti-${p.colour}`}
        style={{
          left: `${p.left}%`,
          width: p.size,
          height: p.round ? p.size : p.size * 0.6,
          borderRadius: p.round ? "50%" : 2,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }}
      />
    ))}
  </div>
);

const isElevenEleven = (d) => d.getHours() === 11 && d.getMinutes() === 11;

const ElevenElevenComponent = () => {
  const [onTheClock, setOnTheClock] = useState(() => isElevenEleven(new Date()));
  const [manual, setManual] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { language, translations } = useLanguage();
  const t = translations[language].eleven;
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      const hit = isElevenEleven(new Date());
      setOnTheClock((was) => {
        if (hit && !was) setDismissed(false);
        return hit;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer;
    const fire = () => {
      setDismissed(false);
      setManual(true);
      clearTimeout(timer);
      timer = setTimeout(() => setManual(false), 11000);
    };
    window.addEventListener(ELEVEN_EVENT, fire);
    if (window.location.hash === "#1111") fire();
    return () => {
      window.removeEventListener(ELEVEN_EVENT, fire);
      clearTimeout(timer);
    };
  }, []);

  if (!(onTheClock || manual) || dismissed) return null;
  // The home page is already the celebration while the season opening runs.
  if (pathname === "/" && (isSeasonOpening() || isSeasonOpeningPreview())) return null;

  const today = new Date();
  const seasonOpening = today.getMonth() === 10 && today.getDate() === 11;

  return (
    <div className="eleven">
      <ConfettiRain />
      <button
        type="button"
        className="eleven-badge"
        onClick={() => setDismissed(true)}
        aria-live="polite"
      >
        <span className="eleven-time">11:11</span>
        <span className="eleven-text">
          {seasonOpening ? t.seasonOpening : t.everyDay}
        </span>
      </button>
    </div>
  );
};

export default ElevenElevenComponent;
