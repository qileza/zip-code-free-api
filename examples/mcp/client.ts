// Minimal MCP client for zipcodeandcounty.com — no dependencies beyond fetch (Node 18+).
//   ZIP_API_KEY=... tsx client.ts
// Docs: https://zipcodeandcounty.com/mcp

const BASE = "https://zipcodeandcounty.com/api/mcp";
const API_KEY = process.env.ZIP_API_KEY;

async function rpc(method: string, params: Record<string, unknown> = {}) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(API_KEY ? { "X-API-Key": API_KEY } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const body = (await res.json()) as { result?: unknown; error?: unknown };
  if (body.error) throw new Error(JSON.stringify(body.error));
  return body.result;
}

async function callTool(name: string, args: Record<string, unknown>) {
  return rpc("tools/call", { name, arguments: args });
}

async function main() {
  console.log("Available tools:");
  const tools = (await rpc("tools/list")) as {
    tools: Array<{ name: string; description?: string }>;
  };
  for (const t of tools.tools) {
    console.log(`  ${t.name}: ${(t.description ?? "").slice(0, 80)}`);
  }

  console.log("\nlookup_zip(90210):");
  console.log(await callTool("lookup_zip", { zip: "90210" }));

  console.log("\nzip_distance(10001 -> 90210):");
  console.log(await callTool("zip_distance", { from: "10001", to: "90210" }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
