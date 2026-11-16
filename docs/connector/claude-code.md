# Add NeoReader to Claude Code

Claude Code can create dynamic QR codes, update where they go and read scan counts while you work in the terminal. It takes one command.

Also on neoreader.com: [Add NeoReader to Claude Code](https://neoreader.com/developers/claude-code). Part of the [NeoReader QR code MCP server](../mcp-server.md) docs.

## What You Can Do with It

NeoReader is a QR code generator for dynamic codes: the code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you can change at any time. The connector is free for members and gives Claude Code six tools: `create_code`, `list_codes`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`. The server address is `https://neoreader.com/mcp`.

## Add the server and sign in

Run this in your terminal:

```sh
claude mcp add --transport http neoreader https://neoreader.com/mcp
```

Start Claude Code, type `/mcp`, choose **neoreader** and then **Authenticate**. Your browser opens NeoReader. Sign in, read what the assistant can and cannot do, and choose **Allow**. Claude Code keeps the approval and renews it when it is used.

Add `--scope user` to make the server available in every project, or `--scope project` to share it with your team through a `.mcp.json` file.

## Use an API token instead

For scripts and servers where no browser is available, create a token under **Account**, then **API Tokens**, and pass it as a header:

```sh
claude mcp add --transport http neoreader https://neoreader.com/mcp \
  --header "Authorization: Bearer YOUR_TOKEN"
```

## Try it

- “Create a QR code called Release Notes that goes to https://example.com/releases.”
- “Show my five newest QR codes and how many scans each one has.”
- “Pause the Release Notes code.”

## Disconnect

```sh
claude mcp remove neoreader
```

To end the approval on the NeoReader side, choose **Disconnect** under Connected Assistants on the API Tokens page of your account.

## What Claude Code Can and Cannot Do

When you connect, NeoReader shows a screen that lists this before you choose Allow. The assistant can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Scans are counted without storing IP addresses. Every action runs as you.

## Troubleshooting

- **The sign-in window says the account cannot connect.** The account is switched off. [Contact us](https://neoreader.com/contact).
- **The assistant says it is not authorized.** The approval ended or was disconnected. Connect again from the assistant.
- **Too many requests.** Each account may make 120 calls a minute through the connector. Wait a moment and try again.
- **It cannot create another code.** An account may hold up to 250 dynamic codes. Delete one you no longer use.

## More

[All guides](../mcp-server.md), the [REST API quick start](../quick-start.md), and the [OpenAPI description](../../openapi.json).
