# MCP setup — Claude Desktop, Cursor, Zed, Windsurf

The Model Context Protocol (MCP) is a JSON-RPC 2.0 standard that lets
AI agents call external tools. Our server at
`https://zipcodeandcounty.com/api/mcp` exposes **7 tools**:

| Tool | What it returns |
|---|---|
| `lookup_zip` | Full record for a single ZIP (city, county, FIPS, coords, timezone, area codes, demographics) |
| `search_zips` | Autocomplete by ZIP prefix, city name, or county name |
| `nearby_zips` | Every ZIP within N miles of a center, sorted by distance |
| `zip_distance` | Straight-line + driving-time between two ZIPs, with travel modes |
| `county_info` | County summary by 5-digit FIPS — pop, ZIP count, timezones, area codes, adjacent counties |
| `state_summary` | State rollup — ZIP count, county count, top counties by pop |
| `airports_near_zip` | 10 closest major US airports to any ZIP |

**No API key required for low-volume use.** Anonymous calls count as
`5/day, 50/month`. Pass an `X-API-Key` header (`Authorization` also
works) for higher tiers. See [pricing](https://zipcodeandcounty.com/pricing).

---

## Claude Desktop

Location of config file:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

Add under `mcpServers`:

```json
{
  "mcpServers": {
    "zipcodeandcounty": {
      "type": "http",
      "url": "https://zipcodeandcounty.com/api/mcp"
    }
  }
}
```

Restart Claude Desktop. Ask: *"What's the median income in ZIP 90210?"*
— Claude will call `lookup_zip` on our server automatically.

For higher rate limits, add your API key:

```json
{
  "mcpServers": {
    "zipcodeandcounty": {
      "type": "http",
      "url": "https://zipcodeandcounty.com/api/mcp",
      "headers": {
        "X-API-Key": "zb_live_your_key_here"
      }
    }
  }
}
```

---

## Cursor

Open Cursor → Settings → Features → MCP → Add new MCP server.

- **Name:** `zipcodeandcounty`
- **Transport:** `HTTP`
- **URL:** `https://zipcodeandcounty.com/api/mcp`

Or edit `~/.cursor/mcp.json` directly with the same JSON shape as Claude
Desktop.

---

## Zed

Edit `~/.config/zed/settings.json`:

```json
{
  "context_servers": {
    "zipcodeandcounty": {
      "command": {
        "path": "npx",
        "args": ["-y", "@modelcontextprotocol/server-http", "https://zipcodeandcounty.com/api/mcp"]
      },
      "settings": {}
    }
  }
}
```

(Zed 0.160+ supports HTTP transport natively; earlier versions need the
`server-http` bridge above.)

---

## Windsurf

Open Windsurf → Cascade → Plugins → MCP → Add server:

```json
{
  "mcpServers": {
    "zipcodeandcounty": {
      "serverUrl": "https://zipcodeandcounty.com/api/mcp"
    }
  }
}
```

---

## Test without any agent

Verify the server is reachable and see the tool list:

```bash
curl -X POST https://zipcodeandcounty.com/api/mcp \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Call a single tool:

```bash
curl -X POST https://zipcodeandcounty.com/api/mcp \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc":"2.0","id":2,
    "method":"tools/call",
    "params": {"name":"lookup_zip","arguments":{"zip":"90210"}}
  }'
```

---

## Python MCP client (standalone)

If you want to wire our MCP server into a LangChain / LlamaIndex pipeline,
or call it from an agent you wrote yourself, here's a minimal client:

```python
# pip install httpx
import httpx

BASE = "https://zipcodeandcounty.com/api/mcp"


def call_tool(name: str, args: dict) -> dict:
    r = httpx.post(
        BASE,
        json={
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {"name": name, "arguments": args},
        },
        timeout=30,
    )
    r.raise_for_status()
    return r.json()["result"]


# Example: look up a ZIP
print(call_tool("lookup_zip", {"zip": "90210"}))

# Example: search cities
print(call_tool("search_zips", {"query": "Beverly", "limit": 3}))

# Example: distance between two ZIPs
print(call_tool("zip_distance", {"from": "10001", "to": "90210"}))
```

---

## For tool-builders

Our OpenAPI 3.0 spec: <https://zipcodeandcounty.com/openapi.json>. Use it
with `ToolSpec`-style generators (LangChain `OpenAPIToolkit`, LlamaIndex
`OpenAPIToolSpec`, etc.) to get typed client stubs in any language.

AI plugin manifest:
<https://zipcodeandcounty.com/.well-known/ai-plugin.json>.

---

## License

MIT for this config snippets. The MCP endpoint itself is covered by
[zipcodeandcounty.com/terms](https://zipcodeandcounty.com/terms). Data
is public-domain US government.
