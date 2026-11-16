# Codes

A code is a dynamic QR code: a short link, `https://neoreader.com/q/SLUG`, that redirects to a destination you can change. Also on neoreader.com: [Endpoints](https://neoreader.com/developers).

The base URL is `https://neoreader.com/api/v1`. Every request needs the `Authorization` and `Accept: application/json` headers. See [Authentication](authentication.md).

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/me` | Your name, email, plan and code count |
| `GET` | `/codes` | A page of your codes, newest first |
| `POST` | `/codes` | Create a code |
| `GET` | `/codes/{slug}` | One code |
| `PATCH` | `/codes/{slug}` | Change the fields you send |
| `DELETE` | `/codes/{slug}` | Delete a code and its scan history |
| `GET` | `/codes/{slug}/stats` | Scan statistics: see [Stats](stats.md) |

## List codes

`GET /codes`

Optional query parameters: `q` searches title, slug and destination; `folder` matches a folder name; `status` is one of `active`, `paused`, `blocked`, `expired`, `not_started` or `limit`; `per_page` is 1 to 100 (default 25); `page` picks the page.

```sh
curl "https://neoreader.com/api/v1/codes?status=active&folder=Restaurant&per_page=10" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json"
```

Examples: [cURL](../examples/curl/list-codes.sh), [Node.js](../examples/node/list-codes.mjs), [Python](../examples/python/list_codes.py), [PHP](../examples/php/list_codes.php).

## Create a code

`POST /codes`

`title` and `destination` are required. Returns `201` with the code.

```sh
curl -X POST https://neoreader.com/api/v1/codes \
  -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring menu","destination":"https://example.com/menu","folder":"Restaurant","utm":{"utm_source":"qr","utm_medium":"print"}}'
```

Examples: [cURL](../examples/curl/create-code.sh), [Node.js](../examples/node/create-code.mjs), [Python](../examples/python/create_code.py), [PHP](../examples/php/create_code.php).

## Fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Up to 120 characters. Only you see it. |
| `destination` | string | Up to 2,000 characters. A full `https://` or `http://` address, or a `mailto:` or `tel:` link. Links to another NeoReader short link and private network addresses are refused. |
| `folder` | string or null | Up to 60 characters. |
| `is_active` | boolean | `false` pauses the code. A blocked code cannot be turned back on. |
| `starts_at`, `expires_at` | date and time or null | ISO 8601, for example `2026-12-31T23:59:00Z`. The expiry must be after the start. |
| `scan_limit` | integer or null | The code stops redirecting after this many scans. |
| `password` | string or null | Write only, 4 to 100 characters. Responses show `has_password` instead. Send `null` to remove it. |
| `utm` | object or null | `utm_source`, `utm_medium` and `utm_campaign`, added to the destination on every scan. |

Responses also hold `slug`, `short_url`, `status`, `scans_count`, `last_scanned_at`, `created_at` and `updated_at`. `status` is one of `active`, `paused`, `blocked`, `not_started`, `expired` or `limit`.

## Get, change and delete

```sh
curl https://neoreader.com/api/v1/codes/k7Xp2m -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json"

curl -X PATCH https://neoreader.com/api/v1/codes/k7Xp2m \
  -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"destination":"https://example.com/summer-menu"}'

curl -X DELETE https://neoreader.com/api/v1/codes/k7Xp2m -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json"
```

A slug that is not yours returns `404`, the same as a slug that does not exist. `PATCH` changes only the fields you send. The slug and short URL never change, so printed codes keep working.

`DELETE` returns `204` with no body. It deletes the scan history too and cannot be undone, and the printed code stops working. Pause the code with `{"is_active": false}` if you may need it again.

Examples: [get](../examples/curl/get-code.sh), [update](../examples/curl/update-code.sh), [delete](../examples/curl/delete-code.sh), each also in [Node.js](../examples/node), [Python](../examples/python) and [PHP](../examples/php).
