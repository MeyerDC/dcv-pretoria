// Run after "react-scripts build" (see "predeploy" in package.json).
//
// The site is a single page, but programs that build link previews (WhatsApp,
// Facebook, ...) do not run JavaScript: they only read the HTML file at the
// address they are given. So every address worth sharing gets its own copy of
// index.html with its own title, description and picture.
//
// The home page only gets its tags once "linkPreview" is live in
// src/data/features.json, because they change how the public link looks.
// The other pages are not linked from anywhere until their feature is live.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const features = read("src/data/features.json");
const site = read("src/data/site.json");
const orden = read("src/data/orden.json");
// German is the site's default language, so previews are in German.
const t = read("src/components/language-context/translations.json").de;

// The year is read from startsAt in src/data/event.js, which cannot be loaded
// here because it imports pictures.
const eventFile = fs.readFileSync(path.join(root, "src/data/event.js"), "utf8");
const year = eventFile.match(/startsAt:\s*"(\d{4})/)[1];
const fill = (text) => text.replace("{year}", year).replace("{total}", orden.length);

const build = path.join(root, "build");
const template = fs.readFileSync(path.join(build, "index.html"), "utf8");
const escape = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const page = ({ title, description, image, address }) => {
  const tags = [
    `<meta name="description" content="${escape(description)}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="DCV Pretoria"/>`,
    `<meta property="og:locale" content="de_DE"/>`,
    `<meta property="og:locale:alternate" content="en_ZA"/>`,
    `<meta property="og:title" content="${escape(title)}"/>`,
    `<meta property="og:description" content="${escape(description)}"/>`,
    `<meta property="og:url" content="${site.url}${address}"/>`,
    `<meta property="og:image" content="${site.url}/share/${image}"/>`,
    `<meta property="og:image:secure_url" content="${site.url}/share/${image}"/>`,
    `<meta property="og:image:type" content="image/jpeg"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="${escape(title)}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
  ].join("");
  return template
    .replace(/<meta name="description"[^>]*>/, "")
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace("</head>", `${tags}</head>`);
};

const write = (address, html) => {
  const dir = path.join(build, address);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
};

const eventLine = `${t.event.date} ${t.event.month} · ${t.event.venue}. ${t.event.motto.join(" ")}!`;
const pages = [
  {
    address: "/orden",
    title: fill(t.linkPreview.ordenTitle),
    description: fill(t.orden.intro),
    image: "orden.jpg",
  },
  ...orden.map((o) => ({
    address: `/orden/${o.id}`,
    title: `${fill(t.orden.names[o.id])} – ${fill(t.linkPreview.ordenTitle)}`,
    description: fill(t.orden.intro),
    image: `orden-${o.id}.jpg`,
  })),
  {
    address: "/narrenname",
    title: fill(t.linkPreview.nameTitle),
    description: t.narrenname.intro,
    image: "narrenname.jpg",
  },
];

const missing = pages.filter((p) => !fs.existsSync(path.join(build, "share", p.image)));
if (missing.length > 0) {
  throw new Error(
    `Missing pictures in public/share: ${missing.map((p) => p.image).join(", ")}. Run "npm run og-images".`
  );
}
pages.forEach((p) => write(p.address, page(p)));

// Pages without a preview of their own still get a file, so they load
// directly instead of through the not-found page.
const plain = ["/events", "/about", "/support", "/preview"];
plain.forEach((address) => write(address, template));

if (features.linkPreview.live) {
  write("/", page({ address: "/", title: fill(t.linkPreview.title), description: eventLine, image: "karneval.jpg" }));
}

// Any other address falls back to the plain page, which then shows the right
// screen or "not found".
fs.writeFileSync(path.join(build, "404.html"), template);

console.log(
  `share-pages: ${pages.length + plain.length} pages written; home page link preview is ${
    features.linkPreview.live ? "ON" : "off"
  }.`
);
