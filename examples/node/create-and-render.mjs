// Makes a dynamic code with the API, then draws its QR image on your own machine from the short URL.
// The image holds the short URL, so changing the destination later never means reprinting.
// Needs Node.js 18 or newer and the qrcode package: npm install qrcode
// Run: NEOREADER_TOKEN=... node create-and-render.mjs
import QRCode from "qrcode";

const base = process.env.NEOREADER_API_URL ?? "https://neoreader.com/api/v1";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");

const response = await fetch(`${base}/codes`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title: "Spring menu", destination: "https://example.com/menu" }),
});
const { data } = await response.json();

await QRCode.toFile(`${data.slug}.png`, data.short_url, { width: 1024, margin: 2, errorCorrectionLevel: "M" });
await QRCode.toFile(`${data.slug}.svg`, data.short_url, { type: "svg", margin: 2, errorCorrectionLevel: "M" });
console.log(`${data.short_url} -> ${data.slug}.png and ${data.slug}.svg`);
