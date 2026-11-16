# Dynamic QR Codes

Also on neoreader.com: [QR code generator](https://neoreader.com/qr-code-generator).

## What makes a QR code dynamic

A static QR code holds the destination itself, so changing the destination means printing a new code. A dynamic QR code holds a short link that NeoReader redirects. The image never changes, and the destination behind it does.

```
QR image  ->  https://neoreader.com/q/k7Xp2m  ->  https://example.com/menu
                                                  (change this any time)
```

## Why use the API for it

- **Change a destination without reprinting.** `PATCH /codes/{slug}` with a new `destination`. Menus, posters, packaging and business cards stay in use.
- **Schedule and limit.** Set `starts_at`, `expires_at` and `scan_limit` so a code works only when you want it to.
- **Protect it.** Add a `password` that scanners have to enter.
- **Tag it.** Add `utm` values that are appended to the destination on every scan.
- **Measure it.** Read scans by day, country, device, system and browser with [Stats](stats.md), counted without storing IP addresses.
- **Pause it.** Send `{"is_active": false}` to stop a code redirecting without deleting it.

## The image

The API returns the short URL, which is what the QR image holds. It does not draw the image. Draw it with any QR library from `short_url`, or style and download it in the [NeoReader designer](https://neoreader.com/qr-code-generator). The [render examples](../examples/README.md) show both ways. Use error correction level M or higher if you add a logo.

## Limits

A member can hold up to 250 dynamic codes. Scanning is not limited. An administrator can block a code that breaks the rules, and a blocked code cannot be turned back on through the API.
