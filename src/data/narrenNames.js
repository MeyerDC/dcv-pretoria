// Building blocks for the Karneval name card. The result reads
// "<title> <first name> I." on one line and an epithet below it.
// The epithets are all "von ..." forms so they fit any title. 22 = 2 x 11.
export const styles = [
  { id: "prinz", title: "Prinz" },
  { id: "prinzessin", title: "Prinzessin" },
  { id: "jeck", title: "Jeck" },
];

export const epithets = [
  "von Konfettien",
  "vom Schunkelberg",
  "von der Kamellenküste",
  "vom Jacaranda-Thron",
  "von der Polonaise",
  "vom Närrischen Highveld",
  "von und zu Pappnase",
  "vom Goldenen Narrenkäppchen",
  "von der Bütt",
  "vom Elferrat-Stammtisch",
  "von Helau zu Pretoria",
  "von der Braai-Garde",
  "von der Luftschlange",
  "vom Krapfenberg",
  "von der Narrenkappe",
  "von Schunkelstein",
  "vom Tusch und Trara",
  "von der Fünften Jahreszeit",
  "vom Närrischen Magaliesberg",
  "von der Ordensschatulle",
  "vom Kehraus-Besen",
  "von Elf-Uhr-Elf",
];

export const MAX_NAME_LENGTH = 20;

// The same name always gives the same epithet; "again" steps to the next.
export const narrenName = (name, styleId, again = 0) => {
  const clean = name.trim().replace(/\s+/g, " ").slice(0, MAX_NAME_LENGTH);
  if (!clean) return null;
  let hash = 0;
  for (const ch of clean.toLowerCase()) hash = (hash * 31 + ch.codePointAt(0)) >>> 0;
  const style = styles.find((s) => s.id === styleId) || styles[0];
  return {
    title: `${style.title} ${clean} I.`,
    epithet: epithets[(hash + again) % epithets.length],
  };
};
