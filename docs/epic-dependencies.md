# Epic Dependencies & Build Sequencing

> This document maps dependencies across all four v1 epics (Planner, Today, Shop, Cooking Mode) and provides recommended sprint sequencing for implementation.

---

## Critical Path (Must Build First)

``` text
P1 (Planner Grid Skeleton)
  ↓
P2 (Generate Plan) ← CRITICAL: All other surfaces depend on this
  ↓
┌─────────────┬─────────────┬─────────────┐
│             │             │             │
S2 (Ingredient  T1 (Today     C1 (Cooking   P3 (Swap/Reroll)
Expansion)      Skeleton)     Mode Layout)
  ↓
S3 (Grouping) + S7 (Critical Classification)
  ↓
S1 (Shop UI)
``` text

#### Reasoning
- **P1 + P2** are foundational: Without a plan, no other surface has data to display.

- **S2** (ingredient expansion logic) must come before **S1** (Shop UI) – the UI needs data to display.

- **S7** (critical/non-critical classification) must come before **S4** (Quick Review) for safety.

- Once P2 is done, **S2, T1, C1** can be built in parallel (they all consume plan data).

- **P3** (Swap/Reroll) can start after P2, in parallel with other surfaces.

---

## Full Dependency Map

### **Planner (P1–P9)**
``` text
P1 (Grid Skeleton) → P2 (Generate Plan) → {P3, P4, P5, P6, P8} → P7 (Plan Stability) → P9 (Tone Audit)
``` text

### **Today (T1–T9)**
``` text
P2 (Generate Plan) → T1 (View Skeleton) → T2 (Preflight State Engine) + T8 (Tomorrow Preview - stub)
                                             ↓
                                          {T3, T4, T5, T6, T7} → T9 (Tone Audit)
                                           ↓ (T3 depends on C1)
``` text

### **Shop (S1–S9)**
``` text
P2 (Generate Plan) → S2 (Ingredient Expansion) → S3 (Grouping) + S7 (Critical Classification)
                                                      ↓
                                                     S1 (Shop UI)
                                                      ↓
                                       {S4, S5, S6, S8} → S9 (Tone Audit)
                                        ↓ (S4 depends on S7)
                                        ↓ (S6 syncs with P7)
                                        ↓ (S8 triggers T4/T5)
``` text

#### Shop Implementation Layers (Critical Sequencing)
- **Layer 1 – Data:** S2 (Ingredient Expansion & Consolidation) ← **MUST BUILD FIRST**

- **Layer 2 – Enrichment:** S3 (Category Grouping) + S7 (Critical/Non-Critical Classification)

- **Layer 3 – UI/Flows:** S1 (Base List UI), S4 (Quick Review), S5 (Export), S6 (Done Shopping), S8 (Missing Items), S9 (Tone Audit)

⚠️ **Shop is the most infra-heavy epic:** S1 (UI) cannot start until S2+S3+S7 are functional. Do not treat S1 as "just UI" that can be built immediately after P2.

### **Cooking Mode (C1–C4)**
``` text
T2 (Today handoff) → C1 (Layout) → {C2, C3, C4}
``` text

---

## Cross-Epic Dependencies

| Ticket | Depends On (Other Epics) | Reason |
|--------|--------------------------|--------|
| **S2** | P2 (Generate Plan), Recipe metadata | Ingredient expansion needs plan data to process recipes into shopping items |
| **S3** | S2 (Ingredient data) | Grouping logic requires consolidated ingredient list |
| **S7** | Recipe metadata, S2 | Critical/non-critical classification needs recipe data model + ingredient list |
| **S1** | S2, S3 (Ingredient data) | Shop UI displays data from expansion + grouping – **BLOCKED until S2+S3 done** |
| **S4** | S7 (Critical classification) | Quick Review must not suggest critical ingredients (safety) |
| **S6** | P7 (Plan Stability) | "Done Shopping" triggers Plan Stability mode |
| **S8** | S7, T4, T5 (Today swap flows) | Missing items flow uses classification + triggers swaps for critical items |
| **T1** | P2 (Generate Plan) | Today needs a plan to show tonight's dinner |
| **T2** | P2, Recipe metadata | Preflight State Engine computes ALL_GOOD vs MISSED |
| **T3** | C1 (Cooking Mode layout) | "Start Cooking" button hands off to Cooking Mode |
| **T4, T5, T6, T7** | P3 (Swap logic), S7 (for T4 missing items) | Today escape hatches use Planner swap logic + Shop classification |
| **T8** | P2 (Generate Plan) | Tomorrow Preview reads next day's plan data |
| **C1** | T3 (Today handoff) | Cooking Mode is launched from Today view |
| **C3, C4** | T4, T5 (Today swaps) | Mid-cook bailouts may trigger Today swap flows |

