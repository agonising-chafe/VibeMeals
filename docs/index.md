# VibeMeals Documentation Hub

**Version:** 4.0.0 (Living Document)  
**Last Updated:** December 7, 2025  
**Status:** Active Development

---

## 📚 Documentation Structure

This documentation suite is organized into focused files for clarity and maintainability:

### Core Documents

1. **[Vision](vision.md)** - Why VibeMeals exists, philosophy, and value proposition
2. **[UX Specification](ux-spec.md)** - Detailed UI/UX specs, flows, and interaction patterns
3. **[Technical Architecture](technical.md)** - State management, data models, algorithms, and APIs
4. **[Policies & Rules](policies.md)** - Non-negotiables, business logic, and edge case handling
5. **[Changelog](changelog.md)** - Version history and major decisions

---

## 🚀 Quick Start for Developers

### Building VibeMeals from Scratch

**Step 1: Understand the Vision**
- Read [vision.md](vision.md) to understand the "why" and core philosophy
- Key principle: **Safe defaults over gates**. The app should work with zero friction; optimization is optional.

**Step 2: Review UX Specifications**
- Read [ux-spec.md](ux-spec.md) for detailed UI requirements
- Golden Path: Generate → Shop (immediately available, no blocking gates)
- All review/optimization steps are optional

**Step 3: Review Technical Architecture**
- Read [technical.md](technical.md) for implementation details
- State management: Modular Pinia stores
- Key algorithms provided in pseudocode
- API contracts with example requests/responses

**Step 4: Understand Business Rules**
- Read [policies.md](policies.md) for locked behaviors
- Deterministic rerolls, smart staples, time flexibility, graceful degradation

---

## 🎯 Quick Reference

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
