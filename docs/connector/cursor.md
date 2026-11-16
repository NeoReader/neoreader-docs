# Add NeoReader to Cursor

Cursor can create dynamic QR codes, update their destinations and read scan counts through the NeoReader MCP server. Sign in with OAuth, or send an API token in a header.

Also on neoreader.com: [Add NeoReader to Cursor](https://neoreader.com/developers/cursor). Part of the [NeoReader QR code MCP server](../mcp-server.md) docs.

## What You Can Do with It

NeoReader is a QR code generator for dynamic codes: the code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you can change at any time. The connector is free for members and gives Cursor six tools: `create_code`, `list_codes`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`. The server address is `https://neoreader.com/mcp`.

## Option one: sign in with OAuth

Add this to `~/.cursor/mcp.json` for every project, or to `.cursor/mcp.json` inside one project:

```json
{
  "mcpServers": {
    "neoreader": {
      "url": "https://neoreader.com/mcp"
    }
  }
}
```

Open **Cursor Settings**, then **MCP**. NeoReader shows as needing sign-in. Choose **Connect**, sign in to NeoReader in the browser window, and choose **Allow**.

## Option two: use an API token

A token is handy for a shared machine or a script. In NeoReader, open **Account**, then **API Tokens**, choose **Create Token** and copy it. Then use:

```json
{
  "mcpServers": {
    "neoreader": {
      "url": "https://neoreader.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_TOKEN" }
    }
  }
}
```

Replace `YOUR_TOKEN` with your token. Keep the file out of public repositories, because anyone who has the token can manage your codes.

## Try it

In the chat panel, ask:

- “Create a QR code called Docs Link that goes to https://example.com/docs.”
- “List my paused QR codes.”
- “Update the Docs Link code so it goes to https://example.com/docs/v2.”

## Disconnect

Remove the `neoreader` entry from `mcp.json`. To end an OAuth approval, choose **Disconnect** under Connected Assistants on the NeoReader API Tokens page. To end a token, choose **Revoke** next to it.

## What Cursor Can and Cannot Do

When you connect, NeoReader shows a screen that lists this before you choose Allow. The assistant can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Scans are counted without storing IP addresses. Every action runs as you.

## Troubleshooting

- **The sign-in window says the account cannot connect.** The account is switched off. [Contact us](https://neoreader.com/contact).
- **The assistant says it is not authorized.** The approval ended or was disconnected. Connect again from the assistant.
- **Too many requests.** Each account may make 120 calls a minute through the connector. Wait a moment and try again.
- **It cannot create another code.** An account may hold up to 250 dynamic codes. Delete one you no longer use.

## More

[All guides](../mcp-server.md), the [REST API quick start](../quick-start.md), and the [OpenAPI description](../../openapi.json).
