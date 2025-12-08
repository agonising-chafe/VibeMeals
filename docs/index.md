# VibeMeals Documentation Hub

**Version:** 5.0.0 (Post-Vision Lock)  
**Last Updated:** December 7, 2025  
**Status:** Implementation Ready

---

## ⚙️ Spec-Code Sync Workflow

**CRITICAL:** All data structures must follow this workflow to prevent drift between specs and code:

1. **Update the spec first:** Modify `docs/data-model.md` with the new/changed types
2. **Update types.ts:** Mirror the changes exactly in `src/domain/types.ts`
3. **Update versions:** Increment version numbers and update dates in both files
4. **Implement code:** Write implementation using the updated types
5. **Verify:** Ensure all Golden Tests still pass

**Spec Status Definitions:**
- **Locked:** No changes allowed without approval (e.g., `vision.md` v4.6.0)
- **Implementation-Ready:** Stable contract for implementation, changes require version bump
- **Draft:** Still evolving, subject to change

---

## 📚 Documentation Structure

### Vision (LOCKED)

- **[vision.md](./vision.md)** – Why VibeMeals exists, who it's for, Golden Experience Tests [G1–G6], week shapes, tone, learning, catalog, and system boundaries.  
  - Status: **Locked – v4.6.0**
  - Use this as north star for all product decisions.

---

### v1 Surface Specs

These specs translate vision into implementation-ready definitions for the core v1 surfaces.  
All are wired to `vision.md` and must respect Golden Tests.

**Core Surfaces:**

- **[spec-planner.md](./spec-planner.md) – Planner (Week View)**
  - Purpose: Weekly planning (5–10 min check-in).
  - Golden Tests: G1, G2, G4, G5, G6.
  - Covers: Week grid, Generate/Regenerate, lighter weeks, Plan Stability

- **[data-model.md](./data-model.md) – Shared Data Model (TypeScript)**
  - Purpose: Interface definitions for Plan, Recipe, ShoppingItem, TonightState.
  - Referenced by: All 31 tickets (P1-P9, T1-T9, S1-S9, C1-C4).
  - Unblocks: Shop S2, S7, Today T2 (data layer work in Sprint 1).

- **[recipe-spec.md](./recipe-spec.md) – Recipe Catalog Contract**
  - Purpose: Defines what makes a VibeMeals-grade recipe (metadata, ingredients, preflight, steps, tags).
  - Referenced by: Planner (P2, P3, P5, P6), Shop (S2, S3, S4, S7, S8, S9), Today (T2, T4, T5, T8), Cooking (C1–C4).
  - Unblocks: Catalog authoring (manual or AI), consistent ingredient criticality for Shop/Today.

- **[recipe-examples.md](./recipe-examples.md) – Seed Recipes & Edge Cases**
  - Purpose: Ready-to-use recipes that exercise time bands, criticality, Quick Review, and preflight/missed-preflight paths.
  - Unblocks: Domain helper tests, seed catalog fixtures, and manual/AI authoring calibration.

