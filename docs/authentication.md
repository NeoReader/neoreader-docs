# Authentication

Also on neoreader.com: [Get a token](https://neoreader.com/developers).

## API tokens

Every request to `https://neoreader.com/api/v1` carries a bearer token:

```
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

Make a token under **Account**, then **API Tokens**, then **Create Token**. A member can hold up to 25 tokens. Treat a token like a password: keep it out of public repositories and browser code. Revoke it from the same page if it leaks. A revoked token stops working at once.

An account that has been switched off gets `403` on every call, with any token.

## OAuth for AI assistants

The [MCP server](mcp-server.md) at `https://neoreader.com/mcp` also accepts OAuth 2.1, so an assistant can sign in on its own:

| Part | Address |
| --- | --- |
| Protected resource metadata | `https://neoreader.com/.well-known/oauth-protected-resource/mcp` |
| Authorization server metadata | `https://neoreader.com/.well-known/oauth-authorization-server` |
| Dynamic client registration | `https://neoreader.com/oauth/register` |
| Authorization | `https://neoreader.com/oauth/authorize` (authorization code with PKCE `S256`) |
| Token | `https://neoreader.com/oauth/token` (authorization code and refresh token grants) |

Access tokens last 30 days and refresh tokens 90. The scope is `mcp:use`. An OAuth token works on `/mcp` only. The REST API takes API tokens only.

A member sees what the assistant can and cannot do before choosing **Allow**, and can end access at any time with **Disconnect** under Connected Assistants on the API Tokens page.
