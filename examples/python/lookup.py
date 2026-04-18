"""
Free US ZIP code API — Python example.
  pip install requests
  ZIP_API_KEY=... python lookup.py        # key optional, higher rate limits
Docs: https://zipcodeandcounty.com/docs
"""
import os
import sys
import requests

BASE = "https://zipcodeandcounty.com/api/v1"
API_KEY = os.environ.get("ZIP_API_KEY")
HEADERS = {"X-API-Key": API_KEY} if API_KEY else {}


def get(path: str) -> dict:
    r = requests.get(f"{BASE}{path}", headers=HEADERS, timeout=10)
    r.raise_for_status()
    return r.json()


def main():
    # Look up a ZIP
    z = get("/zip/90210")
    print(f"{z['zip']}: {z['city']}, {z['state']['abbr']} — "
          f"{z['county']['name']} County (FIPS {z['county']['fips']})")

    # Search / autocomplete
    s = get("/search?q=Beverly&limit=3")
    print("Matches:", ", ".join(r["zip"] for r in s["results"]))

    # Distance
    d = get("/distance?from=10001&to=90210")
    print(f"10001 -> 90210: {d['distance']['straight_line_miles']} mi "
          f"straight, {d['distance']['driving_estimate_time']} drive")

    # Bulk enrichment of a CSV-ish list
    for code in ["20301", "10118", "00501"]:  # Pentagon, Empire State, IRS
        z = get(f"/zip/{code}")
        print(f"  {code}: {z['city']}, {z['state']['abbr']}")


if __name__ == "__main__":
    try:
        main()
    except requests.HTTPError as e:
        print(f"API error: {e}", file=sys.stderr)
        sys.exit(1)
