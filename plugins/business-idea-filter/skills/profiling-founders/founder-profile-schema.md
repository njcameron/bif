# Founder profile schema

The founder profile is the persistent artifact every idea evaluation reads from. It captures
properties of *the founder*, not of any one idea — which is why the scoring rubric lives here.
A different founder scores the same idea differently; the profile is what makes that true.

## Location and format

- **Path:** `<idea-board-root>/founder-profile.md`. Every skill in the suite resolves the root the
  same way, by this precedence: (1) `$IDEA_BOARD_ROOT` if set; (2) the current working directory if
  it already holds a board (`founder-profile.md` or an `ideas/` folder); (3) the global
  `~/idea-board` if a profile already lives there; (4) otherwise the current working directory. In
  practice this means a profile you drop into — or create from — the folder you opened Claude Code in
  is found automatically, existing `~/idea-board` boards keep working from anywhere, and
  `IDEA_BOARD_ROOT` pins the board to one fixed place across all projects (e.g. inside your Obsidian
  vault).
- **Format:** Markdown with YAML frontmatter. The frontmatter holds the machine-readable fields
  (so the scorer can branch on structure); the prose body below it is room for nuance the
  founder wants recorded. This renders cleanly in Obsidian and stays hand-editable.

Keep the format stable once chosen — the advisor and scorer both parse the frontmatter.

## The schema

```yaml
---
schema_version: 1
ambition_tier: bootstrapped          # vc | bootstrapped | services  — the master switch (§7)
vc_upside_welcome: true              # optional; founder is primarily this tier but welcomes
                                     #   venture-scale upside if an idea has it (see note below)
ideas_root: ~/idea-board/ideas   # where idea folders live
track_record:
  summary: "~10y product eng; ex-founder, shipped two B2B SaaS products, one small exit"
  strengths: ["Rails + AI", "building in public", "0->1 product", "technical depth"]
goal:
  target: "$1M ARR as a solo operator"
  lifestyle: ["location independence", "SE Asia base"]
unfair_advantages:
  - "public audience / build-in-public"
  - "domain credibility from prior exit"
  - "community presence"
rubric:
  hard_gates:                        # trip one -> kill or strong-flag; checked structurally
    soc2_required: kill              # idea must NOT require SOC 2 attestation
    business_critical: kill          # downtime must NOT be a customer catastrophe
    high_touch_sales: penalty        # must close without sales calls/demos (kill | penalty)
    viable_gross_margin: kill        # inference/COGS must not break unit economics at target price
    price_band_fit: flag             # can realistically price in the band below
  preferences:                       # weighted, not binary
    price_band: { min: 100, max: 1000, period: month }
    built_in_virality: preferred
constraints:
  - "won't run a sales motion"
  - "solo / very small team"
website: "https://example.com"       # optional; source for Firecrawl ingest
---

# Notes

Free-form prose the founder wants on the record: domain interests, hard nos, things a
score should never override, context a future re-read would want. Optional.
```

## Field notes

- **`ambition_tier`** is the single most consequential field. It re-weights nearly every lens
  (see `validating-ideas/ambition-tier-weighting.md`). Always capture it explicitly; never infer it.
- **`vc_upside_welcome`** (optional, default false) handles the common "bootstrapped *but* open to
  VC if the potential is there" founder. Keep `ambition_tier` as their primary game (so the rubric
  weights stay calibrated to it), and set this flag so the synthesis stage *surfaces* venture-scale
  upside as a bonus when it spots it — without re-weighting the whole evaluation toward VC.
- **`rubric.hard_gates`** — each gate's value is its *severity*: `kill` (auto-fail at pre-screen),
  `penalty` (heavy score hit, not fatal), or `flag` (surface but don't penalize). This is how the
  sales-calls gate stays a one-word config: change `high_touch_sales: penalty` to `kill` and the
  pre-screen behavior changes with it. Default `high_touch_sales` to `penalty`.
- **`rubric.preferences.price_band`** anchors the market-size math (at $100–$1k/mo, $1M ARR is
  ~80–800 customers) and the price-band-fit gate.
- **`ideas_root`** lets the founder relocate their idea folders without touching the skills. If
  absent, skills fall back to `<idea-board-root>/ideas`.

## Why structured-plus-prose

Gate logic must branch on structure, never on parsed prose — `soc2_required: kill` is
unambiguous; "I'd really rather avoid SOC 2 if possible" is not. But founders think in prose, and
forcing every nuance into YAML loses signal. The frontmatter carries the decisions the machine
acts on; the body carries the judgment a human re-reader wants. Keep both honest.
