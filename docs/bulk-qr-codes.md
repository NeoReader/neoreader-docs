# Bulk QR Codes

Make many dynamic QR codes from a spreadsheet. Also on neoreader.com: [Bulk QR code generator](https://neoreader.com/bulk-qr-code-generator).

## The pattern

There is no separate bulk endpoint. Read your rows, call `POST /codes` for each one, and keep the `short_url` of each answer. Every script below does exactly that with the CSV file in [`examples/bulk/codes.csv`](../examples/bulk/codes.csv):

```csv
title,destination,folder
Table 1 Menu,https://example.com/menu?table=1,Restaurant
Table 2 Menu,https://example.com/menu?table=2,Restaurant
Table 3 Menu,https://example.com/menu?table=3,Restaurant
```

| Language | Script |
| --- | --- |
| cURL and jq | [`bulk-create-codes.sh`](../examples/curl/bulk-create-codes.sh) |
| Node.js | [`bulk-create-codes.mjs`](../examples/node/bulk-create-codes.mjs) |
| Python | [`bulk_create_codes.py`](../examples/python/bulk_create_codes.py) |
| PHP | [`bulk_create_codes.php`](../examples/php/bulk_create_codes.php) |

```sh
export NEOREADER_TOKEN="your token"
node examples/node/bulk-create-codes.mjs examples/bulk/codes.csv
```

## Plan for the limits

- **Requests:** 120 a minute for each token. The scripts wait 0.6 seconds between calls, and when the API answers `429` they wait for the seconds in `Retry-After`.
- **Codes:** an account holds up to 250 dynamic codes. Delete or reuse codes you no longer need before you run a bigger batch. The API answers `422` with a message when you reach the limit.
- **Destinations:** each must be a full `https://` address, or a `mailto:` or `tel:` link. A row with a bad destination fails on its own and the script carries on.

## Change them all later

Because the codes are dynamic, you can fix a batch after printing. List the codes in a folder with `GET /codes?folder=Restaurant&per_page=100` and send a `PATCH` for each one. Or ask an assistant: "Point every code in the Restaurant folder at the new menu." See the [MCP server](mcp-server.md).
