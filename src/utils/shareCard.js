// Draws every shareable picture (Orden, name card, countdown, link previews)
// on a canvas, in the look of the site. Wording is passed in by the caller,
// so nothing here depends on the language.
import logoSrc from "../assets/images/dcv-logo-2027.png";

export const COLOURS = {
  cream: "#fbf2e8",
  paper: "#fffaf0",
  ink: "#17130f",
  red: "#d2161e",
  gold: "#f2b01e",
  muted: "#5b5247",
  violet: "#6b3fa0",
  ash: "#8d8780",
};
// A medal that has not been collected yet is drawn in these.
const LOCKED = {
  cream: "#efe9df",
  paper: "#efe9df",
  ink: "#b9b1a4",
  red: "#cfc8bc",
  gold: "#ddd6c9",
  muted: "#b9b1a4",
  violet: "#cfc8bc",
  ash: "#cfc8bc",
};

const FAMILY = {
  // Playfair Display with lining numerals; see src/assets/fonts/README.md.
  display: '"DCV Display", "Playfair Display", Georgia, serif',
  script: '"Kaushan Script", cursive',
  body: '"Lora", Georgia, serif',
};
const font = (weight, size, family) => `${weight} ${size}px ${FAMILY[family]}`;

export const STORY = { width: 1080, height: 1920 };
export const LINK = { width: 1200, height: 630 };

// Fonts and logo must be loaded before anything is drawn.
let assets;
export const assetsReady = () => {
  if (!assets) {
    const sample = "Aä–„";
    const wanted = [
      font(900, 40, "display"),
      font(700, 40, "display"),
      font(400, 40, "script"),
      font(400, 40, "body"),
      font(600, 40, "body"),
    ];
    const fonts = document.fonts
      ? Promise.all(wanted.map((f) => document.fonts.load(f, sample).catch(() => null)))
      : Promise.resolve();
    const logo = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = logoSrc;
    });
    assets = Promise.all([fonts, logo]).then(([, img]) => ({ logo: img }));
  }
  return assets;
};

/* ---------- small drawing helpers ---------- */

const write = (ctx, str, x, y, { weight = 400, family = "body", size, colour = COLOURS.ink, align = "center", baseline = "alphabetic" }) => {
  ctx.font = font(weight, size, family);
  ctx.fillStyle = colour;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(str, x, y);
};

// Largest size, up to max, at which the text fits the width.
const fitSize = (ctx, str, weight, family, max, width, min = 18) => {
  let size = max;
  for (; size > min; size -= 2) {
    ctx.font = font(weight, size, family);
    if (ctx.measureText(str).width <= width) break;
  }
  return size;
};

const wrapLines = (ctx, str, width) => {
  const lines = [];
  let line = "";
  str.split(" ").forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

// Seeded, so a card looks the same every time it is drawn.
const random = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const confetti = (ctx, w, h, seed, count = 90, edgesOnly = false) => {
  const rand = random(seed);
  const colours = [COLOURS.ink, COLOURS.red, COLOURS.gold];
  const unit = Math.min(w, h) / 1080;
  for (let i = 0; i < count; i += 1) {
    const edge = rand() < 0.75 || edgesOnly;
    const side = rand() < 0.5;
    const band = (edgesOnly ? 0.09 : 0.16) * w;
    const x = edge ? (side ? rand() * band : w - rand() * band) : rand() * w;
    const y = rand() * h;
    const size = (10 + rand() * 18) * unit;
    ctx.save();
    ctx.globalAlpha = edge ? 0.9 : 0.22;
    ctx.fillStyle = colours[Math.floor(rand() * 3)];
    ctx.translate(x, y);
    ctx.rotate(rand() * Math.PI);
    if (rand() < 0.3) {
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-size / 2, -size * 0.3, size, size * 0.6);
    }
    ctx.restore();
  }
};

const stripe = (ctx, w, h, band) => {
  [COLOURS.gold, COLOURS.red, COLOURS.ink].forEach((colour, i) => {
    ctx.fillStyle = colour;
    ctx.fillRect(0, h - band * (i + 1), w, band);
  });
};

const drawLogo = (ctx, logo, cx, top, width) => {
  if (!logo) return 0;
  const height = (width * logo.height) / logo.width;
  ctx.drawImage(logo, cx - width / 2, top, width, height);
  return height;
};

