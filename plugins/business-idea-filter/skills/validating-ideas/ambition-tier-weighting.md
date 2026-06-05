# Ambition-tier weighting (the master switch)

The founder's `ambition_tier` re-weights the lenses before the weighted total is computed. The same
idea, scored identically lens-by-lens, can be a "pursue" for a bootstrapper and a "kill" for a VC —
because the tiers value different things. Read the tier from the founder profile and apply the
weights below at synthesis. Never infer the tier; it's an explicit profile field.

## Default weights

Start every lens at weight **1.0**, then apply the tier multipliers below. Up-weight ≈ 1.5,
down-weight ≈ 0.5, inverted means the *direction* of a good score flips (see VC/bootstrapped notes
on competition). These are starting points — adjust within reason and record the weights you used in
the scorecard so the math is auditable.

| Tier | Up-weight (≈1.5) | Down-weight / inverted |
|------|------------------|------------------------|
| **VC** | Market size (4), defensibility/moat (6), why-now (2), demand intensity (1) | Tolerates thin early margin and slower validation; crowded market is OK *only with a sharp wedge* |
| **Bootstrapped** | Reachable & payable audience (3), time-to-validation (14), distribution (11), operational load (13), market size as unit-economics (4) | Huge TAM not required; **some competition is a GREEN flag** (validates willingness to pay) — zero competitors is *suspicious*; moat/virality matter less than cash-flow speed |
| **Services** | Billable demand (1), founder-market fit (9), unfair advantage (10) | Market size / moat / virality largely **N/A**; defensibility = relationships & reputation, not technology |

(Numbers in parentheses are lens IDs from `./lens-catalog.md`.)

## Tier-specific judgment notes

**VC.** The question is "can this be big and defensible?" A small but lovely bootstrap-shaped idea is
a *kill* here even if every lens is solid — say so explicitly, and note it would be a fine bootstrap.
Crowding is tolerable only if the wedge is sharp; thin early margins and slower validation are
acceptable in service of a large, defensible outcome.

**Bootstrapped.** The question is "can *this founder* get to cash flow fast and run it solo?"
Down-weight TAM and moat; up-weight reachable audience, time-to-validation, distribution, and
operational load. **Invert the competition read:** a populated market validates willingness to pay —
a green flag — while zero competitors usually means no market, not open field. Unit economics matter
more than enterprise value.

**Services.** The question is "is there billable demand this founder is uniquely positioned to
serve?" Market size, moat, and virality are mostly N/A — don't penalize their absence. Defensibility
is relationships and reputation. Founder-market fit and unfair advantage dominate.

## How to apply it at synthesis

1. Take the raw 0–5 score for each weighted lens (from `./lens-catalog.md`).
2. Multiply by the tier weight for that lens.
3. Sum to a `weighted_total`.
4. Frame the verdict for the tier — a number that reads as "kill" for VC may read as "pursue" for
   bootstrapped. The synthesis output must say which game it's scoring (see `./synthesis-and-output.md`).

Record `ambition_tier` and the per-lens weights in `scorecard.json` so a re-read months later can
see exactly how the tier shaped the verdict.
