# VibeMeals Policies & Business Rules

**Version:** 4.0.0  
**Last Updated:** December 7, 2025

---

## Table of Contents

1. [Non-Negotiables](#1-non-negotiables-locked-behaviors)

1. [Smart Staples & Learning](#2-smart-staples--learning)

1. [Time Bands & Flexibility](#3-time-bands--flexibility)

1. [Leftover Tracking & Reuse](#4-leftover-tracking--reuse)

1. [Multi-Week Planning](#5-multi-week-planning)

1. [Error Handling & Graceful Degradation](#6-error-handling--graceful-degradation)

1. [Multi-User Considerations](#7-multi-user-considerations-future)

---

## 1) Non-Negotiables (Locked Behaviors)

These are core behaviors that define VibeMeals and must not be compromised:

### 1.1 Safe Defaults Over Gates

**Rule:** Users can always proceed to shopping. No blocking gates.

#### Implementation

- Low confidence ingredients are **added to the shopping list** by default

- Quick Review is **optional optimization**, not a requirement

- `canProceedToShop()` always returns `true`

**Rationale:** The app is a logistics co-pilot, not a validator. We make conservative assumptions (buy everything) so users can move fast.

---

### 1.2 Deterministic Rerolls

**Rule:** Rerolling a slot with the same inputs produces the same output.

#### Implementation

- Seed formula: `${userId}-${week}-${slotId}-${attemptCount}`

- Use seeded RNG (not `Math.random()`)

- Increment `attemptCount` on each reroll to get different results

**Rationale:** Predictability builds trust. Users shouldn't get "surprised" by random changes.

#### Example

```typescript
// First reroll (attemptCount = 1)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A

// Second reroll (attemptCount = 2)
seed = "user-123-2025-W50-monday:dinner-2"
→ Recipe B

// Undo + redo (attemptCount = 1 again)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A (same as first time)
```text

---

### 1.3 Repeat Guard (21 Days)

**Rule:** Don't suggest the same recipe family within 21 days.

#### Implementation

- Track `cookedAt` timestamp on slots

- When generating/rerolling, exclude recipes with `familyId` in recent 21 days

- Family (not individual recipe): "chicken-tacos", "beef-tacos" share family "tacos"

**Rationale:** Prevent menu fatigue; variety is critical for long-term engagement.

**Edge Case:** If no recipes available after filtering:

1. Offer to loosen constraint: "Okay to repeat a recipe you liked?"

1. Let user pick manually from full catalog

---

### 1.4 Slot-Scoped Changes

**Rule:** Rerolling/swapping one slot does not affect other slots.

#### Implementation

- Each slot has independent seed based on `slotId`

- Locked slots are never changed by Generate Plan

- Undo/redo only affects the slot that was changed

**Rationale:** Users should be able to tweak individual days without fear of "breaking" the whole week.

---

### 1.5 Global Undo

**Rule:** All plan mutations are reversible.

#### Implementation

- Maintain undo stack (last 50 actions)

- Actions: `generate_plan`, `reroll_slot`, `lock_slot`, `swap_recipe`

- Toast after each action: "Changed Monday's dinner [Undo]"

- Clear future stack when new action taken (can't redo after new change)

**Rationale:** Never punish exploration. Users should feel safe experimenting.

---

### 1.6 Auto-Confirm Where Possible

**Rule:** Minimize manual confirmation steps.

#### Implementation

- When checkout is supported, auto-mark as purchased; otherwise keep status manual.

- Opening Cook Mode for a recipe → infer ingredients were available

- Bulk confirm: "Did you get everything? [Yes]" (not item-by-item)

**Rationale:** Manual confirmation steps feel like homework; automate wherever safe.

---

### 1.7 Shopping Export

**Rule:** Always provide a working export without depending on external carts.

#### Implementation

- Primary: CSV download

- Secondary: Plain text list

**Rationale:** Keep exports reliable while store integrations are out of scope.

---

### 1.8 Feedback Decay (90 Days)

**Rule:** Taste preferences decay over time to prevent stale suggestions.

#### Implementation

- Positive feedback (👍, ♥) boosts recipe family for ~90 days

- Negative feedback (👎) suppresses recipe family for ~90 days

- After 90 days, boost/suppression fades to neutral

**Rationale:** Tastes change; give recipes "second chances" over time.

---

### 1.9 Quiet Preflight Reminders

**Rule:** Reminders for thaw/marinate are gentle, dismissible, and respect quiet hours.

#### Implementation

- Default quiet hours: 10pm–8am (user-configurable)

- T-24 reminder: "Move chicken from freezer to fridge tonight"

- Day-of reminder: "Start slow cooker in 2 hours"

- Dismissal options: [Done] [Skip] [Remind me in 1 hour]

**Rationale:** Helpful without being nagging; user maintains control.

---

### 1.10 Cook Mode Auto-Deduct with Undo

**Rule:** Marking a meal "Cooked" updates inventory; Undo reverses both.

#### Implementation

```typescript
function markCooked(slot: Slot) {
  // Deduct ingredients from inventory
  inventoryStore.deductIngredients(slot.recipe, slot.servings);

// Log cooking event
  slot.status = 'cooked';
  slot.cookedAt = Date.now();

// Show toast with Undo
  toast('Marked as cooked', {
- Olive oil

- Salt

- Black pepper

- Flour

- Sugar

- Garlic powder

- Onion powder

- Baking powder

- Baking soda

- Vinegar (white, apple cider)

- Soy sauce

**Assumption:** These are treated as "always on-hand" unless proven otherwise.

---

### 2.2 Learning from Behavior

#### Promotion to Staple

- If user confirms "We have this" for an ingredient 3+ weeks in a row → promote to staple

- Example: User always has onions → system stops adding them to list

#### Demotion from Staple

- If user ever marks "We don't have this" for a staple → demote immediately

- Example: User marks "We don't have soy sauce" → soy sauce removed from staples

#### Implementation

```typescript
function learnStaplesFromBehavior() {
  const recentReviews = getQuickReviewHistory(21); // last 21 days

for (const [canonicalId, decisions] of recentReviews) {
    const consecutiveHaves = decisions.filter(d => d === 'have').length;

// Promotion
    if (consecutiveHaves >= 3 and !staples.has(canonicalId)) {
      staples.add(canonicalId);
      toast(`We'll assume you always have ${getName(canonicalId)}`);
    }

// Demotion
    if (decisions.includes('dont_have') and staples.has(canonicalId)) {
      staples.delete(canonicalId);
      toast(`We'll add ${getName(canonicalId)} to your lists from now on`);
    }
  }
}
```text

---

### 2.3 Staples Badge in Quick Review

#### UI Pattern

```text
┌─────────────────────────────────────┐
│ 🧂 Salt                              │
│   For Monday's pasta                 │
│   ✅ Covered by staples  [Why?]     │
│   [Include this week]                │
└─────────────────────────────────────┘
```text

#### Tapping "Why?"

```text
┌─────────────────────────────────────┐
│ Why is this a staple?                │
│ ───────────────────────────────────│
│ We assume you always have salt       │
│ because you've confirmed it's on-hand│
│ the last 5 weeks.                    │
│                                      │
│ Want to change this?                 │
│ [Include this week only]             │
│ [Always add to my lists]             │
└─────────────────────────────────────┘
```text

#### Options

- **Include this week** → Adds to list this week, doesn't change staple status

- **Always add to my lists** → Demotes from staple permanently

---

## 3) Time Bands & Flexibility

### 3.1 Time Band Definitions

| Band | Target Time | Description |
| --- | --- | --- |
| `under_20` | ≤ 20 minutes | Weeknight rush meals |
| `30ish` | 20–35 minutes | Standard dinners |
| `weekend_project` | 35+ minutes | Leisurely cooking |

#### Enforcement

- Recipes are tagged during curation

- Generate Plan filters by selected time bands

- Cook Mode parallelization ensures target time is hit

---

### 3.2 Day-Of Flexibility

**Problem:** Plans change. What if user has more/less time than expected?

#### Solution: Emergency Swaps

#### More time available

```text
┌─────────────────────────────────────┐
│ Have extra time?                     │
│ ───────────────────────────────────│
│ Tonight's recipe is quick (18 min).  │
│ Want to upgrade to something special?│
│                                      │
│ [Show 30-minute options]             │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

#### Less time available

```text
┌─────────────────────────────────────┐
│ Running late?                        │
│ ───────────────────────────────────│
│ Tonight's recipe takes 35 minutes.   │
│ Swap to a faster option using the    │
│ same ingredients?                    │
│                                      │
│ [Show under-20 options]              │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

---

### 3.3 Thaw Detection & Fail-Safe

#### Signals that trigger thaw prompt

... (truncated for brevity in patch)

```text
## 1) Non-Negotiables (Locked Behaviors)

These are core behaviors that define VibeMeals and must not be compromised:

### 1.1 Safe Defaults Over Gates

**Rule:** Users can always proceed to shopping. No blocking gates.

#### Implementation

- Low confidence ingredients are **added to the shopping list** by default

- Quick Review is **optional optimization**, not a requirement

- `canProceedToShop()` always returns `true`

**Rationale:** The app is a logistics co-pilot, not a validator. We make conservative assumptions (buy everything) so users can move fast.

---

### 1.2 Deterministic Rerolls

**Rule:** Rerolling a slot with the same inputs produces the same output.

#### Implementation

- Seed formula: `${userId}-${week}-${slotId}-${attemptCount}`

- Use seeded RNG (not `Math.random()`)

- Increment `attemptCount` on each reroll to get different results

**Rationale:** Predictability builds trust. Users shouldn't get "surprised" by random changes.

#### Example

```typescript
// First reroll (attemptCount = 1)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A

// Second reroll (attemptCount = 2)
seed = "user-123-2025-W50-monday:dinner-2"
→ Recipe B

// Undo + redo (attemptCount = 1 again)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A (same as first time)
```text

---

### 1.3 Repeat Guard (21 Days)

**Rule:** Don't suggest the same recipe family within 21 days.

#### Implementation

- Track `cookedAt` timestamp on slots

- When generating/rerolling, exclude recipes with `familyId` in recent 21 days

- Family (not individual recipe): "chicken-tacos", "beef-tacos" share family "tacos"

**Rationale:** Prevent menu fatigue; variety is critical for long-term engagement.

**Edge Case:** If no recipes available after filtering:

1. Offer to loosen constraint: "Okay to repeat a recipe you liked?"

1. Let user pick manually from full catalog

---

### 1.4 Slot-Scoped Changes

**Rule:** Rerolling/swapping one slot does not affect other slots.

#### Implementation

- Each slot has independent seed based on `slotId`

- Locked slots are never changed by Generate Plan

- Undo/redo only affects the slot that was changed

**Rationale:** Users should be able to tweak individual days without fear of "breaking" the whole week.

---

### 1.5 Global Undo

**Rule:** All plan mutations are reversible.

#### Implementation

- Maintain undo stack (last 50 actions)

- Actions: `generate_plan`, `reroll_slot`, `lock_slot`, `swap_recipe`

- Toast after each action: "Changed Monday's dinner [Undo]"

- Clear future stack when new action taken (can't redo after new change)

**Rationale:** Never punish exploration. Users should feel safe experimenting.

---

### 1.6 Auto-Confirm Where Possible

**Rule:** Minimize manual confirmation steps.

#### Implementation

- When checkout is supported, auto-mark as purchased; otherwise keep status manual.

- Opening Cook Mode for a recipe → infer ingredients were available

- Bulk confirm: "Did you get everything? [Yes]" (not item-by-item)

**Rationale:** Manual confirmation steps feel like homework; automate wherever safe.

---

### 1.7 Shopping Export

**Rule:** Always provide a working export without depending on external carts.

#### Implementation

- Primary: CSV download

- Secondary: Plain text list

**Rationale:** Keep exports reliable while store integrations are out of scope.

---

### 1.8 Feedback Decay (90 Days)

**Rule:** Taste preferences decay over time to prevent stale suggestions.

#### Implementation

- Positive feedback (👍, ♥) boosts recipe family for ~90 days

- Negative feedback (👎) suppresses recipe family for ~90 days

- After 90 days, boost/suppression fades to neutral

**Rationale:** Tastes change; give recipes "second chances" over time.

---

### 1.9 Quiet Preflight Reminders

**Rule:** Reminders for thaw/marinate are gentle, dismissible, and respect quiet hours.

#### Implementation

- Default quiet hours: 10pm–8am (user-configurable)

- T-24 reminder: "Move chicken from freezer to fridge tonight"

- Day-of reminder: "Start slow cooker in 2 hours"

- Dismissal options: [Done] [Skip] [Remind me in 1 hour]

**Rationale:** Helpful without being nagging; user maintains control.

---

### 1.10 Cook Mode Auto-Deduct with Undo

**Rule:** Marking a meal "Cooked" updates inventory; Undo reverses both.

#### Implementation

```typescript
function markCooked(slot: Slot) {
  // Deduct ingredients from inventory
  inventoryStore.deductIngredients(slot.recipe, slot.servings);

// Log cooking event
  slot.status = 'cooked';
  slot.cookedAt = Date.now();

// Show toast with Undo
  toast('Marked as cooked', {
    action: {
      label: 'Undo',
      onClick: () => undoMarkCooked(slot),
    },
  });
}

function undoMarkCooked(slot: Slot) {
  // Reverse ingredient deduction
  inventoryStore.addIngredients(slot.recipe, slot.servings);

// Reverse cooking log
  slot.status = 'provisioned';
  slot.cookedAt = undefined;
}
```text

**Rationale:** Mistakes happen (marked wrong meal); make it easy to fix.

---

## 2) Smart Staples & Learning

### 2.1 Default Staples

#### Built-in starter set (hidden by default)

- Olive oil

- Salt

- Black pepper

- Flour

- Sugar

- Garlic powder

- Onion powder

- Baking powder

- Baking soda

- Vinegar (white, apple cider)

- Soy sauce

**Assumption:** These are treated as "always on-hand" unless proven otherwise.

---

### 2.2 Learning from Behavior

#### Promotion to Staple

- If user confirms "We have this" for an ingredient 3+ weeks in a row → promote to staple

- Example: User always has onions → system stops adding them to list

#### Demotion from Staple

- If user ever marks "We don't have this" for a staple → demote immediately

- Example: User marks "We don't have soy sauce" → soy sauce removed from staples

#### Implementation

```typescript
function learnStaplesFromBehavior() {
  const recentReviews = getQuickReviewHistory(21); // last 21 days

for (const [canonicalId, decisions] of recentReviews) {
    const consecutiveHaves = decisions.filter(d => d === 'have').length;

// Promotion
    if (consecutiveHaves >= 3 && !staples.has(canonicalId)) {
      staples.add(canonicalId);
      toast(`We'll assume you always have ${getName(canonicalId)}`);
    }

// Demotion
    if (decisions.includes('dont_have') && staples.has(canonicalId)) {
      staples.delete(canonicalId);
      toast(`We'll add ${getName(canonicalId)} to your lists from now on`);
    }
  }
}
```text

---

### 2.3 Staples Badge in Quick Review

#### UI Pattern

```text
┌─────────────────────────────────────┐
│ 🧂 Salt                              │
│   For Monday's pasta                 │
│   ✅ Covered by staples  [Why?]     │
│   [Include this week]                │
└─────────────────────────────────────┘
```text

#### Tapping "Why?"

```text
┌─────────────────────────────────────┐
│ Why is this a staple?                │
│ ───────────────────────────────────│
│ We assume you always have salt       │
│ because you've confirmed it's on-hand│
│ the last 5 weeks.                    │
│                                      │
│ Want to change this?                 │
│ [Include this week only]             │
│ [Always add to my lists]             │
└─────────────────────────────────────┘
```text

#### Options

- **Include this week** → Adds to list this week, doesn't change staple status

- **Always add to my lists** → Demotes from staple permanently

---

## 3) Time Bands & Flexibility

### 3.1 Time Band Definitions

| Band | Target Time | Description |
| --- | --- | --- |
| `under_20` | ≤ 20 minutes | Weeknight rush meals |
| `30ish` | 20–35 minutes | Standard dinners |
| `weekend_project` | 35+ minutes | Leisurely cooking |

#### Enforcement

- Recipes are tagged during curation

- Generate Plan filters by selected time bands

- Cook Mode parallelization ensures target time is hit

---

### 3.2 Day-Of Flexibility

**Problem:** Plans change. What if user has more/less time than expected?

#### Solution: Emergency Swaps

#### More time available

```text
┌─────────────────────────────────────┐
│ Have extra time?                     │
│ ───────────────────────────────────│
│ Tonight's recipe is quick (18 min).  │
│ Want to upgrade to something special?│
│                                      │
│ [Show 30-minute options]             │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

#### Less time available

```text
┌─────────────────────────────────────┐
│ Running late?                        │
│ ───────────────────────────────────│
│ Tonight's recipe takes 35 minutes.   │
│ Swap to a faster option using the    │
│ same ingredients?                    │
│                                      │
│ [Show under-20 options]              │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

---

### 3.3 Thaw Detection & Fail-Safe

#### Signals that trigger thaw prompt

- Recipe metadata: `allowsFrozen: true`

- Purchase history: Last purchase had `location: "freezer"`

- Household pattern: Usually buys this protein frozen

- Conservative default: All proteins unless proven otherwise

#### T-24 Prompt (Night Before)

```text
🔔 Tomorrow: Spicy Chicken Tacos
Move chicken thighs from freezer to fridge tonight.
[Done] [Skip]
```text

#### Day-Of Fail-Safe (If Missed)

```text
┌─────────────────────────────────────┐
│ ⚠️ Thaw Check                       │
│ ───────────────────────────────────│
│ Tonight's recipe needs chicken thighs│
│ which are usually frozen.            │
│                                      │
│ Did you remember to thaw them?       │
│ [Yes, I'm all set]                  │
│ [Oops, swap to a faster recipe]     │
│ [I'll adjust timing]                 │
└─────────────────────────────────────┘
```text

#### Options

- **Yes, I'm all set** → Dismiss, proceed with recipe

- **Swap to faster recipe** → Suggests under-20 recipes using similar ingredients

- **I'll adjust timing** → Adds 10-minute thaw hack to Cook Mode (e.g., cold water bath)

---

## 4) Leftover Tracking & Reuse

### 4.1 Automatic Leftover Detection

#### When leftovers are created

- After marking a meal "Cooked"

- System compares: purchased quantity vs. used quantity

- Residuals tracked in inventory

#### Example

```typescript
Recipe needs: 8 oz chicken stock
User purchased: 32 oz can
After cooking: 24 oz leftover
→ Track in inventory with expiry estimate
```text

---

### 4.2 Leftover Reuse Nudges

#### Next Generate Plan

- System prioritizes recipes that use leftover ingredients

- Badge on recipe card: "🍚 Uses leftover rice"

#### Quick Review

- When ingredient is needed and leftover exists:

```text
Rice (1 cup)
For Thursday's stir-fry
[Use leftovers] [Buy fresh]
```text

#### Dismissal

- User can mark: "We ate it all" or "It went bad"

- Removes from inventory, doesn't penalize

---

### 4.3 Expiry Estimates

#### Shelf Life Database

| Category | Typical Shelf Life |
| --- | --- |
| Produce (fresh) | 3-7 days |
| Cooked grains | 5 days |
| Cooked protein | 3 days |
| Opened cans | 5 days |
| Pantry staples | 90+ days |

#### UI Indicators

- ⚠️ **Expiring soon** (within 2 days)

- 🚫 **Expired** (past estimated date)

#### Gentle Prompts

```text
You have rice expiring tomorrow.
Want to use it this week?
[Show recipes] [Dismiss]
```text

---

## 5) Multi-Week Planning

### 5.1 Week States

| State | Description |
| --- | --- |
| **Draft** | Future week; generate/reroll allowed, no preflight |
| **Active** | Current calendar week; preflight & reminders live |
| **Completed** | Past week; read-only, archived |

#### Rules

- Only **one Active week** at a time (current calendar week)

- **Planned weeks** (future) can be edited anytime

- **Export/checkout** is week-specific (can't combine weeks)

---

### 5.2 Week Navigation

#### UI Pattern

```text
┌─────────────────────────────────────┐
│ ← This Week (Dec 9-15) →            │
│              Active                  │
└─────────────────────────────────────┘
```text

#### Tapping week label

```text
┌─────────────────────────────────────┐
│ Pick a Week                          │
│ ───────────────────────────────────│
│ This Week (Dec 9-15) ● Active       │
│ Next Week (Dec 16-22) Draft         │
│ Week of Dec 23       Draft           │
│ Week of Dec 30       Draft           │
│                                      │
│ [Close]                              │
└─────────────────────────────────────┘
```text

---

### 5.3 Gentle Guardrails

#### If current week has unresolved items

```text
┌─────────────────────────────────────┐
│ 📋 Heads Up                          │
│ ───────────────────────────────────│
│ This week still has 3 items in      │
│ Quick Review.                        │
│                                      │
│ [Review Now] [Plan Next Week Anyway]│
└─────────────────────────────────────┘
```text

**Does NOT block:** User can still plan future weeks.

---

### 5.4 Cross-Week Inventory

**Rule:** No cross-week math.

#### Implementation

- Each week's shopping list is independent

- Leftovers from Week 1 can inform Week 2's recipes (reuse nudges)

- But Week 2's list doesn't "assume" Week 1 was shopped for

**Rationale:** Keeps logic simple; avoids cascading failures if user skips a week.

---

## 6) Error Handling & Graceful Degradation

### 6.1 Generate Plan Failures

#### Scenario: No Recipes Match Constraints

#### Error Message

```text
┌─────────────────────────────────────┐
│ Couldn't Fill Week                   │
│ ───────────────────────────────────│
│ We couldn't find 7 new recipes that  │
│ fit your preferences.                │
│                                      │
│ Try:                                 │
│ • Repeat a recipe you liked          │
│ • Loosen time constraints            │
│ • Pick some manually                 │
│                                      │
│ [Adjust Preferences] [Pick Manually]│
└─────────────────────────────────────┘
```text

#### Fallback Logic

1. Loosen repeat guard: "Okay to repeat from last 14 days instead of 21?"

1. Loosen time bands: "Include some 30-minute recipes?"

1. Last resort: Let user pick manually from full catalog

---

### 6.2 Shopping Export Failures

**Scenario:** CSV export fails.

#### Implementation

```typescript
async function exportShopping() {
  try {
    await exportCSV();
    toast('Shopping list exported as CSV.');
  } catch (error) {
    console.error('Shopping export failed:', error);
    toast('Could not export CSV. Copying a plain text list instead.');
    copyPlainTextList();
  }
}
```text

#### User Experience

- No scary error messages

- Automatic fallback to plain text

- Toast explains what happened

---

### 6.3 Recipe Missing Ingredients

#### Scenario: Recipe requires ingredient not in catalog

**Detection:** During plan generation, check if all ingredients have `canonicalId` mappings.

#### Handling

```typescript
function validateRecipe(recipe: Recipe): boolean {
  for (const ingredient of recipe.ingredients) {
    if (!catalog.has(ingredient.canonicalId)) {
      console.error(`Missing mapping for ${ingredient.canonicalId}`);
      return false;
    }
  }
  return true;
}

// In Generate Plan:
const validRecipes = candidates.filter(validateRecipe);
```text

#### If recipe slips through and user discovers

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ This recipe needs an ingredient we   │
│ don't have in stores yet.            │
│                                      │
│ [Swap Recipe] [Remove This Meal]    │
└─────────────────────────────────────┘
```text

---

### 6.4 Cook Mode Crashes

#### Scenario: App crashes mid-cook

#### Implementation

- Save cook progress to localStorage after each step

- On relaunch, detect incomplete cooking session:

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ Looks like you were making Tuesday's │
│ tacos. Pick up where you left off?   │
│                                      │
│ [Resume at Step 4] [Start Over]     │
└─────────────────────────────────────┘
```text

---

### 6.5 Network Failures

#### General Network Error

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ Couldn't connect to VibeMeals.       │
│ Check your internet and try again.   │
│                                      │
│ [Retry]                              │
└─────────────────────────────────────┘
```text

#### Offline Mode (Future)

- Cache last generated plan locally

- Allow browsing/viewing recipes offline

- Queue actions (lock, reroll) for when back online

---

## 7) Multi-User Considerations (Future)

### 7.1 Shared Plan

**Use Case:** Multiple household members need access to the plan.

#### Implementation

- Single account per household

- Shared plan view (all members see same recipes)

- Individual Cook Mode sessions (different people cooking different nights)

#### Conflict Resolution

- Last write wins for edits (lock, reroll)

- Optimistic UI updates with sync indicators

---

### 7.2 Individual Preferences

**Use Case:** Different family members have different tastes.

#### Implementation

- Track feedback per user: "Dad gave 👎, Kids gave 👍"

- Aggregate for plan generation: Prioritize recipes most people like

- Allow individual opt-outs: "Skip nights I'm not cooking"

---

### 7.3 Notification Coordination

**Use Case:** Who gets thaw reminders? Who gets "time to cook" notifications?

#### Implementation

- Per-slot assignment: "Mom is cooking Tuesday"

- Notifications route to assigned person

- Fallback: Notify all household members if no assignment

---

### 7.4 Read-Only Sharing

**Use Case:** Share plan with family member without giving edit access.

#### Implementation

- Generate shareable link: `vibemeals.com/plan/abc123`

- View-only mode: See recipes, ingredients, steps

- No editing (lock, reroll, etc.)

---

#### [Back to Index](index.md)

````text

# VibeMeals Policies & Business Rules

**Version:** 4.0.0  
**Last Updated:** December 7, 2025

---

## Table of Contents

1. [Non-Negotiables](#1-non-negotiables-locked-behaviors)

1. [Smart Staples & Learning](#2-smart-staples--learning)

1. [Time Bands & Flexibility](#3-time-bands--flexibility)

1. [Leftover Tracking & Reuse](#4-leftover-tracking--reuse)

1. [Multi-Week Planning](#5-multi-week-planning)

1. [Error Handling & Graceful Degradation](#6-error-handling--graceful-degradation)

1. [Multi-User Considerations](#7-multi-user-considerations-future)

---

## 1) Non-Negotiables (Locked Behaviors)

These are core behaviors that define VibeMeals and must not be compromised:

### 1.1 Safe Defaults Over Gates

**Rule:** Users can always proceed to shopping. No blocking gates.

#### Implementation

- Low confidence ingredients are **added to the shopping list** by default

- Quick Review is **optional optimization**, not a requirement

- `canProceedToShop()` always returns `true`

**Rationale:** The app is a logistics co-pilot, not a validator. We make conservative assumptions (buy everything) so users can move fast.

---

### 1.2 Deterministic Rerolls

**Rule:** Rerolling a slot with the same inputs produces the same output.

#### Implementation

- Seed formula: `${userId}-${week}-${slotId}-${attemptCount}`

- Use seeded RNG (not `Math.random()`)

- Increment `attemptCount` on each reroll to get different results

**Rationale:** Predictability builds trust. Users shouldn't get "surprised" by random changes.

#### Example

```typescript
// First reroll (attemptCount = 1)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A

// Second reroll (attemptCount = 2)
seed = "user-123-2025-W50-monday:dinner-2"
→ Recipe B

// Undo + redo (attemptCount = 1 again)
seed = "user-123-2025-W50-monday:dinner-1"
→ Recipe A (same as first time)
```text

---

### 1.3 Repeat Guard (21 Days)

**Rule:** Don't suggest the same recipe family within 21 days.

#### Implementation

- Track `cookedAt` timestamp on slots

- When generating/rerolling, exclude recipes with `familyId` in recent 21 days

- Family (not individual recipe): "chicken-tacos", "beef-tacos" share family "tacos"

**Rationale:** Prevent menu fatigue; variety is critical for long-term engagement.

**Edge Case:** If no recipes available after filtering:

1. Offer to loosen constraint: "Okay to repeat a recipe you liked?"

1. Let user pick manually from full catalog

---

### 1.4 Slot-Scoped Changes

**Rule:** Rerolling/swapping one slot does not affect other slots.

#### Implementation

- Each slot has independent seed based on `slotId`

- Locked slots are never changed by Generate Plan

- Undo/redo only affects the slot that was changed

**Rationale:** Users should be able to tweak individual days without fear of "breaking" the whole week.

---

### 1.5 Global Undo

**Rule:** All plan mutations are reversible.

#### Implementation

- Maintain undo stack (last 50 actions)

- Actions: `generate_plan`, `reroll_slot`, `lock_slot`, `swap_recipe`

- Toast after each action: "Changed Monday's dinner [Undo]"

- Clear future stack when new action taken (can't redo after new change)

**Rationale:** Never punish exploration. Users should feel safe experimenting.

---

### 1.6 Auto-Confirm Where Possible

**Rule:** Minimize manual confirmation steps.

#### Implementation

- When checkout is supported, auto-mark as purchased; otherwise keep status manual.

- Opening Cook Mode for a recipe → infer ingredients were available

- Bulk confirm: "Did you get everything? [Yes]" (not item-by-item)

**Rationale:** Manual confirmation steps feel like homework; automate wherever safe.

---

### 1.7 Shopping Export

**Rule:** Always provide a working export without depending on external carts.

#### Implementation

- Primary: CSV download

- Secondary: Plain text list

**Rationale:** Keep exports reliable while store integrations are out of scope.

---

### 1.8 Feedback Decay (90 Days)

**Rule:** Taste preferences decay over time to prevent stale suggestions.

#### Implementation

- Positive feedback (👍, ♥) boosts recipe family for ~90 days

- Negative feedback (👎) suppresses recipe family for ~90 days

- After 90 days, boost/suppression fades to neutral

**Rationale:** Tastes change; give recipes "second chances" over time.

---

### 1.9 Quiet Preflight Reminders

**Rule:** Reminders for thaw/marinate are gentle, dismissible, and respect quiet hours.

#### Implementation

- Default quiet hours: 10pm–8am (user-configurable)

- T-24 reminder: "Move chicken from freezer to fridge tonight"

- Day-of reminder: "Start slow cooker in 2 hours"

- Dismissal options: [Done] [Skip] [Remind me in 1 hour]

**Rationale:** Helpful without being nagging; user maintains control.

---

### 1.10 Cook Mode Auto-Deduct with Undo

**Rule:** Marking a meal "Cooked" updates inventory; Undo reverses both.

#### Implementation

```typescript
function markCooked(slot: Slot) {
  // Deduct ingredients from inventory
  inventoryStore.deductIngredients(slot.recipe, slot.servings);

// Log cooking event
  slot.status = 'cooked';
  slot.cookedAt = Date.now();

// Show toast with Undo
  toast('Marked as cooked', {
    action: {
      label: 'Undo',
      onClick: () => undoMarkCooked(slot),
    },
  });
}

function undoMarkCooked(slot: Slot) {
  // Reverse ingredient deduction
  inventoryStore.addIngredients(slot.recipe, slot.servings);

// Reverse cooking log
  slot.status = 'provisioned';
  slot.cookedAt = undefined;
}
```text

**Rationale:** Mistakes happen (marked wrong meal); make it easy to fix.

---

## 2) Smart Staples & Learning

### 2.1 Default Staples

#### Built-in starter set (hidden by default)

- Olive oil

- Salt

- Black pepper

- Flour

- Sugar

- Garlic powder

- Onion powder

- Baking powder

- Baking soda

- Vinegar (white, apple cider)

- Soy sauce

**Assumption:** These are treated as "always on-hand" unless proven otherwise.

---

### 2.2 Learning from Behavior

#### Promotion to Staple

- If user confirms "We have this" for an ingredient 3+ weeks in a row → promote to staple

- Example: User always has onions → system stops adding them to list

#### Demotion from Staple

- If user ever marks "We don't have this" for a staple → demote immediately

- Example: User marks "We don't have soy sauce" → soy sauce removed from staples

#### Implementation

```typescript
function learnStaplesFromBehavior() {
  const recentReviews = getQuickReviewHistory(21); // last 21 days

for (const [canonicalId, decisions] of recentReviews) {
    const consecutiveHaves = decisions.filter(d => d === 'have').length;

// Promotion
    if (consecutiveHaves >= 3 && !staples.has(canonicalId)) {
      staples.add(canonicalId);
      toast(`We'll assume you always have ${getName(canonicalId)}`);
    }

// Demotion
    if (decisions.includes('dont_have') && staples.has(canonicalId)) {
      staples.delete(canonicalId);
      toast(`We'll add ${getName(canonicalId)} to your lists from now on`);
    }
  }
}
```text

---

### 2.3 Staples Badge in Quick Review

#### UI Pattern

```text
┌─────────────────────────────────────┐
│ 🧂 Salt                              │
│   For Monday's pasta                 │
│   ✅ Covered by staples  [Why?]     │
│   [Include this week]                │
└─────────────────────────────────────┘
```text

#### Tapping "Why?"

```text
┌─────────────────────────────────────┐
│ Why is this a staple?                │
│ ───────────────────────────────────│
│ We assume you always have salt       │
│ because you've confirmed it's on-hand│
│ the last 5 weeks.                    │
│                                      │
│ Want to change this?                 │
│ [Include this week only]             │
│ [Always add to my lists]             │
└─────────────────────────────────────┘
```text

#### Options

- **Include this week** → Adds to list this week, doesn't change staple status

- **Always add to my lists** → Demotes from staple permanently

---

## 3) Time Bands & Flexibility

### 3.1 Time Band Definitions

| Band | Target Time | Description |
| --- | --- | --- |
| `under_20` | ≤ 20 minutes | Weeknight rush meals |
| `30ish` | 20–35 minutes | Standard dinners |
| `weekend_project` | 35+ minutes | Leisurely cooking |

#### Enforcement

- Recipes are tagged during curation

- Generate Plan filters by selected time bands

- Cook Mode parallelization ensures target time is hit

---

### 3.2 Day-Of Flexibility

**Problem:** Plans change. What if user has more/less time than expected?

#### Solution: Emergency Swaps

#### More time available

```text
┌─────────────────────────────────────┐
│ Have extra time?                     │
│ ───────────────────────────────────│
│ Tonight's recipe is quick (18 min).  │
│ Want to upgrade to something special?│
│                                      │
│ [Show 30-minute options]             │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

#### Less time available

```text
┌─────────────────────────────────────┐
│ Running late?                        │
│ ───────────────────────────────────│
│ Tonight's recipe takes 35 minutes.   │
│ Swap to a faster option using the    │
│ same ingredients?                    │
│                                      │
│ [Show under-20 options]              │
│ [Stick with original]                │
└─────────────────────────────────────┘
```text

---

### 3.3 Thaw Detection & Fail-Safe

#### Signals that trigger thaw prompt

- Recipe metadata: `allowsFrozen: true`

- Purchase history: Last purchase had `location: "freezer"`

- Household pattern: Usually buys this protein frozen

- Conservative default: All proteins unless proven otherwise

#### T-24 Prompt (Night Before)

```text
🔔 Tomorrow: Spicy Chicken Tacos
Move chicken thighs from freezer to fridge tonight.
[Done] [Skip]
```text

#### Day-Of Fail-Safe (If Missed)

```text
┌─────────────────────────────────────┐
│ ⚠️ Thaw Check                       │
│ ───────────────────────────────────│
│ Tonight's recipe needs chicken thighs│
│ which are usually frozen.            │
│                                      │
│ Did you remember to thaw them?       │
│ [Yes, I'm all set]                  │
│ [Oops, swap to a faster recipe]     │
│ [I'll adjust timing]                 │
└─────────────────────────────────────┘
```text

#### Options

- **Yes, I'm all set** → Dismiss, proceed with recipe

- **Swap to faster recipe** → Suggests under-20 recipes using similar ingredients

- **I'll adjust timing** → Adds 10-minute thaw hack to Cook Mode (e.g., cold water bath)

---

## 4) Leftover Tracking & Reuse

### 4.1 Automatic Leftover Detection

#### When leftovers are created

- After marking a meal "Cooked"

- System compares: purchased quantity vs. used quantity

- Residuals tracked in inventory

#### Example

```typescript
Recipe needs: 8 oz chicken stock
User purchased: 32 oz can
After cooking: 24 oz leftover
→ Track in inventory with expiry estimate
```text

---

### 4.2 Leftover Reuse Nudges

#### Next Generate Plan

- System prioritizes recipes that use leftover ingredients

- Badge on recipe card: "🍚 Uses leftover rice"

#### Quick Review

- When ingredient is needed and leftover exists:

```text
  Rice (1 cup)
  For Thursday's stir-fry
  [Use leftovers] [Buy fresh]
  ```

#### Dismissal

- User can mark: "We ate it all" or "It went bad"

- Removes from inventory, doesn't penalize

---

### 4.3 Expiry Estimates

#### Shelf Life Database

| Category | Typical Shelf Life |
| --- | --- |
| Produce (fresh) | 3-7 days |
| Cooked grains | 5 days |
| Cooked protein | 3 days |
| Opened cans | 5 days |
| Pantry staples | 90+ days |

#### UI Indicators

- ⚠️ **Expiring soon** (within 2 days)

- 🚫 **Expired** (past estimated date)

#### Gentle Prompts

```text
You have rice expiring tomorrow.
Want to use it this week?
[Show recipes] [Dismiss]
```text

---

## 5) Multi-Week Planning

### 5.1 Week States

| State | Description |
| --- | --- |
| **Draft** | Future week; generate/reroll allowed, no preflight |
| **Active** | Current calendar week; preflight & reminders live |
| **Completed** | Past week; read-only, archived |

#### Rules

- Only **one Active week** at a time (current calendar week)

- **Planned weeks** (future) can be edited anytime

- **Export/checkout** is week-specific (can't combine weeks)

---

### 5.2 Week Navigation

#### UI Pattern

```text
┌─────────────────────────────────────┐
│ ← This Week (Dec 9-15) →            │
│              Active                  │
└─────────────────────────────────────┘
```text

#### Tapping week label

```text
┌─────────────────────────────────────┐
│ Pick a Week                          │
│ ───────────────────────────────────│
│ This Week (Dec 9-15) ● Active       │
│ Next Week (Dec 16-22) Draft         │
│ Week of Dec 23       Draft           │
│ Week of Dec 30       Draft           │
│                                      │
│ [Close]                              │
└─────────────────────────────────────┘
```text

---

### 5.3 Gentle Guardrails

#### If current week has unresolved items

```text
┌─────────────────────────────────────┐
│ 📋 Heads Up                          │
│ ───────────────────────────────────│
│ This week still has 3 items in      │
│ Quick Review.                        │
│                                      │
│ [Review Now] [Plan Next Week Anyway]│
└─────────────────────────────────────┘
```text

**Does NOT block:** User can still plan future weeks.

---

### 5.4 Cross-Week Inventory

**Rule:** No cross-week math.

#### Implementation

- Each week's shopping list is independent

- Leftovers from Week 1 can inform Week 2's recipes (reuse nudges)

- But Week 2's list doesn't "assume" Week 1 was shopped for

**Rationale:** Keeps logic simple; avoids cascading failures if user skips a week.

---

## 6) Error Handling & Graceful Degradation

### 6.1 Generate Plan Failures

#### Scenario: No Recipes Match Constraints

#### Error Message

```text
┌─────────────────────────────────────┐
│ Couldn't Fill Week                   │
│ ───────────────────────────────────│
│ We couldn't find 7 new recipes that  │
│ fit your preferences.                │
│                                      │
│ Try:                                 │
│ • Repeat a recipe you liked          │
│ • Loosen time constraints            │
│ • Pick some manually                 │
│                                      │
│ [Adjust Preferences] [Pick Manually]│
└─────────────────────────────────────┘
```text

#### Fallback Logic

1. Loosen repeat guard: "Okay to repeat from last 14 days instead of 21?"

1. Loosen time bands: "Include some 30-minute recipes?"

1. Last resort: Let user pick manually from full catalog

---

### 6.2 Shopping Export Failures

**Scenario:** CSV export fails.

#### Implementation

```typescript
async function exportShopping() {
  try {
    await exportCSV();
    toast('Shopping list exported as CSV.');
  } catch (error) {
    console.error('Shopping export failed:', error);
    toast('Could not export CSV. Copying a plain text list instead.');
    copyPlainTextList();
  }
}
```text

#### User Experience

- No scary error messages

- Automatic fallback to plain text

- Toast explains what happened

---

### 6.3 Recipe Missing Ingredients

#### Scenario: Recipe requires ingredient not in catalog

**Detection:** During plan generation, check if all ingredients have `canonicalId` mappings.

#### Handling

```typescript
function validateRecipe(recipe: Recipe): boolean {
  for (const ingredient of recipe.ingredients) {
    if (!catalog.has(ingredient.canonicalId)) {
      console.error(`Missing mapping for ${ingredient.canonicalId}`);
      return false;
    }
  }
  return true;
}

// In Generate Plan:
const validRecipes = candidates.filter(validateRecipe);
```text

#### If recipe slips through and user discovers

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ This recipe needs an ingredient we   │
│ don't have in stores yet.            │
│                                      │
│ [Swap Recipe] [Remove This Meal]    │
└─────────────────────────────────────┘
```text

---

### 6.4 Cook Mode Crashes

#### Scenario: App crashes mid-cook

#### Implementation

- Save cook progress to localStorage after each step

- On relaunch, detect incomplete cooking session:

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ Looks like you were making Tuesday's │
│ tacos. Pick up where you left off?   │
│                                      │
│ [Resume at Step 4] [Start Over]     │
└─────────────────────────────────────┘
```text

---

### 6.5 Network Failures

#### General Network Error

```text
┌─────────────────────────────────────┐
│ ───────────────────────────────────│
│ Couldn't connect to VibeMeals.       │
│ Check your internet and try again.   │
│                                      │
│ [Retry]                              │
└─────────────────────────────────────┘
```text

#### Offline Mode (Future)

- Cache last generated plan locally

- Allow browsing/viewing recipes offline

- Queue actions (lock, reroll) for when back online

---

## 7) Multi-User Considerations (Future)

### 7.1 Shared Plan

**Use Case:** Multiple household members need access to the plan.

#### Implementation

- Single account per household

- Shared plan view (all members see same recipes)

- Individual Cook Mode sessions (different people cooking different nights)

#### Conflict Resolution

- Last write wins for edits (lock, reroll)

- Optimistic UI updates with sync indicators

---

### 7.2 Individual Preferences

**Use Case:** Different family members have different tastes.

#### Implementation

- Track feedback per user: "Dad gave 👎, Kids gave 👍"

- Aggregate for plan generation: Prioritize recipes most people like

- Allow individual opt-outs: "Skip nights I'm not cooking"

---

### 7.3 Notification Coordination

**Use Case:** Who gets thaw reminders? Who gets "time to cook" notifications?

#### Implementation

- Per-slot assignment: "Mom is cooking Tuesday"

- Notifications route to assigned person

- Fallback: Notify all household members if no assignment

---

### 7.4 Read-Only Sharing

**Use Case:** Share plan with family member without giving edit access.

#### Implementation

- Generate shareable link: `vibemeals.com/plan/abc123`

- View-only mode: See recipes, ingredients, steps

- No editing (lock, reroll, etc.)

---

#### [Back to Index](index.md)
