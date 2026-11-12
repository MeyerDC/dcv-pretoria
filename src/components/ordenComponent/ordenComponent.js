import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ordenComponent.css";
import site from "../../data/site.json";
import { eventYear } from "../../data/milestones";
import { ordenStory } from "../../utils/shareCard";
import { useFeatures } from "../../utils/features";
import { useOrden } from "./useOrden";
import MedalCanvas from "./medalCanvas";
import ShareButton from "../shareButton/shareButton";
import { Swoosh } from "../decorComponent/eventParts";

// /orden      – the medal case
// /orden/:id  – one medal: how to get it, or share it
function OrdenComponent() {
  const { id } = useParams();
  const { isOn } = useFeatures();
  const { list, count, total, cardTexts, t } = useOrden();
  const orden = id ? list.find((o) => o.id === id) : null;
  const year = String(eventYear);

  if (orden) {
    const has = Boolean(orden.earnedAt);
    return (
      <div className="page-card orden-one">
        <MedalCanvas orden={orden} size={220} locked={!has} />
        <h1 className="orden-name">{orden.name}</h1>
        {has ? (
          <>
            <p>{t.earnedOn.replace("{date}", orden.earnedDay)}</p>
            <ShareButton
              label={t.share}
              filename={`dcv-orden-${orden.id}.jpg`}
              text={`${t.shareText.replace("{year}", year)} ${site.url}/orden`}
              build={() => ordenStory(orden, cardTexts(orden))}
            />
          </>
        ) : (
          <p>{orden.starter ? t.howStarter : t.how.replace("{date}", orden.day)}</p>
        )}
        <p className="orden-back">
          <Link to="/orden">{t.back}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="orden-case">
      <h1 className="page-heading">{t.heading}</h1>
      <Swoosh small />
      <p className="orden-intro">{t.intro.replace("{total}", total)}</p>
      <p className="orden-progress">
        {count === total
          ? t.complete.replace("{total}", total)
          : t.count.replace("{n}", count).replace("{total}", total)}
      </p>
      {!isOn("orden") && <p className="orden-off">{t.notYet}</p>}
      <ul className="orden-grid">
        {list.map((o) => (
          <li key={o.id}>
            <Link to={`/orden/${o.id}`} className={`orden-slot ${o.earnedAt ? "" : "orden-locked"}`}>
              <MedalCanvas orden={o} size={132} locked={!o.earnedAt} />
              <span className="orden-slot-name">{o.name}</span>
              <span className="orden-slot-when">
                {o.earnedAt ? t.collected : o.starter ? t.starter : o.day}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="orden-note">{t.note}</p>
    </div>
  );
}

export default OrdenComponent;
