---
description: Look up a US county by FIPS via zipcodeandcounty.com MCP
argument-hint: "<5-digit FIPS, e.g. 06037>"
---

Use the `county_info` tool from the `zipcodeandcounty` MCP server to
fetch the full rollup for county FIPS `$ARGUMENTS`. Summarize:

- County name + state
- ZIP-code count + city count
- Total population + housing units
- Time zones touched + area codes
- Adjacent counties (with FIPS so the user can drill down)

If the FIPS doesn't resolve, suggest the user verify it — reminding
them that the first 2 digits encode the state and the last 3 are
the county within the state.
