// Saves the link-preview pictures into public/share/. They are drawn by the
// site itself (src/utils/shareCard.js), so this opens the built site in a
// browser and asks it for them. Run it when the wording, the Orden or the
// look changes:
//
//   npm run build && npm run og-images
//
// Needs the "playwright-core" package and a Chromium; point CHROME_PATH at
// the browser if it is not found.
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright-core");

const root = path.join(__dirname, "..");
const build = path.join(root, "build");
const out = path.join(root, "public", "share");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".json": "application/json" };

const server = http.createServer((req, res) => {
  const wanted = path.join(build, decodeURIComponent(req.url.split("?")[0]));
  const file = wanted.startsWith(build) && fs.existsSync(wanted) && fs.statSync(wanted).isFile()
    ? wanted
    : path.join(build, "index.html");
  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
  );
  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/preview`);
    await page.waitForFunction(() => typeof window.dcvLinkCards === "function");
    const cards = await page.evaluate(() => window.dcvLinkCards());
    fs.mkdirSync(out, { recursive: true });
    Object.entries(cards).forEach(([name, dataUrl]) => {
      const file = path.join(out, `${name}.jpg`);
      fs.writeFileSync(file, Buffer.from(dataUrl.split(",")[1], "base64"));
      console.log(`${name}.jpg  ${Math.round(fs.statSync(file).size / 1024)} kB`);
    });
  } finally {
    await browser.close();
    server.close();
  }
})();
