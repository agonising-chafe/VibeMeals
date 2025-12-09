# Epic: Shop v1 – Shopping List

> Implement the Shop surface as defined in `spec-shop.md`, wired to Vision v4.6.0 and Golden Tests G2, G3, G5, G6.

---

## S1 – Shop View Layout & UI Binding

**Type:** Feature  
**Priority:** Critical (core shopping experience)  
**Wired to:** Vision §13.1 (v1 Thin Slice), spec-shop.md §2, G2  
**Depends on:** S2 (ingredient expansion logic)

#### Description

Build the Shop UI shell and wire it to ingredient data:

* Header showing week summary ("5 dinners this week")

* Ingredients grouped by category (Produce, Meat/Fish, Pantry, etc.)

* Each item with checkbox + quantity/unit

* "Used in: Recipe1, Recipe2" context (if available from S3)

* Conservative list generation: never remove critical recipe ingredients

#### Acceptance Criteria

* **Given** a plan with 5 dinners this week  
  **When** I open Shop  
  **Then** I see:

  * Header: "Shop – 5 dinners this week"

  * Grouped ingredient list (Produce, Meat/Fish, Pantry, Dairy, etc.)

  * Each item: [ ] 1 lb chicken breast, [ ] 2 bell peppers, etc.

  * Items organized logically within each category

* **Given** a recipe requires "2 bell peppers"  
  **Then** The shopping list includes "2 bell peppers" (conservative estimate)  
  **And** Quick Review can adjust, but base list never assumes user has it.

* **Given** I check off an item  
  **Then** It remains visible but styled as checked  
  **And** State persists if I navigate away and return.

* **Given** the plan is empty (0 dinners)  
  **When** I open Shop  
  **Then** I see a neutral empty state and **no** list, plus a CTA to go to Planner.

---

## S2 – Recipe → Ingredient Expansion & Consolidation

**Type:** Feature  
**Priority:** Critical (blocks S1, core Shop logic)  
**Wired to:** G2, G3, spec-shop.md §3.1  
**Depends on:** Planner P2 (need a plan to expand)

### Description

Take all dinners in the current plan and:

* Expand recipes into ingredients with scaled quantities for the household

* Consolidate duplicate ingredients (e.g., onions across multiple recipes)

* Map them into generic product descriptions

### Acceptance Criteria

* **Given** the plan has two recipes, both requiring 1 onion each, and household size means 1:1 scaling
  * **When** I compute the shopping list
  * **Then** I see a single ingredient entry: `Onions – 2` (with appropriate units if needed).

* **Given** scaling leads to fractional quantities (e.g., 1.5 lb chicken + 1 lb chicken)  
  **Then** the consolidated item shows a sensible sum (e.g., `Chicken breast – ~2.5 lb`).

* **Given** I add or remove a dinner from the plan and trigger recompute  
  **Then** the ingredient list reflects the new set of dinners accurately.

### Guardrail

No critical ingredients (proteins, main carbs, key veg, core sauces) are silently dropped during expansion/consolidation.

---

## S3 – Item Grouping & Context Display

**Type:** Feature  
**Priority:** High (improves shopping UX)  
**Wired to:** G2, spec-shop.md §2  
**Depends on:** S2

#### Description

Assign each consolidated ingredient to a category and surface which recipes use it.

#### Acceptance Criteria

* **Given** I have items: chicken, onions, milk, rice  
  **Then** I see them grouped roughly as:

  * Meat & Seafood: Chicken breast

  * Produce: Onions

  * Dairy & Eggs: Milk

  * Pantry & Dry: Rice

* **Given** `Onions` are used in 2 recipes  
  **Then** the row shows something like:

  * "Used in: Chili, Sheet-Pan Chicken" (truncated is fine for many recipes).

* **Given** a row is clicked (if you support expansion)  
  **Then** I can see a bit more detail about which recipes and how many times it's used (optional v1).

---

## S4 – Quick Review (Pantry Optimization)

**Type:** Feature  
**Priority:** High (reduces waste, supports G3, G6)  
**Wired to:** G3, G6, spec-shop.md §3.2  
**Depends on:** S2 (ingredient expansion), S7 (critical/non-critical classification)

#### Description

