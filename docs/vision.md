# VibeMeals Vision

**Version:** 4.0.0  
**Last Updated:** December 7, 2025

---

## 1) Why VibeMeals Exists

Most families don't struggle to find recipes; they struggle to **get dinner done** without a weekly circus of tabs, lists, and "oh no, we're out of ___."

### The Scattered Workflow (Current Reality)

Right now, dinner logistics are scattered across:
- Recipe apps and screenshots
- Store apps and handwritten lists
- Notes on the fridge
- Random calendar reminders
- Mental math about what's in the pantry

**The result:** Decision fatigue, mid-week store runs, wasted food, and the nagging feeling that "there has to be a better way."

### The VibeMeals Solution

VibeMeals turns that chaos into **one reliable weekly rhythm**:

> **Decide → Answer a few questions → Buy once → Cook → Learn**

Actually, scratch that. We can do better:

> **Decide → Buy once → Cook → Learn**

The questions should be optional optimization, not required gates.

---

## 2) North Star Promise

If you give VibeMeals one weekly planning session (5–10 minutes), it will:

1. **Build a week of dinners** that fit your time, tastes, and budget
2. **Turn that plan into a cart/list** you can trust (one trip, sensible quantities)
3. **Help you actually cook those meals** with minimal scrambling and waste
4. **Learn your household's patterns** so next week feels even more "like us"

---

## 3) What VibeMeals Is (and Isn't)

### VibeMeals IS:
- A **dinner logistics co-pilot** that handles the planning, shopping, and cooking workflow
- A system that makes **safe assumptions** so you can move fast, with optional ways to optimize
- A tool that **learns from your behavior** (what you buy, cook, and enjoy) not from setup forms
- An app that **respects your time** (5–10 minute weekly check-in, not 45-minute admin sessions)

### VibeMeals IS NOT:
- A recipe database or browser (we curate for logistics, not discovery)
- A calorie tracker or macro calculator
- A social network for sharing recipes
- An inventory management system (the pantry is optional; we infer from behavior)
- A meal kit subscription service

---

## 4) Core Philosophy: Calm Automation

VibeMeals is built on the principle that **the best automation feels invisible**.

### Safe Defaults Over Gates

**Bad UX:**
- "You have 5 unresolved items. You can't proceed until you answer these questions."
- "Low confidence detected. Please review."

**Good UX:**
- "Your list is ready. Want to save ~$12 by reviewing what you already have?" (optional)
- System adds everything to the list with safe defaults; optimization is a choice, not a requirement.

### Learn from Behavior, Not Surveys

**Bad UX:**
- "Set up your pantry before you can use the app."
- "Tell us about your dietary preferences, cooking skill level, favorite cuisines..."

**Good UX:**
- Week 1: System makes conservative assumptions (add everything, suggest popular recipes)
- Week 2+: "We noticed you gave 👎 to beef dishes. Want to skip red meat?" (optional)
- System learns from what you buy, what you cook, what you skip in Quick Review

### Assume People Are Tired

**Design principles:**
- One primary action per surface (big button, clear outcome)
- Short text, binary choices: "Use leftovers" vs "Buy fresh"
- No jargon: "I'm not sure if you already have these things" not "Low confidence items detected"
- Explain why briefly: "We're asking about this because we've never seen you buy it before"

### Never Punish Exploration

**Guarantees:**
- Rerolling a recipe is instant and reversible
- Swapping a meal doesn't affect other days
- Undo is always available and safe (global undo stack)
- Locked slots protect decisions you care about

---

## 5) Primary Users & JTBD

### Primary Users

**Busy households (1–5 people)** who:
- Are tired of re-deciding dinner every night
- Hate mid-week "second trips" to the store because they forgot something
- Want to waste less food without turning into inventory clerks
- Value their time more than optimization

**Secondary personas:**
- **The Planner** (does the weekly setup, wants speed and reliability)
- **The Cook** (follows the plan, wants clear steps and correct ingredients)
- **The Household** (has preferences, dietary needs, and evolving tastes)

### Job-to-be-Done (JTBD)

