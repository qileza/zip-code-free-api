# Free US ZIP Code API + MCP Server — Examples & Reference

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Data: CC0](https://img.shields.io/badge/Data-CC0-green.svg)](./data)
[![API docs](https://img.shields.io/badge/API-OpenAPI%203.0-brightgreen.svg)](https://zipcodeandcounty.com/openapi.json)

**A free US ZIP code API + MCP server for AI agents**, with copy-paste examples
in 8 languages, embeddable widgets, and public-domain reference data. Everything
here runs against **[zipcodeandcounty.com](https://zipcodeandcounty.com)** —
41,000+ US ZIP codes, 3,243 counties, NANPA area codes, IANA time zones, Census
ACS 5-year demographics, cost of living, property taxes, broadband, schools, and
more.

---

## Three ways to use it

### 1. REST API (this repo's focus)

```bash
curl https://zipcodeandcounty.com/api/v1/zip/90210
```

```json
{
  "zip": "90210",
  "city": "Beverly Hills",
  "state": { "abbr": "CA", "name": "California" },
  "county": { "name": "Los Angeles", "fips": "06037" },
  "coordinates": { "lat": 34.1005, "lng": -118.4146 },
  "timezone": { "id": "America/Los_Angeles", "utc_offset": -8, "observes_dst": true },
  "area_codes": ["310", "424"],
  "congressional_district": "CA-36",
  "metro": { "cbsa_code": "31080", "name": "Los Angeles-Long Beach-Anaheim", "type": "metro" },
  "demographics": { "population": 21134, "housing_units": 9706, "median_income": 233653 }
}
```

Add `?include=demographics,schools,cost_of_living,airports` (Pro+ tier) to get
30+ more ACS fields, NCES school districts, BEA cost-of-living index, and the 10
nearest airports.

### 2. MCP Server for AI agents

Plug our Model Context Protocol server directly into **Claude Desktop, Cursor,
Zed, Windsurf**, or any MCP-compatible client. The agent can then look up ZIPs,
calculate distances, pull demographics, and roll up counties inside its chat —
no web browsing, no scraping, no key required for low-volume use.

See [`examples/mcp/`](./examples/mcp) for one-line config snippets.

### 3. Embeddable iframe widgets

Drop a ZIP lookup, distance calculator, nearby ZIPs, or county card onto any
page with a single `<iframe>`. Works on WordPress, Shopify, Webflow, plain HTML.
See [`widgets/`](./widgets).

---

## Quick start (30 seconds)

No API key needed for small-volume use:

```bash
curl https://zipcodeandcounty.com/api/v1/zip/90210
```

- **5 requests/day** anonymous — enough to try the full surface
- **10/day, 200/month** free with an API key → [grab one](https://zipcodeandcounty.com/auth/signup)
- **Pro $19/mo, Business $79/mo, Enterprise $149/mo** — up to 500k/month → [pricing](https://zipcodeandcounty.com/pricing)
- Full reference: **[zipcodeandcounty.com/docs](https://zipcodeandcounty.com/docs)**
- OpenAPI 3.0 schema: **[zipcodeandcounty.com/openapi.json](https://zipcodeandcounty.com/openapi.json)**

---

## What's in this repo

| Folder | Contents |
|---|---|
| [`examples/`](./examples) | Copy-paste HTTP snippets in cURL, Node.js, TypeScript, Python, Go, Ruby, PHP, and React |
| [`examples/mcp/`](./examples/mcp) | MCP server setup for Claude Desktop, Cursor, Zed, Windsurf |
| [`skills/zipcodeandcounty/`](./skills/zipcodeandcounty) | Drop-in **Claude Code skill** — auto-installs the MCP server + slash commands (`/zip`, `/county`, `/distance`) |
| [`widgets/`](./widgets) | Working HTML pages embedding the free iframe widgets |
| [`data/`](./data) | Public-domain reference JSONs — state FIPS, state time zones, area-codes-by-state, sample ZIPs |

Code: **MIT**. Data: **CC0 / public domain**. Fork, copy, reuse — no attribution
required, backlink appreciated if it saves you time.

---

## Endpoints

Every endpoint returns JSON. Full docs: **[zipcodeandcounty.com/docs](https://zipcodeandcounty.com/docs)**.

| Endpoint | What it does |
|---|---|
| `GET /api/v1/zip/:code` | Full ZIP lookup — city, county, FIPS, lat/lng, timezone, area codes, congressional district, metro, demographics. Add `?include=` for ACS extras. |
| `GET /api/v1/search?q=...` | Autocomplete by ZIP prefix, city, or county name |
| `GET /api/v1/county/:fips` | County rollup — aggregate pop, housing, ZIPs, timezones, area codes, adjacent counties |
| `GET /api/v1/state/:abbr` | State summary — ZIP count, county count, city count, counties sorted by population |
| `GET /api/v1/distance?from=X&to=Y` | Straight-line + driving miles, 6 travel modes, timezone diff |
| `GET /api/v1/radius?zip=X&radius=N` | Every ZIP within N miles of a center, sorted by distance |
| `GET /api/v1/compare?zip1=X&zip2=Y` | Side-by-side: location, demographics, cost of living, schools |
| `GET /api/v1/area-code/:npa` | NANPA telephone area-code lookup |
| `GET /api/v1/weather/:zip` | Current conditions + 7-day forecast (proxied from Open-Meteo, 15-min cache) |
| `POST /api/v1/batch` | Look up many ZIPs in one request (Pro: 100, Business: 500, Enterprise: 1,000) |
| `GET /api/v1/ping` | Health check for uptime monitors. No auth, no rate limit. |
| `POST /api/mcp` | Model Context Protocol server for AI agents (JSON-RPC 2.0) |

### `?include=` expansions

Append to `/api/v1/zip/:code` or the `include` field in a `/batch` body. Pro+ tier only.

| Flag | Adds |
|---|---|
| `demographics` | 30+ ACS fields: age, race, education, income, poverty, housing, commute, WFH, property tax, broadband, 5-year growth |
| `schools` | NCES Common Core of Data: every school district serving the ZIP |
| `cost_of_living` | BEA-derived blended index (overall + 6 sub-indices, US avg = 100) |
| `airports` | 10 closest major US airports with straight-line distance |
| `all` | All four of the above |

---

## Why a free US ZIP code API matters in 2026

Most "free" ZIP code APIs cap you at a few hundred lookups a month, then
paywall the rest behind enterprise contracts. The worst return stale or
incomplete data — missing PO-box ZIPs, outdated county mappings, no
demographics.

**zipcodeandcounty.com runs on official US government sources, refreshed
annually after the Census ACS 5-year release:**

- **US Census Bureau ACS 5-year** — ZCTA gazetteer, demographics, housing, property tax (B25103), broadband (B28002), commute (B08013)
- **USPS + HUD** — ZIP ↔ county crosswalk (including PO-box + unique ZIPs)
- **NANPA** — authoritative telephone area-code registry
- **NCES Common Core of Data** — public school district directory
- **BEA** — Regional Price Parities (cost-of-living weights)
- **IANA tzdata** — time-zone boundaries and DST rules
- **Open-Meteo** — weather forecasts (proxied, cached)

Methodology: **[zipcodeandcounty.com/data-sources](https://zipcodeandcounty.com/data-sources)**.

---

## Frequently asked questions

### How do I look up the county for a ZIP code?

```bash
curl https://zipcodeandcounty.com/api/v1/zip/90210 | jq .county
# { "name": "Los Angeles", "fips": "06037" }
```

### How do I calculate distance between two ZIP codes?

```bash
curl "https://zipcodeandcounty.com/api/v1/distance?from=10001&to=90210"
```

Returns straight-line (haversine) distance, driving estimate, and travel time
for walking, biking, driving, bus, train, and flight.

### How do I pull demographics for a ZIP?

```bash
curl -H "X-API-Key: zb_live_..." \
  "https://zipcodeandcounty.com/api/v1/zip/90210?include=demographics"
```

Adds median household income, home value, rent, property tax, commute, broadband,
education, race breakdown, 5-year growth — 30+ fields.

### How do I connect Claude Desktop to this data?

Add `zipcodeandcounty` to your `~/.config/claude/claude_desktop_config.json`:

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

Now ask Claude: *"What's the median income in ZIP 90210?"* and it'll call
our MCP server directly.

Full setup for Cursor, Zed, Windsurf: [`examples/mcp/`](./examples/mcp).

### Is this really free?

Yes for anonymous and free-tier use (5–10 lookups/day). Paid plans start at
$19/mo for 2,000 lookups/day. No credit card required to start.

### Can I use it commercially?

Yes. Free tier for prototypes and small-scale; paid tiers for production.
[Terms of service](https://zipcodeandcounty.com/terms) — no usage category
restrictions.

### What's the difference between a ZIP code and a ZCTA?

A **ZIP code** is a USPS mail-delivery code. A **ZCTA** (ZIP Code Tabulation
Area) is the Census Bureau's geographic approximation of a ZIP, used for
demographic data. Most 5-digit ZIPs map 1:1 to ZCTAs. PO-box-only ZIPs and
unique institutional ZIPs (e.g. the Pentagon, 20301) have no ZCTA — our API
covers them via the HUD/USPS crosswalk.

### How many ZIP codes are in the US?

About **41,100** active ZIP codes across **3,243 counties** in 50 states, DC,
and the territories (PR, VI, GU). Our database covers all of them.

### What's a FIPS code?

A 5-digit federal identifier for US counties. The first 2 digits encode the
state; the last 3, the county within the state. E.g., `06037` = Los Angeles
County, California. FIPS codes are the standard key for joining Census, BLS,
CDC, and IRS datasets. Every response from our API includes the FIPS for its
county.

---

## Language examples

Each example is a single copy-pasteable file that runs against the live API.

| Language | File |
|---|---|
| cURL / shell | [`examples/curl/lookup.sh`](./examples/curl/lookup.sh) |
| Node.js | [`examples/nodejs/lookup.js`](./examples/nodejs/lookup.js) |
| TypeScript | [`examples/typescript/lookup.ts`](./examples/typescript/lookup.ts) |
| Python | [`examples/python/lookup.py`](./examples/python/lookup.py) |
| Go | [`examples/go/lookup.go`](./examples/go/lookup.go) |
| Ruby | [`examples/ruby/lookup.rb`](./examples/ruby/lookup.rb) |
| PHP | [`examples/php/lookup.php`](./examples/php/lookup.php) |
| React | [`examples/react/ZipLookup.jsx`](./examples/react/ZipLookup.jsx) |
| MCP (AI agents) | [`examples/mcp/`](./examples/mcp) |

---

## Free embeddable widgets

Drop a ZIP lookup box onto any site with a single `<iframe>`. Works on
WordPress, Shopify, Webflow, Squarespace, or plain HTML.

```html
<iframe src="https://zipcodeandcounty.com/embed/lookup"
        width="440" height="320"
        style="border:0;max-width:100%"
        loading="lazy"></iframe>
```

Four widgets: Lookup, Distance, Nearby, County. Live preview + visual
configurator: **[zipcodeandcounty.com/widgets](https://zipcodeandcounty.com/widgets)**.

See [`widgets/`](./widgets) for working HTML pages.

---

## Reference data (public domain)

Small JSON files every developer ends up needing. No API call required.

| File | Records | Source |
|---|---|---|
| [`data/state-fips.json`](./data/state-fips.json) | 56 | US Census Bureau |
| [`data/state-timezones.json`](./data/state-timezones.json) | 50 + DC | IANA tzdata |
| [`data/area-codes-by-state.json`](./data/area-codes-by-state.json) | ~300 | NANPA |
| [`data/sample-zips.json`](./data/sample-zips.json) | 100 famous ZIPs | zipcodeandcounty.com |

For the full 41,000+ ZIP dataset, use the API.

---

## Rate limits

| Tier | Daily | Monthly | Batch size | Includes |
|---|---|---|---|---|
| Anonymous | 5 | 50 | — | Base fields only |
| Free (with key) | 10 | 200 | — | Base fields only |
| Pro ($19/mo) | 2,000 | 50,000 | 100 | `?include=` unlocked |
| Business ($79/mo) | 10,000 | 200,000 | 500 | `?include=` unlocked |
| Enterprise ($149/mo) | 25,000 | 500,000 | 1,000 | `?include=` + SLA + support |

[Pricing →](https://zipcodeandcounty.com/pricing)

Every response includes `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers.

---

## For AI & LLM projects

This site is explicitly LLM-friendly:

- [`/llms.txt`](https://zipcodeandcounty.com/llms.txt) — Answer.AI-convention site index with curated URLs
- [`/llms-full.txt`](https://zipcodeandcounty.com/llms-full.txt) — structured content dump (all 54 states + top 200 ZIPs with factsheets) for RAG pipelines
- [`/openapi.json`](https://zipcodeandcounty.com/openapi.json) — machine-readable API schema
- [`/api/mcp`](https://zipcodeandcounty.com/api/mcp) — JSON-RPC 2.0 MCP server
- [`/.well-known/ai-plugin.json`](https://zipcodeandcounty.com/.well-known/ai-plugin.json) — agent-directory manifest

All data is US government public domain. Quote, cite, train, ground, embed.
Attribution is appreciated but not required.

---

## Contributing

PRs welcome for:
- Additional language examples (Rust, Swift, Kotlin, .NET, Elixir, Clojure, …)
- Framework integrations (Next.js, Astro, Rails, Laravel, Django, FastAPI, …)
- MCP client configs for additional agents (LangChain, LlamaIndex tool-specs, Ollama, etc.)
- Widget styling examples or CMS-specific embed guides
- Fixes or clarifications to the reference data files

Please keep examples under 80 lines and avoid framework-heavy scaffolding —
these are designed to be drop-in snippets, not tutorials.

---

## License

- Code in [`examples/`](./examples) and [`widgets/`](./widgets): **MIT**
- Data in [`data/`](./data): **CC0 / public domain**

Maintained by **[zipcodeandcounty.com](https://zipcodeandcounty.com)**. If this
saved you time, the best thank-you is a backlink on the project you shipped with
it.
