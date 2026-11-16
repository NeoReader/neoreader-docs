# Changelog

What changed in the NeoReader API and AI assistant connector, newest first.

## 2026-11-16

### Sign in with OAuth: connect Claude and ChatGPT

*MCP server*

The MCP server at `https://neoreader.com/mcp` now supports OAuth 2.1 with PKCE and dynamic client registration, so Claude, ChatGPT and other assistants sign in on their own. API tokens still work for Cursor, VS Code and scripts.

- A consent screen lists what the assistant can and cannot do. Accounts that are switched off see a "cannot connect" screen.
- Access tokens last 30 days and refresh tokens 90.
- **Connected Assistants** on the API Tokens page shows the connector address, a copy button and a **Disconnect** button for each assistant.
- The connector has its own limit of 120 calls a minute for each account, apart from the REST API.
- Codes made by an assistant are marked with the channel they came from, so you can count them.
- Every code the tools return now carries a `design_url`, where you style the code and download the image.
- A guide for each assistant: [Claude](docs/connector/claude.md), [ChatGPT](docs/connector/chatgpt.md), [Cursor](docs/connector/cursor.md), [VS Code and GitHub Copilot](docs/connector/vscode.md) and [Claude Code](docs/connector/claude-code.md).
- The REST API is described in OpenAPI 3.1 at <https://neoreader.com/openapi.json>.

## 2026-11-03

### REST API and MCP server for dynamic QR codes

*API*

Members can make an API token under Account, then API Tokens, and manage dynamic QR codes from their own code.

- `GET /me`, and `GET`, `POST`, `PATCH` and `DELETE` on `/codes`, plus `GET /codes/{slug}/stats`.
- A start date, an expiry, a scan limit, a password and UTM tags on every code.
- Scan statistics by day, country, device, operating system and browser, counted without storing IP addresses.
- An MCP server with six tools: `list_codes`, `create_code`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`.
