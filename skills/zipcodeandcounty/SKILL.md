---
name: zipcodeandcounty
description: Look up any US ZIP code — city, county (FIPS), timezone, area codes, Census ACS demographics, home prices, rent, property tax, broadband, cost of living. Calculate distances, find nearby ZIPs, roll up counties and states. Free MCP server, no API key required for low-volume use.
version: 1.0.0
license: MIT
authors:
  - name: zipcodeandcounty.com
    url: https://zipcodeandcounty.com
homepage: https://zipcodeandcounty.com/mcp
repository: https://github.com/qileza/zip-code-free-api
tags:
  - mcp
  - geographic-data
  - census
  - zip-codes
  - counties
  - demographics
  - usa
  - reference-data
---

# zipcodeandcounty — US ZIP code MCP skill for Claude Code

A drop-in skill that adds **comprehensive US geographic data** to Claude
Code via the [zipcodeandcounty.com](https://zipcodeandcounty.com) MCP
server. Once installed, ask Claude things like:

- "What's the median income in ZIP 90210?"
- "What county is 73505 in?"
- "Find every ZIP within 25 miles of 78701"
- "Compare cost of living between Beverly Hills and Austin"
- "Which counties does the 310 area code cover?"

Claude calls the hosted MCP server directly — no scraping, no
hallucinated demographics. Every fact comes from the US Census ACS
5-year, USPS, HUD, NANPA, NCES, BEA, or IANA.

---

## What this skill provides

A single MCP-server registration that exposes **7 tools** to Claude:

| Tool | Use when the user asks… |
|---|---|
| `lookup_zip` | "what city is 90210", "tell me about ZIP 60601", "median income in 78701" |
| `search_zips` | "what ZIP is Beverly Hills", "ZIPs starting with 902", "find Putnam Valley" |
| `nearby_zips` | "ZIPs within 25 miles of 90210", "what's near 73505" |
| `zip_distance` | "how far from 10001 to 90210", "drive time NYC to LA" |
| `county_info` | "Los Angeles County stats", "what's FIPS 06037" |
| `state_summary` | "ZIP count in Texas", "California demographics" |
| `airports_near_zip` | "closest airport to 90210" |

---

## Installation

### Claude Code (CLI)

```bash
claude mcp add --transport http zipcodeandcounty https://zipcodeandcounty.com/api/mcp
```

That's it. Restart any active Claude Code session and the tools are
available.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
(macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) and
add:

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

Restart Claude Desktop.

### Cursor / Zed / Windsurf / VS Code

Same config block, slightly different file. See
[examples/mcp/README.md](../../examples/mcp/README.md) for every
supported client.

---

## Optional: API key for higher quotas

The hosted server is free for 5 requests/day per anonymous IP, 200/mo
with a free key. If your agent makes a lot of calls, grab a free key at
<https://zipcodeandcounty.com/auth/signup> and add it:

```bash
claude mcp add --transport http zipcodeandcounty \
  https://zipcodeandcounty.com/api/mcp \
  --header "X-API-Key: zb_live_your_key_here"
```

Or for paid tiers (Pro $19/mo for 50k/mo, Business $79/mo for 200k/mo,
Enterprise $149/mo for 500k/mo): <https://zipcodeandcounty.com/pricing>.

---

## Verify it works

After install, in a new Claude Code session run:

> Use the zipcodeandcounty skill to look up ZIP 90210 and tell me the
> median income, the county, and the time zone.

Expected: Claude calls `lookup_zip("90210")`, returns Beverly Hills /
Los Angeles County / America/Los\_Angeles / median income from current
ACS vintage. If Claude doesn't call the MCP, the skill isn't installed
correctly — re-check the config file path and restart.

---

## Slash commands (optional)

Drop the [scripts/](./scripts) snippets into your
`~/.claude/commands/` directory for quick one-line lookups:

- `/zip 90210` — full ZIP profile
- `/county 06037` — county rollup
- `/distance 10001 90210` — distance between two ZIPs

Each command is a single Markdown file that asks Claude to call the
relevant MCP tool with the user's argument.

---

## Privacy

The MCP server logs:
- Endpoint path
- ZIP code queried (when applicable)
- Response time
- Your IP address
- Your user-agent string

It does **not** log:
- The chat prompt or surrounding conversation
- Other tools your agent has called

Logs are auto-purged after 90 days. Full policy:
<https://zipcodeandcounty.com/privacy>.

---

## Source data

| Field | Source | Refresh cadence |
|---|---|---|
| ZIP definitions | USPS + HUD ZCTA crosswalk | Annual |
| Demographics | US Census ACS 5-year (B01001, B19013, B25077, B25064, B25103, B28002, B08013) | Annual after December release |
| Area codes | NANPA | As-published |
| Time zones | IANA tzdata | As-published |
| School districts | NCES Common Core of Data | Annual |
| Cost of living | BEA Regional Price Parities | Annual |
| Weather | Open-Meteo (proxied, 15-min cache) | Live |

All sources are public-domain US government datasets.

---

## License & attribution

MIT for this skill bundle. Data is public-domain (CC0-equivalent). Use
freely in any product, commercial or not. A backlink is appreciated but
not required.

Maintained by [zipcodeandcounty.com](https://zipcodeandcounty.com).
