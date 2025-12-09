# Epic: Today v1 – Tonight's Dinner

> Implement the Today surface as defined in `spec-today.md`, wired to Vision v4.6.0 and Golden Tests G1, G4, G6.

---

## T1 – Today View Skeleton & State Wiring

**Type:** Feature  
**Priority:** Critical (core daily surface)  
**Wired to:** Vision §13.1 (v1 Thin Slice), spec-today.md §2, G1  
**Depends on:** Planner P2 (need a plan to show tonight's dinner)

### Description

Build the core Today UI shell and wire it to the current plan:

* Header with date + tonight's recipe summary

* Preflight status card area (content populated by T2)

* Primary action buttons:

  * Start Cooking

  * Too much for today → Easier option

  * We're eating out instead

* Tomorrow preview strip (stub is fine initially, full implementation in T9)

### Acceptance Criteria

* **Given** there is a dinner planned for tonight
  * **When** I open Today
  * **Then** I see:

  * Header like "Today – Monday"

  * Summary like "Tonight: Sheet-Pan Chicken & Veg · Fast · Serves 4"

  * A preflight card area (even if showing "No special prep needed" for now)

  * Buttons:

    * Start Cooking

    * Too much for today → Easier option

    * We're eating out instead

* **Given** there is **no** dinner planned for tonight  
  **When** I open Today  
  **Then** I see a neutral state like:

  * "No dinner is planned for tonight."

  * A CTA to "Open Planner" (or similar)

  * And **no** broken/empty buttons

---

## T2 – Preflight State Engine (All Good vs Missed)

**Type:** Feature  
**Priority:** Critical (enables G1)  
**Wired to:** G1, spec-today.md §3.2  
**Depends on:** T1

#### Description

Compute and surface a simple preflight status for tonight's dinner using metadata from the plan/recipes:

* ALL_GOOD – either no preflight, or preflight considered done

* MISSED – required preflight likely not done (e.g., thaw, marinate, long pre-cook)

This is a simple v1 "is tonight actually viable?" check feeding the Today preflight card.

#### Acceptance Criteria

* **Given** tonight's recipe has no preflight requirements  
  **When** I open Today  
  **Then** the preflight card shows:

  * ✅ style message like "No special prep needed today."

  * And **does not** show a warning

* **Given** tonight's recipe requires thawing starting this morning and there is no indication it was done  
  **When** I open Today after the preflight window has passed  
  **Then**:

  * The preflight card shows a ⚠️ message like "It looks like we didn't get the chicken thawed in time."

  * The view is considered in MISSED state (used for flows in T4)

* **Given** we later add a simple "mark preflight done" input (even a stub toggle)  
  **When** that is set  
  **Then** Today must treat preflight as ALL_GOOD for that recipe and show the ✅ card

---

## T3 – Start Cooking → Cooking Mode Handoff

**Type:** Feature  
**Priority:** Critical (enables G1)  
**Wired to:** G1, spec-cooking.md  
**Depends on:** T1, Cooking Mode C1

### Description

Connect Today's **[Start Cooking]** button to a Cooking Mode experience for tonight's recipe:

* Step-by-step, numbered instructions

* Clear separation of steps

* Time band is visible (Fast/Normal/Project)

(Cooking Mode itself can be minimal for v1; this ticket is about the handoff.)

### Acceptance Criteria

* **Given** there is a dinner planned for tonight

* **When** I tap **[Start Cooking]**
  * **Then**:

  * I am taken to a Cooking Mode view for that recipe

  * I see numbered steps (1, 2, 3, …)

  * I see the time band label somewhere (e.g., "Fast · ~25 min")

* **Given** there is **no** dinner planned for tonight

* **When** I tap **[Start Cooking]**
  * **Then**:

  * The button is disabled or not shown

  * I am not taken to a broken Cooking Mode

---

## T4 – Missed Preflight Flow (Recovery Options)

**Type:** Feature  
**Priority:** High (prevents G1 failures)  
**Wired to:** G1, spec-today.md §3.2  
**Depends on:** T2 (preflight state engine)

#### Description

When preflight is MISSED, Today should show a warning and give a minimal set of options:

* Swap tonight's dinner to a different recipe that doesn't require the missed preflight

* Move tonight's dinner to a later day

* Use a backup/simple alternative (if we support this for v1)

#### Acceptance Criteria

* **Given** tonight's preflight is in MISSED state  
  **When** I open Today  
  **Then** I see:

  * A ⚠️ card like "It looks like we didn't get the chicken thawed in time."

  * And an option group (buttons or list) including at least:

    * Swap tonight's dinner

    * Move this dinner

#### **Given** I choose **Swap tonight's dinner*

  **Then**:

* I see 1–3 alternative recipes:

  * That do not require the missed preflight

  * That are at most the same time band (or easier)

* If I pick one:

  * Tonight's recipe in the plan is updated

  * Today immediately reflects the new recipe/info

  * Planner is updated behind the scenes

#### **Given** I choose **Move this dinner*

  **Then**:

* I can pick a later day this week

* Tonight becomes open/empty in the plan

* The selected later day gets this dinner

* Today view for tonight now shows "No dinner planned for tonight" or a suitable fallback

* Tone requirement: no copy implying "you failed; you should have thawed sooner"; messages are neutral/supportive

---

## T5 – "Too Much Tonight → Easier Option" Flow

**Type:** Feature  
**Priority:** High (enables G4, G6)  
**Wired to:** G4, G6, spec-today.md §3.3  
**Depends on:** T1

#### Description

Support the "I don't have energy for this" path:

* Offer 1–3 easier recipes for tonight that reuse as many already-bought ingredients as possible

* Swap tonight's dinner if the user chooses one

#### Acceptance Criteria

* **Given** there is a dinner planned for tonight  

#### When**I tap**[Too much for today → Easier option]

  **Then**:

* I see a small list of 1–3 suggested alternatives

* Each alternative shows:

  * Name

  * Time band

  * Short effort description (e.g., "~20 min, 1 pan")

* **Given** I select one of those alternatives  
  **Then**:

  * Tonight's dinner in the plan is swapped to that recipe

  * Today immediately updates to show the new dinner

  * Planner is updated behind the scenes (no need to open Planner)

* **Given** I cancel the Easier Option dialog  
  **Then**:

  * Tonight's original dinner remains unchanged

* Guardrail: suggestions must not require more effort or more complex preflight than the original (G6)

---

## T6 – "We're Eating Out Instead" Flow

**Type:** Feature  
**Priority:** Medium (supports G4)  
**Wired to:** G4, spec-today.md §3.4  
**Depends on:** T1

#### Description

Allow users to mark tonight as "out" and decide what to do with the planned dinner:

* Move it to another day

* Or drop it from the plan

#### Acceptance Criteria

* **Given** there is a dinner planned for tonight  

#### When**I tap**[We're eating out instead]

  **Then**:

* Tonight's slot is marked as "Out / Skipped" in Today

* I see a simple prompt:
    "What should we do with tonight's planned dinner?"

  * [Move it to another day this week]

  * [Leave it off the plan]

* **Given** I choose "Move it to another day this week" and pick a day  
  **Then**:

  * That day gets the dinner in the plan

  * Tonight remains marked as "Out"

* **Given** I choose "Leave it off the plan"  
  **Then**:

  * The dinner is removed from the plan for tonight

  * Planner no longer shows that dinner anywhere

* Tone requirement:

  * The final message is something like "Got it, enjoy your night out."

  * No shaming language (no "you skipped your plan" scolding)

---

## T7 – Change Tonight's Dinner (Mini Swap)

**Type:** Feature  
**Priority:** Low (nice-to-have)  
**Wired to:** G4  
**Depends on:** T1, Planner P3 (swap logic)

#### Description

Provide a small "Change tonight's dinner" link/CTA that lets users quickly swap tonight without going back to Planner.

#### Acceptance Criteria

* **Given** there is a dinner planned for tonight  
  **Then** I see a subtle link or button like "Change tonight's dinner"

* **When** I tap it  
  **Then**:

  * I see a small overlay/panel with 3–6 alternative recipes

  * Suggestions respect:

    * time band,

    * constraints,

    * household mode

* **When** I choose a new dinner  
  **Then**:

  * Tonight's dinner in the plan is updated

  * Today updates to show the new dinner

  * Planner reflects the same change

* **Given** I cancel the mini swap  
  **Then** no changes are applied

---

## T8 – Tomorrow Preview Strip

**Type:** Feature  
**Priority:** Low (nice-to-have)  
**Wired to:** spec-today.md §2  
**Depends on:** T1

#### Description

Show a small, non-intrusive preview of tomorrow's dinner and any notable preflight needs.

#### Acceptance Criteria

* **Given** there is a dinner planned for tomorrow  
  **When** I open Today  
  **Then** I see a strip like:

  * "Tomorrow: Slow Cooker Chili (start by 9am)"

  * with a link or button "View tomorrow"

* **Given** tomorrow's dinner has important preflight (e.g., early start)  
  **Then** the preview includes that cue (e.g., "start by 9am", "thaw tonight")

* **Given** there is no dinner planned for tomorrow  
  **Then** the preview either:

  * Shows nothing, or

  * Shows neutral text like "No dinner planned for tomorrow yet", with a link to Planner

---

## T9 – Tone & Copy Pass for Today

**Type:** Task  
**Priority:** Medium (critical for trust)  
**Wired to:** Vision §4.1 (Tone & Emotional Contract)  
**Depends on:** All prior Today tickets

#### Description

Audit all Today view copy against the Tone & Emotional Contract (Vision §4.1).

#### Acceptance Criteria

* **Given** I hit the missed preflight state  
  **Then** the text focuses on "here are your options" and not "you forgot / failed"

* **Given** I tap "We're eating out instead"  
  **Then** the text normalizes that choice ("Got it, enjoy your night out") and does **not** imply failure

* **Given** I use "Too much → Easier option"  
  **Then** the copy validates the overload and doesn't imply "you should be able to handle this."

---

## Dependencies Summary

``` text
T1 (View Skeleton)
  ↓
T2 (Preflight State Engine) + T8 (Tomorrow Preview - stub in T1)
  ↓
T3 (Start Cooking handoff) + T4 (Missed Preflight) + T5 (Too much → Easier) + T6 (Eating out) + T7 (Change dinner)
  ↓
T9 (Tone audit)
``` text

#### Suggested Sprint Sequencing
- Sprint 1: T1, T2, T3 (prove happy path + preflight logic)

- Sprint 2: T4, T5, T6 (escape hatches)

- Sprint 3: T7, T8, T9 (polish + tomorrow preview)

#### Integration Points
- T1 depends on Planner P2 (need a plan)

- T2 computes preflight state from recipe metadata

- T3 depends on Cooking Mode C1 (handoff target)

- T4/T5/T6/T7 interact with Planner for swaps/moves

- T8 reads tomorrow's plan data