Add **[Quick Review]** button that shows 5–10 common pantry items user might already have (olive oil, salt, garlic, onions, etc.) and lets them remove those from the list.

#### Acceptance Criteria

* **Given** the base shopping list is generated

* **When** I tap **[Quick Review]**
  * **Then** I see a focused panel with ~5-10 common pantry staples:

  * "Do you already have these?"

  * [ ] Olive oil, [ ] Garlic, [ ] Onions, [ ] Salt, [ ] Black pepper (example)

  * "Hide these from my list" button at bottom

* **Given** I check 3 items and tap "Hide these"  
  **Then** Those items are removed from the main list  
  **And** I return to the full shopping list view.

* **Given** I skip Quick Review  
  **Then** All pantry items remain on the list (conservative default).

* **Scope bound:** Quick Review shows max 5–10 staples, not every ingredient.

#### **Guardrails (see S7):*

* Quick Review must **never** include:

  * Core proteins (e.g., chicken, ground beef)

  * Main carbs for mains

  * Key vegetables that define a recipe

* Skipping Quick Review must not block proceeding.

---

## S5 – Export & Sharing

**Type:** Feature  
**Priority:** High (enables real-world shopping)  
**Wired to:** G2, spec-shop.md §3.3  
**Depends on:** S1 (need UI to export from)

#### Description

Allow user to export shopping list via:

* Copy to clipboard

* Share to another app (email, notes, shopping apps)

* Print-friendly format (stretch)

#### Acceptance Criteria

* **Given** I have a shopping list

* **When** I tap **[Share]** or **[Copy]**
  * **Then** The full list is formatted cleanly:

  * "VibeMeals – Shopping List for Week of [date]"

  * Grouped by category (Produce, Meat/Fish, Pantry, etc.)

  * Checked items excluded (or marked separately)

* **Given** I select "Copy to clipboard"  
  **Then** The list is copied as plain text  
  **And** I see brief confirmation toast.

* **Given** I select "Share"  
  **Then** OS share sheet opens with formatted list as text.

---

## S6 – Mark Plan as "Shopped"

**Type:** Feature  
**Priority:** High (enables Plan Stability after shopping, Vision §7.X)  
**Wired to:** Vision §7.X, Planner P7, spec-shop.md §3.4  
**Depends on:** S1 (UI to trigger from), Planner P7 (Plan Stability logic)

#### Description

Add **[Done Shopping]** button that marks the plan as "shopped" and triggers Plan Stability mode (no silent regenerations behind the scenes).

#### Acceptance Criteria

* **Given** I've reviewed my shopping list

* **When** I tap **[Done Shopping]**
  * **Then** The plan is marked as "Shopped"
  * **And** Planner locks background regeneration (per Vision §7.X)
  * **And** Any future plan changes require explicit user action.

* **Given** the plan is marked "Shopped"  
  **And** I return to Planner  
  **Then** Planner shows a visual indicator (e.g., "🛒 Shopped – plan locked")  
  **And** I cannot accidentally regenerate the full plan.

* **Integration check:** This ticket syncs with Planner P7 (Plan Stability).

---

## S7 – Critical vs Non-Critical Ingredient Classification

**Type:** Task / Infrastructure  
**Priority:** Critical (blocks S4 Quick Review safety + S8 missing-item logic)  
**Wired to:** G3, G6, spec-shop.md §3.2, spec-today.md §3.2  
**Depends on:** Recipe data model

#### Description

Add a simple classification layer so the system can differentiate:

* **Critical**: protein, main carb, primary veg, key sauce base

* **Non-critical**: garnish, optional herb, topping

This will inform:

* What Quick Review is allowed to suggest (S4)

* How missing items are handled in Today (S8)

#### Acceptance Criteria

* **Given** the ingredient model  
  **Then** each ingredient can be classified at least as:

  * `critical = true/false` or similar.

* **Given** critical ingredients  
  **Then**:

  * They are **never** surfaced in Quick Review as "you might already have this."

  * Missing them triggers a full "missing ingredient" state in Today (see S8).

* **Given** non-critical ingredients  
  **Then**:

  * They may appear in Quick Review.

  * Missing them leads to a minor note in Today (if anything), not full "we can't cook this".

#### **Examples for v1:*