- **[spec-today.md](./spec-today.md) – Today (Tonight's Dinner)**
  - Purpose: "What's for dinner tonight?" and making it actually cookable.
  - Golden Tests: G1, G4, G6.
  - Covers: All good state, missed preflight, escape hatches

- **[spec-shop.md](./spec-shop.md) – Shop (Shopping List & Cart)**
  - Purpose: Turn plan into trustworthy list/cart with optional Quick Review.
  - Golden Tests: G2, G3, G5, G6.
  - Covers: List generation, Quick Review, exports, missing items

- **[spec-cooking.md](./spec-cooking.md) – Cooking Mode**
  - Purpose: Step-by-step recipe execution that hits time band promises.
  - Golden Tests: G1, G4, G6.
  - Covers: Step display, preflight issues, bail-out flows, timers

---

### Implementation Tickets

Ready-to-use ticket breakdowns for each surface, with acceptance criteria wired to Vision and Golden Tests.

- **[tickets-planner.md](./tickets-planner.md)** – Epic: Planner v1 (P1–P9)
- **[tickets-today.md](./tickets-today.md)** – Epic: Today v1 (T1–T7)
- **[tickets-shop.md](./tickets-shop.md)** – Epic: Shop v1 (S1–S6)
- **[tickets-cooking.md](./tickets-cooking.md)** – Epic: Cooking Mode v1 (C1–C4)
- **[epic-dependencies.md](./epic-dependencies.md)** – Build sequencing guide

---

### Reference & Supporting Docs

- **[persona-checklists.md](./persona-checklists.md)** – Regression test checklists (Ashley, Brianna, Kayla, Jake & Maya, Ellen & Mark)
- **[changelog.md](./changelog.md)** – Version history for vision and specs
- **[ux-spec.md](./ux-spec.md)** – Legacy UX spec (superseded by surface specs)
- **[technical.md](./technical.md)** – Technical architecture notes
- **[policies.md](./policies.md)** – Business rules and edge cases

---

## 🚀 How to Use These Docs

### For Product & Design
1. Start with **vision.md** (philosophy, Golden Tests, constraints)
2. Reference **spec-*.md** for surface-specific flows
3. Use **persona-checklists.md** for regression testing

### For Engineering
1. Start with **spec-*.md** for implementation requirements
2. Break work using **tickets-*.md** 
3. Check **epic-dependencies.md** for build sequencing
4. Validate against **vision.md** Golden Tests (G1–G6)

### For QA
1. Use **tickets-*.md** for acceptance criteria
2. Reference **persona-checklists.md** for regression suites
3. Test against **vision.md** Golden Tests for non-negotiables

---

## 🎯 Quick Reference: Golden Tests (G1–G6)

### The Golden Path (Zero-Friction)
1. **Generate Plan** → Week fills with recipes
2. **Next: Shop** → Immediately available (no gates)
3. *(Optional) Quick Review* → Save money by optimizing
4. **Checkout** → Walmart cart or CSV
5. *(Optional) Mark Purchased* → Auto-confirm where possible
6. **Cook → Cooked** → Auto-deduct ingredients
7. *(Optional) Recap* → Thumbs/favorites teach taste

### Core Philosophy
- **Calm automation**: One primary action per surface
- **Safe defaults**: Low confidence? Add to list (don't block)
- **Learn from behavior**: Not surveys or gates
- **Assume people are tired**: Big buttons, short text, binary choices
- **Never punish exploration**: Reroll/swap/undo always safe

### Key Technical Concepts
- **Deterministic rerolls**: `seed = (user, week, slot, attempt_n)`
- **Implicit inventory**: Inferred from Purchased + Cooked events
- **Smart staples**: Learn from household behavior, not setup forms
- **Slot-scoped changes**: Rerolling one slot doesn't affect others

---

## 📖 How to Use This Documentation

### For Product/Design
- Start with [vision.md](vision.md) and [ux-spec.md](ux-spec.md)
- Use [ux-spec.md](ux-spec.md) for wireframes, copy, and interaction design
- Reference [policies.md](policies.md) for business rules and edge cases

### For Engineering
- Start with [technical.md](technical.md) for architecture and pseudocode
- Reference [ux-spec.md](ux-spec.md) for UI requirements
- Check [policies.md](policies.md) for non-negotiable behaviors

### For QA/Testing
- Use [ux-spec.md](ux-spec.md) for user flows and acceptance criteria
- Reference [policies.md](policies.md) for edge cases and error handling
- Check [changelog.md](changelog.md) for recent changes

---

## 🔄 Living Document Process

This documentation evolves as VibeMeals is built. When making changes:

1. **Update the relevant document(s)**
2. **Add entry to [changelog.md](changelog.md)** with date and rationale
3. **Commit with clear message**: `docs: [section] brief description`
4. **Review cross-references**: Ensure links between documents remain valid

---

## 🤔 Common Questions

**Q: Why are there no blocking gates in the UX?**  
A: VibeMeals is a logistics co-pilot, not a validator. We use safe defaults (add everything to the list) so users can shop immediately. Optimization (Quick Review) is optional.

**Q: How does the system learn without asking questions?**  
A: From behavior: What they purchase, what they cook, what they skip in Quick Review, thumbs/favorites in Recap. Actions > Surveys.

**Q: What happens if confidence is low for an ingredient?**  
A: Safe default: Add it to the shopping list. Optionally surface in Quick Review: "We're adding chicken thighs, but you bought them last week. Still need more?"

**Q: Can users manually adjust the plan?**  
A: Yes. Lock slots, Swap (see 3-5 alternatives), Reroll (new recipe), or manually pick from full browser. Always reversible.

**Q: What's the difference between Swap and Reroll?**  
A: **Swap** = "I don't like *this* recipe; show me similar options" (opens drawer with 3-5 alternatives). **Reroll** = "Surprise me with something completely different" (deterministic new recipe).

---

## 📝 Version History

See [changelog.md](changelog.md) for detailed version history and major decisions.

**Current Version:** 4.0.0 - Initial living document (December 7, 2025)

---

## 📧 Contact & Contributions

This is a living document. As implementation progresses and new insights emerge, update the relevant sections and log changes in the changelog.

**Document Status:** 🟢 Active Development
