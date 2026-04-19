# Directory & Registry Submissions — Status + Drafts

## Status (as of 2026-04-19)

### Live PRs (all on lists with 10k+ stars)

| Destination | Stars | Status | URL |
|---|---:|---|---|
| public-apis/public-apis | 425k | ✅ PR open | https://github.com/public-apis/public-apis/pull/5908 |
| punkpeye/awesome-mcp-servers | 85k | ✅ PR open | https://github.com/punkpeye/awesome-mcp-servers/pull/5132 |
| n0shake/Public-APIs | 23k | ✅ PR open | https://github.com/n0shake/Public-APIs/pull/736 |
| public-api-lists/public-api-lists | 14k | ✅ PR open | https://github.com/public-api-lists/public-api-lists/pull/417 |
| jaw9c/awesome-remote-mcp-servers | <10k | ✅ PR open | https://github.com/jaw9c/awesome-remote-mcp-servers/pull/269 |

### Blocked

| Destination | Stars | Why |
|---|---:|---|
| appcypher/awesome-mcp-servers | 5.4k | PRs from forks disabled |
| wong2/awesome-mcp-servers | — | PRs disabled on the repo |
| TonnyL/Awesome_APIs | 12.9k | Repo is archived (read-only) |

### Manual-only (require human-form submission)

| Destination | Stars | Why |
|---|---:|---|
| hesreallyhim/awesome-claude-code | 40k | Web form only, AI/CLI submissions banned. **Submit at:** https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml |
| MCP Registry (modelcontextprotocol/registry) | — | Requires `mcp-publisher` CLI — no Windows binary; build from source on Linux/Mac |

### Out of scope (wrong category)

| Destination | Stars | Why |
|---|---:|---|
| Shubhamsaboo/awesome-llm-apps | 106k | Wants runnable apps, not hosted services |
| ComposioHQ/awesome-claude-skills | 55k | Wants .skill files, not MCP servers |
| VoltAgent/awesome-claude-code-subagents | 17.7k | Wants Claude subagent definitions, not MCP |
| sickn33/antigravity-awesome-skills | 34k | Wants installable skills, not MCP |
| github/awesome-copilot | 30k | Copilot-specific configs |

### Not yet attempted (lower priority)

| Destination | Stars | Notes |
|---|---:|---|
| RapidAPI Hub | — | Requires you to log in & upload OpenAPI |
| Product Hunt | — | Schedule for a launch day |
| Data.gov | — | Non-federal submission review ~2-4 weeks |
| Show HN | — | Use your own HN account |

---


This file contains copy-paste-ready submission content for the public registries,
awesome-lists, and directories that drive LLM-citation and developer-discovery
traffic. Each section is a single block to submit to one destination.

**Order matters — start with the top of the list.** The earlier ones are highest
ROI per minute of effort.

---

## 1. modelcontextprotocol/servers — the canonical MCP registry

**Why first:** Every MCP-aware AI client (Claude Desktop, Cursor, Zed,
Windsurf, Cline, etc.) periodically crawls this repo for server discovery.
An accepted PR here is the highest-ROI backlink in this list.

### Steps
1. Fork `https://github.com/modelcontextprotocol/servers`
2. Edit `README.md` → find the "Community Servers" section (alphabetical)
3. Add a line in the right alphabetical slot:

```markdown
- **[ZIP Code & County](https://github.com/qileza/zip-code-free-api)** — Every US ZIP code: city, county (FIPS), timezone, area codes, demographics, home prices, rent, property tax, broadband, cost of living. Free hosted MCP at https://zipcodeandcounty.com/api/mcp (no key for low-volume use).
```

4. Open PR with title: `Add zipcodeandcounty.com MCP server (US ZIP + county data)`
5. PR body:

```markdown
## What this adds

Hosted HTTP MCP server exposing 7 tools for US geographic data:

- `lookup_zip` — full ZIP record (city, county, FIPS, coords, timezone, area codes, demographics)
- `search_zips` — autocomplete by ZIP prefix, city, or county
- `nearby_zips` — every ZIP within N miles of a center
- `zip_distance` — haversine + driving-time between two ZIPs
- `county_info` — county summary by 5-digit FIPS
- `state_summary` — state rollup + top counties by population
- `airports_near_zip` — 10 closest major airports

## Why this is a good fit

- **Free, no-auth** for low-volume use (5 req/day per anonymous caller, 200/month with a free key)
- **Public-domain data** (US Census ACS 5-year, USPS, HUD, NANPA, NCES, BEA, IANA)
- **JSON-RPC 2.0 over HTTP** (standard MCP transport)
- Tested with Claude Desktop, Cursor, Zed, Windsurf

## Endpoint

`POST https://zipcodeandcounty.com/api/mcp`

## Docs

