# Epic: Planner v1 – Weekly Control Room

> Implement the Planner (Week View) surface as defined in `spec-planner.md`, wired to Vision v4.6.0 and Golden Tests G1, G2, G4, G5, G6.

---

## P1 – Planner Grid Skeleton & Layout

**Type:** Feature  
**Priority:** Critical (blocks all other Planner work)  
**Wired to:** Vision §13.1 (v1 Thin Slice), spec-planner.md §3

#### Description

Build the core Planner UI shell:

* Header with week label, household summary, Generate/Regenerate button.

* 7-row grid (Mon–Sun) with a single Dinner column.

* Per-day "dinner card" placeholder that can show recipe info, time band, servings, lock and preflight icons.

* Week summary panel with dinner counts, time band breakdown, preflight overview, and **Next: Shop** CTA.

#### Acceptance Criteria

* **Given** I open Planner with no plan generated  
  **Then** I see:

* A header with week range (e.g. "This Week – Jan 12–18")

* A household summary (stubbed text is fine initially)

* A primary **Generate Plan** button

* A 7-row grid (Mon–Sun) with empty slots or placeholders

* A summary panel with:

* "0 dinners planned"

* **Next: Shop** button disabled

* **Given** I have a populated plan (can be mocked)  
  **Then** each day's card can show:

* Recipe title (e.g. "Sheet-Pan Chicken & Veg")

* Time band pill (Fast/Normal/Project)

* Servings text

* Optional lock + preflight icons

---

## P2 – Generate Plan (Initial Plan Creation)

**Type:** Feature  
**Priority:** Critical (core value proposition)  
**Wired to:** Vision §5.2 (Week Shapes), §8 (Recipe Catalog), G1, G2  
**Depends on:** P1

### Description

Wire **[Generate Plan]** to create a week of dinners based on:

* Household mode
* Headcount
* Target dinners/week
* Time band preferences
* Constraints (e.g., no pork, no gluten)

Apply **week shapes** from Vision §5.2 to determine **how many** dinners to generate and their time band mix.

### Acceptance Criteria

* **Given** a family household (mode: Family, headcount: 4, target dinners: 5) and an empty week
  * **When** I click **Generate Plan**
  * **Then** the grid is populated with ~5 dinners distributed across the week, not forced into all 7 nights.

* **Given** a solo household (mode: Solo, target dinners: 3)
  * **When** I click **Generate Plan**
  * **Then** only 2–4 dinners are filled (per Solo week shape), with the remaining days left empty.

* **Given** a household with "no pork" constraint
  * **When** I click **Generate Plan**
  * **Then** no dinner card includes any recipe tagged with pork as a main protein.

* **Given** a new user generating a plan for the first time
  * **Then** the full flow from landing in Planner → **Generate Plan** → seeing a filled week is achievable with no more than a couple of clicks and no required multi-step wizard (supports G2: ≤10 min planning).

* **Given** Generate Plan fails (no recipes match constraints, service timeout, etc.)
  * **Then** I see a clear error message ("We couldn't build a plan right now. Try again?")
  * **And** the grid remains in its prior state (empty or partially filled)
  * **And** I can retry without losing any locked slots.

---

## P3 – Swap & Reroll Dinner Card Interactions

**Type:** Feature  
**Priority:** High (enables plan tweaking)  
**Wired to:** G2, G4  
**Depends on:** P2

#### Description

For each planned dinner card, add actions:

* **Swap:** choose a different recipe from a small set of suggestions.

* **Reroll:** instantly replace with a similar recipe ("same vibe").

Suggestions must respect:

* Constraints (diet, equipment, ability)

* Approximate time band

* Household mode context

#### Acceptance Criteria

* **Given** a planned dinner card  

#### When**I click**Swap

**Then** I see a small panel with 2–4 alternative recipes that:

* Fit the same or easier time band

* Respect my constraints

* Are not obvious duplicates of the current recipe

* **Given** I select one of those alternatives  
  **Then** the existing card is replaced with the selected recipe, and the summary panel updates accordingly.

* **Given** a planned dinner card  

#### When**I click**Reroll

**Then** the recipe on that card is replaced with another of similar type (e.g., tacos ↔ burrito bowls), with no additional UI required.

* **Given** I Swap or Reroll  
  **Then** the **total dinners planned** and **time band mix** in the summary panel remain consistent with week shape constraints (no surprise "all Project" week).

---

## P4 – Lock/Unlock Slots & Stable Regenerate

**Type:** Feature  
**Priority:** High (supports plan stability)  
**Wired to:** Vision §7.X (Plan Stability), G4  
**Depends on:** P2

#### Description

Allow users to lock specific dinners they like. When **Regenerate** is used:

* Locked slots must remain unchanged.

* Only unlocked slots are re-planned.

Later, this works together with the "main shop done" flag (P7).

#### Acceptance Criteria

* **Given** a week with several planned dinners  
  **When** I click a "lock" control on a dinner card  
  **Then** that slot shows a lock icon.

* **Given** at least one locked and at least one unlocked dinner  

#### When**I click**Regenerate

**Then**:

* All locked dinners remain unchanged.

* Only unlocked dinners may change to new recipes.

#### **Given** a week with **all slots locked*

#### When**I click**Regenerate

**Then** nothing changes (no cards are updated).