**Key Insight:** S2 (Ingredient Expansion) and S7 (Critical Classification) are **infrastructure tickets** that block multiple UI features across Shop and Today. Prioritize these in Sprint 1 or risk blocking parallel development.

---

## Recommended Sprint Sequencing

### **Sprint 0: Foundation (Week 1–2)**

- **P1** – Planner Grid Skeleton (CRITICAL, blocks everything)

- **P2** – Generate Plan (CRITICAL, blocks all other surfaces)

**Outcome:** Working plan generation. Can see a week of dinners.

---

### **Sprint 1: Core Surfaces (Week 3–4)**

#### (Can be parallelized across 3–4 devs)

- **S2** – Shop Ingredient Expansion & Consolidation (CRITICAL, blocks S1)

- **S3** – Shop Item Grouping & Context Display

- **S7** – Shop Critical/Non-Critical Ingredient Classification (CRITICAL, blocks S4)

- **S1** – Shop UI Layout (depends on S2, S3)

- **T1** – Today View Skeleton & State Wiring

- **T2** – Today Preflight State Engine (ALL_GOOD vs MISSED)

- **C1** – Cooking Mode Layout & Happy Path

**Outcome:** All four surfaces visible and functional in happy-path scenarios. User can:

- See a plan (Planner)

- See tonight's dinner with preflight status (Today)

- Generate a shopping list with proper ingredient consolidation (Shop)

- Cook step-by-step (Cooking Mode)

---

### **Sprint 2: Adaptability & Escape Hatches (Week 5–6)**

- **P3** – Planner Swap/Reroll

- **P4** – Planner Lock/Unlock

- **T3** – Today → Cooking Mode handoff

- **T4** – Today Missed Preflight Recovery flow

- **T5** – Today "Too Much → Easier" flow

- **C2** – Cooking Mode Timer Cues

- **S4** – Shop Quick Review (Pantry Optimization)

- **S5** – Shop Export & Sharing

**Outcome:** Users can adapt plans when life happens. System feels resilient, not brittle. Shopping list is exportable for real-world use.

---

### **Sprint 3: Plan Stability & Polish (Week 7–8)**

- **P7** – Planner Plan Stability after Shopping

- **S6** – Shop "Done Shopping" → Plan Stability trigger

- **S8** – Shop Missing Items & Substitutions → Today handoff

- **T6** – Today "Eating Out" flow

- **T7** – Today "Change Tonight's Dinner" mini-swap

- **C3** – Cooking Mode Missed Preflight Recovery

- **C4** – Cooking Mode Bail-Out Flow

**Outcome:** Plan Stability contract enforced. All escape hatches functional. Missing ingredients handled gracefully.

---

### **Sprint 4: Lighter Weeks & QA (Week 9–10)**

- **P5** – Planner Preflight Indicators

- **P6** – Planner Dinners/week control (supports lighter weeks)

- **P8** – Planner Move/Delete dinners

- **T8** – Today Tomorrow Preview Strip

- **P9** – Planner Tone Audit

- **T9** – Today Tone Audit

- **S9** – Shop Tone Audit

**Outcome:** All v1 features complete. Golden Tests (G1–G6) pass. Tone Contract enforced across all surfaces.

---

## Parallelization Opportunities

