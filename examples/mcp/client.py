"""
Minimal MCP client for zipcodeandcounty.com — no dependencies beyond httpx.
  pip install httpx
  python client.py

Calls each of the 7 tools exposed by our MCP server so you can see the
shape of every response before wiring it into an agent framework
(LangChain, LlamaIndex, your own).

Docs: https://zipcodeandcounty.com/mcp
"""
import json
import os
import sys

import httpx

BASE = "https://zipcodeandcounty.com/api/mcp"
API_KEY = os.environ.get("ZIP_API_KEY")
HEADERS = {"X-API-Key": API_KEY} if API_KEY else {}


def rpc(method: str, params: dict | None = None) -> dict:
    r = httpx.post(
        BASE,
        json={
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params or {},
        },
        headers=HEADERS,
        timeout=30,
    )
    r.raise_for_status()
    body = r.json()
    if "error" in body:
        raise RuntimeError(body["error"])
    return body["result"]


def call_tool(name: str, args: dict) -> dict:
    return rpc("tools/call", {"name": name, "arguments": args})


def main():
    print("--- Available tools ---")
    tools = rpc("tools/list")["tools"]
    for t in tools:
        print(f"  {t['name']}: {t.get('description', '')[:80]}")

    print("\n--- lookup_zip(90210) ---")
    print(json.dumps(call_tool("lookup_zip", {"zip": "90210"}), indent=2)[:600])

    print("\n--- search_zips(Beverly) ---")
    print(json.dumps(call_tool("search_zips", {"query": "Beverly", "limit": 3}), indent=2))

    print("\n--- zip_distance(10001 -> 90210) ---")
    print(json.dumps(call_tool("zip_distance", {"from": "10001", "to": "90210"}), indent=2)[:400])

    print("\n--- county_info(06037) ---")
    print(json.dumps(call_tool("county_info", {"fips": "06037"}), indent=2)[:400])

    print("\n--- state_summary(CA) ---")
    print(json.dumps(call_tool("state_summary", {"state": "CA"}), indent=2)[:400])


if __name__ == "__main__":
    try:
        main()
    except (httpx.HTTPError, RuntimeError) as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
