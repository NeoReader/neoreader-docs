# Contributing

Thank you for helping improve the NeoReader API and MCP server docs.

## Reporting a Problem

Open an issue when a page is wrong, unclear or out of date, or when an example does not run. Say which page or file, what you expected and what happened. Do not include API tokens or other private data. Replace them with placeholders.

For a problem with your account or a bug in the service itself, use the contact page at <https://neoreader.com/contact> instead.

## Sending a Change

1. Fork the repository and make a branch.
2. Keep each pull request to one fix or one new example.
3. Run your example against a real account before you send it, and say which language version you used.
4. Open the pull request and describe what it fixes.

The `openapi.json` file and the pages under `docs/connector/` are produced from the NeoReader source. A fix to them is applied there, and your pull request is used as the report. Files you can edit directly: this file, the README, the other pages in `docs/`, `examples/` and `mcp/`.

## Style

- Plain words, US spelling and short sentences.
- Write "do not" and "cannot".
- Headings and button names in Title Case when they name something on the site, such as **Create Token**.
- No promises about the future and no numbers that will go stale.
- Examples read the token from the `NEOREADER_TOKEN` environment variable and never contain a real token.

## License

By contributing you agree that your work is released under the MIT license in this repository.
