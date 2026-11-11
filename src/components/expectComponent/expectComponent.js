import React from "react";
import * as Icon from "react-feather";
import "./expectComponent.css";
import { useLanguage } from "../language-context/language-contextComponent";
import { Swoosh } from "../decorComponent/eventParts";

// One icon per entry of "expect.items" in translations.json, in order.
const ICONS = [Icon.Award, Icon.Music, Icon.Coffee, Icon.Smile, Icon.Flag, Icon.Heart];

const ExpectComponent = () => {
  const { language, translations } = useLanguage();
  const t = translations[language].expect;

  return (
    <section className="expect">
      <h2 className="section-heading">{t.heading}</h2>
      <Swoosh small />
      <ul className="expect-grid">
        {t.items.map((item, i) => {
          const ItemIcon = ICONS[i % ICONS.length];
          return (
            <li key={item} className="expect-item">
              <span className="expect-icon">
                <ItemIcon />
              </span>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
      <p className="expect-invite">{t.invite}</p>
    </section>
  );
};

export default ExpectComponent;
