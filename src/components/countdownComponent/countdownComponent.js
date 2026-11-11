import React, { useEffect, useState } from "react";
import "./countdownComponent.css";
import event from "../../data/event";
import { useLanguage } from "../language-context/language-contextComponent";

const UNITS = [
  ["days", 86400],
  ["hours", 3600],
  ["minutes", 60],
  ["seconds", 1],
];

// Counts down to the first evening; disappears once the event has started.
const CountdownComponent = () => {
  const target = new Date(event.startsAt).getTime();
  const [now, setNow] = useState(Date.now());
  const { language, translations } = useLanguage();
  const t = translations[language].countdown;

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  let left = Math.floor((target - now) / 1000);
  if (!(left > 0)) return null;

  return (
    <div className="countdown" role="timer" aria-label={t.label}>
      {UNITS.map(([unit, size]) => {
        const value = Math.floor(left / size);
        left -= value * size;
        return (
          <div className="countdown-unit" key={unit}>
            <span className="countdown-value">
              {unit === "days" ? value : String(value).padStart(2, "0")}
            </span>
            <span className="countdown-name">{t[unit]}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CountdownComponent;
