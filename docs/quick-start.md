# Quick Start

Create a dynamic QR code with the NeoReader API in three steps. Also on neoreader.com: [QR code API and MCP server](https://neoreader.com/developers).

## 1. Make an API token

Sign in at <https://neoreader.com/login> with Google or an emailed link. Open **Account**, then **API Tokens**, and choose **Create Token**. Give it a name you will recognize and copy it right away. It is shown once, and you can revoke it at any time.

```sh
export NEOREADER_TOKEN="your token"
```

## 2. Create a code

```sh
curl -X POST "https://neoreader.com/api/v1/codes" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring menu","destination":"https://example.com/menu"}'
```

The answer holds the code's `slug` and its `short_url`, which looks like `https://neoreader.com/q/k7Xp2m`. That short URL is what the QR code holds.

## 3. Draw the image

The API returns the short URL. Draw the QR image from it with any QR library, or open the [designer](https://neoreader.com/qr-code-generator) to choose colors and a logo and download the image. Two examples draw the image for you: [Node.js](../examples/node/create-and-render.mjs) and [Python](../examples/python/create_and_render.py).

## Next

- Change where the code goes later: [Codes](codes.md).
- See how often it is scanned: [Stats](stats.md).
- Use it from an AI assistant instead: [MCP server](mcp-server.md).
- Make many codes from a spreadsheet: [Bulk QR codes](bulk-qr-codes.md).
