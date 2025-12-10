# Today – v1 Specification

**Version:** 1.1.0  
**Status:** Implementation-Ready  
**Wired to:** VibeMeals Vision v4.6.0 (`vision.md`); Data Model v1.3.1  
**Golden Tests:** G1, G4, G6  
**Last Updated:** December 9, 2025  
**v1.0.0 Implementation:** Domain logic only (computeTonightState in `src/domain/today.ts`)  
**UI Implementation:** Planned for v1.1+ (Nuxt 3 / Pinia stores)

> This spec defines the **Today** surface: the answer to "What's for dinner tonight?"  
> All flows must keep tonight actually cookable and let plans bend without shaming the user.
>
> **Note:** The sections below describe the eventual UI layout and flows. In v1.0.0, the core tonight-readiness logic (preflight detection, missing ingredients, status computation) is implemented and tested. The UI will be built in v1.1+.
>
> **v1.3.1 Note:** Ingredient identification now uses fully typed `IngredientKind` (including `'FRUIT'`) for accurate preflight status computation.

---

## 1. Purpose

Today is the **"do it tonight"** surface.

- Primary job: Make **tonight's** dinner actually cookable given the plan and shop (G1).

- Secondary: Provide **supported escape hatches** when reality changes (G4).

- It is not a planning or config view.

#### Golden tests

- **G1:** Tonight is actually cookable

- **G4:** Plans bend, they don't break

- **G6:** Respect constraints & ability

---

## 2. Layout (Wireframe-Level)

### 2.1 Header

- `Today – Monday`

- One-line summary:

- `Tonight: Sheet-Pan Chicken & Veg · Fast · Serves 4`

### 2.2 Preflight Status Card

One of:

- ✅ "You're all set for tonight."

- ⚠️ "Looks like we missed a step for tonight."

Includes a short explanation:

- "No special prep needed today."  
  or  

- "The chicken is still frozen; the original plan won't work as-is."

### 2.3 Primary Actions

Big, obvious buttons:

- **[Start Cooking]**

- **[Too much for today → Easier option]**

- **[We're eating out instead]**

Secondary link:

- "Change tonight's dinner" → mini Planner-like swap UI for just this night.

### 2.4 Tomorrow Preview (Optional v1)

Small strip:

- "Tomorrow: Slow Cooker Chili (start by 9am)"  

- Link: **[View tomorrow]** (jumps to Tomorrow view / planner anchor).

---

## 3. Core States & Flows

### 3.1 Normal "All Good" State

#### Given

- Plan accepted

- Main shop done

- No unmet preflight requirements for tonight

#### Then Today shows

- ✅ "You're all set for tonight."

- Recipe title, time band, servings

- [Start Cooking], [Too much → Easier], [We're eating out instead]

#### Actions

- **Start Cooking**

- Opens Cooking Mode:

- Step-by-step, numbered instructions.

- Time-aware steps, simple and clear.

- **Too much → Easier**

- See 3.3.

- **We're eating out instead**

- See 3.4.

---

### 3.2 Missed Preflight State

#### Given

- Tonight's recipe has required preflight (thaw/marinate/etc.)

- Based on fuzzy schedule and/or user input, system believes preflight did not occur

#### Then Today shows

- ⚠️ "It looks like we didn't get the chicken thawed in time."

- Short explanation.

- Offers 2–3 options:

1. **Swap tonight's dinner**  

- Choose a Fast recipe that doesn't require the missed preflight.

1. **Move this dinner**  

- Move to a later day and adjust plan accordingly.

1. **Use a backup (if viable)**  

- E.g., "Use pantry pasta and jarred sauce tonight instead."

Tone must be supportive and non-blaming (vision §4.1).

---

### 3.3 "Too Much Tonight → Easier Option"

#### Flow

1. User taps **[Too much for today → Easier option]**.

1. System proposes 1–3 easier alternatives, prioritizing:

- Fast recipes

- Use of ingredients already purchased

- Dinners that fit tonight's time window

1. Display each option with:

- Time band

- Approx time (e.g., "~20 min, 1 pan")

1. On selection:

- Tonight's dinner is swapped

- Planner updated behind the scenes

- Shopping implications minimal (reuse current ingredients when possible)

#### Guardrails

- Options list is **small** (1–3), never a big gallery.

- No extra required questions to use this escape hatch.

---

### 3.4 "We're Eating Out Instead"

#### Flow

1. User taps **[We're eating out instead]**.

1. System marks tonight as "Out / Skipped."

1. Offers simple follow-up:

- "What should we do with tonight's planned dinner?"

- [Move it to another day this week]  

- [Leave it off the plan for now]

1. If moved:

- Planner updates to reflect the change.

1. If left off:

- The dinner is canceled; leftover ingredients (if any) are handled fuzzily (future learning).

#### Tone

- Normalize going out:

- "Got it, enjoy your night out."

- No "you didn't stick to your plan."

---

## 4. Design Guardrails (from Vision)

- Always show **one clear answer** for tonight; Today is not a picker view.

- Preflight must be surfaced clearly (good/missed + options).

- All escape flows (Too much / Out instead) must:

- Preserve Plan Stability rules (no silent changes to other nights).

- Be guilt-free and low friction.

- No configuration or deep settings here; Today is about **execution**.

---

## 5. Open Questions / v2 Ideas

- Per-night "energy sliders" that feed into "Too much → Easier option" suggestions.

- Special handling for multi-dish nights (main + side) in Today vs Cooking Mode.

- Integration with calendar to surface "late night" or "busy day" context automatically.
