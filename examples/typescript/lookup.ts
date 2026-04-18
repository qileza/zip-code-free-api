// Free US ZIP code API — TypeScript example (Node 18+).
// tsc --target es2022 --module nodenext examples/typescript/lookup.ts
// Docs: https://zipcodeandcounty.com/docs

const BASE = "https://zipcodeandcounty.com/api/v1";
const API_KEY = process.env.ZIP_API_KEY;

interface ZipLookup {
  zip: string;
  city: string;
  state: { abbr: string; name: string };
  county: { name: string; fips: string | null };
  coordinates: { lat: number; lng: number };
  timezone: { id: string; utc_offset: number; observes_dst: boolean };
  area_codes: string[];
  demographics: {
    population: number | null;
    housing_units: number | null;
    land_area_sqmi: number | null;
    water_area_sqmi: number | null;
    median_income: number | null;
  };
}

async function zipLookup(code: string): Promise<ZipLookup> {
  const res = await fetch(`${BASE}/zip/${code}`, {
    headers: API_KEY ? { "X-API-Key": API_KEY } : {},
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return (await res.json()) as ZipLookup;
}

async function main() {
  const zip = await zipLookup("90210");
  console.log(`${zip.city}, ${zip.state.abbr}`);
  console.log(`County: ${zip.county.name} (FIPS ${zip.county.fips})`);
  console.log(`Population: ${zip.demographics.population?.toLocaleString() ?? "n/a"}`);
  console.log(`Timezone: ${zip.timezone.id}`);
}

main().catch(console.error);
