// Free US ZIP code API — Node.js example (Node 18+, ESM or CommonJS).
// No dependencies: uses the global fetch.
// Docs: https://zipcodeandcounty.com/docs

const BASE = "https://zipcodeandcounty.com/api/v1";
const API_KEY = process.env.ZIP_API_KEY; // optional — higher rate limits

async function get(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: API_KEY ? { "X-API-Key": API_KEY } : {},
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  // Look up a ZIP
  const zip = await get("/zip/90210");
  console.log(`${zip.zip}: ${zip.city}, ${zip.state.abbr} — ${zip.county.name} County`);

  // Search
  const { results } = await get("/search?q=Beverly&limit=3");
  console.log("Matches:", results.map((r) => r.zip).join(", "));

  // Distance
  const d = await get("/distance?from=10001&to=90210");
  console.log(
    `10001 → 90210: ${d.distance.straight_line_miles} mi straight-line, ` +
      `${d.distance.driving_estimate_time} drive`
  );

  // Nearby ZIPs within 5 miles
  const nearby = await get("/radius?zip=90210&radius=5&limit=5");
  console.log(
    `Within 5 mi of 90210:`,
    nearby.results.map((r) => `${r.zip} (${r.distance_miles} mi)`).join(", ")
  );
}

main().catch(console.error);