// The black, gold-edged badge with a red shadow, as on the milestone pages.
const badge = (ctx, cx, cy, w, h, angle, inside) => {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  const r = h * 0.14;
  ctx.fillStyle = COLOURS.red;
  roundRect(ctx, -w / 2 + h * 0.06, -h / 2 + h * 0.06, w, h, r);
  ctx.fill();
  ctx.fillStyle = COLOURS.ink;
  roundRect(ctx, -w / 2, -h / 2, w, h, r);
  ctx.fill();
  ctx.strokeStyle = COLOURS.gold;
  ctx.lineWidth = Math.max(3, h * 0.022);
  ctx.stroke();
  inside(ctx);
  ctx.restore();
};

// The motto in script, last word of the last line in red.
const drawMotto = (ctx, lines, cx, y, size, gap) => {
  lines.forEach((line, i) => {
    const lineY = y + i * gap;
    if (i < lines.length - 1) {
      write(ctx, line, cx, lineY, { family: "script", size });
      return;
    }
    const cut = line.lastIndexOf(" ") + 1;
    ctx.font = font(400, size, "script");
    const full = ctx.measureText(line).width;
    const head = ctx.measureText(line.slice(0, cut)).width;
    write(ctx, line.slice(0, cut), cx - full / 2, lineY, { family: "script", size, align: "left" });
    write(ctx, line.slice(cut), cx - full / 2 + head, lineY, { family: "script", size, align: "left", colour: COLOURS.red });
  });
};

