import site from "../../data/site.json";
import list from "../../data/orden.json";
import { eventYear } from "../../data/milestones";
import { homeLink, nameLink, ordenLink } from "../../utils/shareCard";

// The link-preview pictures (what WhatsApp shows for a pasted link), keyed by
// the file name they get in public/share/. scripts/make-og-images.js saves
// them; the preview page shows the first one.
// e, lp: the "event" and "linkPreview" wording; ordenList: from useOrden().
export const linkCards = (e, lp, ordenList) => {
  const fill = (text) => text.replace("{year}", eventYear).replace("{total}", ordenList.length);
  const cards = {
    karneval: () =>
      homeLink({
        presents: e.presents,
        title: `${e.title} ${eventYear}`,
        motto: e.motto,
        date: `${e.date} ${e.month}`,
      }),
    narrenname: () =>
      nameLink({
        kicker: fill(lp.ordenKicker),
        sample: lp.nameSample,
        line: lp.nameLine,
        host: `${site.host}/narrenname`,
      }),
  };
  const ordenCard = (orden, title) => () =>
    ordenLink(orden, {
      kicker: fill(lp.ordenKicker),
      title,
      line: fill(lp.ordenLine),
      host: `${site.host}/orden`,
    });
  if (ordenList.length > 0) cards.orden = ordenCard(ordenList[0], fill(lp.ordenIndexTitle));
  ordenList.forEach((orden) => {
    if (list.some((o) => o.id === orden.id)) cards[`orden-${orden.id}`] = ordenCard(orden, orden.name);
  });
  return cards;
};
