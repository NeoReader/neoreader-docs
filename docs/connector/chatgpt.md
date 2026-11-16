# Connect NeoReader to ChatGPT

Add the NeoReader MCP server to ChatGPT and you can create and manage dynamic QR codes in plain language, without leaving the chat.

Also on neoreader.com: [Connect NeoReader to ChatGPT](https://neoreader.com/developers/chatgpt). Part of the [NeoReader QR code MCP server](../mcp-server.md) docs.

## What You Can Do with It

NeoReader is a QR code generator for dynamic codes: the code holds a short link, `neoreader.com/q/SLUG`, that redirects to a destination you can change at any time. The connector is free for members and gives ChatGPT six tools: `create_code`, `list_codes`, `update_code`, `get_code_stats`, `pause_code` and `delete_code`. The server address is `https://neoreader.com/mcp`.

## Before you start

You need a free NeoReader account and a ChatGPT plan that supports custom connectors. Custom connectors are in developer mode, which ChatGPT offers on paid plans. On Business, Enterprise and Edu, a workspace admin may need to allow it first.

## Add the connector

1. In ChatGPT, open **Settings** and choose **Connectors**.
2. Open **Advanced** and turn on **Developer Mode**.
3. Choose **Create** to add a new connector.
4. Enter the name `NeoReader`, a short description such as “Create and manage dynamic QR codes”, and the server address `https://neoreader.com/mcp`.
5. Set authentication to **OAuth** and choose **Create**. ChatGPT registers itself with NeoReader on its own, so there is no client ID or secret to paste.
6. Sign in to NeoReader when the window opens, then choose **Allow**.

OpenAI changes these menus often. If a label differs, look for the option to add a custom MCP server.

## Try it

Start a new chat, add NeoReader from the tools or connectors menu, and ask:

- “Create a dynamic QR code for https://example.com/menu and call it Spring Menu.”
- “Change the Spring Menu code so it goes to https://example.com/summer-menu.”
- “How many times was my Spring Menu code scanned this week, and from which countries?”

ChatGPT shows you what it is about to send and asks you to confirm actions that change your account. Review the details before you approve.

## Disconnect

Delete the connector in ChatGPT, or open **Account**, then **API Tokens** in NeoReader and choose **Disconnect** next to ChatGPT under Connected Assistants.

## What ChatGPT Can and Cannot Do

When you connect, NeoReader shows a screen that lists this before you choose Allow. The assistant can create, read, change, pause and delete your dynamic QR codes and read their scan statistics. It cannot see or change your email address, sign-in or account settings, cannot see your API tokens, and cannot go past your account's code limit. Scans are counted without storing IP addresses. Every action runs as you.

## Troubleshooting

- **The sign-in window says the account cannot connect.** The account is switched off. [Contact us](https://neoreader.com/contact).
- **The assistant says it is not authorized.** The approval ended or was disconnected. Connect again from the assistant.
- **Too many requests.** Each account may make 120 calls a minute through the connector. Wait a moment and try again.
- **It cannot create another code.** An account may hold up to 250 dynamic codes. Delete one you no longer use.

## More

[All guides](../mcp-server.md), the [REST API quick start](../quick-start.md), and the [OpenAPI description](../../openapi.json).