> "Once a week, help me pick our dinners, buy the right stuff in one go, and actually cook it without wasting food or last-minute scrambling."

**Success metrics:**
- Weekly planning session takes <10 minutes
- Single shopping trip covers the week
- Meals are cooked as planned (not abandoned)
- Food waste decreases over time
- Decision fatigue decreases over time

---

## 6) The Dinner Logistics Engine (DLE) Promise

**The DLE is the heart of the product.** It quietly guarantees dinner is provisioned, prepped, and cookable on time—**without turning the user into an inventory clerk.**

### Core Guarantees

1. **Provisioning**
   - You have what you need in sensible pack sizes
   - Safe substitutes chosen automatically when exact items unavailable
   - Safe default: When in doubt, add it to the list

2. **Preflight**
   - Tiny, timely prompts for thaw/marinate/soak/pre-chop
   - Make "Tuesday's dinner" actually possible at 5:30pm without panic

3. **Cooking**
   - Steps are parallelized to hit the promised time band
   - Built-in timers for hands-off tasks
   - Clear progress: "Step 3 of 7"

4. **Waste Minimization**
   - Leftovers and residual pack sizes tracked for reuse
   - Gentle suggestions: "You have leftover rice; want to use it Thursday?"
   - Not guilt-based; dismissible with "We ate it all" or "It went bad"

5. **Trust**
   - No blocking gates; safe defaults let you proceed immediately
   - Optional optimization saves money/waste
   - System learns from actions, not surveys

---

## 7) Success Looks Like...

### Week 1 (New User)
- Opens app, answers 2 quick questions (servings, time preference)
- Taps "Generate Plan"
- Week fills with 7 dinners
- Taps "Next: Shop"
- Gets Walmart cart or CSV immediately
- **Total time: 3 minutes**

### Week 4 (Returning User)
- Taps "Generate Plan"
- Sees familiar recipes mixed with new ones (repeat guard working)
- Optionally opens Quick Review: "Save ~$8 by reviewing what you have"
- Confirms 2 items they already own
- Proceeds to Shop
- **Total time: 5 minutes, $8 saved**

### Week 12 (Power User)
- System knows household preferences deeply
- Rarely suggests recipes they dislike
- Automatically suggests leftover-using recipes
- Quick Review accurately identifies what's on hand
- Planning feels like a helpful assistant, not a chore
- **Total time: 5 minutes, consistently good results**

---

## 8) Non-Goals (Out of Scope for MVP)

- Social features (sharing recipes, following other users)
- Advanced nutrition tracking (macros, calories beyond basic display)
- Meal kit ordering (we provide the list, not the delivery)
- Restaurant recommendations or takeout integration
- Breakfast, snacks, desserts (dinner only for MVP)
- Multi-household management (single household account for MVP)

---

## 9) Why This Will Work

### Existing Solutions Fall Short

| Solution | Problem |
|----------|---------|
| Recipe apps | Don't handle shopping or inventory |
| Store apps | Don't know what recipes you're making |
| Meal kit services | Expensive, limited choice, subscription lock-in |
| Manual planning | Takes too long, requires mental overhead |
| Meal planning apps | Too much data entry, feel like chores |

### VibeMeals' Advantage

- **End-to-end:** Plan → Shop → Cook in one app
- **Zero friction:** Safe defaults mean no blocking gates
- **Learns quietly:** From behavior, not surveys
- **Respects time:** 5–10 minute weekly check-in
- **Works immediately:** No setup required; optimization is optional

---

## 10) Measuring Success

### Quantitative Metrics
- Weekly active users (WAU)
- Plans generated per week
- Shopping lists exported per week
- Meals marked "Cooked" per plan
- Retention: Week 2, Week 4, Week 8 retention rates
- Time to first plan (target: <3 minutes)

### Qualitative Signals
- User testimonials mentioning "saved time" or "less stressful"
- Reduced support requests about "how do I..." (indicates intuitive UX)
- Organic sharing ("You should try this app")

### North Star Metric
**Meals cooked per plan** - If people are actually cooking the meals, we're delivering value. Everything else is vanity.

---

*[Back to Index](index.md)*
