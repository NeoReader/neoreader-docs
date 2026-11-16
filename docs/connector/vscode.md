# Use NeoReader in VS Code and GitHub Copilot

GitHub Copilot in agent mode can call the NeoReader MCP server to create dynamic QR codes, change where they go and check how often they are scanned.

Also on neoreader.com: [Use NeoReader in VS Code and GitHub Copilot](https://neoreader.com/developers/vscode). Part of the [NeoReader QR code MCP server](../mcp-server.md) docs.

## What You Can Do with It

NeoReader is a QR code generator for dynamic codes: the code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you can change at any time. The connector is free for members and gives VS Code and GitHub Copilot six tools: `create_code`, `list_codes`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`. The server address is `https://neoreader.com/mcp`.

## Before you start

You need a free NeoReader account, VS Code with GitHub Copilot, and MCP support turned on for your organization if you use Copilot Business or Enterprise.

## Add the server

Create `.vscode/mcp.json` in your project, or run **MCP: Add Server** from the Command Palette and choose **HTTP**:

```json
{
  "servers": {
    "neoreader": {
      "type": "http",
      "url": "https://neoreader.com/mcp"
    }
  }
}
```

Choose **Start** above the server entry. VS Code opens NeoReader in your browser. Sign in, read what the assistant can and cannot do, and choose **Allow**.

## Use an API token instead

If you would rather not sign in through the browser, create a token under **Account**, then **API Tokens**, and let VS Code ask for it so it never lands in a file:

```json
{
  "inputs": [
    { "type": "promptString", "id": "neoreader-token", "description": "NeoReader API token", "password": true }
  ],
  "servers": {
    "neoreader": {
      "type": "http",
      "url": "https://neoreader.com/mcp",
      "headers": { "Authorization": "Bearer ${input:neoreader-token}" }
    }
  }
}
```

## Try it

Open Copilot Chat, switch to **Agent** mode, check that the NeoReader tools are enabled in the tools picker, and ask:

- “Create a QR code called Release Notes that goes to https://example.com/releases.”
- “How many scans did my Release Notes code get this month?”

## Disconnect

Run **MCP: List Servers**, choose NeoReader and then **Stop** or **Remove**. To end the approval itself, choose **Disconnect** under Connected Assistants on the NeoReader API Tokens page.

## What VS Code and GitHub Copilot Can and Cannot Do

When you connect, NeoReader shows a screen that lists this before you choose Allow. The assistant can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Scans are counted without storing IP addresses. Every action runs as you.

## Troubleshooting

- **The sign-in window says the account cannot connect.** The account is switched off. [Contact us](https://neoreader.com/contact).
- **The assistant says it is not authorized.** The approval ended or was disconnected. Connect again from the assistant.
- **Too many requests.** Each account may make 120 calls a minute through the connector. Wait a moment and try again.
- **It cannot create another code.** An account may hold up to 250 dynamic codes. Delete one you no longer use.

## More

[All guides](../mcp-server.md), the [REST API quick start](../quick-start.md), and the [OpenAPI description](../../openapi.json).
