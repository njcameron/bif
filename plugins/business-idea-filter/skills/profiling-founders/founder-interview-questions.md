# Founder interview — the five questions

These are designed to be answered *out loud*. The founder will often dictate, so answers arrive
as messy, run-on, transcribed prose. That is fine and expected. Your job is to extract structured
fields from rambling answers — never to demand tidy input. Ask one question at a time, let the
answer breathe, reflect back what you heard, then move on.

A good interview feels like a sharp friend who already respects your time, not a form. Probe only
where the answer is too vague to populate the schema. Two follow-ups maximum per question — past
that you are extracting diminishing returns and burning goodwill.

## How to run it

- **One question per turn.** Ask, stop, listen. Don't batch.
- **Extract, don't transcribe.** After each answer, pull out the schema fields and say what you
  captured: "Got it — so strengths are X, Y, Z; you'll happily do A but never B." Let the founder
  correct you. This catches misreads early and makes the founder feel heard.
- **Probe vague answers once or twice, then accept.** Use the probes below when an answer stays at
  category level ("enterprises," "developers") instead of specifics.
- **Don't invent.** If the founder doesn't give you something, leave the field empty and note it.
  A profile with honest gaps beats a profile padded with your guesses.

## Q1 — Track record

**Ask:** "Tell me what you've actually built and shipped — companies, products, exits, the work
you're genuinely good at. Not the LinkedIn version. What can you do that most people can't?"

**Populates:** `track_record.summary`, `track_record.strengths`.

**Probes:** "What part of that did *you* personally do versus the team?" · "What's the thing people
come to you for?" · "Where have you shipped 0→1 before, specifically?"

**Watch for:** strengths stated as aspirations ("I want to get good at sales") rather than
demonstrated ability. Capture demonstrated strengths; note aspirations separately in the body.

## Q2 — Constraints

**Ask:** "What are your hard limits? Time per week, capital you can put in, and the things you
flatly won't do — like 'no sales calls' or 'no managing a team.'"

**Populates:** `constraints`, and informs `rubric.hard_gates` (especially `high_touch_sales`).

**Probes:** "Is 'no sales calls' a strong preference or a genuine dealbreaker?" · "How many hours a
week, realistically, not aspirationally?" · "What would make you walk away from an otherwise great
idea?"

**Watch for:** the difference between "I'd prefer not to" and "I won't." That distinction decides
whether something becomes a `kill` gate or a `penalty`. Ask directly when it's ambiguous.

## Q3 — Goal

**Ask:** "What does winning look like — the actual number, and the life around it? '$1M ARR solo
while living anywhere' is a different game than 'venture-scale, build a big team.'"

**Populates:** `goal.target`, `goal.lifestyle`, and is a strong signal for `ambition_tier`.

**Probes:** "Is that a revenue number, a profit number, or an exit number?" · "Solo, or are you
open to a team?" · "What lifestyle constraints are non-negotiable?"

**Watch for:** goals that quietly contradict the ambition tier they'll later claim (e.g. "$50M
exit" but "bootstrapped, solo, no fundraising"). Surface the tension gently — it's better resolved
now than baked into every future score.

## Q4 — Unfair advantages

**Ask:** "What do you have that a random smart person starting today doesn't? An audience, an email
list, a reputation, communities you're in, integrations, distribution, domain credibility?"

**Populates:** `unfair_advantages`.

**Probes:** "How big and how engaged is that audience, concretely?" · "Have you ever converted that
audience into customers or revenue before?" · "Who already trusts you in this space?"

**Watch for:** generic advantages everyone claims ("I'm hardworking," "I move fast"). Push for
things that are genuinely scarce and *yours*. Distribution and existing audience are gold for the
bootstrapped tier — capture them precisely (numbers if available).

**Founders routinely undersell here — do not accept "I don't really have any" at face value.** It
is the single most common miscalibration in this interview. People discount the things that are
genuinely theirs (an audience, a real exit, recognizable past customers, a warm channel to buyers,
deep domain credibility) because those things feel ordinary *to them*. If the founder shrugs the
question off, reframe constructively using everything you already know — their track record from Q1,
and especially anything the **website ingest** surfaced (past companies, exits, talks, follower
counts, named customers). Reflect the real advantages back and let them confirm: "You said none,
but your site shows X, Y, Z — that's not nothing, that's the thing most solo founders wish they
had." Never invent advantages, but never let a modest founder bury real ones either.

## Q5 — Ambition tier (the master switch)

**Ask plainly:** "Which game are you playing with *this* board — VC-backed (swing for venture
scale), bootstrapped (profitable, sustainable, probably solo or small), or services (consulting,
done-for-you, billing your expertise)?"

**Populates:** `ambition_tier` — the single field that re-weights every later evaluation.

**Probes:** "If a great idea needed $2M of outside money to work, in or out?" · "Are you optimizing
for enterprise value or for monthly cash flow?"

**Why it's a question, not an inference:** the tier changes what counts as a *good* idea. For a
bootstrapper, some competition is a green flag and a huge TAM is irrelevant; for VC, those flip.
Get this wrong and every downstream score is calibrated to the wrong game. Ask it directly, every
time the profile is set up or revisited.

## Rubric capture (after the five)

Once the five questions are done, fold the founder's hard criteria into `rubric`:

1. **Confirm the hard gates.** Walk the founder through the default gates (SOC 2, business-critical,
   high-touch-sales, gross margin, price band) and ask which are genuine **kill conditions** versus
   **strong preferences**. Record each as `kill`, `penalty`, or `flag`. Default `high_touch_sales`
   to `penalty` unless the founder insists it's a dealbreaker.
2. **Capture the price band.** "What's a realistic monthly price for what you'd sell — a floor and a
   ceiling?" This anchors both the market-size math and the price-band gate.
3. **Note any preferences** like built-in virality that should nudge scores without gating.

Don't make this a second interrogation — it's a 2–3 minute confirmation pass on top of what the
five questions already surfaced.
