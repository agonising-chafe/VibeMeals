# VibeMeals Changelog

**Living Document Version History**

---

## Version 4.0.0 - December 7, 2025

### 🎉 Initial Living Document Release

Complete rewrite of VibeMeals documentation with focus on implementation-readiness and zero-friction UX.

### Major Decisions & Rationale

#### 1. **Safe Defaults Over Gates**
- **Decision:** Remove all blocking gates (Quick Review, confirmation steps). Users can always proceed to shopping.
- **Rationale:** VibeMeals is a logistics co-pilot, not a validator. Make conservative assumptions (add everything to list) so users can move fast. Optimization is optional.
- **Impact:** 
  - `canProceedToShop()` always returns `true`
  - Quick Review becomes optional cost-saving tool, not requirement
  - Eliminates "Low confidence detected" error states

#### 2. **Learn from Behavior, Not Surveys**
- **Decision:** No upfront pantry setup, no diet questionnaires, no preference forms. Learn from what users buy, cook, and skip.
- **Rationale:** Setup forms create friction and often go stale. Actions reveal true preferences.
- **Impact:**
  - FTUE reduced to 2 questions (servings, time preference), both optional
  - Smart staples learn from Quick Review behavior (3+ weeks → promote to staple)
  - Taste profile builds from Weekly Recap feedback, not surveys

#### 3. **Modular Store Architecture**
- **Decision:** Split state management into focused stores (`usePlanStore`, `useShoppingStore`, `useInventoryStore`, `useCookStore`, `useUserStore`, `useFeedbackStore`, `useNavigationStore`).
- **Rationale:** "God Store" pattern creates maintenance burden and tight coupling. Single-responsibility stores are easier to test and reason about.
- **Impact:**
  - Each store has clear boundaries and purpose
  - Easier to unit test
  - Reduces merge conflicts in team development

#### 4. **Implicit Inventory Over Manual Entry**
- **Decision:** Infer inventory from Purchased + Cooked events. Make Pantry drawer optional (power-user feature).
- **Rationale:** Manual inventory management feels like chores. Most users will skip it. Implicit tracking "just works."
- **Impact:**
  - Mark Purchased updates inventory automatically
  - Cook Mode auto-deducts ingredients
  - Pantry drawer available but not required for value

#### 5. **Auto-Confirm Where Possible**
- **Decision:** Reduce manual confirmation steps. Walmart checkout success → auto-mark purchased. Opening Cook Mode → infer ingredients available.
- **Rationale:** Each confirmation step adds friction. Automate wherever safe; provide Undo for mistakes.
- **Impact:**
  - Mark Purchased becomes one-tap: "Did you get everything? [Yes]"
  - No item-by-item confirmation
  - Global Undo makes mistakes reversible

#### 6. **Deterministic Rerolls**
- **Decision:** Use seeded RNG (`${userId}-${week}-${slotId}-${attemptCount}`) for recipe selection.
- **Rationale:** Predictability builds trust. Users shouldn't be surprised by random changes. Undo/redo should restore exact previous state.
- **Impact:**
  - Rerolling with same inputs produces same output
  - Undo is perfectly reversible
  - Easier to debug issues ("Show me the seed")

#### 7. **Two-Stop Navigation (Plan → Shop)**
- **Decision:** Simplify navigation to two primary surfaces with drawers for everything else.
- **Rationale:** Reduces cognitive load. One big CTA per surface (Generate Plan, Next: Shop, Checkout). Drawers feel like "mini-assistants," not separate chore pages.
- **Impact:**
  - Clearer user flow
  - Fewer "where am I?" moments
  - Mobile-friendly (vertical navigation)

#### 8. **Questions, Not Errors**
- **Decision:** Reframe low-confidence items as "questions" in conversational language. No technical jargon.
- **Rationale:** "Low confidence detected" sounds like an error. "I'm not sure if you already have these things" sounds like a helpful question.
- **Impact:**
  - Quick Review feels collaborative, not punitive
  - Lower bounce rate on review step
  - Aligns with "calm automation" philosophy

#### 9. **Leftover Tracking & Reuse**
- **Decision:** Automatically track residuals (purchased vs. used quantities). Suggest recipes that use leftovers in future plans.
- **Rationale:** Waste minimization without user effort. Gentle nudges, not guilt.
- **Impact:**
  - "🍚 Uses leftover rice" badges on recipe cards
  - Quick Review offers "Use leftovers" option
  - Expiry estimates with gentle prompts

#### 10. **Graceful Degradation**
- **Decision:** Always provide fallbacks. Walmart API fails → auto-export CSV. No recipes match → offer to loosen constraints.
- **Rationale:** Third-party dependencies will fail. Don't let them break the user experience.
- **Impact:**
  - Walmart deep-link → CSV → Text (three-tier fallback)
  - Generate Plan failures offer solutions, not dead ends
  - Cook Mode resume after crash

