# Stats

Scan statistics for one code. Also on neoreader.com: [Endpoints](https://neoreader.com/developers).

`GET /codes/{slug}/stats?days=7`

`days` is 1 to 365 (default 30) and counts back from today, today included. `unique` counts one visitor once per day. Scans are counted without storing IP addresses.

```sh
curl "https://neoreader.com/api/v1/codes/k7Xp2m/stats?days=7" \
  -H "Authorization: Bearer $NEOREADER_TOKEN" -H "Accept: application/json"
```

```json
{
  "data": {
    "slug": "k7Xp2m",
    "days": 7,
    "from": "2026-11-10",
    "to": "2026-11-16",
    "totals": { "scans": 42, "unique": 31 },
    "all_time_scans": 120,
    "daily": [ { "date": "2026-11-10", "scans": 5, "unique": 4 } ],
    "countries": [ { "country": "US", "scans": 30 } ],
    "devices": [ { "device": "mobile", "scans": 39 } ],
    "os": [ { "os": "iOS", "scans": 25 } ],
    "browsers": [ { "browser": "Safari", "scans": 24 } ]
  }
}
```

The breakdowns list the top 10 values. Examples: [cURL](../examples/curl/get-code-stats.sh), [Node.js](../examples/node/get-code-stats.mjs), [Python](../examples/python/get_code_stats.py), [PHP](../examples/php/get_code_stats.php).
