#!/usr/bin/env sh
# Lists the tools of the NeoReader MCP server, using an API token instead of the OAuth sign-in.
: "${NEOREADER_TOKEN:?Set NEOREADER_TOKEN to your API token}"
: "${NEOREADER_MCP_URL:=https://neoreader.com/mcp}"
curl -sS -X POST "$NEOREADER_MCP_URL" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
