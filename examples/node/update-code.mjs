// Needs Node.js 18 or newer. Run: NEOREADER_TOKEN=... node update-code.mjs
const base = process.env.NEOREADER_API_URL ?? "https://neoreader.com/api/v1";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");
if (!process.env.NEOREADER_SLUG) throw new Error("Set NEOREADER_SLUG to the slug of one of your codes");

const response = await fetch(`${base}/codes/${process.env.NEOREADER_SLUG}`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "destination": "https://example.com/summer-menu",
    "expires_at": "2026-12-31T23:59:00Z"
  }),
});
console.log(response.status, JSON.stringify(await response.json(), null, 2));
