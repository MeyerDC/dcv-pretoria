import { useEffect, useState } from "react";
import event from "../../data/event";
import site from "../../data/site.json";
import { eventYear } from "../../data/milestones";
import { ORDEN, ORDEN_CHANGED, readOrden } from "../../utils/orden";
import { fillIn } from "../milestoneComponent/milestoneComponent";
import { useLanguage } from "../language-context/language-contextComponent";

const SA = "Africa/Johannesburg";

// The Orden with their wording in the current language, their dates and
// whether this visitor has them.
export const useOrden = () => {
  const { language, translations } = useLanguage();
  const [earned, setEarned] = useState(readOrden);
  useEffect(() => {
    const changed = () => setEarned(readOrden());
    window.addEventListener(ORDEN_CHANGED, changed);
    window.addEventListener("dcv-features", changed);
    return () => {
      window.removeEventListener(ORDEN_CHANGED, changed);
      window.removeEventListener("dcv-features", changed);
    };
  }, []);

  const e = translations[language].event;
  const t = translations[language].orden;
  const words = translations[language].milestones;
  const short = new Intl.DateTimeFormat(language, { timeZone: SA, day: "numeric", month: "short" });
  const long = new Intl.DateTimeFormat(language, {
    timeZone: SA,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const list = ORDEN.map((o) => {
    const start = o.milestone.window(Date.now())[0];
    return {
      id: o.id,
      ribbon: o.ribbon,
      shape: o.shape,
      name: fillIn(t.names[o.id], e),
      mark: o.mark === "date" ? short.format(start) : fillIn(o.mark || words[o.id].badge, e),
      footer: `DCV · ${eventYear}`,
      // The season opening is the starter medal: it has no day to wait for.
      starter: o.id === "season-opening",
      day: long.format(start),
      earnedAt: earned[o.id] || null,
      earnedDay: earned[o.id] ? long.format(earned[o.id]) : null,
    };
  });

  const count = list.filter((o) => o.earnedAt).length;
  // Wording for the pictures.
  const cardTexts = (orden) => ({
    got: t.got,
    count: t.count.replace("{n}", count).replace("{total}", list.length),
    date: `${e.date} ${e.month}`,
    host: `${site.host}/orden`,
    name: orden.name,
  });

  return { list, count, total: list.length, cardTexts, t, eventTexts: e, event };
};
