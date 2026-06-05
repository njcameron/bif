# Synthesis and output

This is where the evaluation becomes something the founder acts on. Two artifacts come out of it: the
machine-readable `scorecard.json` (gate logic branches on this, never on prose) and the terminal
synthesis output (the verdict the founder reads). A tool that grades but never says what to *do* is
half-built — the cheapest experiment is the payload.

## The scorecard JSON

Write `scorecard.json` into the idea folder. Gate decisions and any future re-scoring branch on this
structure, never on parsed prose. Shape:

```json
{
  "schema_version": 1,
  "idea_slug": "2026-06-04-mssp-questionnaire-copilot",
  "ambition_tier": "bootstrapped",
  "hard_gates": {
    "soc2_required":     { "result": "pass", "severity": "kill" },
    "business_critical": { "result": "pass", "severity": "kill" },
    "high_touch_sales":  { "result": "fail", "severity": "penalty" },
    "viable_gross_margin": { "result": "pass", "severity": "kill" },
    "price_band_fit":    { "result": "pass", "severity": "flag" }
  },
  "lenses": [
    { "id": 3, "name": "reachable_payable_audience", "score": 4, "weight": 1.5,
      "rationale": "active subreddit + paid-tool norm",
      "evidence": "evidence/competitors/2026-06-04-vendorx-pricing.md" }
  ],
  "weighted_total": 0.0,
  "gate_status": "clear"
}
```

- **`hard_gates`** — each gate carries its `result` (`pass` | `fail`) and the `severity` read from
  the founder profile. `gate_status` is computed from these: `killed` if any `kill`-severity gate
  failed; `flagged` if only `penalty`/`flag` gates failed; `clear` otherwise.
- **`lenses`** — one entry per weighted lens scored, with the 0–5 `score`, the tier `weight` applied,
  a one-line `rationale`, and the `evidence` file where the claim rests on external data.
- **`weighted_total`** — sum of `score × weight` across lenses. It's a relative signal for *this*
  founder at *this* tier, not an absolute grade — don't over-index on the exact number.

A helper script, `scripts/score.mjs`, computes `gate_status` and `weighted_total` from the gate
results and lens entries so the math is consistent and auditable. Use it rather than doing the
arithmetic by hand.

## The terminal synthesis output

Always produce these five parts, in this order:

### 1. Verdict — pursue / refine / kill, framed for the tier

State it plainly and frame it for the founder's game. A "kill" for VC may be "a fine bootstrap" —
say so. Lead with the verdict; don't bury it under analysis.

**If the profile has `vc_upside_welcome: true`,** the founder is primarily their stated tier but
open to venture scale. When an idea scored on the bootstrapped (or services) rubric *also* shows
genuine venture-scale potential — large market, a real moat, a why-now that could compound — call
that out as a bonus line: "Scored as a bootstrap, but there's a plausible VC-scale version here if
you wanted it: [one sentence]." Don't re-score; just surface the upside so it isn't missed.

### 2. Per-lens scorecard (compact table)

A readable table: lens, raw score, weight, weighted contribution, one-line rationale — and the
`weighted_total`. Include the hard-gate results above it. This is the audit trail in human form.

### 3. The single riskiest assumption

The one thing that, if false, sinks the idea. Not a list — *the* one. Name it as a falsifiable claim:
"This only works if [specific group] will pay [specific amount] for [specific outcome]." This is the
most valuable sentence in the whole evaluation; make it sharp.

### 4. The cheapest experiment to test it this week

Concrete, days not months, runnable now. Not a strategy — an action with a clear pass/fail signal.
"Post the offer in [specific community], ask 5 named people to pre-pay $X, kill if fewer than 2 say
yes by Friday." This is the Lean Startup payload — the reason the founder ran the board at all.

### 5. If pursue — the narrowest viable wedge

The smallest thing worth shipping first: one feature, one workflow, the version someone pays for this
week. Drawn straight from the stress-test Q4 answer. Omit this part if the verdict is kill.

## Voice separation

The synthesis voice is the **scorer** — a rubric judge weighing evidence — distinct from the
stress-test adversary. Don't let the adversary's bruising framing drag the verdict down, and don't
let the advisor's rapport inflate it. Score the evidence, frame it for the tier, and hand the founder
the riskiest assumption and the experiment. That hand-off is the product.