---

## P5 – Preflight Indicators & Weekly Summary

**Type:** Feature  
**Priority:** Medium (visibility, not blocking)  
**Wired to:** G1 (Tonight is cookable)  
**Depends on:** P2

#### Description

Surface preflight requirements (thaw, marinate, etc.):

* On each dinner card with a small icon/badge.

* In the Week Summary panel as "N thaw days, M marinate days" text.

This is a preview only; detailed handling lives in Today/Cooking Mode.

#### Acceptance Criteria

* **Given** a recipe that requires thawing the night before  
  **When** it appears as a dinner card  
  **Then** that card shows a preflight icon or badge.

* **Given** a week with 2 recipes that require thawing and 1 that requires marinating  
  **Then** the Week Summary panel shows something like:  
  "Preflight: 2 thaw days · 1 marinate day".

* **Given** a dinner with no notable preflight  
  **Then** that card shows no preflight icon.

---

## P6 – Lighter/Chaos Week Control (Dinners/Week)

**Type:** Feature  
**Priority:** Medium (supports G4: plans bend)  
**Wired to:** Vision §5.2 (Week Shapes), G4  
**Depends on:** P2

#### Description

Expose a control that lets users select how many dinners they want covered this week (within a sane range per mode). Feed this directly into Generate/Regenerate logic.

#### Acceptance Criteria

* **Given** I'm on Planner as a family household  
  **Then** I see a control like: `Dinners this week: [ 3  4  5  6  7 ]` (or a slider/dropdown) with a default derived from my week shape.

#### **Given** I change that control from 5 → 3 and click **Regenerate*

**Then** only 3 dinner slots are filled and the other nights are visibly "open" (leftovers / out), with no guilt-y copy.

* **Given** I am a solo user  
  **Then** the available values are constrained to solo ranges (e.g., 2–4) per Vision §5.2.

---

## P7 – Plan Stability After Shopping

**Type:** Feature  
**Priority:** High (protects trust / G4)  
**Wired to:** Vision §7.X (Plan Stability), G4  
**Depends on:** P4, P2

#### Description

Once the user has shopped for the current plan (triggered from Shop or a simple flag in Planner), regenerating must:

* Warn the user it will change the shopping list.

* Respect locks.

* Prefer not to change already-shopped-for dinners unless explicitly requested.

#### Acceptance Criteria

* **Given** I've created a plan and exported the shopping list  
  **When** the system sets or I manually set "I've shopped for this plan"  
  **Then** Planner treats this week as "shopped".

* **Given** my week is marked "shopped" and there are some unlocked slots  

#### When**I click**Regenerate

**Then**:

* I see a modal warning:  
    "This will change your shopping list. You may need to adjust your cart. Continue?"

* If I cancel, nothing changes.

* If I confirm, only **unlocked** slots may update.

* **Given** my week is marked "shopped"  
  **Then** no background/automatic changes occur to dinners without explicit user action (Swap/Reroll/Move/Delete), satisfying Plan Stability from Vision.

---

## P8 – Move/Delete Dinners & Keep Summary Accurate

**Type:** Feature  
**Priority:** Medium (quality-of-life)  
**Wired to:** G4  
**Depends on:** P2

#### Description

Allow users to move dinners across days and delete dinners entirely. Ensure the week summary (dinner count, time band mix) updates immediately.

#### Acceptance Criteria

* **Given** a planned dinner on Wednesday  
  **When** I drag it to Friday (or use a "Move to Friday" action)  
  **Then**:

* Friday shows that dinner.

* Wednesday is empty.

* The summary panel shows the same number of dinners as before (only days changed).

* **Given** a planned dinner on Thursday  
  **When** I delete it  
  **Then**:

* Thursday shows an empty slot / "open" state.

* Total dinners planned decreases by one in the summary.

---

## P9 – Tone & Copy Pass for Planner

**Type:** Task  
**Priority:** Medium (polish, but critical for trust)  
**Wired to:** Vision §4.1 (Tone & Emotional Contract)  
**Depends on:** All prior Planner tickets

#### Description

Review all user-facing copy in Planner against Vision §4.1 (Tone & Emotional Contract). Ensure:

* No shame-y language.

* No "you should have…" framing.

* Planning feels like a small check-in, not an exam.

#### Acceptance Criteria

* **Given** I configure a lighter week (fewer dinners)  
  **Then** I see neutral or supportive copy (e.g., "Planning 3 dinners this week") and **not** any "only" or "should" phrasing.

* **Given** I Regenerate a week multiple times  
  **Then** any helper text reinforces "tuning your week" and not "you messed up your last plan."

* All new/modified copy has been audited against Tone & Emotional Contract examples in Vision §4.1.

---

## Dependencies Summary

``` text
P1 (Skeleton)
  ↓
P2 (Generate Plan) ← Core value
  ↓
P3 (Swap/Reroll) + P4 (Locks) + P5 (Preflight) + P6 (Dinners/Week) + P8 (Move/Delete)
  ↓
P7 (Plan Stability after shop)
  ↓
P9 (Tone audit)
``` text

#### Suggested Sprint Sequencing
- Sprint 1: P1, P2 (prove core loop)

- Sprint 2: P3, P4, P6 (make it tweakable)

- Sprint 3: P5, P7, P8, P9 (polish + stability)