- Repo: https://github.com/qileza/zip-code-free-api (MCP setup in /examples/mcp)
- Site: https://zipcodeandcounty.com/mcp
- OpenAPI: https://zipcodeandcounty.com/openapi.json
```

---

## 2. punkpeye/awesome-mcp-servers

**Why:** Second-most-cited MCP list; linked from the official modelcontextprotocol
/servers repo.

### Steps
1. Fork `https://github.com/punkpeye/awesome-mcp-servers`
2. Find the section that fits best — probably "Other Tools and Integrations" or
   a "Knowledge & Data" section, alphabetical
3. Add:

```markdown
- [zip-code-free-api](https://github.com/qileza/zip-code-free-api) 🌐 ☁️ — US ZIP code + county + demographics data (41,000+ ZIPs, Census ACS). Hosted HTTP MCP at `https://zipcodeandcounty.com/api/mcp`, free for low-volume use.
```

(🌐 = HTTP transport; ☁️ = cloud-hosted.)

4. PR title: `Add zip-code-free-api / zipcodeandcounty.com MCP server`

---

## 3. habitoai/awesome-mcp-servers (alternative curation)

**Why:** Different audience than #2, smaller but more dev-focused.

Same entry as #2. Fork, find category, alphabetical insert.

---

## 4. public-apis/public-apis

**Why:** 330k+ stars, the canonical "free public APIs" list. Gets crawled by
every LLM training pipeline.

### Steps
1. Fork `https://github.com/public-apis/public-apis`
2. Edit `README.md` → **Geocoding** section (or **Open Data**, alphabetical)
3. Add:

```markdown
| [ZipCodeAndCounty.com](https://zipcodeandcounty.com) | US ZIP codes with county (FIPS), timezone, area codes, demographics, cost of living | `apiKey` | Yes | No |
```

4. PR title: `Add ZipCodeAndCounty.com (US ZIP + county + demographics)`
5. Check that the API follows their requirements:
   - ✅ HTTPS
   - ✅ Returns JSON
   - ✅ Has documentation (OpenAPI)
   - ✅ Does not require a key for basic use
   - ✅ CORS enabled

---

## 5. toddmotto/public-apis (archived but still heavily referenced)

Note: the fork at `public-apis/public-apis` is the active one — skip this,
covered by #4.

---

## 6. marktony/Awesome-MCP-Servers

**Why:** Growing fast, good for non-English-speaking discovery.

Same entry as #2. Fork, find category, alphabetical insert.

---

## 7. wong2/awesome-mcp-servers (if still maintained)

Same drill.

---

## 8. RapidAPI Hub

**Why:** Paid & free API marketplace. Good for enterprise-buyer discovery.

1. Go to https://rapidapi.com/provider/dashboard
2. Sign in / create provider account
3. "Add New API"
4. Fill in:
   - **Name:** ZIP Code & County — US Location Data
   - **Short description:** Free US ZIP code lookup with county FIPS, timezone, area codes, demographics, home prices, cost of living. Public-domain Census data. REST + MCP.
   - **Category:** Data, Location, Mapping
   - **Base URL:** `https://zipcodeandcounty.com/api/v1`
   - **Logo:** (our favicon or a 500x500 version of our OG image)
   - **OpenAPI upload:** `https://zipcodeandcounty.com/openapi.json`
5. Pricing: mirror the site tiers (Basic free 200/mo, Pro $19/mo, Business $79/mo, Enterprise $149/mo)

---

## 9. APIs.guru (OpenAPI Directory)

**Why:** Registry of OpenAPI specs. Feeds into many tooling ecosystems.

1. Fork `https://github.com/APIs-guru/openapi-directory`
2. Add `APIs/zipcodeandcounty.com/1.3.0/openapi.json` (copy our spec)
3. PR title: `Add zipcodeandcounty.com (US ZIP code + county + demographics)`

---

## 10. Product Hunt

**Why:** Good for consumer-utility framing (not just developers).

1. https://www.producthunt.com/posts/new
2. Framing: **lead with the consumer utility, not the API**
   - **Name:** ZIP Code & County — every US ZIP, fully explained
   - **Tagline:** Free US ZIP code lookup with county, demographics, cost of living, and an AI-agent API
   - **Description:** Look up any of 41,000+ US ZIP codes and get the county (FIPS), time zone, area codes, Census demographics, home prices, rent, property tax, commute times, broadband rates, cost of living, and schools. Plus a free REST API and MCP server so Claude / Cursor / Zed agents can query the data directly. All data from public-domain US government sources.
   - **First comment (you post it):** "Built this because every other 'free' ZIP API paywalls after a few hundred lookups. This one stays free up to 200 lookups/mo, and the MCP server means AI agents can just use it directly without any key."

---

## 11. Data.gov

**Why:** Official US open-data catalog. LLM training sets weight it heavily.

