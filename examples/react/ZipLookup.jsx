// Free US ZIP code API — React example.
// Drop into any React app. Uses the global fetch — no extra dependencies.
// Docs: https://zipcodeandcounty.com/docs
//
// A typeahead ZIP lookup that calls the free API as the user types, debouncing
// to respect the 5/day anonymous limit.  Add your API key in .env to get 10/day
// (or 2,000/day on the Pro plan — see https://zipcodeandcounty.com/pricing).
import { useEffect, useState } from "react";

const BASE = "https://zipcodeandcounty.com/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_ZIP_API_KEY || import.meta?.env?.VITE_ZIP_API_KEY;

export default function ZipLookup() {
  const [zip, setZip] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!/^\d{5}$/.test(zip)) {
      setData(null);
      return;
    }
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setErr("");
      try {
        const res = await fetch(`${BASE}/zip/${zip}`, {
          headers: API_KEY ? { "X-API-Key": API_KEY } : {},
          signal: controller.signal,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Lookup failed");
        setData(json);
      } catch (e) {
        if (e.name !== "AbortError") setErr(String(e.message ?? e));
      }
    }, 400);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [zip]);

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 420 }}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={5}
        value={zip}
        onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
        placeholder="Enter a 5-digit ZIP"
        style={{
          padding: "10px 12px",
          fontSize: 16,
          width: "100%",
          border: "1px solid #cbd5e1",
          borderRadius: 8,
        }}
      />
      {err && <p style={{ color: "#dc2626", marginTop: 8 }}>{err}</p>}
      {data && (
        <div style={{ marginTop: 12, padding: 14, background: "#f8fafc", borderRadius: 8 }}>
          <strong style={{ fontSize: 20, fontFamily: "monospace" }}>{data.zip}</strong>
          <div>{data.city}, {data.state.abbr}</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>
            {data.county.name} County &middot; {data.timezone.id}
            {data.demographics.population && <> &middot; pop. {data.demographics.population.toLocaleString()}</>}
          </div>
          <a
            href={`https://zipcodeandcounty.com/zip/${data.zip}`}
            target="_blank"
            rel="noopener"
            style={{ fontSize: 13, color: "#3b82f6", marginTop: 6, display: "inline-block" }}
          >
            Full profile →
          </a>
        </div>
      )}
    </div>
  );
}
