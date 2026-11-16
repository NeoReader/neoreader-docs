// Needs Node.js 18 or newer. Run: NEOREADER_TOKEN=... node create-code.mjs
const base = process.env.NEOREADER_API_URL ?? "https://neoreader.com/api/v1";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");

const response = await fetch(`${base}/codes`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "title": "Spring menu",
    "destination": "https://example.com/menu",
    "folder": "Restaurant",
    "utm": {
      "utm_source": "qr",
      "utm_medium": "print"
    }
  }),
});
console.log(response.status, JSON.stringify(await response.json(), null, 2));
