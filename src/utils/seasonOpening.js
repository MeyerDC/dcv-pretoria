// The Karneval season opens on 11.11. at 11:11. From that minute until
// midnight, South African time, the home page becomes the season-opening
// page. South Africa is UTC+2 all year, so the window is worked out from UTC
// and is the same moment for every visitor, wherever their own clock is.
const SA_OFFSET_MS = 2 * 60 * 60 * 1000;

export const isSeasonOpening = (now = new Date()) => {
  const sa = new Date(now.getTime() + SA_OFFSET_MS);
  return (
    sa.getUTCMonth() === 10 &&
    sa.getUTCDate() === 11 &&
    sa.getUTCHours() * 60 + sa.getUTCMinutes() >= 11 * 60 + 11
  );
};

// Opening the site with #helau shows the season-opening page at any time.
export const isSeasonOpeningPreview = () => window.location.hash === "#helau";
