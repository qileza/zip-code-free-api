// Free US ZIP code API — Go example.
//   ZIP_API_KEY=... go run lookup.go   // key optional
// Docs: https://zipcodeandcounty.com/docs
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

const base = "https://zipcodeandcounty.com/api/v1"

var client = &http.Client{Timeout: 10 * time.Second}

type ZipLookup struct {
	Zip         string `json:"zip"`
	City        string `json:"city"`
	State       struct {
		Abbr string `json:"abbr"`
		Name string `json:"name"`
	} `json:"state"`
	County struct {
		Name string `json:"name"`
		Fips string `json:"fips"`
	} `json:"county"`
	Coordinates struct {
		Lat float64 `json:"lat"`
		Lng float64 `json:"lng"`
	} `json:"coordinates"`
	Timezone struct {
		ID         string `json:"id"`
		UtcOffset  int    `json:"utc_offset"`
		ObservesDst bool  `json:"observes_dst"`
	} `json:"timezone"`
	AreaCodes    []string `json:"area_codes"`
	Demographics struct {
		Population int `json:"population"`
	} `json:"demographics"`
}

func get(path string, out any) error {
	req, _ := http.NewRequest("GET", base+path, nil)
	if key := os.Getenv("ZIP_API_KEY"); key != "" {
		req.Header.Set("X-API-Key", key)
	}
	res, err := client.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		body, _ := io.ReadAll(res.Body)
		return fmt.Errorf("%d: %s", res.StatusCode, body)
	}
	return json.NewDecoder(res.Body).Decode(out)
}

func main() {
	var z ZipLookup
	if err := get("/zip/90210", &z); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	fmt.Printf("%s: %s, %s — %s County (FIPS %s)\n",
		z.Zip, z.City, z.State.Abbr, z.County.Name, z.County.Fips)
	fmt.Printf("  population: %d, timezone: %s\n",
		z.Demographics.Population, z.Timezone.ID)
}