---

### Documentation Structure

Created modular documentation suite:
- **`index.md`** - Navigation hub and quick reference
- **`vision.md`** - Why VibeMeals exists, philosophy, JTBD
- **`ux-spec.md`** - Detailed UI specifications, flows, copy, accessibility
- **`technical.md`** - State management, algorithms, API contracts, database schema
- **`policies.md`** - Non-negotiables, business rules, edge cases
- **`changelog.md`** - This file

---

### Key Features Defined

#### Core Surfaces
1. **Planner** - 7-day grid with slot actions (Lock, Swap, Reroll, Expand)
2. **Quick Review** (optional) - Save money by confirming what's on-hand
3. **Shopping** - Grouped list with Walmart deep-link and CSV fallback
4. **Cook Mode** - Step-by-step cooking with timers and parallelization
5. **Weekly Recap** - Thumbs/favorites/tags feed taste profile
6. **Pantry** (optional) - Manual inventory for power users
7. **Calendar** (optional) - Preflight reminders via ICS/notifications

#### The Golden Path
1. Generate Plan (2-3 min)
2. Optionally tweak (Swap/Reroll/Lock)
3. Next: Shop (immediately available, no gates)
4. Checkout (Walmart or CSV)
5. Mark Purchased (auto where possible)
6. Cook throughout week
7. Weekly Recap (optional feedback)

#### Technical Stack
- **Frontend:** Nuxt 3, Pinia, Tailwind CSS
- **Backend:** Nitro/NestJS, PostgreSQL, Prisma, Redis
- **Third-Party:** Walmart API, FCM, SendGrid
- **Infrastructure:** Vercel/Railway, Supabase/Neon, Cloudflare

---

### Breaking Changes from Previous Versions

#### Removed Features
- ❌ **Review & Resolve as mandatory step** → Now optional Quick Review
- ❌ **Low confidence blocking export** → Safe defaults allow immediate shopping
- ❌ **Multi-step confirmation flows** → Auto-confirm with Undo
- ❌ **Upfront pantry setup** → Implicit inventory + optional manual override
- ❌ **Diet preference forms** → Learn from behavior

#### Renamed Concepts
- "Review & Resolve" → "Quick Review" (emphasizes optional optimization)
- "Replace All Lows" → "Quick Fix" (less technical jargon) → **Removed entirely** (no blocking lows)
- "Confidence bins" → Internal only (users see "questions")
- "Provisioned" status chip → "All set" / "Might need something"

#### New Features
- ✅ **Implicit inventory** from Purchased + Cooked events
- ✅ **Smart staples** that learn from household behavior
- ✅ **Leftover tracking** with reuse nudges
- ✅ **Day-of flexibility** (emergency swaps for time changes)
- ✅ **Thaw fail-safe** (missed thaw? get fast alternatives)
- ✅ **Cook Mode resume** after crash
- ✅ **Global Undo** with 50-entry history stack

---

### Non-Functional Changes

#### Accessibility
- Full keyboard navigation with visible focus states
- Screen reader support with ARIA labels and live regions
- WCAG AA contrast ratios
- 44×44px touch targets on mobile

#### Performance
- Lazy load recipe images
- Debounced search/filter inputs
- Optimistic UI updates with rollback on error
- Redis caching for frequently accessed data

#### Testing Strategy
- **Unit tests:** Vitest for stores, algorithms, utilities
- **E2E tests:** Playwright for Golden Path scenarios
- **Acceptance criteria:** Defined inline in UX spec

---

### Migration Guide (For Existing Users - N/A for v4.0.0)

This is the initial release; no migration needed.

For future versions, migration guides will be added here.

---

### Known Limitations (MVP)

- Single household account (no multi-user)
- Dinner only (no breakfast, lunch as primary meal)
- English language only
- US-based stores (Walmart integration)
- Recipe catalog curated by VibeMeals (no user-submitted recipes)
- No meal kit delivery integration

---

### Future Considerations (Post-MVP)

- Multi-household support
- Breakfast and lunch as primary meals
- Internationalization (i18n)
- Additional store integrations (Kroger, Target, Instacart)
- User-submitted recipes
- Social features (share plans, follow friends)
- Advanced nutrition tracking
- Voice-based recipe browsing
- Smart home integration (Alexa, Google Home)

---

## Changelog Template (For Future Updates)

### Version X.Y.Z - Date

#### Added
- New feature descriptions

#### Changed
- Breaking changes
- UX improvements
- Policy updates

#### Deprecated
- Features marked for future removal

#### Removed
- Deleted features with rationale

#### Fixed
- Bug fixes and edge case handling

#### Security
- Security updates

#### Major Decisions
- New architectural choices with rationale

---

*[Back to Index](index.md)*
