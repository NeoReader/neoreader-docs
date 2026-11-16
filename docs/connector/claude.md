# Connect NeoReader to Claude

Add NeoReader as a custom connector and Claude can create dynamic QR codes, change where they go and report how often they are scanned, all from a chat.

Also on neoreader.com: [Connect NeoReader to Claude](https://neoreader.com/developers/claude). Part of the [NeoReader QR code MCP server](../mcp-server.md) docs.

## What You Can Do with It

NeoReader is a QR code generator for dynamic codes: the code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you can change at any time. The connector is free for members and gives Claude six tools: `create_code`, `list_codes`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`. The server address is `https://neoreader.com/mcp`.

## Before you start

You need a free NeoReader account and a Claude plan that allows custom connectors (Pro, Max, Team or Enterprise). On Team and Enterprise, an owner adds the connector first, then each person connects their own account.

## Add the connector

1. In Claude, open **Settings** and choose **Connectors**.
2. Choose **Add Custom Connector**.
3. Enter the name `NeoReader` and the address `https://neoreader.com/mcp`, then choose **Add**.
4. Choose **Connect**. Your browser opens NeoReader. Sign in with Google or an emailed link if you are not already signed in.
5. Read the list of what Claude can and cannot do, then choose **Allow**.

The connector now shows as connected. Menu names change from time to time, so look for the custom connector option if the labels differ.

## Try it

Start a chat, turn on the NeoReader connector from the tools menu, and ask:

- “Make a QR code called Spring Menu that goes to https://example.com/menu.”
- “Point my Spring Menu code at https://example.com/summer-menu.”
- “Which of my QR codes got the most scans in the last 30 days?”
- “Pause every code in the Events folder.”

Deleting is marked as destructive, so Claude asks before it deletes anything. A deleted code cannot be brought back, so pausing is the safer choice if you might want it again.

## Disconnect

Remove the connector in Claude, or end its access from NeoReader: open **Account**, then **API Tokens**, and choose **Disconnect** next to Claude under Connected Assistants. Access also ends on its own if Claude is not used for 90 days.

## What Claude Can and Cannot Do

When you connect, NeoReader shows a screen that lists this before you choose Allow. The assistant can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Scans are counted without storing IP addresses. Every action runs as you.

## Troubleshooting

- **The sign-in window says the account cannot connect.** The account is switched off. [Contact us](https://neoreader.com/contact).
- **The assistant says it is not authorized.** The approval ended or was disconnected. Connect again from the assistant.
- **Too many requests.** Each account may make 120 calls a minute through the connector. Wait a moment and try again.
- **It cannot create another code.** An account may hold up to 250 dynamic codes. Delete one you no longer use.

## More

[All guides](../mcp-server.md), the [REST API quick start](../quick-start.md), and the [OpenAPI description](../../openapi.json).
