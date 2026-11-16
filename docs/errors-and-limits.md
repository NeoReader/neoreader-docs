# Errors and Rate Limits

Also on neoreader.com: [Errors and rate limits](https://neoreader.com/developers).

## Rate limits

Each token may make 120 requests a minute on the REST API. The MCP server has its own bucket of 120 calls a minute for each account, so an assistant never uses up your scripts. Over the limit you get `429` with a `Retry-After` header giving the seconds to wait. Each account may hold up to 250 dynamic codes.

## Errors

Errors are JSON with a `message`. Validation errors also list each field under `errors`.

| Status | Meaning |
| --- | --- |
| `401` | The token is missing, wrong or revoked. |
| `403` | The account is disabled. |
| `404` | No such code on your account. |
| `422` | A field is invalid, you reached your code limit, or you tried to turn a blocked code back on. |
| `429` | Too many requests. Wait for the seconds in `Retry-After`. |

```json
{
  "message": "Enter a full web address starting with https://",
  "errors": { "destination": ["Enter a full web address starting with https://"] }
}
```
