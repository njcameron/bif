#!/usr/bin/env node
// Compute gate_status and weighted_total for an idea scorecard.
//
// Usage:  node score.mjs <path-to-scorecard.json>
//         node score.mjs --stdin   < scorecard.json
//
// Reads a scorecard JSON (see synthesis-and-output.md for the shape), computes
// gate_status from the hard-gate results and their severities, and weighted_total
// from the lens scores and weights, then writes the updated JSON back to the file
// (or to stdout when reading from --stdin). Keeps the math consistent and
// auditable instead of doing arithmetic by hand. Node v18+ (ESM).
//
// gate_status rules:
//   killed  — any gate with severity "kill" has result "fail"
//   flagged — no kill failed, but some "penalty"/"flag" gate failed
//   clear   — no gate failed

import { readFileSync, writeFileSync } from "node:fs";

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node score.mjs <scorecard.json> | --stdin");
  process.exit(2);
}

const fromStdin = arg === "--stdin";
let raw;
try {
  raw = fromStdin ? readFileSync(0, "utf8") : readFileSync(arg, "utf8");
} catch (err) {
  console.error(`Could not read input: ${err.message}`);
  process.exit(3);
}

let card;
try {
  card = JSON.parse(raw);
} catch (err) {
  console.error(`Input is not valid JSON: ${err.message}`);
  process.exit(4);
}

const gates = card.hard_gates ?? {};
let anyKill = false;
let anyOther = false;
for (const g of Object.values(gates)) {
  if (g?.result === "fail") {
    if (g.severity === "kill") anyKill = true;
    else anyOther = true;
  }
}
card.gate_status = anyKill ? "killed" : anyOther ? "flagged" : "clear";

const lenses = Array.isArray(card.lenses) ? card.lenses : [];
card.weighted_total = Number(
  lenses
    .reduce((sum, l) => sum + (Number(l.score) || 0) * (Number(l.weight) || 0), 0)
    .toFixed(2),
);

const out = JSON.stringify(card, null, 2) + "\n";
if (fromStdin) {
  process.stdout.write(out);
} else {
  writeFileSync(arg, out);
  console.error(
    `gate_status=${card.gate_status}  weighted_total=${card.weighted_total}  (${lenses.length} lenses)`,
  );
}
