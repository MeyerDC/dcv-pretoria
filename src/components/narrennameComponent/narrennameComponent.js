import React, { useEffect, useState } from "react";
import "./narrennameComponent.css";
import site from "../../data/site.json";
import { eventYear } from "../../data/milestones";
import { MAX_NAME_LENGTH, narrenName, styles } from "../../data/narrenNames";
import { nameStory } from "../../utils/shareCard";
import ShareButton from "../shareButton/shareButton";
import { Swoosh } from "../decorComponent/eventParts";
import { useLanguage } from "../language-context/language-contextComponent";

// /narrenname – type a first name, get a Karneval title on a card to share.
// The name never leaves the visitor's browser.
function NarrennameComponent() {
  const { language, translations } = useLanguage();
  const t = translations[language].narrenname;
  const e = translations[language].event;
  const [name, setName] = useState("");
  const [style, setStyle] = useState(styles[0].id);
  const [again, setAgain] = useState(0);
  const [picture, setPicture] = useState(null);

  const result = narrenName(name, style, again);
  const title = result ? result.title : null;
  const epithet = result ? result.epithet : null;
  const kicker = t.cardKicker.replace("{year}", eventYear);
  const date = `${e.date} ${e.month}`;
  const motto = e.motto.join("|");

  const build = () =>
    nameStory({ kicker, title, epithet, motto: motto.split("|"), date, host: site.host });

  // Redraw the preview shortly after the last keystroke.
  useEffect(() => {
    if (!title) {
      setPicture(null);
      return undefined;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      nameStory({ kicker, title, epithet, motto: motto.split("|"), date, host: site.host }).then(
        (canvas) => {
          if (!cancelled) setPicture(canvas.toDataURL("image/jpeg", 0.85));
        }
      );
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [title, epithet, kicker, date, motto]);

  return (
    <div className="narrenname">
      <h1 className="page-heading">{t.heading}</h1>
      <Swoosh small />
      <p className="narrenname-intro">{t.intro}</p>

      <div className="narrenname-form">
        <label className="narrenname-label" htmlFor="narrenname-input">
          {t.label}
        </label>
        <input
          id="narrenname-input"
          className="narrenname-input"
          type="text"
          value={name}
          maxLength={MAX_NAME_LENGTH}
          placeholder={t.placeholder}
          autoComplete="given-name"
          onChange={(ev) => {
            setName(ev.target.value);
            setAgain(0);
          }}
        />
        <div className="narrenname-styles" role="group" aria-label={t.styleLabel}>
          {styles.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`narrenname-style ${style === s.id ? "active" : ""}`}
              aria-pressed={style === s.id}
              onClick={() => setStyle(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {result ? (
        <>
          <p className="narrenname-result">
            <strong>{result.title}</strong>
            <span>{result.epithet}</span>
          </p>
          <div className="narrenname-actions">
            <ShareButton
              label={t.share}
              filename="dcv-narrenname.jpg"
              text={`${t.shareText.replace("{name}", `${result.title} ${result.epithet}`)} ${site.url}/narrenname`}
              build={build}
            />
            <button type="button" className="dcv-btn dcv-btn-outline" onClick={() => setAgain(again + 1)}>
              {t.again}
            </button>
          </div>
          {picture && <img className="narrenname-card" src={picture} alt={`${result.title} ${result.epithet}`} />}
        </>
      ) : (
        <p className="narrenname-empty">{t.empty}</p>
      )}
      <p className="narrenname-note">{t.note}</p>
    </div>
  );
}

export default NarrennameComponent;
