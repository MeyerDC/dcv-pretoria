import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./previewComponent.css";
import site from "../../data/site.json";
import flags from "../../data/features.json";
import { resetOrden } from "../../utils/orden";
import { setPreviewMode, useFeatures } from "../../utils/features";
import { useOrden } from "../ordenComponent/useOrden";
import { linkCards } from "./linkCards";
import milestones, { eventYear } from "../../data/milestones";
import { fillIn } from "../milestoneComponent/milestoneComponent";
import { useLanguage } from "../language-context/language-contextComponent";

// Where each promotion feature can be tried.
const FEATURE_LINKS = {
  orden: "/orden",
  nameCard: "/narrenname",
  joinIn: "/#mitmachen",
  countdownShare: "/",
};

// /preview – not linked from the menu. Lists every milestone with its date
// and a link that shows it now, and the promotion features that are not
// public yet. Opening it switches on preview mode in this browser.
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
  const lp = translations[language].linkPreview;
  const { previewMode, isLive } = useFeatures();
  const { list: ordenList } = useOrden();
  const [linkCard, setLinkCard] = useState(null);

  useEffect(() => {
    setPreviewMode(true);
  }, []);

  // The link card as WhatsApp would show it, and a hook for the script that
  // saves all link-preview pictures (always in German, the site's default).
  useEffect(() => {
    let cancelled = false;
    const cards = linkCards(e, lp, ordenList);
    cards.karneval().then((canvas) => {
      if (!cancelled) setLinkCard(canvas.toDataURL("image/jpeg", 0.85));
    });
    const de = translations.de;
    window.dcvLinkCards = async () => {
      const german = linkCards(
        de.event,
        de.linkPreview,
        ordenList.map((o) => ({ ...o, name: de.orden.names[o.id].replace("{year}", eventYear) }))
      );
      const out = {};
      for (const [name, draw] of Object.entries(german)) {
        out[name] = (await draw()).toDataURL("image/jpeg", 0.82);
      }
      return out;
    };
    return () => {
      cancelled = true;
    };
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

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

      <h2 className="page-heading preview-second">{t.featuresHeading}</h2>
      <p>{t.featuresIntro}</p>
      <p className="preview-mode">
        <strong>{previewMode ? t.modeOn : t.modeOff}</strong>
        <button type="button" className="preview-button" onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? t.switchOff : t.switchOn}
        </button>
        <button type="button" className="preview-button" onClick={resetOrden}>
          {t.reset}
        </button>
      </p>
      <ul className="preview-list">
        {Object.keys(flags)
          .filter((name) => FEATURE_LINKS[name])
          .map((name) => {
            const row = (
              <>
                <span className="preview-name">{t.features[name]}</span>
                <span className="preview-when" />
                <span className={`preview-state ${isLive(name) ? "preview-live" : ""}`}>
                  {isLive(name) ? t.live : t.previewOnly}
                </span>
              </>
            );
            const to = FEATURE_LINKS[name];
            return (
              <li key={name}>
                {to.includes("#") ? (
                  <a className="preview-row" href={to}>
                    {row}
                  </a>
                ) : (
                  <Link className="preview-row" to={to}>
                    {row}
                  </Link>
                )}
              </li>
            );
          })}
      </ul>
      <p className="preview-tip">{t.ordenTip}</p>

      <p className="preview-tip">
        <strong>{t.features.linkPreview}</strong>
        <span className={`preview-state ${isLive("linkPreview") ? "preview-live" : ""}`}>
          {isLive("linkPreview") ? t.live : t.previewOnly}
        </span>
        <br />
        {t.linkCardLabel}
      </p>
      <div className="preview-linkcard">
        {linkCard && <img src={linkCard} alt="" />}
        <div>
          <strong>{lp.title.replace("{year}", eventYear)}</strong>
          <span>
            {e.date} {e.month} · {e.venue}
          </span>
          <small>{site.host}</small>
        </div>
      </div>

      <h2 className="page-heading preview-second">{t.qrHeading}</h2>
      <p>{t.qrIntro}</p>
      <div className="preview-qr">
        <img src="/print/qr-card.png" alt="" />
        <ul>
          {[
            ["qr-card.png", t.qrCard],
            ["qr.png", t.qrPng],
            ["qr.svg", t.qrSvg],
          ].map(([file, label]) => (
            <li key={file}>
              <a href={`/print/${file}`} download={`dcv-${file}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PreviewComponent;
