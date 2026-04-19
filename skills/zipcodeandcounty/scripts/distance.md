---
description: Distance + travel time between two US ZIP codes
argument-hint: "<ZIP1> <ZIP2>"
---

Parse `$ARGUMENTS` as two whitespace-separated 5-digit ZIP codes
(call them `from_zip` and `to_zip`). Use the `zip_distance` tool from
the `zipcodeandcounty` MCP server to compute the distance between
them. Report:

- Straight-line miles + driving estimate (miles + time)
- Time-zone difference between the two ZIPs
- The fastest feasible travel mode and its time

If only one ZIP is supplied, ask the user for the second.
