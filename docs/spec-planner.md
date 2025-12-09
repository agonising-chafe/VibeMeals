# Planner – v1 Specification

**Version:** 1.0.0  
**Status:** Implementation-Ready  
**Wired to:** VibeMeals Vision v4.6.0 (`vision.md`)  
**Golden Tests:** G1, G2, G4, G5, G6  
**Last Updated:** December 7, 2025  
**v1.0.0 Implementation:** Domain logic only (generatePlan, swapRecipe, toggleLock, removeDinner in `src/domain/planner.ts`)  
**UI Implementation:** Planned for v1.1+ (Nuxt 3 / Pinia stores)

> This spec translates the Vision into an implementation-ready definition for the **Planner (Week View)** surface.  
> All flows must respect Golden Tests and constraints defined in `vision.md`.
>
> **Note:** The section 3 (Layout & Wireframes) describes the eventual UI. In v1.0.0, the core domain logic (plan generation, recipe selection, swaps, locks) is implemented and tested. The UI will be built in v1.1+.

---

## 1. Purpose

Planner is the **once-a-week control room**.

- Primary job: Turn "this is my household + this is our week" into a **realistic dinner plan** in **5–10 minutes**.

- It is where week shapes, constraints, and learning show up as **dinners in slots**, not config.

#### Golden tests

- **G1:** Tonight is actually cookable  

- **G2:** Planning is a 5–10 min check-in  

- **G4:** Plans bend, they don't break  

- **G5:** Budget & waste respected  

- **G6:** Respect constraints & ability

---

## 2. Inputs & Assumptions

Planner uses:

- **Household profile**

  - Mode (family, solo, DINK, empty nest, large household)

  - Headcount

  - Target dinners/week (derived from mode, editable)

  - Time/effort preference (mix of Fast/Normal/Project)

  - Simple constraints (e.g., no pork, no gluten)

- **Historical behavior**

  - Favorites / successful recipes

  - Repeat guard (avoid spamming same meals)

  - Waste signals (recipes that lead to unused ingredients)

- **Store choice** (optional in v1; improves SKU hints, not required)

Planner output is a **week of dinners** aligned to the **week shapes** in `vision.md` §5.2.

---

## 3. Layout (Wireframe-Level)

### 3.1 Header

- Week label: `This Week – Jan 12–18`

- Household summary: `Family of 4 · 5 dinners · Fast & Normal mix`

- Primary action: **[Generate Plan]** / **[Regenerate]**

### 3.2 Main Grid

- Rows: Days (Mon–Sun)

- Columns: Dinner (only, for v1)

- Each day shows:

  - **Dinner card** (or "Empty")

    - Recipe title

    - Time band pill: Fast / Normal / Project

    - Servings count

    - Leftover icon if "cook once, eat twice"

  - Small indicators:

    - Preflight badge (if notable preflight that day)

    - Lock icon if user locked the slot

### 3.3 Week Summary Panel

- Dinners: e.g., `5 dinners planned (3 Fast, 2 Normal)`

- Preflight overview: e.g., `2 thaw days, 1 marinate day`

- Optional rough cost band (lite): `$ · $$ · $$$`

- Primary CTA: **[Next: Shop]** (disabled if no dinners planned)

---

## 4. Core Flows

### 4.1 First-Time Weekly Planning

#### Given

- Household profile is minimally set (mode, headcount, dinners/week)

#### Flow

1. User opens Planner → sees an empty hint view based on mode:

- Family: "Let's plan 4–6 dinners this week."

- Solo: "Let's plan 2–3 solid dinners this week."

1. User taps **[Generate Plan]**.

2. System:

- Applies week shape for their mode (vision §5.2)

- Picks recipes that:

  - Fit time bands (Fast/Normal/Project mix)

  - Respect constraints (diet, equipment, ability)

  - Avoid recent repeats

1. Grid populates with dinner cards per night.

2. User tweaks:

- Swap / Reroll on a card:

  - **Swap:** choose from a small set (2–4) of suitable alternatives.

  - **Reroll:** one-tap "similar vibe, different recipe."

- Lock slots they're happy with.

1. User taps **[Next: Shop]** to proceed.

#### Acceptance

- This flow must be realistically completable in **≤10 minutes** for typical users (G2).

- No multi-step wizard required before **[Generate Plan]**.

---

### 4.2 Editing an Existing Week

Users can adjust the current week without redoing everything.

#### Per-card actions

- **Swap**

  - Opens a small panel with 2–4 recipe suggestions:

    - Same or easier time band

    - Compatible with constraints

    - Similar cost/ingredient footprint where possible

- **Reroll**

  - Instantly replaces with a similar recipe (same general pattern: tacos ↔ bowls ↔ nachos).

- **Move**

  - Drag-and-drop card to another day **or**

  - "Move to…" menu with day list.

- **Delete**

  - Clears that day's dinner (marked as "Open" / "Leftovers / Out").

#### Plan stability (from `vision.md` §7.X)

- If the user has **not** yet completed the main shop:

  - **[Regenerate]** can recalc any unlocked slots.

- If the user **has** indicated the main shop is done (e.g., "I've shopped for this plan" flag):

  - **[Regenerate]** must:

    - Show a warning:  
      > "This will change your shopping list. You may need to adjust your cart. Continue?"

    - Respect all **locked slots** (never change them).

    - Prefer to only adjust **future days** and non-critical recipes.

  - Silent background changes to the current week are **not allowed** (see Plan Stability in vision).

---

### 4.3 Lighter / Chaos Weeks

Planner must support intentionally lighter weeks (G4).

#### Mechanism (v1 can be simple)

- A small "This Week" control (dropdown or slider):

  - `Number of dinners this week: [2–7]`

- Defaults from week shape by mode:

  - Family: 4–7

  - Solo: 2–4

  - DINK: 3–5

  - Empty nest: 3–4

  - Large: 3–5

#### Behavior

- When user reduces count and regenerates:

  - Planner fills only that many dinners.

  - Remaining nights are implicitly "leftovers / out / flex," shown as open blocks.

- No guilt copy; we do **not** frame fewer dinners as failure.

---

## 5. Design Guardrails (from Vision)

- **No forced 7×7 grid.**

  - Plan shape **must** respect household mode definitions.

- **No heavy setup gating Generate Plan.**

  - No pantry setup, long preference wizards, or tagging marathons as prerequisites.

- **Locks are sacred.**

  - Regenerate **never** touches locked slots.

- **Preflight visibility.**

  - Planner shows a simple overview of preflight-heavy days (icons per card + weekly summary).

- **Tone.**

  - Copy must follow Tone & Emotional Contract: no shame for light weeks or changes.

---

## 6. Open Questions / Future v2 Ideas

#### (Document but do not block v1)

- Multi-week planning horizons ("next week" view).

- Explicit "theme night" support (Taco Tuesday, etc.) beyond recipe-level metadata.

- Per-day "energy" sliders that modify time band targets dynamically.

- Calendar integration to show "late practice" or "work event" alongside plan.