#### After P1 + P2 are complete
| Sprint | Team A (Planner) | Team B (Today) | Team C (Shop) | Team D (Cooking) |
|--------|------------------|----------------|---------------|------------------|
| 1 | P3 (Swap) | T1 (Skeleton) + T2 (Preflight Engine) | S2 (Expansion) + S3 (Grouping) + S7 (Classification) → S1 (UI) | C1 (Layout) |
| 2 | P4 (Lock) | T3, T4, T5 (Handoff + Escapes) | S4 (Quick Review) + S5 (Export) | C2 (Timers) |
| 3 | P7 (Stability) | T6, T7 (Eating Out + Mini-swap) | S6 (Done Shopping) + S8 (Missing Items) | C3, C4 (Mid-cook escapes) |
| 4 | P5, P6, P8 (Polish) | T8 (Tomorrow Preview) | — | — |
| 4 | P9 (Tone) | T9 (Tone) | S9 (Tone) | — |

**Bottleneck Alert:** C1 cannot start until T3 is defined (handoff contract). Consider defining handoff contract in Sprint 1 planning to unblock Team D.

---

## Golden Test Coverage by Epic

| Golden Test | Planner | Today | Shop | Cooking |
|-------------|---------|-------|------|---------|------|
| **G1** (Cooking Success) | P2, P5 | T1, T2, T3, T4 | — | C1, C2, C3 |
| **G2** (Shopping) | P2 | — | S2, S3, S1, S5 | — |
| **G3** (No Waste) | — | — | S2, S3, S4, S8 | — |
| **G4** (Lighter Weeks) | P6 | T5, T6 | — | C4 |
| **G5** (Quick Picks) | P3 | — | S2, S3, S4 | — |
| **G6** (Adaptability) | P3, P4 | T4, T5, T6, T7 | S7, S8 | C3, C4 |

#### Key Coverage Notes
- **G2 (Plan in 5–10 min, shop ready quickly):** Requires Planner P2 + Shop data layer (S2, S3) + UI (S1) + Export (S5)

- **G3 (No missing essentials):** Requires Shop ingredient expansion (S2, S3) + Quick Review (S4) + Missing Items handling (S8)

- **G5 (Budget/waste helpful):** Requires Planner swap (P3) + Shop Quick Review (S4) – **S4 depends on S2+S3+S7**

- **G6 (Adaptability):** Requires Shop classification (S7) + missing items bridge (S8) + Today/Cooking escape hatches

**QA Strategy:** Each sprint should validate at least 2 Golden Tests end-to-end.

---

## Risk Mitigation

### **Risk 1: P2 (Generate Plan) Too Complex**

- **Mitigation:** Stub recipe catalog early (5–10 hardcoded recipes). Focus on plan generation logic, not recipe sourcing.

- **Fallback:** If P2 takes >2 weeks, pivot to manual plan creation for early testing.

### **Risk 2: S2 (Ingredient Expansion) Algorithm Complexity**

- **Mitigation:** Start with simple 1:1 ingredient mapping (no smart consolidation). Add quantity scaling in iteration 2.

- **Fallback:** Hardcode ingredient lists per recipe for v1, defer dynamic expansion to v1.1.

- **Checkpoint:** S2 acceptance tests must pass before S1 UI work begins.

### **Risk 3: Cross-Epic Handoffs (T3→C1, S8→T4)**

- **Mitigation:** Define handoff contracts (API/data structures) in Sprint 0. Mock implementations for parallel dev.

- **Checkpoint:** Sprint 2 integration testing to catch contract mismatches early.

### **Risk 4: Plan Stability (P7 + S6) Breaks Other Flows**

- **Mitigation:** P7 + S6 both in Sprint 3. Test all Planner editing flows after marking plan as "Shopped."

- **Regression Gate:** G2 must pass after P7 is merged.

---

## Definition of Done (Per Epic)

### **Planner v1 Complete:**

- ✅ All tickets P1–P9 merged

- ✅ Golden Tests G1, G2, G4, G5, G6 pass (where Planner is involved)

- ✅ Tone audit complete (P9)

- ✅ Plan Stability contract enforced (P7)

### **Today v1 Complete:**

- ✅ All tickets T1–T9 merged

- ✅ Golden Tests G1, G4, G6 pass

- ✅ Tone audit complete (T9)

