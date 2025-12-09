# Epic: Cooking Mode v1 – Step-by-Step Execution

> Implement Cooking Mode as defined in `spec-cooking.md`, wired to Vision v4.6.0 and Golden Tests G1, G4, G6.

---

## C1 – Cooking Mode Layout & Happy Path

**Type:** Feature  
**Priority:** Critical (core cooking experience, enables G1)  
**Wired to:** Vision §13.1 (v1 Thin Slice), spec-cooking.md §2, §3.1, G1  
**Depends on:** Today T2 (handoff from Today → Cooking)

### Description

Build Cooking Mode with step-by-step interface:

* Header showing recipe name + time band estimate

* Current step (large, clear, 2–3 sentences max)

* Progress indicator (Step X of Y)

* [Next Step] / [Back] / [I'm Done] buttons

* No assumed techniques (explain "dice," "simmer," etc.)

### Acceptance Criteria

* **Given** I tap "Start Cooking" on Today view for "Sheet-Pan Chicken & Veg"
  * **When** Cooking Mode opens
  * **Then** I see:

* Header: "Sheet-Pan Chicken & Veg · Fast (20–30 min)"

* Step 1 of 6: "Preheat your oven to 425°F."

* [Next Step] button prominent at bottom

* Optional [Back] button (disabled on Step 1)

* **Given** I tap [Next Step] 5 times  
  **Then** I progress through steps 2–6  
  **And** On Step 6 (final step), [Next Step] becomes [I'm Done].

* **Given** I tap [I'm Done] on the final step  
  **Then** I return to Today view  
  **And** Tonight's dinner is marked as "Completed" behind the scenes.

* **Copy check:** Each step max 2–3 sentences. No "obviously" or "simply."

---

## C2 – Timer Cues (Embedded in Steps)

**Type:** Feature  
**Priority:** High (supports G1)  
**Wired to:** G1, spec-cooking.md §3.4  
**Depends on:** C1

### Description

Embed timer cues directly into step copy with optional quick-set timer action.

### Acceptance Criteria

* **Given** Step 4 reads: "Put the pan in the oven and bake for 20 minutes."
  * **Then** The step includes:

* Inline copy: "bake for 20 minutes"

* Optional [Set 20-min timer] button below the step text

* **Given** I tap [Set 20-min timer]  
  **Then** A system timer starts (platform-dependent: browser notification, OS timer, etc.)  
  **And** Brief confirmation: "Timer set for 20 minutes."

* **Given** I don't tap the timer button  
  **Then** Cooking proceeds normally (user manages timing themselves).

* **Scope:** v1 uses simple inline timer buttons. No complex multi-timer orchestration.

---

## C3 – Missed Preflight Mid-Cook Recovery

**Type:** Feature  
**Priority:** Medium (supports G1 reliability)  
**Wired to:** G1, spec-cooking.md §3.2  
**Depends on:** C1

### Description

If user discovers preflight issue mid-cook (e.g., chicken not thawed), provide clear recovery path without abandoning entire session.

### Acceptance Criteria

* **Given** I'm on Step 3: "Slice the chicken into strips."
  * **And** I realize chicken is still frozen
  * **When** I tap [Help] or [Something's wrong]
  * **Then** I see options:

* "Chicken not ready? Swap to a backup recipe."

* "Pause and thaw quickly" (if viable)

* "Cancel cooking" (returns to Today)

* **Given** I choose "Swap to a backup recipe"  
  **Then** I see 1–2 Fast recipes that don't require chicken  
  **And** Selecting one exits current cooking session and starts new recipe.

* **Given** I choose "Cancel cooking"  
  **Then** I return to Today view  
  **And** Tonight's dinner remains planned but not completed  
  **And** Today shows "We didn't finish cooking – want to try something else?"

* **Tone check:** "It looks like the chicken isn't ready yet. Let's find a backup." (supportive)

---

## C4 – Bail-Out Flow ("This is taking too long")

**Type:** Feature  
**Priority:** Medium (supports G4, G6 adaptability)  
**Wired to:** G4, G6, spec-cooking.md §3.3  
**Depends on:** C1

### Description

Allow user to exit mid-cook if the recipe is taking longer than expected, with clear follow-up options.

### Acceptance Criteria

* **Given** I'm on Step 4 of 6 and it's taking longer than promised
  * **When** I tap [Help] or [This is taking too long]
  * **Then** I see:

* "Want to switch to something faster?"

* Option 1: "Pick a 15-min backup"

* Option 2: "Order takeout instead" (exits to Today)

* Option 3: "Keep going" (stays in Cooking Mode)

* **Given** I choose "Pick a 15-min backup"  
  **Then** I see 1–2 ultra-fast recipes  
  **And** Selecting one exits current recipe and starts new cooking session.

* **Given** I choose "Order takeout instead"  
  **Then** I return to Today view  
  **And** Tonight's dinner is marked as skipped  
  **And** Today shows: "Got it, enjoy your takeout."

* **Tone check:** No "You picked the wrong recipe." Frame as "Plans change, we've got backups."

---

## Dependencies Summary

``` text
C1 (Layout + Happy Path)
  ↓
C2 (Timer Cues) + C3 (Missed Preflight Mid-Cook) + C4 (Bail-Out Flow)
``` text

#### Suggested Sprint Sequencing
- Sprint 1: C1, C2 (prove core cooking flow + timers)

- Sprint 2: C3, C4 (add escape hatches)

#### Integration Points
- C1 depends on Today T2 (handoff from Today → Cooking)

- C3/C4 may trigger swaps (Today T3/T4 logic)

- All cooking flows return to Today view as home base

---

## Notes on Time Band Promises

Per Vision §8 (Recipe Catalog & Time Bands), each recipe's time estimate is a **contract**:

- **Fast:** 15–30 min (includes prep + cook)

- **Normal:** 30–60 min

- **Project:** 60+ min (rare in v1)

If C4 (Bail-Out) is triggered, it's a signal to:

- Tag recipe for time band review

- Learn user's actual cooking speed (future)

- Ensure time estimates are realistic (not aspirational)

This connects to Vision §14 (Learning & Adaptation Principles) – system should adapt time bands based on real completions over time.


