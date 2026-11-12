// Writes QR codes for print (posters, flyers, table cards) into public/print/,
// so they can also be downloaded from the /preview page:
//
//   qr.svg / qr.png   the bare code, in the site's black on cream
//   qr-card.png       the code with the jester and the web address
//
//   npm run qr
//
// qr-card.png needs a Chromium, as for "npm run og-images".
const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const root = path.join(__dirname, "..");
const site = JSON.parse(fs.readFileSync(path.join(root, "src/data/site.json"), "utf8"));
const out = path.join(root, "public", "print");
const options = { errorCorrectionLevel: "M", margin: 2, color: { dark: "#17130f", light: "#fbf2e8" } };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const svg = await QRCode.toString(site.url, { ...options, type: "svg" });
  fs.writeFileSync(path.join(out, "qr.svg"), svg);
  await QRCode.toFile(path.join(out, "qr.png"), site.url, { ...options, width: 1200 });

  const { chromium } = require("playwright-core");
  const logo = fs.readFileSync(path.join(root, "src/assets/images/dcv-logo-2027.png")).toString("base64");
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}
  );
  try {
    const page = await browser.newPage({ deviceScaleFactor: 3 });
    await page.setContent(`<!doctype html><html><head>
      <link href="https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Playfair+Display:wght@900&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; }
        #card { width: 420px; padding: 26px 26px 22px; background: #fbf2e8; border: 4px solid #17130f;
                border-radius: 22px; text-align: center; font-family: "Playfair Display", serif; color: #17130f;
                font-variant-numeric: lining-nums; box-sizing: border-box; }
        #card img { width: 150px; display: block; margin: 0 auto 6px; }
        #card svg { width: 300px; height: 300px; display: block; margin: 0 auto; }
        .helau { font-family: "Kaushan Script", cursive; font-size: 34px; color: #d2161e; margin: 0 0 8px; }
        .host { font-weight: 900; font-size: 27px; margin: 10px 0 0; }
      </style></head><body>
      <div id="card"><img src="data:image/png;base64,${logo}"><p class="helau">DCV Helau!</p>${svg}<p class="host">${site.host}</p></div>
    </body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#card").screenshot({ path: path.join(out, "qr-card.png"), omitBackground: true });
  } finally {
    await browser.close();
  }
  console.log(`QR codes for ${site.url} written to public/print/`);
})();
