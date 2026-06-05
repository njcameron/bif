# The lens catalog

This is the scoring rubric: the lenses an idea is judged through. There are two classes. **Hard
gates** are binary kill / strong-flag conditions, checked structurally against the founder's rubric.
**Weighted lenses** each score 0–5 with a one-line rationale. The ambition tier re-weights the
lenses — see `./ambition-tier-weighting.md`.

Voice the traditions where useful so the founder knows where a judgment comes from: Lean Startup, YC
(the office-hours line), and Rob Walling / *Startups for the Rest of Us* / MicroConf (the
bootstrapper lens).

## Hard gates (checked structurally, never on parsed prose)

Each gate's **severity comes from the founder profile's `rubric.hard_gates`** (`kill`, `penalty`, or
`flag`). The pre-screen and synthesis branch on those values — they do not re-decide severity.

| Gate | Kill/flag condition | Default severity | Source |
|------|--------------------|------------------|--------|
| `soc2_required` | Can't be sold without SOC 2 / heavy compliance | kill | founder rubric |
| `business_critical` | Downtime = customer catastrophe | kill | founder rubric |
| `high_touch_sales` | Only closes via calls/demos | penalty | founder rubric (configurable) |
| `viable_gross_margin` | COGS/inference eats an unviable share of price at the target band | kill | Lean / unit economics |
| `price_band_fit` | Can't realistically price in the founder's band | flag (tier-sensitive) | founder rubric |

The `high_touch_sales` gate is a one-word config: `penalty` by default (heavy score hit, not fatal),
flip to `kill` in the profile if the founder treats sales calls as a dealbreaker.

## Weighted lenses (score 0–5 each, with a one-line rationale)

| # | Lens | Scoring question | Tier-sensitive | Data source | Tradition |
|---|------|-----------------|----------------|-------------|-----------|
| 1 | Demand intensity | Painkiller or vitamin? Hair-on-fire? | mild | advisor phase + stress test | Lean / YC |
| 2 | Why now | What changed (cost, regulation, platform, behavior) that makes this viable *today*? | mild | advisor phase | YC |
| 3 | Reachable & payable audience | Is there a watering hole? Do they already pay for software? | **high** | advisor + light web | MicroConf / Walling |
| 4 | Market size (bottom-up) | At the price band, $1M ARR ≈ 80–800 customers — plausible to acquire & retain solo? | **high** | advisor + research | YC / Walling |
| 5 | Prior art | Been done? Feature vs. product vs. company — can an incumbent absorb it as a checkbox? | mild | `researching-competitors` | YC / Lean |
| 6 | Defensibility / moat | What compounds over time? | **high** | advisor + research | YC / Walling |
| 7 | AI-wave fit | Does it ride the agentic tailwind? AI-native? | low | advisor phase | suite |
| 8 | AI-commoditization risk | Will the next model release or a horizontal tool eat this? | low | advisor phase | suite (flip side of 7) |
| 9 | Founder-market fit | Does the founder's track record match what this needs? | mild | advisor + profile | YC |
| 10 | Unfair advantage ("why you") | Existing audience, list, reputation, integrations? | **high** | advisor + profile | Walling |
| 11 | Distribution | Channels + built-in virality; how does it spread? | mild | advisor phase | suite |
| 12 | SEO landscape | Keyword opportunity vs. difficulty; content angle | mild | `analyzing-seo-landscape` | suite |
| 13 | Operational load | Can *one person* run it — support, ops, on-call, churn-chasing? | mild | advisor + profile | Walling |
| 14 | Time-to-validation | Speed to first paying customer or a clean kill signal | **high** | advisor phase | MicroConf / Walling |

## How to score each lens

- **0–5 scale.** 0 = fatal weakness on this dimension; 5 = standout strength. Reserve 5 for genuinely
  exceptional; most lenses on a real idea land 2–4.
- **One-line rationale, evidence-anchored.** Tie the score to something concrete — a stress-test
  answer, a competitor finding, an SEO number, a profile fact. "active subreddit + paid-tool norm"
  beats "seems reachable." Cite the evidence file when the basis is external data.
- **Score the lens, not your mood.** The stress-test adversary's framing is input, not a verdict —
  don't let a bruising stress test drag every score down. Judge each lens on its own evidence.
- **Tier-weight at synthesis, not here.** Score each lens on its merits 0–5; the weighting by tier
  happens in synthesis (see `./ambition-tier-weighting.md`). Keep the two steps separate so the raw
  read stays legible.

## Lenses you might add

The founder may care about dimensions not in the default 14. Add them as weighted lenses if they
matter: **regulatory/legal risk**, **platform-dependency risk** (building on someone else's API),
**switching costs / retention**. Note any added lens in the scorecard so the rubric stays auditable.
