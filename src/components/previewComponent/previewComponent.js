import React from "react";
import "./previewComponent.css";
import milestones from "../../data/milestones";
import { fillIn } from "../milestoneComponent/milestoneComponent";
import { useLanguage } from "../language-context/language-contextComponent";

// /preview – not linked from the menu. Lists every milestone with its date
// and a link that shows it now.
function PreviewComponent() {
  const { language, translations } = useLanguage();
  const t = translations[language].preview;
  const e = translations[language].event;
  const words = translations[language].milestones;
  const format = new Intl.DateTimeFormat(language, {
    timeZone: "Africa/Johannesburg",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const now = Date.now();

  const rows = milestones
    .map((m) => {
      const range = m.window(now);
      const days = range ? Math.round((range[1] - range[0]) / 86400000) : 0;
      return { ...m, range, days };
    })
    .sort((a, b) => (a.range ? a.range[0] : Infinity) - (b.range ? b.range[0] : Infinity));

  return (
    <div className="page-card preview">
      <h1 className="page-heading">{t.heading}</h1>
      <p>{t.intro}</p>
      <ul className="preview-list">
        {rows.map((m) => (
          <li key={m.id}>
            <a className="preview-row" href={`/#preview-${m.id}`}>
              <span className="preview-name">{fillIn(words[m.id].name, e)}</span>
              <span className="preview-when">
                {m.range
                  ? `${format.format(m.range[0])}${m.days > 1 ? ` · ${m.days} ${t.days}` : ""}`
                  : t.noDate}
              </span>
              <span className={`preview-state ${m.enabled ? "preview-live" : ""}`}>
                {m.enabled ? t.live : t.previewOnly}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviewComponent;