- ✅ Preflight State Engine functional (T2)

- ✅ Tomorrow Preview implemented (T8)

- ✅ All escape hatches tested (preflight, too much, eating out, mini-swap)

### **Shop v1 Complete:**

- ✅ All tickets S1–S9 merged

- ✅ Golden Tests G2, G3, G5, G6 pass

- ✅ Tone audit complete (S9)

- ✅ Ingredient Expansion & Consolidation functional (S2)

- ✅ Critical/Non-Critical Classification implemented (S7)

- ✅ Quick Review + Missing Items flows tested (S4, S8)

### **Cooking Mode v1 Complete:**

- ✅ All tickets C1–C4 merged

- ✅ Golden Tests G1, G4, G6 pass

- ✅ Timer cues functional (C2)

- ✅ Mid-cook escapes tested (C3, C4)

---

## v1.0 Release Checklist

- [ ] All 31 tickets (P1–P9, T1–T9, S1–S9, C1–C4) merged to main

- [ ] All 6 Golden Tests (G1–G6) pass end-to-end

- [ ] Tone audits complete across all surfaces (P9, T9, S9)

- [ ] Plan Stability contract enforced and validated (P7, S4)

- [ ] Time band promises validated against real cooking completions (C4 → Vision §8)

- [ ] Preflight indicators visible and accurate (P5, T3, C3)

- [ ] All escape hatches guilt-free and low-friction (per Vision §4.1)

- [ ] Lighter weeks scenarios tested (P6, T4, G4)

- [ ] Documentation: User-facing help text for each surface

- [ ] Deployment: Staging → Production cutover plan

- [ ] Monitoring: Instrumentation for plan generation failures, time band breaches, bail-out rates

**Target:** v1.0 ready for limited beta (10–20 households) by end of Sprint 4 (Week 10).

---

## Post-v1 Priorities (Vision Roadmap §13)

After v1 ships, next phases per Vision v4.6.0:

- **v1.1:** Learning loops (Vision §14.1–14.9) – adapt time bands, recipe preferences

- **v1.2:** Multi-household support (Vision §5.2 Household Modes)

- **v2.0:** Full personalization (skill level, dietary needs, taste preferences)

- **v2.5:** Smart integrations (grocery delivery APIs, calendar sync)

See `vision.md` §13 (Roadmap) for complete sequencing.

---

## First Vertical Slice (Minimal End-to-End Experience)

**Goal:** Build the absolute minimum to prove the core loop works: Plan → Shop → Today → Cook.

#### Tickets Required (9 total)
### **Phase 1: Foundation (Week 1–2)**

- **P1** – Planner Grid Skeleton

- **P2** – Generate Plan (stub with 3–5 hardcoded recipes)

### **Phase 2: Shop Data Layer (Week 2–3)**

- **S2** – Ingredient Expansion & Consolidation

- **S3** – Item Grouping (can be simple/hardcoded categories)

- **S1** – Shop UI Layout (read-only list, no Quick Review yet)

### **Phase 3: Today + Cooking Happy Path (Week 3–4)**

- **T1** – Today View Skeleton

- **T2** – Preflight State Engine (stub: always return ALL_GOOD for vertical slice)

- **T3** – Start Cooking → Cooking Mode handoff

- **C1** – Cooking Mode Layout & Happy Path

#### What You Can Demo After Phase 3
1. Open Planner → see a week of dinners (P1, P2)

1. Open Shop → see consolidated shopping list grouped by category (S2, S3, S1)

1. Open Today → see tonight's dinner + preflight status (T1, T2)

1. Tap "Start Cooking" → step through recipe in Cooking Mode (T3, C1)

#### What’s Missing (Acceptable for Vertical Slice)
- No swap/reroll (P3)

- No Quick Review (S4)

- No export (S5)

- No Plan Stability (P7, S6)

- No escape hatches (T4, T5, T6, C3, C4)

- No tone audits (P9, T9, S9)

**Timeline:** 4 weeks for a **demoable but minimal** end-to-end experience.

**Next Step After Vertical Slice:** Add adaptability (P3, T4, S4, S8) in Sprint 2 to prove "life happens" flows work.
