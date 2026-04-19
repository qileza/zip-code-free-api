---
description: Look up a single US ZIP code via zipcodeandcounty.com MCP
argument-hint: "<5-digit ZIP>"
---

Use the `lookup_zip` tool from the `zipcodeandcounty` MCP server to
fetch the full record for ZIP code `$ARGUMENTS`. Format the response
as a brief, readable summary covering:

- City, county (with FIPS code), state
- Time zone (with UTC offset and DST observance)
- Area codes
- Population, housing units, median income
- Median home value, median rent (if present)
- Median property tax annual (if present)
- Cost-of-living index vs US (if present)

If the ZIP doesn't exist, say so plainly and suggest searching by
city name with the `search_zips` tool.
