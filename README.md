# QR Code Generator API and MCP Server for Dynamic QR Codes

This repository documents the [NeoReader](https://neoreader.com) **QR code generator API**: a free **dynamic QR code API** that creates QR codes whose destination you can change after printing, and counts every scan without storing IP addresses. It also documents the NeoReader **QR code MCP server**, so you can use a **QR code generator for Claude, ChatGPT**, Cursor, VS Code and other AI assistants by asking in plain words.

The pages also live at <https://neoreader.com/developers>. This repository adds runnable examples in cURL, Node.js, Python and PHP, the OpenAPI description, and the entry for the official MCP registry.

## QR Code API Free for Members

The API and the MCP server are free for every member while NeoReader Pro is being built. A member can hold up to 250 dynamic codes and make 120 requests a minute. Sign in at <https://neoreader.com/login> with Google or an emailed link. No card is needed.

## Quick Start: Create a Dynamic QR Code with the API

1. Sign in at neoreader.com, open **Account**, then **API Tokens**, and choose **Create Token**. Copy it. It is shown once.
2. Keep it in an environment variable:

   ```sh
   export NEOREADER_TOKEN="your token"
   ```

3. Create a code:

   ```sh
   curl -X POST "https://neoreader.com/api/v1/codes" \
     -H "Authorization: Bearer $NEOREADER_TOKEN" \
     -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d '{"title":"Spring menu","destination":"https://example.com/menu"}'
   ```

   ```json
   {
     "data": {
       "slug": "k7Xp2m",
       "short_url": "https://neoreader.com/q/k7Xp2m",
       "title": "Spring menu",
       "destination": "https://example.com/menu",
       "status": "active",
       "scans_count": 0
     }
   }
   ```

4. Print `short_url` as a QR code. Change `destination` whenever you like with `PATCH /codes/{slug}`, and the printed code keeps working.

The API returns the short URL a dynamic code holds. It does not draw the image. Draw it yourself from `short_url` with any QR library ([`examples/node/create-and-render.mjs`](examples/node/create-and-render.mjs) and [`examples/python/create_and_render.py`](examples/python/create_and_render.py) show how), or style and download it in the [NeoReader designer](https://neoreader.com/qr-code-generator).

## Dynamic QR Code API

A dynamic QR code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you control. With the API you can:

- create, list, read, update and delete codes;
- change a destination without reprinting;
- set a start date, an expiry, a scan limit, a password and UTM tags;
- read scan statistics: totals, a daily series, countries, devices, operating systems and browsers.

Read more in [docs/dynamic-qr-codes.md](docs/dynamic-qr-codes.md) and [docs/codes.md](docs/codes.md).

## Bulk QR Code API

There is no special bulk endpoint, and none is needed. Loop over a spreadsheet and call `POST /codes` for each row. A member can make up to 120 requests a minute and hold up to 250 dynamic codes. [docs/bulk-qr-codes.md](docs/bulk-qr-codes.md) explains the pattern, and every language has a ready script that reads a CSV file:

| Language | Script |
| --- | --- |
| cURL and jq | [`examples/curl/bulk-create-codes.sh`](examples/curl/bulk-create-codes.sh) |
| Node.js | [`examples/node/bulk-create-codes.mjs`](examples/node/bulk-create-codes.mjs) |
| Python | [`examples/python/bulk_create_codes.py`](examples/python/bulk_create_codes.py) |
| PHP | [`examples/php/bulk_create_codes.php`](examples/php/bulk_create_codes.php) |

## QR Code MCP Server for AI Assistants

NeoReader runs a hosted [Model Context Protocol](https://modelcontextprotocol.io) server at:

```
https://neoreader.com/mcp
```

Add that address in your assistant, sign in to NeoReader, read what the assistant can and cannot do, and choose **Allow**. Sign-in is OAuth 2.1 with PKCE and dynamic client registration, so there is no key to copy. Clients that take a header, such as Cursor and VS Code, can send an API token instead.

| Tool | What it does |
| --- | --- |
| `create_code` | Makes a dynamic QR code from a title and a destination |
| `list_codes` | Finds your codes by search word, folder or status |
| `update_code` | Changes the destination, title, folder, expiry or on/off state |
| `get_code_stats` | Reads scans by day, country, device, system and browser |
| `pause_code` | Stops a code redirecting without deleting it |
| `delete_code` | Deletes a code for good, only when you ask |

More in [docs/mcp-server.md](docs/mcp-server.md).

## QR Code Generator for Claude, ChatGPT, Cursor and VS Code

| Assistant | Guide |
| --- | --- |
| Claude | [docs/connector/claude.md](docs/connector/claude.md) |
| ChatGPT | [docs/connector/chatgpt.md](docs/connector/chatgpt.md) |
| Cursor | [docs/connector/cursor.md](docs/connector/cursor.md) |
| VS Code and GitHub Copilot | [docs/connector/vscode.md](docs/connector/vscode.md) |
| Claude Code | [docs/connector/claude-code.md](docs/connector/claude-code.md) |

Things to ask once you are connected:

- "Make a QR code called Spring Menu that goes to https://example.com/menu."
- "Point my Spring Menu code at https://example.com/summer-menu."
- "Which of my QR codes got the most scans in the last 30 days?"

## What Is Here

| Folder or file | What it holds |
| --- | --- |
| [docs/](docs/quick-start.md) | Quick start, authentication, codes, stats, errors and limits, dynamic QR codes, bulk QR codes, the MCP server, and a guide for each assistant |
| [examples/](examples/README.md) | Runnable scripts for every endpoint in cURL, Node.js, Python and PHP |
| [openapi.json](openapi.json) | The OpenAPI 3.1 description, the same file as <https://neoreader.com/openapi.json> |
| [mcp/server.json](mcp/server.json) | The entry for the official MCP registry: a remote server at `https://neoreader.com/mcp` with OAuth sign-in |
| [CHANGELOG.md](CHANGELOG.md) | What changed in the API and the connector, newest first |

## Keeping This Repository Current

The documentation and examples are written from the NeoReader source, so a fix to the generated files is applied there. To report a mistake, open an issue or a pull request and describe what is wrong. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

The documentation and examples are MIT licensed. See [LICENSE](LICENSE). The NeoReader service itself is covered by its [terms](https://neoreader.com/terms).

## Topics

For whoever maintains the repository on GitHub, these are the suggested settings.

**Description:** QR code generator API and MCP server for dynamic QR codes: REST API docs, examples in cURL, Node.js, Python and PHP, and guides for Claude, ChatGPT, Cursor and VS Code.

**Website:** https://neoreader.com/developers

**Topics:** `qr-code`, `qr-code-generator`, `qr-code-api`, `dynamic-qr-code`, `qr-code-generator-api`, `bulk-qr-code`, `mcp`, `mcp-server`, `model-context-protocol`, `claude`, `chatgpt`, `cursor`, `github-copilot`, `openapi`, `rest-api`, `api-documentation`, `oauth`, `ai-agents`
