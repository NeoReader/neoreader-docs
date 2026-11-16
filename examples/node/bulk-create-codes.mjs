// Makes one dynamic QR code for each row of a CSV file (title,destination,folder) and prints the short URLs.
// Needs Node.js 18 or newer. Run: NEOREADER_TOKEN=... node bulk-create-codes.mjs ../bulk/codes.csv
import { readFileSync } from "node:fs";

const base = process.env.NEOREADER_API_URL ?? "https://neoreader.com/api/v1";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");

const rows = readFileSync(process.argv[2] ?? "../bulk/codes.csv", "utf8")
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => line.split(","))
  .map(([title, destination, folder]) => ({ title, destination, ...(folder ? { folder } : {}) }));

for (const row of rows) {
  const response = await fetch(`${base}/codes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });
  const data = await response.json();
  console.log(response.status === 201 ? data.data.short_url : `${row.title}: ${data.message}`);
  if (response.status === 429) {
    // Over the rate limit: wait as long as the server says, then carry on with the next row.
    await new Promise((resolve) => setTimeout(resolve, Number(response.headers.get("Retry-After") ?? 60) * 1000));
  } else {
    await new Promise((resolve) => setTimeout(resolve, 600)); // stays under 120 requests a minute
  }
}
