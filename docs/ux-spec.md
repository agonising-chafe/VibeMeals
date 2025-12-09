# VibeMeals UX Specification

**Version:** 4.0.0  
**Last Updated:** December 7, 2025

---

## Table of Contents

1. [Core Surfaces](#1-core-surfaces)

1. [First-Time Experience (FTUE)](#2-first-time-experience-ftue)

1. [The Golden Path](#3-the-golden-path-zero-friction)

1. [Navigation Model](#4-navigation-model)

1. [Interaction Patterns](#5-interaction-patterns)

1. [Copy & Micro-UX](#6-copy--micro-ux)

1. [Accessibility](#7-accessibility)

---

## 1) Core Surfaces

### 1.1 Planner (Home / "This Week")

**Purpose:** Answer "What are we eating this week, and how heavy is each night?"

#### Layout

- 7-day vertical grid (mobile-first)

- Each day shows: Lunch (optional) and Dinner (primary)

- Week selector in header with left/right arrows

#### Slot Anatomy

``` text
┌─────────────────────────────────────┐
│ Monday • Dinner                      │
│ ┌─────────────────────────────────┐ │
│ │  [Recipe Image]                  │ │
│ │  Spicy Chicken Tacos             │ │
│ │  🕐 Under 20 min • 🌶️ Spicy     │ │
│ │  👥 4 servings                   │ │
│ │  ✅ All set                      │ │ ← Status chip
│ └─────────────────────────────────┘ │
│ [🔒 Lock] [🔄 Swap] [🎲 Reroll]    │ ← Actions
│ [📖 Expand]                          │
└─────────────────────────────────────┘
``` text

#### Status Chips
- ✅ **All set** - Everything accounted for (green)

- ⚠️ **Might need something** - Low confidence on 1+ ingredients (amber)

- 🍚 **Uses leftover rice** - Reuse opportunity (blue)

#### Actions
- **Lock** 🔒 - Prevents changes during Generate Plan; shows lock icon on card

- **Swap** 🔄 - Opens drawer with 3-5 similar alternatives (same time band, similar vibes)

- **Reroll** 🎲 - Generates completely different recipe (deterministic, respects repeat guard)

- **Expand** 📖 - Shows full recipe details, ingredients, and steps in drawer

#### Primary CTA (Sticky Bottom Bar)
#### State 1: No plan
``` text
┌─────────────────────────────────────┐
│ Plan isn't generated yet.           │
│ [Generate Plan]                      │
└─────────────────────────────────────┘
``` text

#### State 2: Plan exists, items may need review
``` text
┌─────────────────────────────────────┐
│ Your list is ready!                  │
│ [Next: Shop] [💡 Quick Review]      │
│ ^ Save ~$12 by reviewing what you have
└─────────────────────────────────────┘
``` text

#### Generate Plan Button
- Triggers DLE to fill week with recipes

- Respects locked slots (doesn't overwrite)

- Shows loading state: "Building your week..." (2-3 seconds)

- On completion, scrolls to top and shows success toast: "Week is ready!"

---

### 1.2 Quick Review (Optional Drawer)

**Purpose:** Optional optimization to reduce cost/waste by confirming what's on hand

#### Trigger
- User taps "Quick Review" button from Planner sticky bar

- Badge shows potential savings: "Save ~$12"

#### NOT a trigger
- Low confidence items do NOT block shopping

- This drawer is purely optional

#### Layout
``` text
┌─────────────────────────────────────┐
│ ← Quick Review                Close │
│ ───────────────────────────────────│
│ Save ~$12 by reviewing what you have│
│                                      │
│ 📦 Pantry                            │
│ ─────────────────────────────────── │
│ □ Olive oil                          │
│   For Monday's pasta • Already added│
│   [✅ We have this] [🛒 Add to list]│
│                                      │
│ 🥬 Produce                           │
│ ─────────────────────────────────── │
│ □ Onions (1 medium)                  │
│   For Tuesday's tacos • Already added│
│   [✅ We have this] [🛒 Add to list]│
│                                      │
│ 🍚 Grains                            │
│ ─────────────────────────────────── │
│ □ Rice (1 cup)                       │
│   For Thursday's stir-fry            │
│   [Use leftovers] [Buy fresh]        │
│                                      │
│ [Skip for now] [Done]                │
└─────────────────────────────────────┘
``` text

#### Interaction
- Items grouped by category

- Default state: All items checked (will be added to list)

- Tapping "We have this" unchecks item (removes from list, saves money)

- Tapping "Use leftovers" removes fresh purchase, uses existing inventory

- Shows context: "For Tuesday's tacos" so user knows why it's needed

- Progress indicator: "3 of 12 reviewed"

#### Footer
- **Skip for now** - Closes drawer, proceeds with full list

- **Done** - Saves changes, updates list, shows toast: "Saved ~$12"

#### Important
- Quick Review is ALWAYS optional

- Closing the drawer mid-flow is safe; no progress is lost

- User can reopen anytime before checkout

---

### 1.3 Shopping

**Purpose:** Provide a trustworthy, grouped shopping list with one-tap checkout

#### Layout
``` text
┌─────────────────────────────────────┐
│ Shopping • This Week                 │
│ ───────────────────────────────────│
│ Estimated total: ~$67                │
│ Saved ~$12 by using what you have   │ ← If Quick Review used
│                                      │
│ 🥬 Produce                           │
│ ─────────────────────────────────── │
│ □ Chicken thighs (1.5 lbs)           │
│   For Tuesday's tacos                │
│   ~$8.99                             │
│                                      │
│ □ Onions (2 medium)                  │
│   For Tuesday's tacos, Wed's pasta   │
│   ~$1.49                             │
│                                      │
│ 🥫 Pantry                            │
│ ─────────────────────────────────── │
│ □ Diced tomatoes (28 oz can)         │
│   For Monday's pasta                 │
│   ~$2.29                             │
│                                      │
│ [📥 Download CSV] [🏪 Checkout]     │
└─────────────────────────────────────┘
``` text

#### Features
- Grouped by category (Produce, Meat, Dairy, Pantry, etc.)

- Sorted roughly by store aisle order

- Shows quantity, pack size, and context ("For Tuesday's tacos")

- Checkboxes for in-store use

- Estimated pricing (historical/fixture-based only; no live store API)

- Historical cost tracking: "Last week: $71 • 4-week avg: $68"

#### Primary CTAs
- **Download CSV** 📥 - Primary export

- **Text List** 📱 - Plain text format for copy/paste

#### Integrations
- No grocer integrations are active; exports are file/text only.

---

### 1.4 Cook Mode

**Purpose:** Full-screen step-by-step cooking interface with timers and parallelization

#### Trigger
- User taps "Start Cooking" button from recipe card or expanded recipe view

- Can be launched from past/future days (doesn't require current day)

#### Layout (Step-by-Step Mode - Default)
``` text
┌─────────────────────────────────────┐
│ ← Pause          Spicy Chicken Tacos│
│ ───────────────────────────────────│
│ Step 3 of 7                   [All]│ ← Toggle to see all steps
│                                      │
│ [Large, clear instruction]           │
│ Heat oil in a large skillet over    │
│ medium-high heat until shimmering.   │
│                                      │
│ ⏱️ 2 minutes                         │
│ [▶ Start Timer]                     │
│                                      │
│ 💡 While oil heats: Chop the onions │ ← Parallel hint
│                                      │
│ Ingredients for this step:           │
│ • 2 tbsp olive oil                   │
│                                      │
│ [◀ Back] [Next Step ▶]              │
└─────────────────────────────────────┘
``` text

#### Layout (All Steps Mode - Toggle)
``` text
┌─────────────────────────────────────┐
│ ← Back           Spicy Chicken Tacos│
│ ───────────────────────────────────│
│ All Steps                    [Step]│ ← Toggle to step-by-step
│                                      │
│ ✅ 1. Prep ingredients (5 min)      │
│ ✅ 2. Dice onions                   │
│ → 3. Heat oil (2 min) ⏱️            │
│ □ 4. Cook chicken (8 min)           │
│ □ 5. Add spices (1 min)             │
│ □ 6. Warm tortillas (2 min) || Step 5│ ← Parallel to step 5
│ □ 7. Assemble tacos                 │
│                                      │
│ [Start Step 3]                       │
└─────────────────────────────────────┘
``` text

#### Features
- **Pause button**: Saves progress, can resume later

- **Step-by-step mode (default)**: One step at a time, optimized for mobile

- **All steps mode (toggle)**: Overview for experienced cooks or larger screens

- **Timers**: Integrated countdown with start/pause/reset

- **Parallel hints**: "While this simmers: chop the onions" for multitasking

- **Progress indicator**: "Step 3 of 7" always visible

- **Ingredient list per step**: Only shows what's needed for current step

- **Scaled quantities**: Respects household servings or slot-specific override

#### Missing Ingredient Handling
If user taps "Missing something?" button:

``` text
┌─────────────────────────────────────┐
│ Missing Something?                   │
│ ───────────────────────────────────│
│ Which ingredient are you missing?    │
│ • Chicken thighs                     │
│ • Onions                             │
│ • Olive oil                          │
│ • Tortillas                          │
│                                      │
│ [Cancel]                             │
└─────────────────────────────────────┘
``` text

After selection:

``` text
┌─────────────────────────────────────┐
│ Quick Swap Options                   │
│ ───────────────────────────────────│
│ Missing: Chicken thighs              │
│                                      │
│ Try instead:                         │
│ • Ground beef                        │
│ • Shredded chicken (rotisserie)      │
│ • Black beans (vegetarian)           │
│                                      │
│ Or pick a different recipe:          │
│ [Browse under-20 min recipes]        │
│                                      │
│ [Cancel]                             │
└─────────────────────────────────────┘
``` text

#### Completion
After final step:

``` text
┌─────────────────────────────────────┐
│ 🎉 You cooked Spicy Chicken Tacos!  │
│ ───────────────────────────────────│
│ Ingredients have been deducted from  │
│ your inventory automatically.        │
│                                      │
│ How was it?                          │
│ [👍 Loved it] [👎 Not for us]       │
│ [♥ Favorite]                         │
│                                      │
│ Quick tags:                          │
│ [#KidFriendly] [#TooSpicy]          │
│ [#TookTooLong] [#MakeAgain]          │
│                                      │
│ [Done] [Undo: Mark as not cooked]   │
└─────────────────────────────────────┘
``` text

- **Cooked** action auto-deducts ingredients from implicit inventory

- **Undo** button available: Reverses ingredient deduction and cooking log

- Feedback is optional but encouraged

- Dismissing without feedback still marks as cooked

---

### 1.5 Weekly Recap

**Purpose:** Light feedback loop to teach the system taste preferences

#### Trigger
- Appears after marking a meal "Cooked"

- Can be dismissed with "Ask me later"

- Also accessible anytime from profile/settings

- Appears automatically at end of week (Sunday evening or Monday morning)

#### Layout
``` text
┌─────────────────────────────────────┐
│ How Was Your Week?                   │
│ ───────────────────────────────────│
│ You cooked 5 of 7 meals this week!  │
│                                      │
│ Spicy Chicken Tacos                  │
│ [👍] [👎] [♥]                       │
│ [#KidFriendly] [#TooSpicy] [#Quick] │
│                                      │
│ Creamy Tomato Pasta                  │
│ [👍] [👎] [♥]                       │
│ [#Comforting] [#TooRich] [#Easy]    │
│                                      │
│ Skipped:                             │
│ • Saturday's Beef Stew (ordered out) │
│ • Sunday's Grilled Salmon (?)        │
│                                      │
│ [Skip for now] [Submit Feedback]    │
└─────────────────────────────────────┘
``` text

#### Features
- Shows only meals that were cooked this week

- Thumbs up/down for each meal

- Optional heart for favorites (boosts future suggestions)

- Quick tags: pre-defined tags like #KidFriendly, #TooSpicy, #TookTooLong

- Shows skipped meals without guilt ("ordered out" is fine!)

- All feedback is optional

#### Impact
- 👍 = More recipes like this (boost recipe family)

- 👎 = Fewer recipes like this (avoid recipe family for 90 days)

- ♥ = Strong positive signal (boost and prioritize in future plans)

- Tags = Fine-tune (e.g., #TooSpicy reduces spice level in future suggestions)

#### Feedback decay
- Positive boost decays over ~90 days (prevents stale preferences)

- Negative signals expire after 90 days (tastes change, give recipes second chances)

---

### 1.6 Pantry (Optional Drawer)

**Purpose:** Manual inventory management for power users who want explicit control

**Default State:** Hidden (accessible from header menu or settings)

#### Layout
``` text
┌─────────────────────────────────────┐
│ ← Pantry                      Search│
│ ───────────────────────────────────│
│ Your pantry is managed automatically │
│ based on what you buy and cook.      │
│ Add items here if needed.            │
│                                      │
│ [+ Add Item]                         │
│                                      │
│ 🥬 Produce                           │
│ ─────────────────────────────────── │
│ Onions (2 medium)                    │
│ Added Dec 3 • ⚠️ Low soon           │
│ [−] [Edit] [+]                      │
│                                      │
│ 🍗 Protein                           │
│ ─────────────────────────────────── │
│ Chicken thighs (1 lb)                │
│ Added Dec 1 • 🚫 Expires Dec 10     │
│ [−] [Edit] [+]                      │
│                                      │
│ [Close]                              │
└─────────────────────────────────────┘
``` text

#### Features
- Quick search bar

- Inline +/− to adjust quantities

- Derived badges:

- ⚠️ **Low soon** - Quantity dropping, consider restocking

- 🚫 **Expiring** - Use within 3 days

- ❗ **Expired** - Past use-by date

- **Not required for value**: System works without pantry via implicit inventory

#### Philosophy
- Pantry is for people who enjoy explicit control

- Most users never need to open it

- System defaults to implicit inventory from Purchased + Cooked events

---

### 1.7 Calendar (Optional Feature)

**Purpose:** ICS export and notifications for preflight prompts (thaw, marinate, etc.)

#### Trigger
- User enables in settings: "Send me reminders"

- Quiet hours respected (default: 10pm–8am)

#### Notification Examples
#### T-24 (Night before)
``` text
🔔 Tomorrow: Spicy Chicken Tacos
Move chicken thighs from freezer to fridge tonight.
[Done] [Skip]
``` text

#### T-2 (Day-of, 2 hours before)
``` text
🔔 Tonight: Beef Stew (Weekend Project)
Start slow cooker in 2 hours for 6pm dinner.
[Done] [Remind me in 1 hour]
``` text

#### Fail-Safe (Missed thaw)
If user didn't confirm thaw and it's day-of:

``` text
┌─────────────────────────────────────┐
│ ⚠️ Thaw Check                       │
│ ───────────────────────────────────│
│ Tonight's recipe needs chicken       │
│ thighs, which are usually frozen.    │
│                                      │
│ Did you remember to thaw them?       │
│ [Yes, I'm all set]                  │
│ [Oops, swap to a faster recipe]     │
│ [I'll adjust timing]                 │
└─────────────────────────────────────┘
``` text

---

## 2) First-Time Experience (FTUE)

**Goal:** Get to first plan in <2 minutes with zero friction

### Flow

#### Step 1: Welcome Screen

``` text
┌─────────────────────────────────────┐
│                                      │
│  🍽️                                 │
│  VibeMeals                           │
│                                      │
│  Your dinner logistics co-pilot      │
│                                      │
│  We'll handle the planning, shopping,│
│  and cooking workflow so you can     │
│  stop stressing about dinner.        │
│                                      │
│  [Get Started]                       │
│                                      │
└─────────────────────────────────────┘
``` text

#### Step 2: Quick Setup (One Screen)

``` text
┌─────────────────────────────────────┐
│ Quick Setup (30 seconds)             │
│ ───────────────────────────────────│
│ How many people are you cooking for? │
│ [2] [3] [4] [5+]                    │
│                                      │
│ How much time do you usually have?   │
│ [<20 min] [~30 min] [Flexible]      │
│                                      │
│ [Skip for now] [Generate My Plan]   │
└─────────────────────────────────────┘
``` text

- **All questions are optional** (Skip for now uses smart defaults)

- No diet questions, no pantry setup, no profile forms

- If skipped, system uses: 4 servings, flexible time

#### Step 3: First Plan Generation

- Auto-runs Generate Plan with user's choices (or defaults)

- Shows loading state with friendly copy: "Building your week..."

- Takes 2-3 seconds

#### Step 4: Plan Ready (With Overlay Tutorial)

``` text
┌─────────────────────────────────────┐
│ 🎉 Your week is ready!              │
│ ───────────────────────────────────│
│ [Tooltip pointing to recipe card]    │
│ Tap any recipe to swap it. Lock the  │
│ ones you love.                       │
│                                      │
│ [Tooltip pointing to sticky bar]     │
│ When you're happy, tap Next: Shop    │
│                                      │
│ [Got it]                             │
└─────────────────────────────────────┘
``` text

- Shows plan with 7 meals

- Overlay tooltips explain core actions (non-blocking)

- User can dismiss and explore freely

#### Step 5: First Shop

- User taps "Next: Shop"

- Optional Quick Review badge: "New! Save money by reviewing" (can skip)

- Proceeds to Shopping list

- Export via CSV or plain text

#### Step 6: First Cook (Days Later)

- User opens app on cooking day

- Taps "Start Cooking" on a recipe

- Cook Mode opens with step-by-step instructions

- After completion, Weekly Recap appears with brief explanation:

``` text
┌─────────────────────────────────────┐
│ How was it?                          │
│ ───────────────────────────────────│
│ Your feedback helps us learn your    │
│ taste so next week feels more "you." │
│                                      │
│ [👍 Loved it] [👎 Not for us]       │
│ [Skip]                               │
└─────────────────────────────────────┘
``` text

---

## 3) The Golden Path (Zero-Friction)

#### Target weekly loop (5–10 minutes)
### Step 1: Generate Plan

- User opens app (returns to Planner by default)

- Taps **Generate Plan**

- Week fills with 7 dinners (respects locked slots)

- Takes 2–3 seconds

### Step 2: Optionally Tweak

- Reroll individual slots if not feeling them

- Swap to see 3-5 alternatives

- Lock favorites to preserve across future generates

### Step 3: Next: Shop (Immediately Available)

- No gates, no required reviews

- Sticky bar shows: **[Next: Shop]** and **[💡 Quick Review]**

- Quick Review is optional optimization (save money)

### Step 4: Checkout / Export

- CSV download

- Text list for manual shopping

### Step 5: Mark Purchased (Auto Where Possible)

- After export/shopping, one-tap confirmation: "Did you get everything?" [Yes]

- Not item-by-item; bulk confirm or skip

### Step 6: Cook (Throughout Week)

- On cooking day, tap **Start Cooking**

- Follow step-by-step instructions

- Mark **Cooked** when done → auto-deducts ingredients

### Step 7: Recap (Optional)

- After cooking or at end of week

- Thumbs/favorites teach taste

- Dismissible; feedback is optional

#### Time breakdown
- Generate + tweak: 2–3 minutes

- Quick Review (if used): 2–3 minutes

- Checkout: 1 minute

- **Total: 5–7 minutes per week**

---

## 4) Navigation Model

#### Two-Stop Train + Drawer
``` text
Plan ←→ Shop
  ↓
Quick Review (drawer)
Swap Options (drawer)
Recipe Details (drawer)
Pantry (drawer, optional)
``` text

#### Primary Navigation
- **Plan** (Home) ←→ **Shop** (horizontal swipe or tabs)

- All other surfaces are drawers or full-screen modals

#### Header (Always Visible)
``` text
[☰ Menu] VibeMeals • This Week [Week Picker]
``` text

#### Menu (Hamburger)
- Profile / Settings

- Pantry (optional)

- Past Plans (history)

- Help / Feedback

- Sign Out

#### Week Picker
- Tap to open: Current + next 3 weeks

- Active week has green indicator

- Future weeks show "Draft" badge

- Preflight/reminders only fire for Active Week

#### Rationale
- Maximal clarity: One big CTA per stop (Generate Plan, Next: Shop, Checkout)

- Drawers feel like "mini-assistants," not separate chore pages

- Back/forward never strands the user in an unclear state

---

## 5) Interaction Patterns

### 5.1 Slot Actions (Lock, Swap, Reroll, Expand)

#### Lock 🔒

- **Purpose:** Preserve this meal across future Generate Plan actions

- **Visual:** Lock icon appears on card; button toggles to "Unlock"

- **Behavior:** Locked slots are skipped during Generate Plan; user must manually change

#### Swap 🔄

- **Purpose:** "I don't like *this* recipe; show me similar options"

- **Behavior:** Opens drawer with 3-5 alternatives:

- Same time band

- Similar vibes/cuisine

- Different enough to feel like a choice

- **Drawer layout:**

``` text
┌─────────────────────────────────────┐
│ ← Swap Options          Spicy Tacos │
│ ───────────────────────────────────│
│ Not feeling tacos? Try these:        │
│                                      │
│ [Image] Chicken Fajitas              │
│ 🕐 Under 20 • 🌶️ Spicy             │
│ [Pick This]                          │
│                                      │
│ [Image] BBQ Chicken Wraps            │
│ 🕐 Under 20 • 🔥 Smoky              │
│ [Pick This]                          │
│                                      │
│ [Image] Teriyaki Chicken Bowl        │
│ 🕐 Under 20 • 🍯 Sweet & Savory     │
│ [Pick This]                          │
│                                      │
│ Not feeling any of these?            │
│ [Browse all under-20 recipes]        │
│                                      │
│ [Cancel]                             │
└─────────────────────────────────────┘
``` text

#### Reroll 🎲

- **Purpose:** "Surprise me with something completely different"

- **Behavior:** Generates new recipe using deterministic seed `(user, week, slot, attempt_n)`

- **Visual:** Quick fade animation; new recipe slides in

- **Undo:** Global undo stack preserves previous recipe

#### Expand 📖

- **Purpose:** See full recipe details before committing

- **Behavior:** Opens full-height drawer with:

- Full ingredient list (scaled to servings)

- Complete step-by-step instructions

- Estimated time, difficulty, equipment needed

- Nutritional info (if available)

- "Start Cooking" button

- **User can start cooking from here** without leaving drawer

---

### 5.2 Generate Plan Behavior

#### First Generate (No Prior Plan)
- Fills all 7 slots with recipes

- Uses household preferences (servings, time, diet flags)

- Respects repeat guard (no repeats from last 21 days)

- Takes 2–3 seconds

#### Subsequent Generate (Plan Exists)
- Shows confirmation if user has already shopped:

``` text
┌─────────────────────────────────────┐
│ Regenerate Plan?                     │
│ ───────────────────────────────────│
│ This will change recipes you've      │
│ already shopped for. Continue?       │
│                                      │
│ [Cancel] [Generate Anyway]          │
└─────────────────────────────────────┘
``` text

- Respects **locked slots** (doesn't overwrite)

- Replaces unlocked slots with new recipes

- Resets Quick Review state

#### Edge Case: No Recipes Match Constraints

If system can't find enough recipes:

``` text
┌─────────────────────────────────────┐
│ Couldn't Fill Week                   │
│ ───────────────────────────────────│
│ We couldn't find 7 new recipes that  │
│ fit your preferences.                │
│                                      │
│ Options:                             │
│ • Repeat a recipe you liked          │
│ • Loosen time constraints            │
│ • Pick some manually                 │
│                                      │
│ [Try Again] [Pick Manually]         │
└─────────────────────────────────────┘
``` text

---

### 5.3 Quick Review Interaction

#### Opening
- Taps "Quick Review" from sticky bar

- Drawer slides up from bottom (full-height on mobile, centered modal on desktop)

#### Item States
- **Default:** Checked (will add to list)

- **Unchecked:** "We have this" or "Use leftovers" (removes from list)

#### Smart Suggestions
- System pre-checks items it thinks user needs

- Pre-unchecks items it's confident they have (e.g., bought last week, not used)

#### Savings Calculation
- Real-time update: "Save ~$12" updates as user toggles items

- Based on estimated item prices from store API

#### Closing
- **Skip for now** → No changes, proceeds with full list

- **Done** → Saves changes, updates shopping list, shows toast

- **X (close)** → Same as "Skip for now"

---

### 5.4 Undo System (Global)

**Philosophy:** Never punish exploration; all actions are reversible

#### Undo Stack
- Tracks last 10 actions: rerolls, swaps, generate plan, mark cooked

- Accessible via toast or dedicated undo button

#### Toast Example (After Reroll)
``` text
┌─────────────────────────────────────┐
│ Changed Monday's dinner              │
│ [Undo]                               │
└─────────────────────────────────────┘
``` text

#### Global Undo Button
- Visible in header (faint, non-intrusive)

- Shows tooltip: "Undo last change"

- Disabled when stack is empty

---

## 6) Copy & Micro-UX

### 6.1 Voice & Tone

#### Principles
- **Human, not corporate:** "I'm not sure if you already have these things" not "Low confidence items detected"

- **Concise:** Short sentences, big buttons, clear outcomes

- **Explain why:** "We're asking about this because we've never seen you buy it before"

- **No jargon:** Avoid technical terms like "confidence bins," "slot state," "deterministic seed"

- **Assume tired:** Users are making decisions at the end of a long day

### 6.2 Button Labels

| Context | Label | Meaning |
|---------|-------|---------|
| Planner sticky bar (no plan) | **Generate Plan** | Fill week with recipes |
| Planner sticky bar (plan exists) | **Next: Shop** | Proceed to shopping list |
| Planner sticky bar (optional) | **💡 Quick Review** | Optimize list to save money |
| Slot actions | **Lock** / **Unlock** | Preserve/release recipe |
| Slot actions | **Swap** | See similar alternatives |
| Slot actions | **Reroll** | Get a different recipe |
| Slot actions | **Expand** | View full recipe details |
| Quick Review | **We have this** | Remove from list |
| Quick Review | **Add to list** | Include in shopping |
| Quick Review | **Use leftovers** | Don't buy fresh |
| Quick Review footer | **Skip for now** | Proceed with full list |
| Quick Review footer | **Done** | Save changes, update list |
| Shopping | **Download CSV** | Export shopping list |
| Shopping | **Copy Text** | Plain text list for copy/paste |
| Cook Mode | **Start Cooking** | Begin recipe |
| Cook Mode | **Cooked** | Mark complete, deduct ingredients |
| Cook Mode footer | **Undo: Mark as not cooked** | Reverse completion |
| Weekly Recap | **👍** / **👎** | Feedback on meal |
| Weekly Recap | **♥ Favorite** | Strong positive signal |

### 6.3 Empty States

#### Planner (No Plan)
``` text
┌─────────────────────────────────────┐
│                                      │
│  📅                                  │
│  Your week is empty                  │
│                                      │
│  Tap Generate Plan to fill it with   │
│  dinners that fit your schedule.     │
│                                      │
│  [Generate Plan]                     │
│                                      │
└─────────────────────────────────────┘
``` text

#### Shopping (No Plan Yet)
``` text
┌─────────────────────────────────────┐
│                                      │
│  🛒                                  │
│  No list yet                         │
│                                      │
│  Generate a plan first, then your    │
│  shopping list will appear here.     │
│                                      │
│  [Go to Planner]                     │
│                                      │
└─────────────────────────────────────┘
``` text

#### Pantry (Empty)
``` text
┌─────────────────────────────────────┐
│                                      │
│  📦                                  │
│  Your pantry is empty                │
│                                      │
│  We'll fill it automatically as you  │
│  shop and cook. You can also add     │
│  items manually.                     │
│                                      │
│  [+ Add Item]                        │
│                                      │
└─────────────────────────────────────┘
``` text

### 6.4 Error Messages

#### Shopping Export Failure
``` text
Shopping export isn't available right now.
Here's your list as a CSV instead.
[Download CSV]
``` text

#### Recipe Missing Ingredients
``` text
This recipe needs an ingredient we don't
have in stores yet. Want to swap?
[Pick a Different Recipe] [Keep It]
``` text

#### Network Failure
``` text
Couldn't connect to VibeMeals.
Check your internet and try again.
[Retry]
``` text

#### All errors
- Short, plain language

- Clear next action

- No blame ("you did X wrong"), no technical jargon

---

## 7) Accessibility

### 7.1 Keyboard Navigation

#### Requirements
- Full keyboard path through all surfaces

- Visible focus states (2px outline, high contrast)

- Logical tab order (top to bottom, left to right)

- Escape key closes drawers and modals

- Enter/Space activates buttons

#### Focus Trap
- Drawers (Quick Review, Swap Options, etc.) trap focus while open

- Background content is inert (`aria-hidden="true"`)

- Escape key returns focus to trigger element

### 7.2 Screen Readers

#### ARIA Labels
- All buttons have clear labels: `aria-label="Lock this recipe"`

- Drawers: `aria-labelledby="drawer-title"` and `role="dialog"`

- Form inputs: Associated with labels via `for` attribute

#### Live Regions
- Toast notifications: `aria-live="polite"`

- Loading states: `aria-busy="true"` and `aria-live="polite"`

- Sticky bar state changes: Announced via `aria-live`

#### Example
```html
<div role="status" aria-live="polite" aria-atomic="true">
  Week is ready! 7 dinners added.
</div>
``` text

### 7.3 Visual

#### Color Contrast
- WCAG AA minimum (4.5:1 for text)

- Status chips use color + icon (not color alone)

#### Text Size
- Base: 16px minimum

- Headers: 20–24px

- Buttons: 16–18px

#### Touch Targets
- Minimum 44×44px (mobile)

- Adequate spacing between tappable elements

### 7.4 Mobile-First

#### Design for small screens first
- Vertical scrolling (not horizontal)

- Full-width buttons at bottom (sticky)

- Large touch targets

- Minimal text input (use pickers/buttons)

#### Responsive breakpoints
- Mobile: <768px (default)

- Tablet: 768–1024px (2-column grid)

- Desktop: >1024px (3-column grid, sidebar navigation)

---

#### [Back to Index](index.md)

