# Business Idea Filter (BIF)

A Claude Code skill suite that pressure-tests business ideas against **your own** founder profile
and criteria — not a generic rubric. You brain-dump an idea; it interviews you where needed, runs
an adversarial office-hours stress test, fans out competitor and SEO research, scores the idea
against a weighted rubric tuned to your ambition tier, and ends with the one thing that matters
most: **the single riskiest assumption, and the cheapest experiment to test it this week.**

> **Scope:** BIF evaluates the *business opportunity* — demand, distribution, defensibility,
> founder-market fit, economics, durability. It does **not** plan architecture, tech stack, or
> implementation. If a session drifts into "how to build it," the advisor names the boundary and
> redirects. Dev planning is a different tool.

## Why it's different

The same idea is a great bet for one founder and a terrible one for another. BIF keeps your
**rubric and ambition tier** (VC / bootstrapped / services) in a persistent profile, and every
evaluation is scored against *that*. A bootstrapper sees "some competition is a green flag"; a VC
sees "crowded unless there's a sharp wedge." Same idea, honestly different verdicts.

## Install

```
/plugin marketplace add njcameron/bif         # or your fork's owner/repo
/plugin install business-idea-filter@bif
/reload-plugins
```

## The skills

| Skill | Role |
|-------|------|
| `profiling-founders` | One-time onboarding interview → persistent founder profile (your rubric lives here). |
| `validating-ideas` | The lead advisor. Orchestrates the whole evaluation and produces the verdict. |
| `researching-competitors` | Web subagent: prior art, the feature/product/company verdict, white space. |
| `analyzing-seo-landscape` | Routes to the `claude-seo` toolkit for keyword opportunity + content angle. |

The adversarial **office-hours stress test** runs as a phase inside `validating-ideas`.

## First run

1. **Set up your profile** — say *"set up my idea board"* or invoke `profiling-founders`. It asks
   five spoken-style questions (track record, constraints, goal, unfair advantages, ambition tier),
   optionally ingests your website, and writes a profile you can hand-edit any time.
2. **Validate an idea** — say *"is this worth building: …"* or invoke `validating-ideas`, then
   brain-dump. You'll get a tier-framed verdict, a per-lens scorecard, the riskiest assumption, and
   a concrete experiment to run this week.

## Where your data lives

Your founder profile and one folder per idea live under **`~/idea-board`** by default. Set the
`IDEA_BOARD_ROOT` environment variable to put them elsewhere (e.g. inside an Obsidian vault):

```bash
export IDEA_BOARD_ROOT="$HOME/Obsidian/MyVault/idea-board"
```

Each idea is a folder, not a file: the synthesized `dossier.md`, a machine-readable
`scorecard.json`, your verbatim brain-dump, and a quarantined `evidence/` tree of everything the
research stages captured — so a verdict stays auditable months later. **This data is yours and is
never part of the plugin repo.**

## Optional dependencies

BIF works without these, degrading gracefully — but they make it better:

- **Firecrawl** — for ingesting your website during onboarding. Connect a Firecrawl MCP server, or
  set `FIRECRAWL_API_KEY`. (Claude Code's built-in WebFetch is used automatically if available, so
  this is rarely needed.)
- **claude-seo** — for live keyword/SERP data in the SEO lens. Install the `agricidaniel-seo`
  marketplace and the `claude-seo` plugin. Without it, the SEO lens gives a qualitative read only.

  If you'd rather make `claude-seo` a hard, auto-installed dependency, add it to
  `plugins/business-idea-filter/.claude-plugin/plugin.json` under a `dependencies` array and
  allowlist its marketplace in `.claude-plugin/marketplace.json` via
  `allowCrossMarketplaceDependenciesOn`. It's left optional by default so BIF doesn't force a
  DataForSEO setup on everyone.

## Security model

Anything fetched from the web (competitor pages, your own marketing site) is treated as **data,
never instructions** — a page that says "ignore previous instructions" is quoted to you, not
obeyed. Research runs in subagents, isolated from anything that writes your profile.

## Attribution

The office-hours stress-test phase is adapted from the `office-hours` skill in
[gstack](https://github.com/garrytan/gstack) by Garry Tan, used under the MIT License. It is a
derivative: the gstack runtime plumbing and the promotional coda were removed, and it was refit to
run as a dossier-writing phase. See `plugins/business-idea-filter/LICENSE` for full notices.

## License

MIT — see `plugins/business-idea-filter/LICENSE`.
