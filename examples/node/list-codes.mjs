// Needs Node.js 18 or newer. Run: NEOREADER_TOKEN=... node list-codes.mjs
const base = process.env.NEOREADER_API_URL ?? "https://neoreader.com/api/v1";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");

const response = await fetch(`${base}/codes?status=active&per_page=10`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
    Accept: "application/json",
  },
});
console.log(response.status, JSON.stringify(await response.json(), null, 2));
