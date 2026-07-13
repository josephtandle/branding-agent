# Framework: Voice Fingerprint (NNGroup 4-Axis Model)
> Source: Nielsen Norman Group — Voice and Tone research
> Also: CrawlQ BRAND Score; Situational Dynamics brand drift methodology
> Use for: quantifying brand voice, detecting drift, training AI on voice, cross-project comparison

---

## The Four-Axis Model

Brand voice can be quantified on four axes. Each scores 1-5. This creates a numerical fingerprint that enables drift detection, AI training, and cross-channel consistency checking.

| Axis | Pole 1 | Pole 5 | Notes |
|------|--------|--------|-------|
| **Tone** | Funny (1) | Serious (5) | How much levity vs. gravity |
| **Formality** | Casual (1) | Formal (5) | Register and distance |
| **Irreverence** | Irreverent (1) | Respectful (5) | Degree of convention-breaking |
| **Energy** | Matter-of-fact (1) | Enthusiastic (5) | Emotional temperature |

---

## Extended Fingerprint Components

Beyond the four axes, a complete voice fingerprint includes:

**Structural markers:**
- Average sentence length range (e.g., "12-20 words, high variance")
- Paragraph length default (e.g., "1-3 sentences")
- Header frequency (e.g., "never" or "always for sections over 200 words")
- List usage (e.g., "only when 4+ items, never for narrative")

**Syntactic preferences:**
- Active vs. passive voice ratio
- Question frequency
- Sentence opening patterns (behavior-first, question-first, claim-first)
- Punctuation rules (em dashes, ellipses, semicolons — allowed or banned)

**Lexical constraints:**
- Banned vocabulary (words that violate the voice)
- Preferred vocabulary (signature words that appear often)
- Technical terminology stance (accessible / moderate / expert)
- Metaphor and analogy preference (specific domain or universal)

**Platform calibrations:**
- Instagram: [axis scores adjusted per platform]
- Email: [axis scores]
- Website: [axis scores]
- DMs: [axis scores]

---

## How to Build a Voice Fingerprint

**Step 1 — Score existing best content**
Take 5-10 pieces of high-performing, on-brand content. Score each on all four axes. Average the scores. That is the baseline fingerprint.

**Step 2 — Document structural markers**
Measure sentence length, paragraph length, header frequency. Note syntactic patterns.

**Step 3 — Build the lexical list**
Identify signature words that appear frequently in best content. Identify words that feel wrong. Test each against "does this sound like us?"

**Step 4 — Run it through the Friend Test**
Read a piece of content aloud as if you were saying it to a friend. If it sounds stilted, the formality axis is too high. If it sounds flippant, the irreverence axis is too low.

**Step 5 — Write the negative profile**
Describe the opposite: what does off-brand content sound like? What voice would feel completely wrong? The negative profile is as useful as the positive for AI training.

---

## Drift Detection Protocol

Brand voice drifts when AI generates content without a strong enough fingerprint loaded. Common drift patterns:

- **Formality creep**: content gets more formal and distant over time
- **Buzzword infiltration**: banned vocabulary starts appearing
- **Energy collapse**: enthusiastic voice becomes matter-of-fact
- **Passive voice drift**: active voice is replaced by passive constructions
- **Sentence length inflation**: short sentences expand to clause-heavy prose

**Monthly audit process:**
1. Pull 10 recent content pieces across channels
2. Score each on the four-axis model
3. Compare scores to the baseline fingerprint
4. Flag any axis that has moved more than 0.5 points
5. Identify the specific pieces that show the drift
6. Trace back to the prompt or process that produced them

---

## The BRAND Score (CrawlQ) — Full Rubric

The most comprehensive content evaluation framework found. Use for all brand content scoring.

**B — Voice Fidelity (0-25)**
Does this match the linguistic fingerprint? Voice rules followed? Banned vocabulary absent? Structural defaults respected?
- 20-25: Strong fidelity. Voice is clearly recognizable.
- 15-19: Minor deviations. Feels close but not exact.
- 10-14: Noticeable drift. Generic phrases present.
- 0-9: Off-brand. Different brand could have written this.

**R — Reasoning Depth (0-20)**
Are claims grounded and specific? Real numbers, real stories, real evidence — or generic synthesis?
- 16-20: Every claim has specific grounding.
- 12-15: Most claims specific; some generic.
- 8-11: Mixed. Significant generic passages.
- 0-7: Mostly generic. Reads like AI average.

**A — Audience Alignment (0-20)**
Is this written for the real ICP? Uses their vocabulary, addresses their actual situation, speaks to their awareness level?
- 16-20: Reads like it was written about a specific person. They would recognize themselves.
- 12-15: Audience is clear but not sharply felt.
- 8-11: Generic audience. "Business owners" level.
- 0-7: Wrong audience or no evident audience.

**N — Novelty/Differentiation (0-20)**
Does this say something that couldn't be copy-pasted from a competitor? Activates the brand's POV, enemy, or conviction?
- 16-20: Uniquely this brand. No competitor could say this.
- 12-15: Mostly distinctive with some generic elements.
- 8-11: Could be from 2-3 competitors.
- 0-7: Generic. Anyone in the category could have written it.

**D — Deliverability (0-15)**
Is this channel-ready? Right length, right structure, right CTA, right hashtags, right links?
- 12-15: Post as-is.
- 9-11: Minor format edits.
- 6-8: Structural rework needed.
- 0-5: Wrong format for the channel.

**Total /100:**
- 85-100: GREEN — Publish ready
- 70-84: YELLOW — Minor edits
- 55-69: ORANGE — Rework required
- 40-54: RED — Major rework
- 0-39: MAROON — Do not publish

---

## Applied Example: Harborlight Studio Voice Fingerprint

| Axis | Score | Notes |
|------|-------|-------|
| Tone (Funny-Serious) | 3.5 | Warm and direct, with occasional lightness but not comedy |
| Formality (Casual-Formal) | 2 | Conversational and friend-to-friend |
| Irreverence (Irreverent-Respectful) | 2.5 | Willing to challenge app stacking while respecting practitioners |
| Energy (Matter-of-fact-Enthusiastic) | 3.5 | Genuine enthusiasm for building useful systems without performance |

**Structural markers:**
- Average sentence length: 12-20 words, with very short sentences mixed with longer ones
- Paragraphs: 1-3 sentences, never dense blocks
- Behavior-before-claim opening pattern: name what the practitioner does before naming the consequence
- No em dashes. No ellipses in copy. Periods and line breaks preferred.

**Signature vocabulary:** build, together, specific, system, client, practice, actually, something built
**Banned vocabulary:** leverage, utilize, seamless, cutting-edge, revolutionary, delve, game-changer, robust, innovative, synergy
