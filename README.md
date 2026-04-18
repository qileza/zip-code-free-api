# Zip Code Free API — Examples & Reference

**A free US ZIP code API** with examples for every major language, plus embeddable
widgets and public-domain reference data you can drop into any project.

Powered by **[zipcodeandcounty.com](https://zipcodeandcounty.com)** — data for all
41,000+ US ZIP codes, every county (with FIPS), every area code, IANA time zones,
ACS demographics, cost-of-living, school districts, and more.

---

## Quick start (30 seconds)

No API key needed for small-volume use. Try it right now:

```bash
curl https://zipcodeandcounty.com/api/v1/zip/90210
```

Response:

```json
{
  "zip": "90210",
  "city": "Beverly Hills",
  "state": { "abbr": "CA", "name": "California" },
  "county": { "name": "Los Angeles", "fips": "06037" },
  "coordinates": { "lat": 34.1005, "lng": -118.4146 },
  "timezone": { "id": "America/Los_Angeles", "utc_offset": -8, "observes_dst": true },
  "area_codes": ["310", "424"],
  "metro": { "name": "Los Angeles-Long Beach-Anaheim", "type": "metro" },
  "demographics": { "population": 21134, "housing_units": 9706 }
}
```

- **5 requests/day** anonymous — enough to try the full surface
- **10/day, 200/month** free with an API key → [grab one](https://zipcodeandcounty.com/auth/signup)
- **$19/mo and up** for production use → [pricing](https://zipcodeandcounty.com/pricing)
- Full reference: **[zipcodeandcounty.com/docs](https://zipcodeandcounty.com/docs)**

---

## What's in this repo

| Folder | Contents |
|---|---|
| [`examples/`](./examples) | Copy-paste HTTP snippets in cURL, JavaScript (Node + browser), TypeScript, Python, Go, Ruby, PHP, and React |
| [`widgets/`](./widgets) | Working HTML pages that embed the free iframe widgets (ZIP lookup, distance calculator, nearby ZIPs, county card) |
| [`data/`](./data) | Public-domain reference JSONs — state FIPS codes, state time zones, area-codes-by-state. Useful standalones. |

Everything is MIT-licensed (code) / CC0 (data). Fork, copy, reuse — no attribution required in production, a backlink is appreciated.

---

## Available endpoints

Every endpoint returns JSON. Full docs: **[zipcodeandcounty.com/docs](https://zipcodeandcounty.com/docs)**.

| Endpoint | What it does |
|---|---|
| `GET /api/v1/zip/:code` | Full ZIP code lookup — city, county, FIPS, lat/lng, timezone, area codes, demographics |
| `GET /api/v1/search?q=...` | Search/autocomplete by ZIP prefix, city, or county name |
| `GET /api/v1/distance?from=X&to=Y` | Distance between two ZIPs — straight-line, driving, 6 travel modes |
| `GET /api/v1/radius?zip=X&radius=N` | Every ZIP within N miles of a center ZIP |
| `GET /api/v1/compare?zip1=X&zip2=Y` | Side-by-side: demographics, cost of living, schools |
| `GET /api/v1/area-code/:npa` | NANPA telephone area code lookup |
| `GET /api/v1/weather/:zip` | Current + 7-day weather forecast |
| `POST /api/v1/batch` | Look up many ZIPs in one request (paid tiers) |
| `GET /api/v1/ping` | Health check for uptime monitors |

---

## Why a free US ZIP code API matters

Most "free" ZIP code APIs give you a few hundred lookups a month then paywall
the rest behind enterprise contracts. The worst ones return stale or incomplete
data — missing PO-box ZIPs, outdated county mappings, no demographic fields.

zipcodeandcounty.com runs on **official US government sources** refreshed
quarterly:

- **US Census Bureau** — ZCTA gazetteer + ACS 5-year estimates for demographics
- **HUD/USPS ZIP ↔ County crosswalk** — for area overlap
- **NANPA** — the authoritative telephone area code registry
- **NCES Common Core of Data** — school district directory
- **IANA tzdata** — time zone boundaries and DST rules

Want the methodology? See **[zipcodeandcounty.com/data-sources](https://zipcodeandcounty.com/data-sources)**.

---

## Frequently asked questions

### How do I look up the county for a ZIP code?

One HTTP call:

```bash
curl https://zipcodeandcounty.com/api/v1/zip/90210 | jq .county
# { "name": "Los Angeles", "fips": "06037" }
```

The `fips` field is the 5-digit Census FIPS code you can use to join against any
federal dataset. See [`examples/python/zip-to-county.py`](./examples/python/zip-to-county.py) for a full script.

### How do I calculate distance between two ZIP codes?

```bash
curl "https://zipcodeandcounty.com/api/v1/distance?from=10001&to=90210"
```

Returns straight-line (great-circle / haversine) distance, driving estimate,
and travel time for walking, biking, driving, bus, train, and flight.

### Is this really free?

Yes for anonymous and free-tier use (5–10 lookups/day). The
[paid plans](https://zipcodeandcounty.com/pricing) start at $19/mo for 2,000
lookups/day and scale to 25,000/day on Enterprise. No credit card required to
start.

### Can I use this commercially?

Yes. Free tier is fine for prototypes and small-scale use; paid tiers for
production. There's a [simple terms of service](https://zipcodeandcounty.com/terms)
— no usage category restrictions.

### What's the difference between a ZIP code and a ZCTA?

A **ZIP code** is a USPS mail delivery area. A **ZCTA** (ZIP Code Tabulation
Area) is the Census Bureau's geographic approximation of a ZIP, used for
demographic data. Most ZIPs map 1:1 to ZCTAs. PO-box-only ZIPs and unique
institutional ZIPs (e.g. the Pentagon, 20301) have no ZCTA — our API covers
them anyway via HUD/GeoNames data.

### How many ZIP codes are in the US?

About **41,000** active ZIP codes, spread across **3,243 counties** in 50
states, DC, and the territories. See
[zipcodeandcounty.com/data-sources](https://zipcodeandcounty.com/data-sources) for the full breakdown.

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

---

## Free embeddable widgets

Drop a ZIP lookup box onto any site with a single `<iframe>`. Works on
WordPress, Shopify, Webflow, Squarespace, or plain HTML. No script, no
dependencies, no account required.

```html
<iframe src="https://zipcodeandcounty.com/embed/lookup"
        width="440" height="320"
        style="border:0;max-width:100%"
        loading="lazy"></iframe>
```

Four widgets available:

- **Lookup** — single-ZIP info card
- **Distance** — between two ZIPs
- **Nearby** — all ZIPs within N miles
- **County** — county info with sibling ZIPs

Live preview + visual configurator with theme/colour/size controls:
**[zipcodeandcounty.com/widgets](https://zipcodeandcounty.com/widgets)**

See [`widgets/`](./widgets) in this repo for working HTML pages.

---

## Reference data (public domain)

Small JSON files every developer ends up needing. No API call required.

| File | Records | Source |
|---|---|---|
| [`data/state-fips.json`](./data/state-fips.json) | 56 | US Census Bureau |
| [`data/state-timezones.json`](./data/state-timezones.json) | 50 + DC | IANA tzdata |
| [`data/area-codes-by-state.json`](./data/area-codes-by-state.json) | ~300 | NANPA |
| [`data/sample-zips.json`](./data/sample-zips.json) | 100 famous ZIPs | zipcodeandcounty.com |

These are convenience files. For the full 41,000+ ZIP dataset, use the API at
[zipcodeandcounty.com](https://zipcodeandcounty.com).

---

## Rate limits

| Tier | Daily | Monthly | Batch size |
|---|---|---|---|
| Anonymous | 5 | 50 | — |
| Free (with key) | 10 | 200 | — |
| Pro ($19/mo) | 2,000 | 50,000 | 100 |
| Business ($79/mo) | 10,000 | 200,000 | 500 |
| Enterprise ($149/mo) | 25,000 | 500,000 | 1,000 |

[See pricing →](https://zipcodeandcounty.com/pricing)

Every response includes `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers.

---

## Contributing

PRs welcome for:
- Additional language examples (Rust, Swift, Kotlin, .NET, Elixir, Clojure, …)
- Framework integrations (Next.js, Astro, Rails, Laravel, Django, FastAPI, …)
- Widget styling examples or CMS-specific embed guides
- Fixes or clarifications to the reference data files

Please keep examples under 50 lines and avoid framework-heavy scaffolding —
these are designed to be drop-in snippets, not tutorials.

---

## License

- Code in [`examples/`](./examples) and [`widgets/`](./widgets): **MIT**
- Data in [`data/`](./data): **CC0 / public domain**

Maintained by **[zipcodeandcounty.com](https://zipcodeandcounty.com)**.
If this saved you time, the best thank-you is a backlink on the project you
shipped with it.