const arcText = (ctx, str, cx, cy, radius, { size, colour, bottom = false, spacing = 0.12 }) => {
  ctx.font = font(700, size, "display");
  ctx.fillStyle = colour;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const chars = Array.from(str);
  const widths = chars.map((ch) => ctx.measureText(ch).width + size * spacing);
  const total = widths.reduce((a, b) => a + b, 0);
  let along = 0;
  chars.forEach((ch, i) => {
    const mid = (along + widths[i] / 2 - total / 2) / radius;
    const angle = bottom ? Math.PI / 2 - mid : -Math.PI / 2 + mid;
    ctx.save();
    ctx.translate(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.rotate(bottom ? angle - Math.PI / 2 : angle + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
    along += widths[i];
  });
};

/* ---------- the medal ---------- */

const outline = (ctx, cx, cy, r, shape) => {
  const point = (angle, radius) => [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  ctx.beginPath();
  if (shape === "scallop") {
    for (let i = 0; i <= 264; i += 1) {
      const a = (i / 264) * Math.PI * 2;
      const [x, y] = point(a, r * (0.955 + 0.045 * Math.cos(22 * a)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  } else {
    const [points, inner, turn] =
      shape === "star" ? [11, 0.84, -Math.PI / 2] : shape === "sun" ? [22, 0.9, -Math.PI / 2] : [8, 0.924, Math.PI / 8];
    for (let i = 0; i < points * 2; i += 1) {
      const a = turn + (i / (points * 2)) * Math.PI * 2;
      const [x, y] = point(a, i % 2 === 0 ? r : r * inner);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
};

// medal: { ribbon: [colour, colour, colour], shape, mark, name, footer, locked }
// r is the radius of the medal; the ribbon reaches 2.25 r above the centre.
export const drawMedal = (ctx, cx, cy, r, medal) => {
  const c = (name) => (medal.locked ? LOCKED[name] : COLOURS[name]);
  const line = Math.max(1.5, r * 0.03);
  ctx.lineJoin = "round";

  const ribbonWidth = r * 1.05;
  const top = cy - r * 2.1;
  const bottom = cy - r * 0.2;
  medal.ribbon.forEach((colour, i) => {
    ctx.fillStyle = c(colour);
    ctx.fillRect(cx - ribbonWidth / 2 + (i * ribbonWidth) / 3, top, ribbonWidth / 3 + 0.5, bottom - top);
  });
  ctx.strokeStyle = c("ink");
  ctx.lineWidth = line;
  ctx.strokeRect(cx - ribbonWidth / 2, top, ribbonWidth, bottom - top);
  ctx.fillStyle = c("gold");
  roundRect(ctx, cx - ribbonWidth * 0.62, top - r * 0.13, ribbonWidth * 1.24, r * 0.2, r * 0.06);
  ctx.fill();
  ctx.stroke();

  outline(ctx, cx, cy, r, medal.shape);
  ctx.fillStyle = c("gold");
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
  ctx.fillStyle = c("ink");
  ctx.fill();
  ctx.strokeStyle = c("red");
  ctx.lineWidth = r * 0.045;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.725, 0, Math.PI * 2);
  ctx.strokeStyle = c("gold");
  ctx.lineWidth = Math.max(1, r * 0.012);
  ctx.stroke();

  const text = medal.locked ? LOCKED.cream : COLOURS.gold;
  if (medal.name) {
    const name = medal.name.toUpperCase();
    // Long names are set smaller so they stay on the upper half.
    const size = r * Math.min(0.13, 2.1 / name.length);
    arcText(ctx, name, cx, cy, r * 0.55, { size, colour: text });
  }
  if (medal.footer) {
    arcText(ctx, medal.footer.toUpperCase(), cx, cy, r * 0.66, { size: r * 0.085, colour: text, bottom: true });
  }
  const markSize = fitSize(ctx, medal.mark, 900, "display", r * 0.5, r * 0.92, 8);
  write(ctx, medal.mark, cx, cy + r * 0.04, { weight: 900, family: "display", size: markSize, colour: text, baseline: "middle" });
};

/* ---------- cards ---------- */

const start = ({ width, height }, seed, count, edgesOnly) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = COLOURS.cream;
  ctx.fillRect(0, 0, width, height);
  confetti(ctx, width, height, seed, count, edgesOnly);
  return { canvas, ctx };
};

// Stories keep clear of the top and bottom 250 px, where the apps put their
// own buttons.
const storyFrame = (seed, logo, footer) => {
  const { canvas, ctx } = start(STORY, seed);
  const cx = STORY.width / 2;
  drawLogo(ctx, logo, cx, 230, 320);
  write(ctx, footer.date, cx, 1590, { weight: 900, family: "display", size: 58 });
  write(ctx, footer.host, cx, 1662, { weight: 700, family: "display", size: 46, colour: COLOURS.red });
  stripe(ctx, STORY.width, STORY.height, 18);
  return { canvas, ctx, cx };
};

// texts: { got, name, count, date, host }
export const ordenStory = async (medal, texts) => {
  const { logo } = await assetsReady();
  const { canvas, ctx, cx } = storyFrame(11, logo, texts);
  drawMedal(ctx, cx, 1090, 225, medal);
  write(ctx, texts.got, cx, 1425, { family: "script", size: 92, colour: COLOURS.red });
  const size = fitSize(ctx, texts.count, 700, "display", 44, 900);
  write(ctx, texts.count, cx, 1500, { weight: 700, family: "display", size, colour: COLOURS.muted });
  return canvas;
};

// texts: { kicker, title, epithet, motto: [..], date, host }
export const nameStory = async (texts) => {
  const { logo } = await assetsReady();
  const { canvas, ctx, cx } = storyFrame(27, logo, texts);
  write(ctx, texts.kicker.toUpperCase(), cx, 590, { weight: 700, family: "display", size: fitSize(ctx, texts.kicker.toUpperCase(), 700, "display", 40, 900), colour: COLOURS.muted });
  badge(ctx, cx, 790, 920, 260, -0.05, (c) => {
    const gold = { weight: 900, family: "display", colour: COLOURS.gold, baseline: "middle" };
    const size = fitSize(c, texts.title, 900, "display", 124, 820);
    if (size >= 72) {
      write(c, texts.title, 0, 6, { ...gold, size });
      return;
    }
    // A long name: the title word goes on a line of its own.
    const cut = texts.title.indexOf(" ");
    const lines = [texts.title.slice(0, cut), texts.title.slice(cut + 1)];
    const two = Math.min(...lines.map((line) => fitSize(c, line, 900, "display", 96, 820)));
    lines.forEach((line, i) => write(c, line, 0, (i - 0.5) * two * 1.1 + 6, { ...gold, size: two }));
  });
  const epithetSize = fitSize(ctx, texts.epithet, 400, "script", 104, 1500);
  ctx.font = font(400, epithetSize, "script");
  wrapLines(ctx, texts.epithet, 900).forEach((line, i) => {
    write(ctx, line, cx, 1060 + i * epithetSize * 1.15, { family: "script", size: epithetSize, colour: COLOURS.red });
  });
  drawMotto(ctx, texts.motto, cx, 1380, 56, 72);
  return canvas;
};

// texts: { kicker, lead, number, line, motto: [..], date, host }
export const countdownStory = async (texts) => {
  const { logo } = await assetsReady();
  const { canvas, ctx, cx } = storyFrame(100, logo, texts);
  write(ctx, texts.kicker.toUpperCase(), cx, 600, { weight: 900, family: "display", size: 70 });
  if (texts.lead) write(ctx, texts.lead.toUpperCase(), cx, 690, { weight: 700, family: "display", size: 46, colour: COLOURS.muted });
  badge(ctx, cx, 920, 640, 380, -0.05, (c) => {
    const size = fitSize(c, texts.number, 900, "display", 300, 540);
    write(c, texts.number, 0, 12, { weight: 900, family: "display", size, colour: COLOURS.gold, baseline: "middle" });
  });
  const size = fitSize(ctx, texts.line, 400, "script", 96, 940);
  write(ctx, texts.line, cx, 1250, { family: "script", size, colour: COLOURS.red });
  drawMotto(ctx, texts.motto, cx, 1390, 56, 72);
  return canvas;
};

/* Link-preview pictures, 1200 x 630 */

const linkFrame = (seed) => {
  const { canvas, ctx } = start(LINK, seed, 50, true);
  stripe(ctx, LINK.width, LINK.height, 10);
  return { canvas, ctx };
};

// texts: { presents, title, motto: [..], date }
export const homeLink = async (texts) => {
  const { logo } = await assetsReady();
  const { canvas, ctx } = linkFrame(5);
  drawLogo(ctx, logo, 250, 185, 300);
  const cx = 800;
  write(ctx, texts.presents.toUpperCase(), cx, 150, { weight: 700, family: "display", size: 28, colour: COLOURS.muted });
  write(ctx, texts.title.toUpperCase(), cx, 250, { weight: 900, family: "display", size: fitSize(ctx, texts.title.toUpperCase(), 900, "display", 92, 600) });
  drawMotto(ctx, texts.motto, cx, 345, 52, 66);
  write(ctx, texts.date, cx, 520, { weight: 900, family: "display", size: 44 });
  return canvas;
};

// texts: { kicker, title, line, host }
export const ordenLink = async (medal, texts) => {
  await assetsReady();
  const { canvas, ctx } = linkFrame(17);
  drawMedal(ctx, 300, 400, 160, medal);
  const cx = 780;
  write(ctx, texts.kicker.toUpperCase(), cx, 190, { weight: 700, family: "display", size: 30, colour: COLOURS.muted });
  write(ctx, texts.title, cx, 285, { weight: 900, family: "display", size: fitSize(ctx, texts.title, 900, "display", 80, 560) });
  write(ctx, texts.line, cx, 370, { family: "script", size: fitSize(ctx, texts.line, 400, "script", 54, 560), colour: COLOURS.red });
  write(ctx, texts.host, cx, 480, { weight: 700, family: "display", size: 38 });
  return canvas;
};

// texts: { kicker, sample, line, host }
export const nameLink = async (texts) => {
  const { logo } = await assetsReady();
  const { canvas, ctx } = linkFrame(31);
  drawLogo(ctx, logo, 260, 190, 280);
  const cx = 790;
  write(ctx, texts.kicker.toUpperCase(), cx, 170, { weight: 700, family: "display", size: 30, colour: COLOURS.muted });
  badge(ctx, cx, 290, 620, 150, -0.04, (c) => {
    write(c, texts.sample, 0, 4, { weight: 900, family: "display", size: fitSize(c, texts.sample, 900, "display", 76, 560), colour: COLOURS.gold, baseline: "middle" });
  });
  write(ctx, texts.line, cx, 445, { family: "script", size: fitSize(ctx, texts.line, 400, "script", 58, 680), colour: COLOURS.red });
  write(ctx, texts.host, cx, 525, { weight: 700, family: "display", size: 36 });
  return canvas;
};

export const toBlob = (canvas, type = "image/jpeg", quality = 0.9) =>
  new Promise((resolve) => canvas.toBlob(resolve, type, quality));