1. https://catalog.data.gov/user/register (or sign in)
2. Submit a dataset entry:
   - **Title:** zipcodeandcounty.com — Structured US ZIP Code + County Data
   - **Publisher:** zipcodeandcounty.com (non-federal publisher)
   - **Contact:** via site dashboard
   - **Description:** Every US ZIP code with 40+ derived fields from Census ACS 5-year, USPS, HUD, NANPA, NCES, BEA, IANA. Available via REST API (OpenAPI 3.0) and MCP server. All source data is US government public domain.
   - **Keywords:** ZIP code, FIPS, census, ACS, demographics, county, area code
   - **License:** Public domain (CC0 for our compilation; source data already public domain)
   - **Access URL:** https://zipcodeandcounty.com/api/v1
3. Non-federal submissions go through a moderator review; expect 1-2 weeks.

---

## 12. awesome-nextjs / awesome-vercel / awesome-supabase

**Why:** These stacks are what you built on. Being cited as a "real-world
Next.js 16 + Supabase site" helps in dev-stack queries.

For each of these awesome-lists:
1. Fork
2. Find "Sites built with X" or "Case studies" section
3. Add:

```markdown
- [zipcodeandcounty.com](https://zipcodeandcounty.com) — US ZIP code data platform (Next.js 16 + Supabase, 354k+ pages, REST + MCP API)
```

---

## 13. Indie Hackers / Show HN

**Why:** Inbound backlinks + direct audience for the API tier. Show HN
specifically gets crawled by every major LLM.

### Show HN draft

**Title:** Show HN: Free US ZIP code API with an MCP server for AI agents (2026)

**Body:**
```
I built a US ZIP code data platform that bundles three things:

1. A web UI at zipcodeandcounty.com — every ZIP, county, city, state has
   its own page with 40+ ACS demographic fields, cost of living, property
   tax, broadband, commute data. ~354k pages total.

2. A REST API at /api/v1 — 12 endpoints, OpenAPI 3.0, free up to
   200 lookups/mo, $19/mo for 50k/mo.

3. An MCP (Model Context Protocol) server at /api/mcp so Claude Desktop,
   Cursor, Zed, Windsurf users can add a single JSON block to their agent
   config and then ask things like "what's the median income in 90210"
   and get a direct, cited answer pulled from our API.

All data is US government public domain: Census ACS 5-year, USPS, HUD,
NANPA, NCES, BEA, IANA. No web scraping. Refreshed annually after the
December ACS release.

Interesting bits under the hood:

- Hosted on Coolify + self-hosted Traefik + Supabase Postgres
- Population-weighted aggregation across 3,243 counties and 19k cities
  for state-level medians (same approach Redfin/city-data.com use)
- Dataset JSON-LD + llms.txt + MCP server so AI answer engines cite us
  as a first-party source

Free examples repo with copy-paste snippets for cURL, Node, TypeScript,
Python, Go, Ruby, PHP, React, and MCP client configs:
https://github.com/qileza/zip-code-free-api

Happy to answer implementation questions.
```

---

## 14. Dev.to / Hashnode / Medium

**Why:** Long-form tech content gets crawled and quoted by LLMs. One well-
ranked post there can feed citations for months.

Suggested posts (in priority order):
1. **"Building a free US ZIP code API with an MCP server"** — 1,500 words,
   technical angle. Hacker News-adjacent audience.
2. **"How to wire Claude Desktop up to live US geographic data (in 60
   seconds)"** — 800 words, MCP config walkthrough. Indie-hacker audience.
3. **"FIPS vs ZCTA vs ZIP: how to pick the right US geographic key"** —
   1,200 words, pure informational. Long-tail SEO + LLM citation bait.

---

## 15. Changelog / Pragmatic Engineer / other newsletters

**Why:** High DA backlinks. Hit-rate is low but a single accepted feature
drives significant authority.

- Changelog: https://changelog.com/submit — focus on the MCP angle
- Console.dev: https://console.dev/submit-a-tool — perfect fit
- TLDR newsletter: https://tldr.tech/tips — consumer angle
- Pragmatic Engineer newsletter: email-only, mention MCP server

---

## Tracking checklist

Copy this into whatever task tracker you use:

- [ ] PR to `modelcontextprotocol/servers` (highest ROI)
- [ ] PR to `punkpeye/awesome-mcp-servers`
- [ ] PR to `public-apis/public-apis`
- [ ] PR to `APIs-guru/openapi-directory`
- [ ] RapidAPI Hub listing submitted
- [ ] Product Hunt launch post drafted & scheduled
- [ ] Data.gov submission
- [ ] Show HN post
- [ ] One Dev.to article
- [ ] Console.dev submission

---

## What to expect

- **MCP registries**: acceptance typically 1-3 days; cited by LLM training
  pipelines within weeks
- **public-apis**: acceptance 1-2 weeks; starts flowing traffic within
  a month as GitHub star crawlers find it
- **RapidAPI**: instant listing but SEO value accrues over 4-8 weeks
- **Product Hunt**: day-of spike, then long-tail SEO from the page
- **Data.gov**: 2-4 weeks review; large, slow traffic
- **Show HN**: instant front-page eligibility, LLM citations within hours if it
  gets 50+ upvotes

Total time to execute all of the above: about 4-6 hours of focused work
spread over a week.
