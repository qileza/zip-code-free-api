#!/usr/bin/env ruby
# Free US ZIP code API — Ruby example.
#   ruby lookup.rb        # no deps required
# Docs: https://zipcodeandcounty.com/docs
require "net/http"
require "json"

BASE = "https://zipcodeandcounty.com/api/v1"
API_KEY = ENV["ZIP_API_KEY"]

def api_get(path)
  uri = URI("#{BASE}#{path}")
  req = Net::HTTP::Get.new(uri)
  req["X-API-Key"] = API_KEY if API_KEY
  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, open_timeout: 5, read_timeout: 10) do |h|
    h.request(req)
  end
  raise "#{res.code}: #{res.body}" unless res.is_a?(Net::HTTPSuccess)
  JSON.parse(res.body)
end

# Look up a ZIP
z = api_get("/zip/90210")
puts "#{z['zip']}: #{z['city']}, #{z['state']['abbr']} — " \
     "#{z['county']['name']} County (FIPS #{z['county']['fips']})"

# Search
s = api_get("/search?q=Beverly&limit=3")
puts "Matches: #{s['results'].map { |r| r['zip'] }.join(', ')}"

# Distance
d = api_get("/distance?from=10001&to=90210")
puts "10001 → 90210: #{d['distance']['straight_line_miles']} mi, " \
     "#{d['distance']['driving_estimate_time']} drive"
