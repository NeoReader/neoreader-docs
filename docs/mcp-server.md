# QR Code MCP Server

NeoReader runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server, so an AI assistant can create and manage dynamic QR codes for you. Also on neoreader.com: [MCP server for AI assistants](https://neoreader.com/developers).

| Setting | Value |
| --- | --- |
| Name | NeoReader QR |
| Address | `https://neoreader.com/mcp` |
| Transport | Streamable HTTP |
| Sign-in | OAuth 2.1 with PKCE and dynamic client registration, or an API token in an `Authorization: Bearer` header |
| Registry entry | [`mcp/server.json`](../mcp/server.json) |

## Guides

| Assistant | Guide |
| --- | --- |
| Claude | [Connect NeoReader to Claude](connector/claude.md) |
| ChatGPT | [Connect NeoReader to ChatGPT](connector/chatgpt.md) |
| Cursor | [Add NeoReader to Cursor](connector/cursor.md) |
| VS Code and GitHub Copilot | [Use NeoReader in VS Code and GitHub Copilot](connector/vscode.md) |
| Claude Code | [Add NeoReader to Claude Code](connector/claude-code.md) |

## Tools

| Tool | Changes data | What it does |
| --- | --- | --- |
| `list_codes` | No | Lists your codes, newest first. Filter by search word, folder, status or type. Start here: the slug in each result is what the other tools need. |
| `create_code` | Yes | Makes a dynamic code from a title and a destination, or a hosted page (business card, link list, menu, PDF link, location, app or video) from a `type` and its `content`. Optional folder, start and expiry dates and scan limit. Returns the slug, the short URL and a `design_url` where you style the code and download the image. |
| `update_code` | Yes | Changes the destination, type, page content, title, folder, expiry or on/off state. Send only the fields to change. |
| `get_code_stats` | No | Scan totals and breakdowns for the last N days. |
| `pause_code` | Yes | Stops a code redirecting without deleting it. |
| `delete_code` | Yes, destructive | Deletes a code and its scan history for good. Marked as destructive so assistants ask first. |

## What the assistant can and cannot do

It can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Every action runs as you, and a code that belongs to someone else looks like a code that does not exist.

## The QR image

The server does not draw images. Every code the tools return carries a `design_url`. Open it to style the code and download PNG, SVG or PDF. Or use the short URL with any QR library.

## Disconnect

Open **Account**, then **API Tokens**, and choose **Disconnect** next to the assistant under Connected Assistants. Access also ends if the assistant is not used for 90 days.

## Try it from code

With an API token you can call the server yourself. [`examples/curl/mcp-list-tools.sh`](../examples/curl/mcp-list-tools.sh) lists the tools and [`examples/node/mcp-create-code.mjs`](../examples/node/mcp-create-code.mjs) calls `create_code`.
