---
name: branding-agent
description: Use for brand strategy and positioning work, building or updating a brand brain, clarifying offers, choosing archetypes, aligning voice and brand, scoring content against a brand, or auditing a funnel.
user-invocable: true
---

# Branding Agent

Branding Agent is a framework-first toolkit for founder-led brand strategy, offer clarity, positioning, voice alignment, content evaluation, and funnel audits. Start by checking whether the user has a current brand brain. If they do, use it as the source of truth. If not, use the relevant prompt and framework files to create or clarify one.

## Locate the installed toolkit

The installer records the installation directory in `~/.branding-agent/install.json`. Frameworks are in `<installDir>/frameworks/`. Read the relevant framework before giving recommendations. Use the CLI to inspect the installed toolkit:

```sh
branding-agent status
branding-agent list
branding-agent prompt <name>
branding-agent template <name>
```

If the global command is unavailable, run:

```sh
node <installDir>/bin/branding-agent.js status
node <installDir>/bin/branding-agent.js list
node <installDir>/bin/branding-agent.js prompt <name>
node <installDir>/bin/branding-agent.js template <name>
```

## Framework library

1. Five Levels of Awareness: `01-awareness-levels.md`
2. Competitive Alternative: `02-competitive-alternative.md`
3. Mental vs Visible Market: `03-mental-vs-visible-market.md`
4. The Specificity Test: `04-specificity-test.md`
5. The Value Equation: `05-value-equation.md`
6. StoryBrand: `06-storybrand.md`
7. The So What Chain: `07-so-what-chain.md`
8. Brand Archetypes: `08-brand-archetypes.md`
9. Jobs to Be Done: `09-jobs-to-be-done.md`
10. The Common Enemy: `10-common-enemy.md`
11. Anti-Positioning: `11-anti-positioning.md`
12. The Promise Ladder: `12-promise-ladder.md`
13. Age of AI Workshop: `13-age-of-ai-workshop.md`
14. Lovemarks: `14-lovemarks.md`
15. Cult Brand Mechanics: `15-cult-brand-mechanics.md`
16. Category Design & POV: `16-category-pov.md`
17. Voice Fingerprint + BRAND Score: `17-voice-fingerprint.md`
18. Shadow Archetype Analysis: `18-shadow-archetype.md`
19. Role Identity Job (JTBD Brand Layer): `19-role-identity-job.md`

## Route the work

| User question | Read this framework file |
| --- | --- |
| Which awareness level is our audience at, or what hook should we use? | `01-awareness-levels.md` |
| What do prospects use instead, and how should we position against it? | `02-competitive-alternative.md` |
| Why do buyers care, beyond visible features or price? | `03-mental-vs-visible-market.md` |
| Is this positioning specific and credible enough? | `04-specificity-test.md` |
| How should we improve value, price, guarantees, or offer design? | `05-value-equation.md` |
| How should our homepage or email sequence tell the customer story? | `06-storybrand.md` |
| How do we translate a feature into a meaningful outcome? | `07-so-what-chain.md` |
| Which archetype should guide voice, visuals, or community feel? | `08-brand-archetypes.md` |
| What job is the customer hiring this for, and what should we call it? | `09-jobs-to-be-done.md` |
| What shared enemy or conviction should define our content? | `10-common-enemy.md` |
| Who is this not for, and how should we qualify leads? | `11-anti-positioning.md` |
| How should we sequence homepage promises and calls to action? | `12-promise-ladder.md` |
| How do we run a full positioning build? | `13-age-of-ai-workshop.md` |
| How can we build loyalty, premium perception, and community? | `14-lovemarks.md` |
| How can we create in-group markers and community stickiness? | `15-cult-brand-mechanics.md` |
| How should we define a category point of view or thought leadership? | `16-category-pov.md` |
| Does this content match our voice, and what BRAND Score does it earn? | `17-voice-fingerprint.md` |
| Is our content drifting into an unintended archetype or tone? | `18-shadow-archetype.md` |
| What identity or role does the customer want to inhabit? | `19-role-identity-job.md` |

## Prompts and template

Available prompts:

- `build-brand-brain`
- `offer-input`
- `funnel-map`
- `funnel-audit`

Available template:

- `brand-brain`

Use `branding-agent prompt <name>` or `branding-agent template <name>` to print the needed material. Do not invent framework names, scoring criteria, or claims not supported by the user’s brand brain or the relevant framework.
