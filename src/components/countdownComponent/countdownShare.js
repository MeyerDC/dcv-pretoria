import React from "react";
import event from "../../data/event";
import site from "../../data/site.json";
import { eventYear } from "../../data/milestones";
import { countdownStory } from "../../utils/shareCard";
import { useFeatures } from "../../utils/features";
import ShareButton from "../shareButton/shareButton";
import { useLanguage } from "../language-context/language-contextComponent";

// "Share the countdown": today's "N days to go" as a picture for a story or
// status. Gone once less than a day is left.
const CountdownShare = () => {
  const { isOn } = useFeatures();
  const { language, translations } = useLanguage();
  if (!isOn("countdownShare")) return null;

  const days = () => Math.floor((new Date(event.startsAt).getTime() - Date.now()) / 86400000);
  if (days() < 1) return null;

  const t = translations[language].joinIn;
  const e = translations[language].event;
  const build = () => {
    const n = days();
    return countdownStory({
      kicker: `${e.title} ${eventYear}`,
      lead: t.countdownLead,
      number: String(n),
      line: n === 1 ? t.countdownLineOne : t.countdownLine,
      motto: e.motto,
      date: `${e.date} ${e.month}`,
      host: site.host,
    });
  };

  return (
    <div className="countdown-share">
      <ShareButton
        outline
        label={t.countdownShare}
        filename="dcv-countdown.jpg"
        text={`${t.countdownText.replace("{n}", days()).replace("{year}", eventYear)} ${site.url}`}
        build={build}
      />
    </div>
  );
};

export default CountdownShare;
