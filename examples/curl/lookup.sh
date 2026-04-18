#!/usr/bin/env bash
# Free US ZIP code API — cURL examples.
# Docs: https://zipcodeandcounty.com/docs
# Get a key (free, optional): https://zipcodeandcounty.com/auth/signup

set -euo pipefail

BASE="https://zipcodeandcounty.com/api/v1"
# API_KEY="zb_live_your_key_here"   # uncomment and fill in for higher limits
# AUTH_HEADER=(-H "X-API-Key: ${API_KEY}")

# --- Single ZIP lookup ------------------------------------------------------
echo "== /zip/90210 =="
curl -s "${BASE}/zip/90210" | jq .

# --- Search / autocomplete --------------------------------------------------
echo "== /search?q=Beverly =="
curl -s "${BASE}/search?q=Beverly&limit=3" | jq .

# --- Distance between two ZIPs ---------------------------------------------
echo "== /distance?from=10001&to=90210 =="
curl -s "${BASE}/distance?from=10001&to=90210" | jq '.distance, .travel_modes[2]'

# --- All ZIPs within 5 miles of 90210 --------------------------------------
echo "== /radius?zip=90210&radius=5 =="
curl -s "${BASE}/radius?zip=90210&radius=5&limit=5" | jq '.results'

# --- Area code lookup -------------------------------------------------------
echo "== /area-code/310 =="
curl -s "${BASE}/area-code/310" | jq .

# --- Weather (current + 7-day forecast) ------------------------------------
echo "== /weather/90210 (current only) =="
curl -s "${BASE}/weather/90210" | jq .current

# --- Health check -----------------------------------------------------------
echo "== /ping =="
curl -s "${BASE}/ping" | jq .
