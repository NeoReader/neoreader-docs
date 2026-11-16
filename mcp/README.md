# MCP Registry Entry

`server.json` describes the NeoReader QR code connector for the [official MCP registry](https://registry.modelcontextprotocol.io). It is a remote server over Streamable HTTP at `https://neoreader.com/mcp`. Sign-in is OAuth, which clients discover on their own from the server, so the file needs no headers or keys.

Publishing is done by a NeoReader maintainer with the `mcp-publisher` command line tool, signed in as an owner of the `NeoReader` GitHub account or organization that the `name` field starts with (`io.github.neoreader`). See the registry's own guide for the current steps:
<https://github.com/modelcontextprotocol/registry>

Keep `version` in step with the version the server reports.