* Critical: chicken, ground beef, rice, pasta, bell peppers (if main veg), soy sauce (if key flavor)

* Non-critical: cilantro (garnish), sesame seeds (topping), optional lime wedges

---

## S8 – Missing Items Flow (Handoff to Today)

**Type:** Feature  
**Priority:** Medium (supports G6 adaptability)  
**Wired to:** G6, spec-shop.md §3.5, spec-today.md §3.2  
**Depends on:** S1 (UI), S7 (critical classification), Today T4 (missed preflight/swap logic)

#### Description

If user discovers missing ingredients while shopping, provide a clear path:

* Flag specific items as "couldn't find"

* Optional: mark items as "substituted" (e.g., "turkey instead of beef")

* Trigger Today view to suggest easier alternatives or swaps for critical missing items

#### Acceptance Criteria

* **Given** I'm in Shop view  
  **When** I long-press or tap menu on an ingredient (e.g., "chicken thighs")  
  **Then** I see options:

  * "Couldn't find this item"

  * "Mark as substituted" (optional v1)

* **Given** I mark "chicken thighs" as "Couldn't find"  
  **Then** System prompts:

  * "Do you want to swap tonight's dinner to something else?"

  * Yes → Opens Today view with swap suggestions

  * No → Item remains unchecked, user can handle manually

* **Given** I choose "Yes, swap tonight's dinner"  
  **Then** Today opens and shows alternatives that don't require chicken thighs  
  **And** If I select one, tonight's plan updates.

* **Given** I mark an item as **substituted** and enter "ground turkey instead of ground beef" (optional v1)  
  **Then**:

  * The item row shows that note

  * This substitution info is accessible to cooking logic (future: suggest safe adaptations)

* **Given** a missing item is **non-critical** (per S7, e.g., cilantro)  
  **Then**:

  * Today shows a minor note: "You're missing cilantro; you can still cook this recipe without it."

  * It does **not** trigger full swap flow.

* **Tone check:** "No problem, let's find something else." (supportive)

---

## S9 – Tone & Copy Pass for Shop

**Type:** Task  
**Priority:** Medium (critical for trust)  
**Wired to:** Vision §4.1 (Tone & Emotional Contract)  
**Depends on:** All prior Shop tickets (S1–S8)

#### Description

Audit all Shop copy against Vision §4.1. Ensure:

* No overwhelming "you must buy everything" framing

* Quick Review feels optional and helpful, not accusatory

* Missing items flow is supportive, not stressful

#### Acceptance Criteria

* **Given** I'm in Quick Review  
  **Then** Copy reads: "Do you already have these?" (neutral question)  
  **And NOT:** "Check what you have so you don't overbuy" (implies user error)

* **Given** I flag an item as "Couldn't find"  
  **Then** System responds: "No problem, let's find something else."  
  **And NOT:** "You should have checked before planning."

* All new/modified copy audited against Vision §4.1 examples.

---

## Dependencies Summary

``` text
S2 (Ingredient Expansion & Consolidation) ← CRITICAL FIRST
  ↓
S3 (Item Grouping) + S7 (Critical/Non-Critical Classification)
  ↓
S1 (Shop UI Layout)
  ↓
S4 (Quick Review) + S5 (Export) + S6 (Done Shopping) + S8 (Missing Items)
  ↓
S9 (Tone audit)
``` text

#### Suggested Sprint Sequencing
- Sprint 1: S2, S3, S7 (core data logic + classification)

- Sprint 2: S1, S5 (UI + export to enable real-world use)

- Sprint 3: S4, S6, S8 (Quick Review + Plan Stability + missing items)

- Sprint 4: S9 (tone polish)
S6 (Tone audit)
``` text

**Suggested Sprint Sequencing:**
- Sprint 1: S1, S3 (prove base list + export)
- Sprint 2: S2, S4 (Quick Review + Plan Stability)
- Sprint 3: S5, S6 (polish + missing items handling)

**Integration Points:**
- S2 depends on Planner P2 (need a plan to expand into ingredients)
- S3 requires ingredient category metadata (may be hardcoded in v1)
- S4 depends on S7 (critical classification) to avoid suggesting critical items
- S6 syncs with Planner P7 (Plan Stability)
- S8 triggers Today T4/T5 (swap flows) for critical missing items


