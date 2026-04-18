<?php
// Free US ZIP code API — PHP example (PHP 7.4+).
//   ZIP_API_KEY=... php lookup.php
// Docs: https://zipcodeandcounty.com/docs

const BASE = "https://zipcodeandcounty.com/api/v1";

function api_get(string $path): array {
    $ch = curl_init(BASE . $path);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    if ($key = getenv("ZIP_API_KEY")) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-API-Key: $key"]);
    }
    $body = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($status !== 200) {
        throw new RuntimeException("API $status: $body");
    }
    return json_decode($body, true);
}

// Look up a ZIP
$z = api_get("/zip/90210");
printf("%s: %s, %s — %s County (FIPS %s)\n",
    $z["zip"], $z["city"], $z["state"]["abbr"],
    $z["county"]["name"], $z["county"]["fips"]);

// Search
$s = api_get("/search?q=Beverly&limit=3");
$zips = array_map(fn($r) => $r["zip"], $s["results"]);
printf("Matches: %s\n", implode(", ", $zips));

// Distance
$d = api_get("/distance?from=10001&to=90210");
printf("10001 → 90210: %s mi straight, %s drive\n",
    $d["distance"]["straight_line_miles"],
    $d["distance"]["driving_estimate_time"]);
