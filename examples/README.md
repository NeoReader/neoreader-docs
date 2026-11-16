# Examples

Every script reads your API token from the `NEOREADER_TOKEN` environment variable. Make a token under **Account**, then **API Tokens**, on [neoreader.com](https://neoreader.com/developers).

```sh
export NEOREADER_TOKEN="your token"
sh curl/create-code.sh
node node/create-code.mjs
python3 python/create_code.py
php php/create_code.php
```

The scripts are named after the call they make: `get-me`, `list-codes`, `create-code`, `get-code`, `update-code`, `delete-code` and `get-code-stats`. Scripts that act on one code read its slug from `NEOREADER_SLUG`, the `slug` in the answer of `create-code`. The values are examples, so replace the titles and addresses with your own. Node.js scripts need version 18 or newer, Python scripts need the `requests` package, PHP scripts need the curl extension and the cURL ones use `curl` and `sh`.

`delete-code` deletes the code and its scan history for good, so read it before you run it.

To try a script against another address, set `NEOREADER_API_URL`, which defaults to `https://neoreader.com/api/v1`.

## Bulk QR Codes

`bulk-create-codes` in each language reads a CSV file of `title,destination,folder` rows ([`bulk/codes.csv`](bulk/codes.csv) is a sample), makes one code per row and prints the short URLs. It waits between calls to stay under 120 requests a minute. The cURL version needs `jq`. See [docs/bulk-qr-codes.md](../docs/bulk-qr-codes.md).

```sh
node node/bulk-create-codes.mjs bulk/codes.csv
```

## Draw the QR Image

The API returns the short URL a dynamic code holds. These two scripts create a code and draw its PNG, and for Node.js an SVG, on your own machine:

```sh
npm install qrcode && node node/create-and-render.mjs
pip install requests "qrcode[pil]" && python3 python/create_and_render.py
```

## MCP Server

`curl/mcp-list-tools.sh` lists the tools of the [NeoReader MCP server](../docs/mcp-server.md) and `node/mcp-create-code.mjs` calls `create_code`, with the same API token. Set `NEOREADER_MCP_URL` to use another address.
