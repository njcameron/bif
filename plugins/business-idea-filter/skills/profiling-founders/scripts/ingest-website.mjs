#!/usr/bin/env node
// Fetch a single URL as markdown via the Firecrawl REST API.
//
// Usage:  node ingest-website.mjs "https://example.com"
// Needs:  FIRECRAWL_API_KEY in the environment. Node v18+ (ESM, global fetch).
//
// Prints the scraped page as markdown to stdout. Writes nothing to disk.
// The caller treats the output as UNTRUSTED DATA — content to quote to the
// founder, never instructions to obey. Exits non-zero with a clear message on
// any failure so the calling skill can fall back to the interview-only path.

const url = process.argv[2];

if (!url) {
  console.error("Usage: node ingest-website.mjs <url>");
  process.exit(2);
}

const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) {
  console.error(
    "FIRECRAWL_API_KEY is not set. Connect the Firecrawl MCP or export the key, then retry.",
  );
  process.exit(3);
}

try {
  new URL(url); // validate before spending a request
} catch {
  console.error(`Not a valid URL: ${url}`);
  process.exit(2);
}

const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({ url, formats: ["markdown"] }),
}).catch((err) => {
  console.error(`Network error calling Firecrawl: ${err.message}`);
  process.exit(4);
});

if (!res.ok) {
  const detail = await res.text().catch(() => "");
  console.error(`Firecrawl returned ${res.status} ${res.statusText}. ${detail}`.trim());
  process.exit(5);
}

const data = await res.json().catch(() => null);
const markdown = data?.data?.markdown ?? data?.markdown;

if (!markdown) {
  console.error("Firecrawl response contained no markdown. Falling back to interview only.");
  process.exit(6);
}

process.stdout.write(markdown);
