// Calls the create_code tool on the NeoReader MCP server with an API token, the same call an AI assistant makes.
// Needs Node.js 18 or newer. Run: NEOREADER_TOKEN=... node mcp-create-code.mjs
const url = process.env.NEOREADER_MCP_URL ?? "https://neoreader.com/mcp";
if (!process.env.NEOREADER_TOKEN) throw new Error("Set NEOREADER_TOKEN to your API token");

const response = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.NEOREADER_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "create_code",
      arguments: { title: "Spring menu", destination: "https://example.com/menu" },
    },
  }),
});
const { result } = await response.json();
console.log(JSON.stringify(result.structuredContent, null, 2));
