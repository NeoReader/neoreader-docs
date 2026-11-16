# Frequently Asked Questions

Also on neoreader.com: [FAQ](https://neoreader.com/faq) and [developer documentation](https://neoreader.com/developers).

## Is the QR code API free?

Yes. The REST API and the MCP server are free for every member while NeoReader Pro is being built. A member can hold up to 250 dynamic codes and make 120 requests a minute.

## Does the API draw the QR code image?

No. It creates the dynamic code and returns its short URL, which is what the image holds. Draw the image with any QR library, or use the [designer](https://neoreader.com/qr-code-generator). See [dynamic QR codes](dynamic-qr-codes.md).

## Can I change where a printed code goes?

Yes. That is what dynamic means. Send a `PATCH` with a new `destination`. The slug and short URL never change.

## Is there a bulk QR code API?

Make many codes by calling `POST /codes` in a loop. Ready scripts in four languages are in [bulk QR codes](bulk-qr-codes.md).

## Do scans track people?

Scans are counted without storing IP addresses, and there are no cookies on the people who scan. See the [privacy policy](https://neoreader.com/privacy).

## Can I use NeoReader as a QR code generator for Claude or ChatGPT?

Yes. Add `https://neoreader.com/mcp` as a connector and sign in. Guides: [Claude](connector/claude.md) and [ChatGPT](connector/chatgpt.md).

## What happens when a code expires or reaches its scan limit?

The short link shows a page that says the code is no longer available instead of redirecting. Change `expires_at` or `scan_limit` with `PATCH` to bring it back.

## How do I stop an assistant or a script?

Revoke the token under **Account**, then **API Tokens**, or choose **Disconnect** next to the assistant under Connected Assistants.
