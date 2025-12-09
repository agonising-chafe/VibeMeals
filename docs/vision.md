# VibeMeals Vision

**Version:** 4.6.0 **Last Updated:** December 7, 2025 **Status:** LOCKED – No
further additions without breaking into separate specs

---

## Table of Contents

1. [Why VibeMeals Exists](#1-why-vibemeals-exists) 2. [North Star
   Promise](#2-north-star-promise) 3. [What VibeMeals Is (and
   Isn't)](#3-what-vibemeals-is-and-isnt) 4. [Core Philosophy: Calm
   Automation](#4-core-philosophy-calm-automation)

  - [Tone & Emotional Contract](#41-tone--emotional-contract) 5. [Who This Is
     For & The Job To Be Done](#5-who-this-is-for--the-job-to-be-done)

  - [Core User Personas](#core-user-personas)

  - [Household Modes & Default Week
     Shapes](#52-household-modes--default-week-shapes)

  - [Cross-Persona Pain Matrix](#1-cross-persona-pain-matrix) 6. [Pain Map –
     Deep Dive](#6-pain-map--deep-dive) 7. [The Dinner Logistics Engine (DLE)
     Promise](#7-the-dinner-logistics-engine-dle-promise) 8. [Recipe Catalog &
     Time Bands](#8-recipe-catalog--time-bands) 9. [Experience Tests – Golden
     Stories We Must Not
     Break](#experience-tests--golden-stories-we-must-not-break) 10. [Special
     Constraints – Overlays on Top of
     Personas](#special-constraints--overlays-on-top-of-personas) 11.
     [Experience Tests – Golden v1.1](#experience-tests--golden-v11) 12.
     [Traceability – Stories to Golden
     Gates](#traceability--stories-to-golden-gates) 13. [Roadmap &
     Phasing](#roadmap--phasing) 14. [Learning & Adaptation
     Principles](#14-learning--adaptation-principles) 15. [System Boundaries &
     Integrations](#15-system-boundaries--integrations) 16.
     [Appendices](#appendices)

    - [Appendix A: Detailed Guarantees & Acceptance
      Tests](#appendix-a-detailed-guarantees--acceptance-tests)

    - [Appendix B: Storyboard – Ashley's Monday with
      VibeMeals](#appendix-b-storyboard--ashleys-monday-with-vibemeals)

    - [Appendix C: Persona Experience
      Stories](#appendix-c-persona-experience-stories-pain-lens--acceptance-tests)

---

## How to Read This Document

This vision document serves different audiences. Here's where to focus based on
your role:

#### Executive / Product Leadership:

- Start with: Sections 1–3 (Why we exist, North Star, What we are/aren't)

- Focus on: Section 11 (Golden v1.1 Tests – the 6 non-negotiable experiences)

- Skim: Section 13 (Roadmap) for MVP/V2/V3 phasing

#### Product Managers / Designers:

- Start with: Section 4 (Core Philosophy + Tone Contract)

- Deep-dive: Section 5 (Personas + Week Shapes), Section 6 (Pain Map)

- Reference constantly: Section 11 (Golden Tests), Section 4.1 (Tone guardrails)

- Use for boundaries: Section 15 (System Boundaries)

#### Engineers / Technical Leads:

- Start with: Section 7 (DLE Promise – architectural requirements)

- Focus on: Section 8 (Recipe Catalog rules), Section 14 (Learning principles)

- Reference for safety: Section 11 (Golden Tests as acceptance criteria)

- Use for integration: Section 15 (what we own vs delegate)

#### Content / Recipe Teams:

- Start with: Section 8 (Recipe Catalog & Time Bands – the hard rules)

- Reference: Section 5.2 (Household Modes for filtering), Section 4.1 (Tone)

- Test against: Section 11 Golden Tests (especially G1: "Tonight is actually
  cookable")

#### QA / Testing:

- Primary focus: Section 11 (Golden v1.1 – the 6 core experience tests G1-G6)

- Reference: Section 12 (Traceability mapping stories to gates)

- Use: `persona-checklists.md` for regression testing checklists

#### Logical Reading Flow (Full Document):

1. **Foundation (Sections 1–4):** Why we exist → What we promise → How we talk

  2. **Who & What Hurts (Sections 5–6):** Personas + Week Shapes → Pain
   deep-dive 3. **How We Solve It (Sections 7–8):** DLE architecture + Recipe
   catalog rules 4. **Testing & Validation (Sections 9–12):** Golden Stories →
   Special constraints → Golden v1.1 tests → Traceability 5. **Operational
   Anchors (Sections 13–15):** Roadmap → Learning principles → System boundaries

  6. **Appendices:** Detailed stories and acceptance tests

> **Quick reference for "Is this allowed?" questions:** > Check in order: Golden
Tests (Section 11) → System Boundaries (Section 15) → Catalog Rules (Section 8)
→ Tone Contract (Section 4.1)

---

## Core Tradeoff Principles (When In Doubt)

When product decisions involve tradeoffs, these principles define VibeMeals'
stance:

- **Clever vs Safe** → Choose safe (G1, G3)

- **Variety vs Cookability** → Choose cookability (G1, G6)

- **Save $3 vs Avoid second trip** → Avoid second trip (G3, G5)

- **Precision inventory vs Low user effort** → Choose low effort (G2)

- **Perfect adherence vs Plans that bend** → Choose bend (G4)

- **Learning fast vs Learning stable** → Choose stable (Section 14.4)

- **More features vs Core promises** → Choose core promises (Golden Tests are
  non-negotiable)

> When a feature idea conflicts with these principles, the feature must change
or be dropped.

---

## 1) Why VibeMeals Exists

Most families don't struggle to find recipes; they struggle to **get dinner
done** without a weekly circus of tabs, lists, and "oh no, we're out of ___."

### The Scattered Workflow (Current Reality)

Right now, dinner logistics are scattered across:

- Recipe apps and screenshots

- Store apps and handwritten lists

- Notes on the fridge

- Random calendar reminders

- Mental math about what's in the pantry

**The result:** Decision fatigue, mid-week store runs, wasted food, and the
nagging feeling that "there has to be a better way."

### The VibeMeals Solution

VibeMeals turns that chaos into **one reliable weekly rhythm**:

> **Decide → Answer a few questions → Buy once → Cook → Learn**

Actually, scratch that. We can do better:

> **Decide → Buy once → Cook → Learn**

The questions should be optional optimization, not required gates.

---

## 2) North Star Promise

If you give VibeMeals one weekly planning session (5–10 minutes), it will:

1. **Build a week of dinners** that fit your time, tastes, and budget 2. **Turn
   that plan into a cart/list** you can trust (one trip, sensible quantities) 3.
   **Help you actually cook those meals** with minimal scrambling and waste 4.
   **Learn your household's patterns** so next week feels even more "like us"

---

## 3) What VibeMeals Is (and Isn't)

### VibeMeals IS:

- A **dinner logistics co-pilot** that handles the planning, shopping, and
  cooking workflow

- A system that makes **safe assumptions** so you can move fast, with optional
  ways to optimize

- A tool that **learns from your behavior** (what you buy, cook, and enjoy) not
  from setup forms

- An app that **respects your time** (5–10 minute weekly check-in, not 45-minute
  admin sessions)

### VibeMeals IS NOT:

- A recipe database or browser (we curate for logistics, not discovery)

- A calorie tracker or macro calculator

- A social network for sharing recipes

- An inventory management system (the pantry is optional; we infer from
  behavior)

- A meal kit subscription service

---

## 4) Core Philosophy: Calm Automation

VibeMeals is built on the principle that **the best automation feels
invisible**.

### Safe Defaults Over Gates

#### Bad UX:

- "You have 5 unresolved items. You can't proceed until you answer these
  questions."

- "Low confidence detected. Please review."

#### Good UX:

- "Your list is ready. Want to save ~$12 by reviewing what you already have?"
  (optional)

- System adds everything to the list with safe defaults; optimization is a
  choice, not a requirement.

### Learn from Behavior, Not Surveys

#### Bad UX:

- "Set up your pantry before you can use the app."

- "Tell us about your dietary preferences, cooking skill level, favorite
  cuisines..."

#### Good UX:

- Week 1: System makes conservative assumptions (add everything, suggest popular
  recipes)

- Week 2+: "We noticed you gave 👎 to beef dishes. Want to skip red meat?"
  (optional)

- System learns from what you buy, what you cook, what you skip in Quick Review

### Assume People Are Tired

#### Design principles:

- One primary action per surface (big button, clear outcome)

- Short text, binary choices: "Use leftovers" vs "Buy fresh"

- No jargon: "I'm not sure if you already have these things" not "Low confidence
  items detected"

- Explain why briefly: "We're asking about this because we've never seen you buy
  it before"

### Never Punish Exploration

#### Guarantees:

- Rerolling a recipe is instant and reversible

- Swapping a meal doesn't affect other days

- Undo is always available and safe (global undo stack)

- Locked slots protect decisions you care about

---

## 4.1) Tone & Emotional Contract

VibeMeals is not just what the app does; it's **how it feels to be in the app**
when you're tired, stressed, or feeling behind.

This section defines the **emotional contract** between VibeMeals and the user.
If a flow or dialog violates this, it violates the product.

---

### 4.1.1 Who We Are (Voice & Vibe)

We talk like a **tired but competent friend** who is good at logistics and never
judgmental.

- Calm, clear, and concrete.

- Short, plain language over clever copy.

- Lightly encouraging, never preachy.

- "We'll figure it out" energy, not "you've failed" energy.

> We assume the user is doing their best with limited time, energy, and money.

---

### 4.1.2 Core Emotional Promises

1. **We normalize chaos.**

  - Kids get sick, shifts move, practices run late, people go out last minute.

  - Skipping or moving a meal is normal, not a moral failure.

2. **We celebrate small wins, not streaks.**

  - "You cooked at home twice this week 👏"

  - Never: "You broke your streak" or "You missed your goals."

3. **We never weaponize data.**

  - Waste, takeout, skipped meals, and budget are used for gentle suggestions,
     not guilt.

  - No "You wasted X" or "You ordered delivery Y times" as shaming.

4. **We side with the user, not the system.**

  - If reality conflicts with the plan, we help the plan adapt.

  - We're on your side when life happens.

---

### 4.1.3 How We Talk About Common Pain

#### 5:00 pm Panic

- **We do NOT say:**

  - "You should have planned better."

- **We DO say:**

  - "Here's the easiest way to get dinner done tonight."

  - "Too much for today? Want something simpler?"

#### Missed Preflight (Thaw/Marinate/etc.)

- **We do NOT say:**

  - "You forgot to thaw your chicken. You can't make this now."

- **We DO say:**

  - "Looks like the chicken is still frozen. Here are your options:

    - Swap to this backup dinner tonight.

    - Move this meal to another day."

##### We do NOT say:

- "You forgot to thaw your chicken. You can't make this now."

##### We do say:

- "Looks like the chicken is still frozen. Here are your options:"

  - Swap to this backup dinner tonight.

  - Move this meal to another day.

#### Skipped Meals / Eating Out Instead

- **We do NOT say:**

  - "You didn't stick to your plan."

- **We DO say:**

  - "Got it, enjoy your night out. Want to move this dinner to another day or
    swap in something simpler later?"

#### Takeout & Delivery

- **We do NOT say:**

  - "You ordered delivery 4 times this week."

  - "You relied on delivery too often."

- **We DO say:**

  - "You cooked at home 2 nights this week—nice. That probably saved you around
    $40 compared to delivery."

#### Waste & Leftovers

- **We do NOT say:**

  - "You threw away food."

- **We DO say:**

  - "You bought tortillas and beans recently. Want to plan a cheap dinner that
    uses them up?"

  - "If this ingredient keeps going unused, we can suggest it less."

---

### 4.1.4 How We Talk About Constraints & Ability

#### Health Constraints (Allergies, Celiac, Diabetes, etc.)

- **We do NOT say:**

  - "This may not be safe for you, use at your own risk."

- **We DO say:**

  - "We're avoiding gluten because you told us it's important. We swapped this
    dinner because your store didn't have a gluten-free pasta we trust."

We avoid practicing medicine or giving medical advice; we simply respect the
user's constraints and are transparent about substitutions.

#### Low-Confidence / New Cooks

- **We do NOT say:**

  - "This is an easy recipe anyone can do" (when it isn't).

  - "Season to taste" with no guidance.

- **We DO say:**

  - "Sprinkle on about 1 teaspoon of salt to start, then taste and add a little
    more if you'd like."

  - "If it browned faster than expected, just turn the heat down a bit and keep
    going—no problem."

#### Confident Cooks

- **We do NOT:**

  - Over-explain basic cooking techniques in a condescending way.

- **We DO:**

  - Focus on logistics: timing, coordination, consolidated lists.

  - Give them room to improvise: "Use your favorite spice blend here."

  - "You know your stove—adjust heat as needed. We're just here to coordinate
    the timing."

---

### 4.1.5 Guardrails for Copy & UX

When writing any message, dialog, or flow:

- **No blame language.**

  - Avoid "you forgot," "you didn't," "you should have."

- **No shame framing.**

  - Avoid guilt around takeout, waste, or missed meals.

- **Assume fatigue.**

  - Keep text short; lead with the main action, offer context second.

- **Offer choices, not lectures.**

  - "Here are your options…" rather than "you must…"

A simple litmus test:

> If a tired parent or exhausted single sees this message after a long day, do
they feel **helped** or **judged**?

If it's anything but "helped," the tone is wrong.

---

### 4.1.6 How This Connects to the Golden Experience Tests

- **G1 (Tonight is actually cookable)** – Tone must reduce panic, not add
  pressure.

- **G2 (Planning is a 5–10 min check-in)** – Tone must make planning feel light
  and finite, not like a chore.

- **G4 (Plans bend, they don't break)** – Tone must normalize chaos and support
  skipping/swapping.

- **G5 (Budget & waste respected)** – Tone must help without turning money/waste
  into shame or admin work.

- **G6 (Respect constraints & ability)** – Tone must protect constrained and
  low-confidence users from feeling unsafe or stupid.

If copy or UX fights any of these, it's violating the emotional contract—even if
the underlying logic is correct.

---

## 5) Who This Is For & The Job To Be Done

### Core User Personas

To make the pain points concrete and relatable, here are three primary personas
that represent our core user base. Each has a distinct weekly rhythm and dinner
pain profile.

#### Persona 1: Ashley – Full-Time Working, Commute + Kids' Activities

#### Snapshot

- 36, married, 2 kids (7 and 10)

- Works full-time in an office, 8–4:30 + 30–40 min commute

- Kids have sports 3–4 nights/week

- Partner helps, but Ashley is the "default" dinner planner

#### Weekly Rhythm

- **Weekdays:**

  - 6:30–7:30 am: Get kids up, breakfast, school drop-off

  - 8–4:30: Work (in office)

  - 5:15–6:00: Home, kids often already hungry

  - 6:30–8:30: Sports, homework, bath, "did you do your reading?"

- **Weekends:**

  - Errands, birthday parties, laundry, "catch up" tasks

  - Sunday evening is the *ideal* planning window that rarely happens

#### Dinner Reality

- Mix of:

  - Frozen standbys (nuggets, pizza)

  - A few "rotation" meals (spaghetti, tacos, burgers)

  - Wishful Pinterest saves she never gets to

- Half the time she's walking into the house at 5:30 with **no concrete plan**
  for that night.

#### Top Pain Points for Ashley

- **5:00 pm panic** is constant She's driving home thinking: "What can I throw
  together fast?"

- **Sunday planning dread** By the time she has a moment, she's too tired to do
  a multi-app planning session.

- **Hidden preflight** Planning a baked chicken meal on Sunday is pointless if
  she forgets to thaw it Wednesday morning.

- **Schedule mismatch** "How did I put a 45-minute meal on soccer night?"

- **Second trips** Mid-cook realizations of missing tortillas, sauce, or cheese.

- **Emotional load** If dinner fails, she feels like she "dropped the ball" on
  the kids.

#### What VibeMeals *must* do for Ashley

- Give her a **3-minute Sunday plan** that respects which nights are "sports
  nights."

- Auto-generate a **trustworthy list/cart** so the big shop covers her dinners.

- Send **small preflight nudges** on workdays in plain language ("Pull chicken
  from freezer before you leave / at lunch").

- Make **downgrade tonight** and **swap days** brainless: "Rough day? Switch to
  a 20-minute backup?"

- Never shame her for chaos weeks; always offer a clean reset + light reuse of
  ingredients.

---

#### Persona 2: Brianna – Part-Time / Hybrid Work, Chronic Context Switching

#### Snapshot

- 34, single mom, 2 kids (4 and 9)

- Works part-time + freelance (hybrid: some days home, some on-site)

- Money is tighter; groceries feel like a big chunk of the budget

- Has some flexibility, but her brain is **always split** between tasks

#### Weekly Rhythm

- **Workdays:**

  - M/W/F mornings on-site, afternoons remote

  - Juggles client calls, daycare pickup, homework

- **Non-workdays:**

  - Errands, appointments, cleaning, life admin

  - "I'll plan later" is a loop she gets stuck in

#### Dinner Reality

- Uses coupons/apps when she can, but rarely has the mental space to
  strategically plan.

- Has a set of cheap-ish "go-to" meals, but boredom and kids' complaints are
  creeping in.

- Food waste hurts emotionally and financially.

#### Top Pain Points for Brianna

- **Mental pantry tax** She's constantly asking, "Do we already have rice? Is
  that bag of spinach still good?" because overbuying hurts.

- **Overspending + no visibility** She often only sees the full cost at checkout
  and feels sick about it.

- **Stranded ingredients** Buys a pack (spinach, herbs, sour cream) for one
  recipe; the rest dies in the fridge.

- **Decision fatigue** Endlessly flipping between "cheap," "healthy," and "kids
  will actually eat this" is exhausting.

- **Admin tax from tools** She will not stick with any app that feels like a job
  to maintain.

#### What VibeMeals *must* do for Brianna

- Generate weekly plans in **one tap**, with simple budget bands ("keep it on
  the cheaper side").

- Treat certain ingredients as **packs** and try to **reuse them** automatically
  within the week.

- Offer **very small Quick Review**: "We think you still have rice from last
  week—want to plan around that?"

- Use simple costs signals ("$ / $$ / $$$ weeks," or "This swap saves~$6")
  without making her do math.

- Keep required logging **minimal** (ideally just "Cooked / Skipped" when she
  feels like it).

---

#### Persona 3: Danielle – Stay-at-Home but Overscheduled, Household COO

#### Snapshot

- 39, married, 3 kids (3, 8, 12)

- Not currently employed outside the home, but:

  - PTA

  - Carpool

  - Sports

  - Kid appointments

  - Managing the house

- Everyone assumes she has "time to cook," but her days are chopped into tiny
  pieces.

#### Weekly Rhythm

- **Daytime:**

  - School drop-offs/pickups staggered

  - Toddler management

  - Appointments, errands, volunteering, cleaning

- **Afternoons/Evenings:**

  - Activities, homework, sibling fights, "Mom, can you help with…"

- Weekends: games, events, extended family, church, etc.

#### Dinner Reality

- She actually *likes* the idea of cooking and variety… in theory.

- In practice, she falls back to:

  - safe kid meals

  - sheet-pan "dump and bake" dinners

  - takeout on especially chaotic days

She often starts "fun" recipes and then gets interrupted 20 times.

#### Top Pain Points for Danielle

- **Parallelization stress** Multitasking multiple pans, oven, kids, and cleanup
  feels like running a line kitchen.

- **Partner/kid misalignment** She plans something; older kid or spouse veto it,
  leading to arguments.

- **Leftovers & containers** Fridge archaeology: mystery containers, unlabeled
  leftovers, wasted food.

- **Dinner fights & resentment** She's carrying the entire mental load; when
  kids complain or spouse nitpicks, it stings.

- **Tool fatigue** She *has* tried meal apps and printables. They're either too
  rigid or too "craft project."

#### What VibeMeals *must* do for Danielle

- Present **coordinated steps** for main + sides that reduce juggling ("Do this.
  Now wait 10 minutes. Start this.").

- Offer **gentle expansion** from safe meals: variations on taco night / pasta
  night, not whiplash recipes.

- Help with **leftover reuse**: "You have cooked chicken from Monday; here are 2
  easy ideas for Wednesday or Thursday."

- Use a tone that feels like an ally, not a coach: "Real weeks are messy; let's
  make next week easier."

- Avoid any "crafty" or fiddly setup—no boards, tags, or fancy categorization
  required.

---

#### Persona 4: Kayla – Planning For One (Single, Hybrid Work, Social Life)

#### Snapshot

- 29, lives alone, hybrid job

- Some nights: gym / friends / dates / events

- Other nights: comes home wiped and doomscrolls with snacks or delivery

- Likes the idea of "cooking for herself," but it rarely survives contact with
  reality

#### Weekly Rhythm

- **Workdays:**

  - Hybrid schedule: some office days, some WFH

  - Evenings are unpredictable: gym, social plans, or exhaustion

- **Weekends:**

  - Brunch with friends, errands, self-care

  - Sometimes meal prep attempts; often abandoned

#### Dinner Reality

- Mix of:

  - DoorDash/delivery (too often, she feels)

  - Simple one-pan meals when motivated

  - Snack dinners or leftovers

- Gets excited about cooking, then life happens and groceries go bad

#### Kayla's Unique Pain Points

#### 1. "Cooking For One Barely Feels Worth It"

#### What it feels like
> "By the time I shop, cook, and clean up, I could've just ordered something."

- Emotional equation: Time + dishes + effort → one plate of food

- Feels **disproportionate** compared to tapping DoorDash

#### Why it happens

- Most recipes are written for 4+ servings

- Cooking workflows assume bigger households (more "worth it" per unit effort)

- Cleanup overhead doesn't scale down with portions

#### What VibeMeals should do

- Support **tiny plans** by default:

  - 2–4 dinners/week, not automatically "7 dinner slots"

- Prefer **low-dish, low-fuss recipes** for 1–2 servings:

  - one-pan, sheet-pan, skillet meals

- Make leftovers feel like a feature, not a burden:

  - Tag some meals as "Cook once, eat twice" on purpose

#### 2. Portion Chaos & Leftover Fatigue

#### What it feels like
> "Every time I cook, I end up drowning in leftovers and then wasting them."

- Cooks a 4-serving recipe → eats 1 → 3 servings sit in fridge

- Gets bored after eating the same thing twice

- Throws away containers a week later with guilt

#### Why it happens

- Recipes not scaled; shopping pack sizes not scaled

- No plan for how she'll **use the rest** before she gets bored

- No one else in the house to share leftovers with

#### What VibeMeals should do

- Treat "planning for one" as:

  - 1 cook → 2–3 eating events, *max*

- When suggesting a recipe:

  - Explicitly show: "You'll cook once and get 2 dinners. We'll schedule the
    second one on Thursday or for lunch."

- Offer **leftover remix recipes**:

  - Fried rice from leftover rice

  - Quesadillas from leftover chicken

  - Bowls/wraps using leftover protein + veg

- Help her **opt out** of too-much-leftover scenarios:

  - "Don't give me anything that makes more than 2–3 servings unless it's
    freezer-friendly."

#### 3. Social & Schedule Whiplash

#### What it feels like
> "I don't even know if I'll be home tomorrow night. Hard to commit to a plan."

- Plans to cook… then:

  - friend invites her out

  - date pops up

  - stays late at work or goes to the gym

- Now fresh ingredients sit unused

#### Why it happens

- Single, social life is more spontaneous

- Fewer fixed "family dinner" anchors

#### What VibeMeals should do

- Embrace **flexible, low-commitment planning**:

  - "This week: plan 2–3 cook nights; we'll keep the rest open."

- Prefer ingredients that:

  - keep a bit longer

  - or are frozen / pantry-based

- Make it super easy to:

  - *bump* a cook-night

  - automatically slide ingredients/recipes forward

#### 4. Takeout Guilt + Financial Drag

#### What it feels like
> "I blow too much money on delivery, but when I'm tired it's the only thing
that happens."

- Competing forces:

  - Wants to "be an adult" and cook / save $$

  - Wants to not be miserable after work

- Feels guilty:

  - about cost

  - about health

  - about wasting groceries she *did* buy

#### Why it happens

- Delivery is frictionless; cooking is not

- Planning/cooking feels like an all-or-nothing habit:

  - one chaotic week → "why do I even try?"

#### What VibeMeals should do

- Aim for **a small win, not perfection**:

  - "Plan 2 home-cooked dinners this week you'll actually do."

- Provide a **visible "you saved X vs delivery" narrative**, but light-touch:

  - not precise budgeting, more "You cooked twice, that's probably ~$40–$60
    saved."

- Make a "fallback dinner" set:

  - pantry-based 10–20 min options that feel better than DoorDash but close in
    effort

#### 5. Decision Fatigue & Loneliness at Dinner

#### What it feels like
> "It's just me. I'm making all these decisions and then sitting alone to eat.
Why am I doing this?"

- Emotional drag:

  - Not just "what's for dinner?" but also "why bother?"

- Cooking can feel lonely, performative, or pointless

#### Why it happens

- No built-in family feedback loop ("kids liked this," "partner loved that")

- No one to appreciate the extra effort on "project" nights

#### What VibeMeals should do

- Keep decisions **tiny**:

  - "Here are 2–3 good options for your week. Want them?" vs "pick from 100
    recipes."

- Celebrate small wins:

  - "You cooked 2 nice dinners for yourself this week 💛."

- Nudge toward "rituals" she can enjoy solo:

  - "Cozy pasta night," "Friday takeout-at-home" style, without being cheesy or
    over-social

#### 6. Kitchen Constraints

#### What it feels like
> "My kitchen is tiny and I don't want to blow it up for one dinner."

- Limited counter space and gear

- Hate big cleanup nights

#### Why it happens

- Recipes assume:

  - multiple burners

  - big oven

  - lots of counter and dish drying space

#### What VibeMeals should do

- For 1–2 person households, skew toward:

  - one-pan, one-pot, sheet-pan, or air-fryer/toaster-oven friendly recipes (if
    she has one)

- Show an **"effort footprint"**:

  - prep effort

  - number of pans

  - cleanup complexity

#### What VibeMeals *must* do for Kayla

- Support **2–4 dinners/week** as a legitimate planning target (not just "7
  minus skips")

- Frame cooking success as **"better than DoorDash twice this week"** not
  "perfect home cooking every night"

- Make **leftover management** central: "Cook once, eat twice (max)" with remix
  options

- Accommodate **high schedule volatility**: easy bumping, pantry-friendly
  fallbacks

- Use **effort footprint** as a first-class filter: one-pan, minimal cleanup

- Celebrate small wins without being patronizing: "You did it 💛" not "good job
  adulting"

#### Engine Flags for Singles/Small Households

When household size = 1–2, the system should:

- Default to fewer dinner slots per week (2–4, not 7)

- Prefer low-dish, single-pan recipes

- Tag recipes with "Cook once, eat twice" explicitly

- Allow "Leftover tolerance" setting (Low/Medium/High)

- Support "Schedule volatility" mode (favor pantry/freezer ingredients)

- Show "vs. delivery savings" narrative lightly

- Use "vibe tags" (cozy, light & fresh, etc.) over "kid-friendly"

- Provide "Kitchen footprint" profile (Low/Medium/High equipment complexity)

#### The Kayla Promise (Planning for One)

Not everyone is feeding a family of four. For people cooking mostly for
themselves, VibeMeals promises:

- **Fewer, better cook nights – not a full 7-day grid.** We aim for 2–4
  realistic dinners a week that actually happen, not perfection.

- **Recipes that feel "worth it" for one.** Small-batch, low-dish, one-pan style
  meals that turn one cooking session into 1–2 enjoyable dinners, not a week of
  dreaded leftovers.

- **Portion and leftover sanity.** We avoid drowning you in repeats, and when
  there *are* leftovers, we suggest simple remixes (bowls, wraps, fried rice)
  instead of letting them die in the fridge.

- **Flexible plans for volatile schedules.** We assume plans will shift—social
  plans, gym nights, late work—so it's always easy to bump, freeze, or swap a
  dinner without feeling like you "broke" the week.

- **Better than delivery, not holier-than-thou.** On tired nights, we compete
  with takeout on effort and cleanup, and we never shame you for tapping an app
  instead of cooking.

- **Emotionally light.** This is about taking care of yourself without turning
  dinner into a project; small wins ("you cooked twice this week") matter more
  than streaks or rules.

If someone cooking for one feels like VibeMeals makes home-cooked dinners easier
than scrolling delivery, without drowning them in leftovers or guilt, we're
doing our job.

---

#### How to Use These Personas

Use each persona as a **lens for decisions**:

- When debating a feature, ask: "Would Ashley/Brianna/Danielle/Kayla
  realistically use this, given their week?"

- When writing copy, gut check:

  - Ashley: "Would this feel like it respects how slammed she is at 5:15?"

  - Brianna: "Is this clearly worth her attention and money anxiety?"

  - Danielle: "Does this reduce overwhelm, not add clever complexity?"

  - Kayla: "Does this acknowledge she's cooking for herself and that's enough?"

#### Critical Design Check:
If a feature, flow, or default only makes sense for "family of 4 with kids,"
you're accidentally excluding Kayla and similar users. The system must flex for
household size 1–2 as a first-class use case, not an afterthought.

---

## 5.2 Household Modes & Default Week Shapes

VibeMeals is not trying to force every household into a 7×dinner grid.

Each household mode has a different idea of a "good week." This section defines
the **default week shape** for each mode so planning, AI, and metrics all aim at
the right target.

---

### 5.2.1 Household Modes (v1)

For v1, we treat these as the primary modes:

1. **Family with Kids** – Ashley / Brianna 2. **Solo / Planning for One** –
   Kayla 3. **DINK (Dual-Income, No Kids)** – Jake & Maya 4. **Empty Nest /
   Older Couple** – Ellen & Mark 5. **Large / Multi-Generational Household** –
   5–8+ people

(Health constraints, ADHD, shift work, etc. apply as overlays on top of these.)

---

### 5.2.2 Family with Kids – "Make Weeknights Survivable"

**Examples:** Ashley (FT working mom), Brianna (budget-stretched single mom)
**Typical size:** 3–5 people

#### Default week shape:

- **Dinners planned:** 4–7 per week

  - 1–2 nights can be intentionally "open" (leftovers / takeout / events).

- **Time mix:**

  - At least **3 "Fast" nights** (≤30 min, minimal mess)

  - 1–3 "Normal" nights

  - Optional 0–1 "Project" / nicer weekend dinner

- **Leftover pattern:**

  - Some meals explicitly planned as "cook once, eat twice"

  - Leftover events slotted intentionally (not random fridge surprises)

#### What "good" looks like:

- They do one main shop that actually covers dinners.

- 5pm feels calm because **tonight is realistic** for that day's schedule.

- They rarely need emergency second trips.

- When chaos hits, the plan **bends** (moves/swaps) instead of collapsing.

---

### 5.2.3 Solo / Planning for One – "A Few Real Wins, Not a New Personality"

**Example:** Kayla **Typical size:** 1 person (sometimes 1 + occasional guest)

#### Default week shape:

- **Dinners planned:** 2–4 per week

  - Not a full grid. Intentionally small by default.

- **Time mix:**

  - Mostly "Fast" and very simple "Normal" nights

  - Optional rare "Project" night if they opt in

- **Leftover pattern:**

  - Each cook night → **1–2 extra meals max**

  - Avoid drowning them in repeats; use leftovers intentionally (remix, not
    punishment)

#### What "good" looks like:

- They actually cook **2–3 times**, instead of ordering delivery every night.

- Leftovers are used or remixed, not a pile of guilt.

- Plans are flexible around social plans, gym, and variable energy.

---

### 5.2.4 DINK – "Flexible Plans That Survive Last-Minute Plans"

**Examples:** Jake & Maya **Typical size:** 2 adults

#### Default week shape:

- **Dinners planned:** 3–5 per week

  - The rest is assumed to be eating out, leftovers, or ad-hoc.

- **Time mix:**

  - 2–3 "Fast" or straightforward "Normal" dinners

  - Optional 1 "Project" / nicer meal on a chosen night

- **Leftover pattern:**

  - Light leftovers, often next-day lunch

  - No expectation that they eat at home every night

#### What "good" looks like:

- They have a few solid "at home" dinners anchored in the week.

- When they decide to go out, one tap moves or rescues the planned meal.

- They feel like VibeMeals fits a social, variable schedule, not fights it.

---

### 5.2.5 Empty Nest / Older Couple – "Comfort Rotation with Gentle Variety"

**Examples:** Ellen & Mark **Typical size:** 2 people

#### Default week shape:

- **Dinners planned:** 3–4 per week

  - They fill the gaps with their own long-standing habits.

- **Time mix:**

  - Mostly "Normal" and "Fast"

  - Occasional low-key "Project" if they want it

- **Leftover pattern:**

  - Smaller portions; leftovers are fine but not an endless parade

- **Variety pattern:**

  - ~2 "comfort rotation" meals

  - ~1 "small twist" (variation on something familiar)

#### What "good" looks like:

- They see their usual meals, plus **tiny, low-effort variations**.

- They're not forced to buy 10 new ingredients for "variety."

- It feels like their rotation got fresher without becoming a project.

---

### 5.2.6 Large / Multi-Generational Household – "Enough Food, No Chaos"

**Examples:** 5–8+ people, often multi-gen or blended households **Typical
size:** 5–8+ people

#### Default week shape:

- **Dinners planned:** 3–5 per week

  - Some nights may rely on leftovers / simple standbys.

- **Time mix:**

  - A mix of "Fast" crowd-pleasers and a few hearty "Normal" meals

- **Portion pattern:**

  - Plans always sized to **actual headcount**, not a default "serves 4"

  - Slightly conservative upsizing on core components (meat, starch, main veg)

#### What "good" looks like:

- There is **enough food** every planned night without constant manual scaling.

- Second trips and missing-core-ingredient disasters are rare.

- Cost is kept under control by using bulk wisely and minimizing stranded
  extras.

---

### 5.2.7 Cross-Mode Principles

Regardless of household mode:

- **Planning should take 5–10 minutes**, not 45

- **One main shop** should cover planned dinners

- **Plans must flex** when chaos hits (swap/skip is normal)

- **Preflight is always visible** before it's too late

- **Tone is supportive, never judgmental**

---

### 5.2.8 Why Week Shapes Matter

These week shapes are **targets**, not rigid rules:

- The planner should **start here by default** based on household mode.

- Users can always tweak (more/fewer dinners, more/less ambition), but the
  system's "first guess" should respect these shapes.

- Metrics should be read through this lens:

  - A "good" week for a solo user is **2–3 successful cook nights**, not 7
    filled slots.

  - A "good" week for a family might be **4–6 dinners cooked as planned**, not
    perfect adherence to every slot.

If a feature or algorithm change pushes week shapes back toward a
one-size-fits-all 7×dinner grid, it's working against the vision.

---

### 5.2.9 Household Mode Changes – When Life Changes, We Reset Intentionally

Households change: roommates move out, partners move in, kids are born, kids
leave, schedules shift.

When a user makes a **fundamental change** to their household profile (e.g.,
from solo → family of 4, from family → empty nest, from "2 dinners/week" → "5
dinners/week"), VibeMeals should treat this as a **new baseline**, not just a
subtle "learning nudge."

#### Examples of mode-changing events:

- Headcount change:

  - 1 → 2 (new partner)

  - 2 → 4 (kids or blended households)

  - 4 → 2 (kids leaving home)

- Intent change:

  - "Cover 2 dinners/week" → "Cover 5 dinners/week"

- Lifestyle change:

  - Starting shift work pattern

  - Moving from "beginner cook" to "comfortable cook"

#### When a mode change happens:

VibeMeals should:

- **Re-anchor week shapes** to the new mode:

  - New default number of dinners

  - New typical time band mix

- **Preserve only the most stable preferences:**

  - Strong likes/dislikes (e.g., "no pork," "hate mushrooms")

  - Clear health constraints (e.g., "no gluten")

- **Re-ask a few key intent questions**, if needed:

  - "How many dinners do you want covered now?"

  - "How much cooking energy do you usually have on weeknights?"

VibeMeals should **not**:

- Drag forward overly specific patterns from an incompatible past mode:

  - Solo leftover patterns into a big family

  - "2 easy wins" logic into a 5-dinner family plan

- Assume that old learning about:

  - week shape,

  - leftover tolerance,

  - or budget behavior still applies unchanged.

#### Connection to Section 14 (Learning & Adaptation):

Mode changes are **resets**, not gradual adaptations. Section 14.4 covers how
learning tunes *within* a mode over time. This section covers what happens when
the mode itself changes—we start fresh with new defaults rather than letting old
patterns thrash.

#### Goal:
Mode changes are treated as "**start a new chapter with some remembered
tastes**," not "keep pretending this is the same household and let learning
thrash for months."

---

### Who This Is For (General)

**Busy households (1–5 people)** who:

- Are tired of re-deciding dinner every night and hitting **5:00 pm panic**

- Hate mid-week **second trips** because a key ingredient was missing

- Want to waste less food without becoming inventory clerks

- Value their time and sanity more than perfect optimization or "food as a
  hobby"

In practice, VibeMeals usually shows up like this:

- **The Planner**

  - Owns the weekly setup.

  - Feels the brunt of decision fatigue and scattered workflows.

  - Wants a fast way to say "this is the week" without spreadsheets, tags, or
     research rabbit holes.

- **The Cook**

  - Follows the plan day-to-day.

  - Wants clear steps, realistic time estimates, and **no 5:47 pm surprises**
     ("wait, we're out of chicken?").

- **The Household**

  - Has opinions, constraints, and evolving tastes.

  - "Votes" on meals by eating, complaining, asking for repeats, or quietly
     skipping.

  - Doesn't want to argue about dinner; just wants it to work.

### The Job To Be Done

> "Once a week, help me pick our dinners, buy the right stuff in one go, and
actually cook it without wasting food or last-minute scrambling."

This job includes:

- **Avoiding 5:00 pm panic** (there's always a realistic plan for tonight)

- **Avoiding emergency second trips** (the first shop actually covers the plan)

- **Reducing decision fatigue** (the system suggests, you nudge)

- **Reducing food waste guilt** (leftovers and half-packs have a plan, not a
  fate)

- **Surviving chaos weeks** (sick kid, late practice, work fire) without the
  whole plan collapsing

#### Success, from the user's perspective:

- Weekly planning feels like a quick check-in, not a project (<10 minutes,
  ideally ~5).

- One main shopping trip per week, with emergency runs becoming rare.

- Most planned meals actually get cooked instead of abandoned.

- The trash can sees fewer untouched vegetables and half-used packs.

- The household spends less energy on "what's for dinner?" and more time just
  eating together.

---

## 6) Pain Map – Deep Dive

VibeMeals exists to relieve a specific cluster of recurring pains. This deep
dive makes each pain concrete and ties it to design implications, so we can
prioritize ruthlessly.

Each pain includes:

- **What it feels like** – from the user's POV

- **Why it happens** – structural causes

- **How it shows up** – observable behavior / signals

- **What VibeMeals should do** – design response

- **MVP Severity** – High / Medium / Low

> **Note:** For a complete week-in-the-life narrative showing how these pains
compound in real time, see the detailed "Busy Mom Reality" scenario preserved in
earlier versions. The structured pain categories below distill those experiences
into actionable design guidance.

### 6.1 Planning & Decision Pains

#### 6.1.1 Nightly re-deciding ("What's for dinner?" x7)

- **What it feels like** It's 4:30–5:30 pm, everyone's hungry, and they're
  starting from zero *again*. Every night is a mini crisis.

- **Why it happens**

  - No weekly plan, or plans that are too fragile to trust.

  - Past attempts at planning felt like too much work (spreadsheets, apps with
    heavy setup).

  - The "mental cost" of planning on Sunday is high, so they skip it.

- **How it shows up**

  - Lots of takeout on random weekdays.

  - Repeating the same 3–4 "emergency" dinners (frozen pizza, nuggets, etc.).

  - People say things like "We never know what's for dinner" or "We just wing
    it."

- **What VibeMeals should do**

  - Make "Generate a plan" a **one-tap, <3 minute** operation.

  - Make the **default** plan good enough that they will actually follow it.

  - Ensure that the plan **survives the week** (doesn't crumble at the first
    schedule hiccup).

- **MVP Severity:** **High** – this is the anchor pain.

---

#### 6.1.2 Sunday planning dread

- **What it feels like** The idea of "meal planning" feels like homework. They
  know it might help, but they avoid it.

- **Why it happens**

  - Previous planning experiences required:

    - Multiple tabs and apps.

    - Copy/paste, manual lists, and calendar juggling.

  - It feels like a big, open-ended project instead of a guided flow.

- **How it shows up**

  - "We *should* meal plan" but never do.

  - Intent to plan on Sunday… but they end up scrolling instead.

  - Occasional giant planning effort followed by weeks of not doing it again.

- **What VibeMeals should do**

  - Make the weekly planning session feel like **a short check-in**, not a
    project:

    - Single screen, clear steps.

    - "You're done" moment.

  - Show immediate payoff: plan + list/cart right away.

  - Default to a simple path; advanced tweaks are off to the side.

- **MVP Severity:** **High** – if the weekly ritual feels heavy, retention dies.

---

#### 6.1.3 Schedule mismatch

- **What it feels like** The plan ignores reality: complicated meals land on
  sports nights; easy meals land on chill nights. They stop trusting it.

- **Why it happens**

  - Plans are built in a vacuum, without time context.

  - Users don't want to manually tag every day as "busy/medium/chill."

- **How it shows up**

  - They skip or reorder meals constantly.

  - They complain that meal plans are "unrealistic for our week."

  - Patterns: Tuesdays are always insane, but the app doesn't treat them
    differently.

- **What VibeMeals should do**

  - Give a **lightweight way** to express time reality:

    - Simple per-day time bands ("Fast / Normal / Project").

    - Or one-time "typical week" pattern it learns from behavior.

  - Respect those time bands when choosing recipes.

  - Make reassigning meals to other days frictionless.

- **MVP Severity:** **High** – directly drives whether they stick to the plan.

---

#### 6.1.4 Analysis paralysis from too many options

- **What it feels like** They scroll recipes endlessly, unable to pick. It feels
  like Netflix: lots of choice, no decision.

- **Why it happens**

  - Infinite recipe inventory with no opinionated "good for this week" filter.

  - Lack of constraints or curated sets.

- **How it shows up**

  - Users bounce between apps and never firm up a list.

  - They ask "What's easy for tonight?" rather than search.

  - They reuse the same 4–5 recipes because the alternative is too much work.

- **What VibeMeals should do**

  - Offer **small, curated sets** per day ("Here are 3 good options for
    Tuesday").

  - Lead with pre-filtered collections: time band + familiarity +
    kid-friendliness.

  - Provide an easy "reroll" button instead of a giant search.

- **MVP Severity:** **Medium–High** – key for your "5–10 minute plan" promise.

---

### 6.2 Shopping & Money Pains

#### 6.2.1 Second trips & mid-meal "oh no we're out of ___"

- **What it feels like** They are mid-cook and realize a critical ingredient is
  missing. Rage + shame + scramble.

- **Why it happens**

  - Lists are incomplete or wrong.

  - They assumed they had an ingredient but were mistaken.

  - Apps try to be "smart" about pantry but end up under-adding.

- **How it shows up**

  - Emergency runs to the store.

  - Abandoned recipes mid-stream.

  - Swearing off apps that "missed stuff."

- **What VibeMeals should do**

  - Default to **over-including** ingredients unless the user explicitly
    confirms ownership.

  - Make "I already have this" a **quick, optional** step (Quick Review).

  - Maintain clear bias in copy: "We'd rather give you extra sour cream than
    send you back to the store."

- **MVP Severity:** **Highest** – this is your core trust contract.

---

#### 6.2.2 Overspending without noticing

- **What it feels like** They leave the store with a big bill and only a fuzzy
  sense of what drove it.

- **Why it happens**

  - No connection between plan complexity and cost.

  - No guidance on cheaper alternatives.

  - Heavy reliance on "gut feel" in the aisle.

- **How it shows up**

  - "Groceries are killing us" sentiment.

  - Avoidance of slightly nicer ingredients because of fear of cost.

  - They may blame meal planning for making them overspend.

- **What VibeMeals should do**

  - Provide **rough cost bands** for weeks and meals ("$ / $$ / $$$").

  - Offer one-tap cheaper swaps ("Swap this steak fajita to chicken fajita to
    save ~$X").

  - Allow users to set a simple "budget target" and nudge them toward staying in
    that lane.

- **MVP Severity:** **Medium** – strong differentiator, but can be rough at
  first.

---

#### 6.2.3 Pack-size mismatch / stranded ingredients

- **What it feels like** They buy a whole bunch of something for one recipe, and
  the rest dies in the fridge.

- **Why it happens**

  - Recipes treat ingredients in abstract units (e.g., "2 tbsp cilantro")
    without pack awareness.

  - No planning across meals to reuse packs.

- **How it shows up**

  - Half-used herbs, sour cream, greens regularly thrown out.

  - Users say "I don't want recipes that use weird one-off things."

- **What VibeMeals should do**

  - Treat some ingredients as **pack-based** (bag of spinach, bunch of cilantro,
    tub of sour cream).

  - Try to schedule **downstream recipes** that use those packs.

  - Label these gently: "Uses the rest of your sour cream from Tuesday."

- **MVP Severity:** **Medium–High** – central to food waste story, can start
  simple.

---

#### 6.2.4 Multi-store chaos

- **What it feels like** They shop at Costco + a regular grocery store, but
  lists aren't split or prioritized correctly.

- **Why it happens**

  - Apps assume a single store.

  - No modeling of "this item usually at Store A vs Store B."

- **How it shows up**

  - Duplicated items across stores.

  - Wrong pack sizes at wrong stores.

  - Users maintain manual side-lists ("Costco list") anyway.

- **What VibeMeals should do (later)**

  - Allow a **simple two-store mode**: bulk vs regular.

  - Let users mark certain ingredients as "usually Costco" and reflect that in
    lists.

  - Not MVP-critical, but important for many families.

- **MVP Severity:** **Low–Medium** – can be v2.

---

### 6.3 Cooking-Time Pains

#### 6.3.1 Time lies ("30-minute meals" that take 60+)

- **What it feels like** They start a "quick" recipe and realize prep is way
  longer than promised; everything runs late.

- **Why it happens**

  - Recipe authors under-report time.

  - Doesn't account for normal home speed (interruptions, kids, cleanup).

  - Unrealistic multitasking assumptions.

- **How it shows up**

  - Kids melt down around dinner.

  - Users avoid recipes that "look complicated" even if they're not.

  - Trust in time estimates collapses.

- **What VibeMeals should do**

  - Have **honest time bands**: "Fast (≤25m hands-on), Normal (30–45m), Project
    (60+)."

  - Design steps and order explicitly to fit the band.

  - Let users choose "I prefer mostly Fast meals for weeknights."

- **MVP Severity:** **High** – directly affects 5:00 pm panic.

---

#### 6.3.2 Hidden preflight steps

- **What it feels like** At 5:00 they learn they needed to thaw meat or marinate
  earlier; recipe is dead on arrival.

- **Why it happens**

  - Preflight steps buried in prose.

  - No separation between "things you should have done earlier" and "things you
    do at cook time."

- **How it shows up**

  - Skipped meals and last-minute junk food.

  - "We never use our plans because we forget to thaw."

- **What VibeMeals should do**

  - Mark steps as **Preflight** vs **Cook-time** in the recipe model.

  - Send optional, small nudges: "Tonight's chicken should come out of the
    freezer by 10 am."

  - Offer same-day pivots: "Too late to thaw? Swap to this pantry-friendly
    backup."

- **MVP Severity:** **High** – key differentiator vs static planners.

---

#### 6.3.3 Complexity vs energy mismatch

- **What it feels like** They planned an ambitious recipe on a day they are
  totally cooked mentally. They bail out.

- **Why it happens**

  - Plans don't consider mental load.

  - People are bad at forecasting how fried they'll be on Thursday.

- **How it shows up**

  - Skipped "project" recipes.

  - Frequent "we just did nuggets instead."

- **What VibeMeals should do**

  - Allow the user to broadly say: "Weeknights: mostly Fast, 1 Normal. Weekends:
    ok with a Project."

  - During the day, allow one-tap **"downgrade tonight's dinner"** to something
    simpler that still fits ingredients.

- **MVP Severity:** **Medium–High** – contributes a lot to plan adherence.

---

#### 6.3.4 Equipment mismatch

- **What it feels like** Halfway through, the recipe assumes an Instant Pot or
  giant sheet pan they don't own.

- **Why it happens**

  - Recipes assume certain gear without calling it out upfront.

  - Most apps don't model equipment constraints.

- **How it shows up**

  - Frustration mid-cook.

  - Avoidance of new recipes.

- **What VibeMeals should do**

  - Ask **one tiny question** early: "Do you have these?" with a short list of
    key gear.

  - Tag recipes that require "special gear."

  - Default away from recipes needing gear they don't have.

- **MVP Severity:** **Medium** – nice quality-of-life win.

---

#### 6.3.5 Parallelization stress

- **What it feels like** They feel like a line cook: juggling multiple burners,
  timers, kids, and cleanup.

- **Why it happens**

  - Recipes are solo; they don't coordinate sides + mains.

  - Instructions aren't sequenced for real humans.

- **How it shows up**

  - Everything done at weird times (sides cold, mains hot).

  - Anxiety around more-than-one-pan meals.

- **What VibeMeals should do**

  - Present **coordinated steps** for main + sides.

  - Use simple labels: "Hands-on vs Wait" time.

  - Show "You can breathe for 8 minutes now" moments.

- **MVP Severity:** **Medium** – this is where you add a lot of "this feels
  magical."

---

### 6.4 Household & Emotional Pains

#### 6.4.1 Picky eaters & veto risk

- **What it feels like** Planner feels defeated when someone refuses to eat what
  they planned.

- **Why it happens**

  - App doesn't learn dislikes.

  - No way to cheaply reroll without blowing up the plan.

- **How it shows up**

  - Families gravitate to the same 4–5 safe meals.

  - Avoidance of anything new because conflict is too draining.

- **What VibeMeals should do**

  - Make 👎 + reroll **cheap and safe**.

  - Gradually reduce suggestions for recipes repeatedly vetoed.

  - Show small "variations" on accepted meals for gentle expansion.

- **MVP Severity:** **High** – key to emotional buy-in.

---

#### 6.4.2 Partner misalignment ("You planned what?")

- **What it feels like** Planner sets aspirational meals. Cook (often the other
  partner) is blindsided and overwhelmed.

- **Why it happens**

  - The person planning isn't always the person cooking.

  - No easy visibility or coordination between them.

- **How it shows up**

  - Last-minute "We're not doing that tonight."

  - Planner feels unappreciated; cook feels ambushed.

- **What VibeMeals should do**

  - Make tonight's plan and time band **super visible** on a "Today" view.

  - Provide a tiny "Is this realistic?" nudge for the Cook.

  - Allow quick downgrade: "Too much for tonight → pick a simpler alternative."

- **MVP Severity:** **Medium–High** – important for multi-adult households.

---

#### 6.4.3 No-show diners & shifting headcount

- **What it feels like** People's attendance fluctuates; portions and leftovers
  never feel right.

- **Why it happens**

  - Teens/social lives, shift work, sports.

  - Plans assume fixed headcount.

- **How it shows up**

  - Too many leftovers some weeks, not enough others.

  - Frustration with "the plan doesn't match reality."

- **What VibeMeals should do**

  - Let users express simple patterns: "Usually 4, sometimes 3 on XYZ nights."

  - Allow lightweight same-day adjustment: "Cooking for 3 instead of 5 tonight."

  - Factor this into leftover suggestions.

- **MVP Severity:** **Medium** – can be iterative.

---

#### 6.4.4 Dinner fights & resentment

- **What it feels like** Tactical fights are really about emotional load: "You
  don't appreciate how hard this is."

- **Why it happens**

  - One person silently shoulders planning/shopping/cooking.

  - Failures (waste, second trips) feel like *their* failure.

- **How it shows up**

  - Spats about "we always eat the same thing" or "you never plan."

  - Emotional friction around dinner decisions.

- **What VibeMeals should do**

  - Make the **work visible and shared**:

    - Clear weekly plan both can see.

    - Simple ways to tag who's cooking what.

  - Remove as many failure modes as possible (second trips, unrealistic plans)
    so they don't get blamed.

- **MVP Severity:** **High** – this is the emotional payoff.

---

#### 6.4.5 Food waste guilt

- **What it feels like** Throwing money and food into the trash; feeling
  irresponsible or incompetent.

- **Why it happens**

  - Stranded ingredients.

  - Over-buying without a plan for leftovers.

  - Life chaos causing unmade meals.

- **How it shows up**

  - People say "We just throw so much food away."

  - They feel bad looking in their fridge.

- **What VibeMeals should do**

  - Track common leftover-friendly items (rice, tortillas, proteins, greens).

  - Gently suggest "use-it-up" recipes.

  - Never shame; always frame as "Want to get extra mileage from…?"

- **MVP Severity:** **High** – core to your story.

---

### 6.5 Tool / App / UX Pains (Meta-Pains)

#### 6.5.1 Setup hell

- **What it feels like** They download an app and it demands 20 minutes of
  surveys and pantry setup before helping.

- **Why it happens**

  - Tools try to model everything upfront.

  - Designers front-load preference capture.

- **How it shows up**

  - Users abandon during onboarding.

  - They say "I don't want another thing to set up."

- **What VibeMeals should do**

  - Provide immediate value without setup ("Generate my week" works on first
    run).

  - Ask for tiny bits of info over time, only when necessary.

  - Onboarding is essentially: choose servings + broad time preference → get a
    plan.

- **MVP Severity:** **Highest** – your Calm Automation philosophy depends on
  this.

---

#### 6.5.2 Rigid plans that punish real life

- **What it feels like** If they miss a preflight or skip a meal, the plan is
  "ruined" and the app feels brittle.

- **Why it happens**

  - Apps treat schedules as fixed contracts.

  - No built-in recovery paths.

- **How it shows up**

  - Users drop apps after one bad week.

  - They say "We fell off the wagon."

- **What VibeMeals should do**

  - Make skipping, swapping, and rerolling **safe & encouraged**.

  - Provide recovery flows ("We missed these two meals: here's how to reuse,
    freeze, or re-plan.").

  - Messaging: "Real weeks are messy; we'll adapt with you."

- **MVP Severity:** **High** – this is your resilience story.

---

#### 6.5.3 Over-admin / feels like work

- **What it feels like** The app creates more tasks (tagging, logging,
  organizing) than it removes.

- **Why it happens**

  - Feature creep: tags, labels, boards, collections.

  - Tools built for power users, not tired parents.

- **How it shows up**

  - Users say "It's just too much to keep up with."

  - Usage drops after initial enthusiasm.

- **What VibeMeals should do**

  - Ruthlessly limit required user actions.

  - Hide power features behind "Advanced" affordances.

  - Design flows around **1–2 big buttons** and 0–2 small decisions per screen.

- **MVP Severity:** **High** – directly aligned with "Assume people are tired."

---

#### 6.5.4 Lack of trust in the list/cart

- **What it feels like** They suspect the app is wrong, so they double-check
  everything or stop using it.

- **Why it happens**

  - Missed items, weird SKUs, irrelevant substitutions.

  - Inconsistent quantity logic.

- **How it shows up**

  - Manual cross-checks with recipes.

  - "I don't trust these lists" feedback.

  - Churn after a bad week.

- **What VibeMeals should do**

  - Bias toward **safe, generic SKUs** that are universally available.

  - Make quantity logic understandable ("2 meals worth of chicken breasts").

  - Provide a clear Quick Review stage that feels like optional safe proofing.

- **MVP Severity:** **Highest** – trust is everything.

---

#### 6.5.5 Single-user design in a multi-person reality

- **What it feels like** The app assumes only one person interacts with dinner,
  but in reality work is split.

- **Why it happens**

  - Most tools model a "user," not a household.

  - No explicit support for Planner vs Cook.

- **How it shows up**

  - One person does all the work.

  - The other doesn't know what's planned or how to see steps.

- **What VibeMeals should do**

  - Make household access dead simple (at least read-only for the Cook).

  - Explicit "Today" view that is idiot-proof for whoever is cooking.

  - Lightweight role hints ("Who's cooking tonight?" might be v2+).

- **MVP Severity:** **Medium** – nice to have, but even simple sharing helps.

---

### 6.6 New Pains VibeMeals Refuses to Introduce (Anti-Goals)

#### 6.6.1 Feeling judged by the app

- **What it feels like** Users feel scolded for skipping meals or letting food
  go bad.

- **What VibeMeals should do**

  - Use empathetic, casual language: "Life happens. Want to reuse this chicken
    or just move on?"

  - Never show "failure counters."

  - No red error states for normal human behavior.

---

#### 6.6.2 Feeling like a failure when plans change

- **What it feels like** Deviating from the plan feels like breaking a promise
  or failing a system.

- **What VibeMeals should do**

  - Treat changes as **first-class flows**, not errors.

  - Use copy like "Let's adjust your week" instead of "You missed…"

  - Make recovery easy and framed as normal.

---

#### 6.6.3 Becoming another thing to maintain

- **What it feels like** They have to constantly "feed the app" with logged data
  just to keep it useful.

- **What VibeMeals should do**

  - Keep explicit logging to a minimum (maybe just "Cooked / Skipped").

  - Infer as much as possible from minimal signals.

  - If a flow starts to look like admin, we redesign it.

---

### 6.7 Single-Person Household Pains (Kayla's Week)

The pains for someone cooking for one aren't just "scaled-down family
pains"—they're **structurally different** and often amplified. These scenes show
where Kayla's week actually hurts, so the engine doesn't accidentally assume
"family of 4 with sports."

#### Pain Scene 1: "I Should Plan… But For What?"

**Scene:** Sunday afternoon or Monday morning.

Kayla thinks: *"I should plan my meals for the week."*

Then her brain immediately counters:

> "But am I even going to be home? What if I go out? What if I'm not in the
mood?"

#### What's going on under the hood

- She doesn't have fixed, kid-anchored "dinner at home" nights.

- Every calendar square is a **maybe**:

  - "Might hit the gym"

  - "Might grab drinks"

  - "Might crash on the couch"

- Planning feels like making promises to Future Her that Future Her probably
  won't keep.

#### Raw pain

- **Commitment anxiety:** "If I buy groceries and then don't cook, it's wasted
  money and guilt."

- **Futility:** "Why plan if I'm just gonna DoorDash 3 nights anyway?"

- **Overwhelm at uncertainty:** It's easier to *not* decide and just "see how
  the day goes," which leads directly to…

---

#### Pain Scene 2: 6:30 pm, Alone, Tired, Hungry, No Plan

**Scene:** Weeknight, post-work.

She gets home, drops her bag, scrolls her phone.

Her internal monologue:

- "What do I have at home?"

- "What sounds good?"

- "Do I have the energy to cook AND clean?"

Each question feels like work.

#### Why it sucks

- She's making **multiple decisions** while already low-battery: 1. Cook or
  order? 2. If cook, *what*? 3. If cook, do I have the ingredients? 4. If order,
  how much money am I about to burn?

- There's no one else to share the load:

  - No "what do *we* want?"

  - No kid hunger as a forcing function.

- Cooking feels like a grand gesture for an audience of one.

#### Raw pain

- **Decision fatigue** + **low motivation** + **no external pressure** =
  DoorDash.

- When she orders, it's relief **followed by** guilt:

> "This is stupidly expensive… and I have groceries I'll probably waste."

---

#### Pain Scene 3: Grocery Shopping for One Is Weirdly Hard

**Scene:** In the store (or building a pickup order).

She's trying to "shop like an adult," but:

- Packs are sized for families:

  - full bags of spinach

  - 10–12 tortillas

  - big meat packs

- Recipes online are for 4 servings, not 1–2.

#### What happens

- She overbuys "because that's the pack size," thinking:

  - "I'll totally use this spinach in salads too." (She usually won't.)

- She does vague mental math:

  - "I can eat this meal two nights and maybe lunch… I guess that's okay?"

#### Raw pain

- **Portion mismatch:** She's forced to bring home more than she can comfortably
  eat before boredom/spoilage.

- **Future guilt baked in at purchase time:**

  - She can *see* the future waste while putting it in the cart.

---

#### Pain Scene 4: Leftover Boredom + Rotting Containers

**Scene:** Opening the fridge mid-week.

Visual:

- Half a tub of sour cream.

- Half a bag of spinach starting to wilt.

- 2–3 takeout containers.

- One Tupperware of a meal she ate twice already and never wants again.

#### What she feels

- Mild disgust + guilt:

> "I *knew* I wasn't going to eat all of that." > "I'm literally throwing money
away."

- No clear, appealing way to "use it up":

  - Everything she can imagine is either:

    - another repeat of the same meal, or

    - more effort than it's worth.

#### Raw pain

- **Boredom penalty:** Eating the same thing a 3rd time feels depressing.

- **Emotional tax:** Throwing food out feels like failing "adulting."

- **Learned despair:** Next time she's at the store, this memory makes planning
  feel pointless.

---

#### Pain Scene 5: The "I Bought Healthy Stuff and Still Ordered Fries" Loop

**Scene:** She buys ingredients for a healthy-ish dinner (veggies, lean
protein).

Come evening, she's exhausted, anxious, or sad.

Internal conflict:

- "I should cook that stir-fry I planned."

- "I absolutely do not have the energy for chopping, cooking, and dishes."

- "Maybe I'll just order something and cook tomorrow…"

She orders. Again, relief → guilt.

#### Why this hits hard

- Every unused "healthy grocery plan" becomes:

  - a symbol of **failed self-control**

  - AND eventual **smelly trash**.

#### Raw pain

- **Moral failure feeling:** Not just "I didn't cook," but "I failed my health
  goals."

- **Financial double-hit:**

  - Money on groceries **and** money on delivery.

- **Motivation erosion:**

  - Each failure makes the *next* planning attempt feel more doomed.

---

#### Pain Scene 6: Cooking is Lonely & Messy

**Scene:** On a night she *does* cook.

She pulls out ingredients, goes through the recipe, and ends up with:

- Messy counter.

- Sink full of dishes.

- One plate for herself.

Maybe she throws on Netflix, but it still feels like a lot of work for:

> "…this one plate and some leftovers I'll probably be sick of."

#### Raw pain

- **Disproportionate effort:** Clean-up overhead doesn't scale down with
  servings.

- **Loneliness:** No one to share the meal or the praise. It's just… done.

- **Incentive mismatch:** Delivery would have yielded a full meal with zero
  dishes.

---

#### Pain Scene 7: "Why Can't I Just Have Adulting on Easy Mode?"

This is the meta-pain.

Kayla doesn't necessarily want to become a foodie or a strict budget hawk. She
mostly wants:

- To not feel stupid about how much she spends on delivery.

- To not feel bad about wasted groceries.

- To not think about dinner so much.

- To feel like a semi-competent adult who can feed herself decently.

Every failed plan, rotting bag of spinach, and $50 DoorDash receipt is evidence
that she's **not** that person.

#### Raw pain

- Identity friction: "I *should* have this figured out by now."

- Shame spiral: The worse it feels, the less she wants to engage with any
  "planning," because planning is where she sees her failures.

---

#### Where This Pushes Product Behavior (vs Family Households)

These pains **pull** the engine in different directions than Ashley's:

- **Fewer total dinners per week** (and that's okay) - Success = 2–3 actual cook
  nights, not 7

- **Shorter horizon of commitment** - Maybe 2–3 planned cook nights in the next
  5 days, not a locked 7-day grid

- **Explicit leftover boredom handling** - Not just waste avoidance, but "eat it
  twice max" + remix options

- **Soft goal framing** - "Let's make 2 at-home dinners happen this week"
  instead of full-coverage mentality

- **Direct competition with delivery effort** - Not with "doing nothing," but
  with "tap app, food arrives, zero dishes"

- **Portion awareness** - "This makes 2 servings for you" not "serves 4, store
  leftovers"

- **Emotional lightness** - Small wins celebrated, no streaks or guilt for
  ordering out

#### Kayla Pain Checklist (Regression Test)

When evaluating any feature or flow, ask: "Does this reintroduce any of these
pains for a single person?"

- ☐ Does it assume 7 dinner nights per week?

- ☐ Does it make planning feel like commitment she'll fail at?

- ☐ Does it ignore portion/leftover boredom?

- ☐ Does it compete on "healthy" instead of "easier than delivery"?

- ☐ Does it require high schedule predictability?

- ☐ Does it shame her for ordering out or skipping cook nights?

- ☐ Does it ignore effort-per-serving economics (dishes, cleanup)?

If yes to any of these, the feature needs single-household accommodation.

> **Note:** Full persona pain checklists (Ashley, Brianna, Kayla, Danielle, Jake
& Maya, Ellen & Mark) have been extracted to
[persona-checklists.md](./persona-checklists.md) for team-wide use as regression
testing tools.

---

## 6.8) Summary: Pain-Driven Design Principles

Every pain we've mapped drives a specific design response. Here are the core
principles that emerge:

1. **Default to safety, allow opt-out** – Overinclude ingredients unless user
   explicitly confirms they have them 2. **Make preflight visible** – Surface
   thaw/marinate steps at decision time, not execution time 3. **Normalize
   chaos** – Treat skipped meals, plan changes, and delivery nights as expected,
   not failure 4. **Compete with delivery on effort** – Make cooking paths feel
   easier than app-scrolling + ordering 5. **Money transparency without admin**
   – Show rough cost bands; never require detailed budgeting 6. **Minimal
   logging** – Infer from behavior (list exports, completed recipes) instead of
   asking for updates 7. **Pack-aware planning** – Track partial ingredients and
   suggest downstream uses automatically 8. **Time honesty** – Recipe times must
   reflect real home cooking, including interruptions 9. **Supportive tone
   always** – Never blame, shame, or scold; offer options and move forward 10.
   **Small plans are valid** – 2–3 dinners/week is success; don't force full
   7-day grids

> **For detailed regression testing:** See
[persona-checklists.md](./persona-checklists.md) for per-persona pain
checklists.

---

## 7) VibeMeals Daily Life – What Using It Feels Like



#### The DLE is the heart of the product.** It quietly guarantees dinner is provisioned, prepped, and cookable on time—**without turning the user into an inventory clerk.

### System Requirements: What Must Be True to Crush the Core Pains

Before diving into the DLE guarantees and stories, let's establish what must be
true at the system level for the five biggest pains to basically disappear.
These are architectural requirements, not feature lists.

#### Pain 1: 5:00 pm Panic

> "It's 5:15, I'm fried, everyone's hungry, and I still have to decide what's
for dinner."

#### Root cause (under the hood)

- No single dependable answer to "what's for dinner tonight?"

- Too many decisions still open at 5pm:

  - what to cook

  - is it realistic for my energy

  - do we even have what we need

- "Plans" in other tools are either:

  - too aspirational (don't match real nights), or

  - too brittle (one disruption and they're ignored)

#### What VibeMeals must guarantee

- **Every day has a realistic, known dinner** by mid-day:

  - Matched to the *type* of day (fast vs normal vs project).

  - Already tied to ingredients that are provisioned.

- At 5pm, Ashley doesn't have to choose a recipe. At most she chooses:

  - "Do tonight's plan"

  - *or* "downgrade to something simpler."

#### System-level behaviors / levers

- **Time-band classification** is real, not marketing:

  - Each recipe must have a trusted band (Fast / Normal / Project).

  - The engine uses those bands when slotting dinners into days.

- **Household "tempo profile"**:

  - Even a rough map: "Mon–Thu: mostly Fast, Fri: Normal, Sat: Project allowed."

  - Can be learned over time if she doesn't set it explicitly.

- **Pre-commitment by the system**:

  - On Sunday, the engine generates a specific dinner for each day.

  - Unless the user changes it, that is tonight's plan.

- **Mid-day confirmation loop (lightweight)**:

  - System quietly checks: "Is tonight still realistic?" (energy, schedule).

  - If not, it gently proposes: "Want to switch tonight to a Fast option?"

#### Failure modes to avoid

- Asking her to re-decide everything every day in disguise:

  - e.g., "Pick between these 10 dinners for tonight" at 4pm.

- Time bands that lie (everything is "30 min") → she stops trusting the app.

- Plans that don't adapt when a day is extra insane:

  - She needs a one-tap escape hatch ("make tonight simpler") that preserves
    tomorrow.

---

#### Pain 2: Second Trips / Missing Ingredients

> "We already went to the store and we're still missing something for tonight's
dinner."

#### Root cause

- Lists are incomplete or "too clever."

- Tools try to avoid duplicates / "over-buying" → they under-buy critical stuff.

- Humans are bad at remembering what's actually in the pantry.

#### What VibeMeals must guarantee

- If a dinner is in the plan and she did the shop, she will not hit:

  - "We are missing a core ingredient" as a surprise while cooking.

- When in doubt, the system errs on the side of:

  - **extra sour cream** not

  - **no sour cream**.

#### System-level behaviors / levers

- **Critical vs nice-to-have ingredients**:

  - Recipes explicitly tag certain ingredients as "critical" to success.

  - DLE treats those as non-optional in the shopping logic.

- **Bias toward inclusion**:

  - Default: assume the user *doesn't* have something unless she explicitly says
    yes.

  - Quick Review is purely optimization, not correctness.

- **Conservative "pantry inference"**:

  - Even if you think she likely has salt, oil, basics:

    - either treat them as free assumptions *or*

    - surface a tiny static baseline list she can accept once ("assume I always
      have X/Y/Z")

- **Substitution safety rails**:

  - If the store doesn't have the exact SKU, the engine must:

    - pick a safe, generic alternative

    - never silently drop a critical ingredient.

#### Failure modes to avoid

- Clever algorithms that aggressively remove items:

  - "We think you still have cumin from three months ago" → user hits a
    missing-ingredient wall once and never trusts you again.

- Making list correctness dependent on full pantry setup:

  - She should not need to barcode-scan her kitchen to get a trustworthy list.

- Mapping to weird SKUs:

  - If the recipe calls for "cheddar," mapping to "vegan artisan cheddar crumbs"
    as default breaks trust.

---

#### Pain 3: Preflight Surprises (Thaw / Marinate / Soak)

> "I didn't realize I had to thaw that – now we can't cook what we planned."

#### Root cause

- Recipe preflight steps are:

  - hidden in the text, or

  - mentally pushed onto the user ("of course you know to thaw").

- Apps treat recipe as one block, not split into "earlier today" vs "at cook
  time."

#### What VibeMeals must guarantee

- She should almost never discover **for the first time** at 5 pm that she
  needed to:

  - thaw chicken

  - marinate for hours

  - soak beans overnight.

- When she *does* miss it, the system handles it gracefully with:

  - backup options or rescheduling, not failure.

#### System-level behaviors / levers

- **Structured preflight** in the recipe schema:

  - preflight_steps[]: each with required lead time (e.g., 6 hours, overnight).

  - cook_steps[]: for actual cooking.

- **Household "dinner time" estimate**:

  - Doesn't need to be exact — "We usually eat around 6–7 pm."

  - Enough to anchor preflight timing.

- **Early, low-friction warnings**:

  - Day-before or same-morning alerts:

    - "Tomorrow's meal needs thawing in the morning. Keep or swap?"

- **Fail-soft path**:

  - If it's too late:

    - propose no-thaw alternatives (using similar or pantry ingredients)

    - or push that meal to another day and bring in a backup.

#### Failure modes to avoid

- Nagging / over-notifying:

  - If she feels harassed by preflight pings, she'll disable them and you're
    back to surprise city.

- Treating preflight as "optional note":

  - It needs to be part of the logistics engine, not just a line of text.

- Offering only "too bad, you failed" when preflight is missed:

  - That directly reintroduces guilt and planning resentment.

---

#### Pain 4: Planning Dread / Decision Fatigue

> "Meal planning is a whole project. I don't have the brain for that every
week."

#### Root cause

- Planning is fragmented across tools, and mentally heavy:

  - checking schedules

  - finding recipes

  - balancing variety vs picky eaters vs time vs cost

  - building a list.

- Many apps *move* the work but don't reduce it:

  - they ask her to configure everything, tag everything, sort everything.

#### What VibeMeals must guarantee

- Weekly planning feels like a **short check-in**, not a project:

  - 5–10 minutes max for "normal use."

- The engine does most of the heavy thinking:

  - schedule-aware, taste-aware, cost-aware.

- She makes a few small decisions, not a hundred.

#### System-level behaviors / levers

- **Defaults that don't suck**:

  - On first use, a one-tap "Give me a normal week of 5–7 dinners for a family
    of 4, mostly Fast on weeknights."

- **Strong opinions in the engine**:

  - Constrained pattern: maybe 3 "anchor" nights (tacos/pasta/sheet pan), 1–2
    lighter experiments, 1 leftovers / flex night.

- **Progressive disclosure of control**:

  - Basic view: just shows the week, "Generate," and "Reroll" on any slot.

  - Advanced knobs (explicit budget, cuisine filters, etc.) are behind "more
    options" and not needed for a good plan.

- **Re-use of "hits"**:

  - Engine leans on known winners and known no-gos over time, so planning gets
    easier, not harder.

#### Failure modes to avoid

- Asking too many questions up front:

  - "Favorite cuisines, macros, cooking skill, equipment, etc." → onboarding
    feels like admin.

- Dropping her into a blank planner grid with no strong default suggestions:

  - "Add dinners to each day" invites paralysis.

- Treating every week as a blank slate:

  - If you ignore past behavior, you force full-brain planning every time.

---

#### Pain 5: Food Waste Guilt / Stranded Ingredients

> "I keep throwing away half-used stuff and leftovers. It feels like wasting
money."

#### Root cause

- Pack sizes ≠ recipe quantities.

- Leftovers and partial packs are not tracked or reused in planning.

- Life chaos causes skipped meals; ingredients linger and die.

#### What VibeMeals must guarantee

- When she buys something that typically creates leftovers (like sour cream,
  spinach, tortillas), the system:

  - tries to **pair it** with at least one more recipe in a reasonable window.

- She gets easy opportunities to use things up:

  - "Want to use the rest of X in one of these?"

- If food still goes bad, she's not shamed; it's just a data point.

#### System-level behaviors / levers

- **Pack-aware modeling**:

  - Ingredients with known pack-style behavior are treated differently:

    - Tub/small: sour cream

    - Bundle/bunch: herbs, greens

    - Bulk base: rice, tortillas, potatoes

- **Residual capacity tracking (lightweight)**:

  - Not exact quantities — just:

    - "We planned 1 pack of spinach; one recipe used 1/2 pack; we *assume* some
      remains."

- **Week-to-week linking**:

  - After a week, VibeMeals asks:

    - "You bought X and we only planned one use. Want to lean on it next week?"

- **Use-it-up candidate recipes**:

  - A special tier of recipes that are:

    - simple

    - flexible

    - designed to soak up a type of leftover ("leftover rice fried rice",
      "tortilla quesadillas," etc.)

#### Failure modes to avoid

- Turning this into inventory management:

  - If she has to tell you "we used half, then used more at lunch," it's dead.

- Introducing guilt:

  - "You wasted spinach 3 weeks in a row" is a fast way to lose her.

- Over-optimizing at the cost of reliability:

  - Don't let pack reuse logic break the bigger guarantee of "you have what you
    need when you cook."

---

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

### DLE Stories: Guarantees in Action

The following stories translate the DLE guarantees into concrete user scenarios
and implementation requirements.

---

#### Story 1: No Missing Critical Ingredients (End Second Trips)  *(Tags: [G1, G3])*

**Goal:** If a dinner is on the plan, the user should never discover mid-cook
that a *critical* ingredient isn't in the house. We prefer "a bit of extra sour
cream" over "no sour cream at 5:45 pm."

#### Experience Narrative

Maria is the planner for a family of four. On Sunday, she taps **Generate Plan**
and then **Next: Shop**. VibeMeals builds a list and a cart from the plan.

Without touching any advanced settings, she does a single pickup order. On
Tuesday night, she starts cooking the planned chicken tacos. She never has to
stop mid-recipe and say, "Wait, we're out of tortillas."

She *could* have saved a few dollars by marking some pantry items as "already
have this," but skipping that step never punishes her with missing essentials.

#### Scenario 1.1: Default Safe List (No Review)

#### Given

- The user has generated a weekly plan with N dinners.

- The user proceeds directly to the shopping list/cart without using any "Quick
  Review" / pantry check.

- Some ingredients *might* already be in their pantry.

#### When

- VibeMeals builds the list/cart from the planned dinners.

#### Then

- All **critical ingredients** for every planned dinner are included in the
  list/cart.

- Ingredients the system is "unsure" about are also included by default.

- The user can cook every planned meal without being blocked by missing core
  ingredients, even if they declined all optimization steps.

#### Design/Eng Notes

- "Critical ingredients" should be modeled explicitly per recipe.

- The system's bias is **toward inclusion**, not clever omission.

#### Scenario 1.2: Optional Quick Review (User Says "I Have This")

#### Given

- The user has a generated plan and an auto-built list/cart.

- The system offers a **Quick Review**: "Save ~$X by confirming what you already
  have."

#### When

- The user opens Quick Review and marks certain items as "Already on hand."

- The user closes Quick Review and proceeds to checkout.

#### Then

- Items marked "Already on hand" are removed from the list/cart.

- All other critical ingredients remain.

- No critical ingredient is removed unless the user explicitly opted it out.

- If a user accidentally removes a critical ingredient, it's easy to restore
  from a "Recently removed from list" view.

#### Design/Eng Notes

- Quick Review is fully **optional** and time-bounded (e.g., 1–2 screens, not
  20).

- Consider grouping by "likely pantry staples" to minimize taps.

#### Scenario 1.3: SKU/Substitution Safety

#### Given

- The user's preferred store doesn't carry the exact SKU for a critical
  ingredient (e.g., a specific brand or size).

- The store API suggests substitutes or similar items.

#### When

- VibeMeals maps recipe ingredients to store SKUs.

#### Then

- The system chooses a **reasonable substitute** for critical ingredients
  instead of dropping them.

- If the mapping is uncertain, the UI copy is honest: "We picked the closest
  match for you. You can adjust this in the store app if needed."

- The user is still guaranteed to have *some* usable version of the ingredient.

#### Design/Eng Notes

- Treat "no mapped SKU" for a critical ingredient as an error to surface
  internally, not a silent omission.

- Prefer generic, widely available SKUs over exotic ones.

---

#### Story 2: No Hidden Preflight (Thaw/Marinate Surprises)  *(Tags: [G1])*

**Goal:** Users should never discover at 5:00 pm that a planned dinner required
steps *earlier that day* (thawing, marinating, soaking) without having had a
chance to act. When it's too late, VibeMeals offers a graceful pivot.

#### Experience Narrative

Jordan plans the week on Sunday. On Wednesday, the plan includes baked chicken
that requires thawing. At 9:00 am, they get a small nudge: "Tonight's dinner
needs chicken pulled from the freezer by lunchtime. Want to keep this or pick a
no-thaw backup?" If they miss it, the app gracefully suggests a backup that fits
what they have.

#### Scenario 2.1: Preflight Steps Are Explicitly Modeled

#### Given

- A recipe contains any step that must happen significantly before cook time
  (e.g., thaw 6+ hours, marinate 2+ hours, soak overnight).

#### When

- VibeMeals ingests or stores that recipe.

#### Then

- Those steps are tagged at the recipe model level as **Preflight** rather than
  normal cook steps.

- Each preflight step includes:

  - Recommended lead time (e.g., 6 hours before desired eat time).

  - The specific ingredient(s) impacted.

- The UI can display preflight tasks separately ("Earlier Today") from cook-time
  steps ("Start Cooking").

#### Design/Eng Notes

- Recipe schema must support `preflight_steps[]` distinct from `cook_steps[]`.

#### Scenario 2.2: Timely Preflight Nudge (Happy Path)

#### Given

- A user has a planned dinner tonight that includes preflight steps.

- The app knows (even approximately) the household's typical dinner time (e.g.,
  6:00 pm).

#### When

- The preflight window begins (e.g., 6 hours before 6:00 pm for thawing).

#### Then

- The user receives a small, calm notification: "Tonight's [Baked Chicken] needs
  chicken out of the freezer by lunchtime. ✅ I'll do that / 🔁 Pick a no-thaw
  backup instead"

- Choosing "I'll do that" marks the preflight task as acknowledged/done in the
  app (lightweight).

- Choosing "Pick a backup" opens a curated list of **no-preflight alternates**
  that:

  - Use similar ingredients when possible, or

  - Are pantry-friendly "emergency" meals.

#### Design/Eng Notes

- Don't require exact dinner time; a general "evening" setting is enough to
  start.

- Preflight UX must be low-stress, low-text.

#### Scenario 2.3: Too Late for Preflight (Graceful Failure)

#### Given

- It is now within the preflight window (e.g., 2 hours before dinner).

- The user hasn't done the preflight step (or the system can't assume they did).

#### When

- The user opens today's dinner in the app or the system detects it's too late.

#### Then

- The app does **not** pretend everything is fine.

- The app clearly but kindly surfaces the issue: "Looks like it's too late to
  thaw the chicken for [Baked Chicken] tonight."

- The app immediately offers options:

  - "Use a no-thaw backup for tonight" (pantry/quick recipe suggestions).

  - "Bump this meal to tomorrow and pick something else for tonight."

- If the user chooses to bump, the schedule updates and any preflight
  requirements are re-timed to tomorrow.

#### Design/Eng Notes

- Copy should feel like a helpful friend, not a scolding system.

- Important: user can fix the situation in **1–2 taps**, not be dumped into
  complex replanning.

---

#### Story 3: Plans That Bend, Not Break (Chaos Week Resilience)  *(Tags: [G4])*

**Goal:** When life blows up (sick kids, late work, practice), the plan should
flex without making the user feel like they "failed" or need to start over.

#### Experience Narrative

On Sunday, Sam sets a nice plan. By Wednesday, two evenings have gone sideways:
a work fire, then a last-minute practice. Instead of the plan becoming useless,
VibeMeals helps him quickly:

- Skip or move the missed dinners.

- Reuse the ingredients later in the week or next week.

- Drop in "backup" meals that match his actual energy.

He doesn't feel like he broke the system; he feels like the system adapted.

#### Scenario 3.1: Skipping a Planned Dinner

#### Given

- The user has a weekly plan with dinners assigned to specific days.

- One evening becomes impossible for the planned meal (schedule conflict, no
  energy, etc.).

#### When

- The user taps "Skip" (or similar) on tonight's planned dinner.

#### Then

- The app:

  - Marks that dinner as "Skipped."

  - Asks one lightweight follow-up: "What happened?" with simple options (Too
    busy / No ingredients / Just didn't want it / Other).

  - Offers immediate follow-ons:

    - "Reschedule this meal later this week."

    - "Push this to next week."

    - "Just drop it and move on."

- No error state, no scolding.

#### Design/Eng Notes

- Skipping should be a **first-class action**, not hidden.

- Reason options can drive future learning but should be optional.

#### Scenario 3.2: Swapping Dinners Between Days

#### Given

- The user sees that Thursday's "Project" meal is unrealistic after a long day.

- There is a simpler meal planned for Friday.

#### When

- The user drags Thursday's and Friday's meals to swap, or taps a "Swap with…"
  action.

#### Then

- The plan updates cleanly:

  - Thursday now shows the simpler meal.

  - Friday now shows the more complex meal.

- Any existing preflight tasks are recalculated:

  - Thursday's preflight cancels (if needed).

  - Friday's preflight is scheduled appropriately.

- The shopping list/cart **does not** need to be rebuilt unless ingredient needs
  change materially.

#### Design/Eng Notes

- Swaps should feel **instant** and safe.

- Where possible, treat ingredients as "already acquired" so the user doesn't
  worry about breaking the list.

#### Scenario 3.3: End-of-Week Recovery (Missed Meals & Loose Ingredients)

#### Given

- During the week, the user skipped 1–2 planned dinners.

- Some ingredients for those meals were purchased and may still be in the
  fridge/freezer.

#### When

- The user reaches the end of the week or opens next week's planning flow.

#### Then

- VibeMeals surfaces a gentle recovery card: "You still have ingredients for
  these meals: [Chicken Tacos], [Veggie Stir-fry]. Want to:

  - ✅ Use them next week

  - 🧊 Freeze and skip

  - 🗑️ We used or lost them"

- If the user chooses "Use them next week":

  - Those meals (or similar ones using those ingredients) are prioritized for
    next week's plan.

- If the user chooses "Freeze and skip" or "We used/lost them":

  - The system updates its internal state and doesn't push them forward by
    default.

#### Design/Eng Notes

- This is a key contact point for **waste minimization** and emotional relief.

- No guilt, only options.

#### Scenario 3.4: Chaos Week Without Shame

#### Given

- A week goes very badly: multiple meals skipped, plans ignored.

#### When

- The user opens the app during or after this chaos week.

#### Then

- The app responds with a calm, reset-friendly experience:

  - "Looks like this week was wild. Want to reset and build a fresh plan for
    next week?"

  - One-tap "Reset & Plan Next Week" action.

- The user is not forced to reconcile everything in detail; they're given a
  fresh start with optional recovery for remaining ingredients.

#### Design/Eng Notes

- This prevents "falling off the wagon" from turning into churn.

- Messaging should normalize chaos: "Real weeks are messy; we'll adapt with
  you."

---

#### Story 4: Brianna – End-of-Month Groceries Don't Feel Like a Gamble  *(Tags: [G2, G5])*

**Goal:** End-of-month groceries feel controlled instead of terrifying.

#### Context

Brianna is a budget-stretched single mom (2 kids). End of month, money is tight.

She needs to:

- Plan **a few cheap dinners** that kids will eat

- **Use what she already has** (rice, beans, basics)

- Avoid overspending and **avoid buying stuff that will go to waste**

We want VibeMeals to **reduce financial anxiety**, not add "budget admin" work.

#### Scenario 4.1: Build a Budget-Conscious Week From Leftovers + Cheap Staples

**Given** Brianna has used VibeMeals for at least one prior week **And** last
week's plan + list show she bought rice and beans **And** she indicates money is
tight (e.g., chooses "budget-friendly week" or similar)

**When** she opens the app near the end of the month **And** requests a new
weekly plan (e.g., "Plan 4 budget dinners this week")

**Then** VibeMeals should propose a plan that:

- Favors **low-cost, familiar recipes** (tacos, rice/bean bowls, pasta bake,
  etc.)

- Reuses **recently bought staples** (rice, beans) without depending on perfect
  pantry data

- Avoids requiring lots of new, one-off ingredients

- Clearly **distinguishes** core ingredients from "nice-to-have" add-ons

**And Then** the app should show a **rough, clearly cheap** cost profile (e.g.,
"This is a low-cost week" / "On the cheaper side"), without requiring her to
input exact prices.

#### Design/Eng Notes

- "Budget-conscious" planning mode should be a first-class filter, not hidden

- Cost bands should be fuzzy but honest ($ / $$ / $$$)

- Staple reuse should happen automatically based on recent list history, not
  perfect pantry tracking

#### Scenario 4.2: Quick Review Saves Money Without Risking Second Trips

**Given** Brianna has accepted the proposed plan **And** VibeMeals generates a
shopping list from that plan **And** the internal "fuzzy pantry" believes she
likely still has some items (e.g., rice, spices, oil)

**When** she opens Quick Review before shopping

**Then** VibeMeals should:

- Present a **short list** of "You might already have these" items, prioritized
  by:

  - pantry-style items (rice, spices, oil)

  - recently purchased items from the last 1–2 weeks

- Let her **easily uncheck** those items to remove them from the list

- Never remove **critical meal-breaking ingredients** unless she explicitly
  confirms

**And Then** the app should **not** block or nag her if she skips Quick Review
entirely; the full list still includes all critical ingredients.

#### Design/Eng Notes

- Quick Review must be truly optional—skipping it never punishes her with
  missing ingredients

- Prioritization algorithm: pantry staples > recent purchases > everything else

- Clear bias messaging: "We'd rather give you extra rice than send you back to
  the store"

#### Scenario 4.3: End-of-Week Waste Avoidance Without Shame

**Given** Brianna has cooked at least some of the planned meals **And** some
pack-based ingredients (like tortillas, beans, sour cream) are likely partially
used

**When** she returns to VibeMeals at the end of the week **Or** starts planning
the next week

**Then** VibeMeals should gently suggest:

- "You bought tortillas and beans recently; want to plan a cheap meal that uses
  them?"

**And Then** the suggestion must:

- Be **optional** (no blocking gates if she ignores it)

- Use **plain, non-judgy language** ("Want to get more mileage from…", not "You
  wasted…")

- Bias toward **cheap, kid-friendly recipes** that fit her profile

**And Then** the system should **not require** her to reconcile exact quantities
or log what went bad; it uses fuzzy time + usage to decay confidence.

#### Design/Eng Notes

- Waste avoidance is about gentle nudges, never guilt

- System tracks "likely remaining packs" through time decay, not user logging

- If she ignores suggestions repeatedly, system learns to offer them less often

---

#### Story 5: Kayla – Two Home-Cooked Dinners Instead of a Delivery Spiral  *(Tags: [G2, G4, G5, G6])*

**Goal:** A "planning-for-one" week where two home-cooked dinners actually
happen, instead of collapsing into DoorDash + guilt.

#### Context

Kayla lives alone, works hybrid, and has a volatile social/gym schedule.

She wants to:

- Cook at home **a little more** (e.g., 2 nights/week), not become a meal-prep
  machine

- Avoid drowning in leftovers

- Avoid buying "healthy groceries" that rot while she orders delivery anyway

We want VibeMeals to **compete with delivery on effort and emotional load**, not
with a fantasy version of her.

#### Scenario 5.1: Planning Only 2 Cook Nights for a Single Person

**Given** Kayla sets up VibeMeals as a single-person household **And** indicates
she wants to start small (e.g., "Help me cook at home ~2 nights this week")
**And** optionally sets low leftover tolerance (e.g., "I get bored of repeats")

**When** she asks VibeMeals for this week's dinners

**Then** the planner should propose a **small plan**, such as:

- 2 cook nights within the next 5–7 days

- Each cook night producing **1–2 extra portions**, explicitly planned as:

  - "You'll cook once and get 2 meals out of it" (e.g., Mon dinner + Tue
    lunch/dinner)

- No default assumption of a full 7-dinner grid

**And Then** the UI should emphasize **"2 wins this week"** instead of "complete
coverage" messaging.

#### Design/Eng Notes

- Household size = 1 should default to 2–4 dinners/week, not 7

- "Cook once, eat twice" must be explicit in UI, not hidden in serving math

- Success framing: "small wins" not "incomplete weeks"

#### Scenario 5.2: 6:30 pm, Tired, But Tonight's Home-Cooked Dinner Still Happens

**Given** it's a day with a planned cook night for Kayla **And** VibeMeals has
already provisioned the ingredients (she shopped at some point) **And** she has
no major conflict scheduled that evening

**When** it's around 6–7 pm **And** she opens VibeMeals "Today" view

**Then** the app should:

- Show **one clear, low-friction option** for tonight:

  - "Tonight: One-pan lemon chicken & potatoes (~25–30 minutes, 1 pan, 2 meals
    for you)"

- Emphasize:

  - small effort (time, dishes)

  - clear payoff (tonight + one more meal without extra cooking)

**And Then** starting this recipe should **feel easier** than:

- scrolling apps for delivery

- making tons of decisions ("what do I want?" "how much will it cost?")

#### Design/Eng Notes

- Today view for singles must highlight effort economics: "1 pan, 2 meals for
  you"

- Compete directly with delivery on decision load, not morality

- Clear time/dish count displayed prominently

#### Scenario 5.3: Leftover Boredom Doesn't Turn Into Rotting Containers

**Given** Kayla has cooked one of her planned dinners **And** the plan
explicitly schedules a second "leftover event" (e.g., next day's dinner) using
the remaining portion **And** she sometimes reschedules or skips meals

**When** she completes the first meal **And** opens VibeMeals the next day

**Then** the app should:

- Clearly remind her of the **planned leftover meal**:

  - "Tonight: Leftover lemon chicken & potatoes (~5 min, reheat)"

- Offer a **low-effort remix option** if straightforward repeats fail often:

  - "Too bored of this? Try this 10–15 min remix (e.g., turn into a wrap/bowl)."

**And Then** if she skips the leftover event:

- The app should **not** shame her:

  - No "You wasted food" messaging

- But it may adjust her model:

  - Decrease leftover tolerance for future plans

  - Offer more "1 cook → 1–2 eats max" patterns rather than 4+ portions

#### Design/Eng Notes

- Leftover remix recipes are a distinct content tier for singles

- Skipping leftovers is a learning signal, not a failure

- System tunes leftover tolerance over time without user configuration

#### Scenario 5.4: Delivery Is Allowed Without Shame, but Progress Is Visible

**Given** Kayla sometimes orders delivery on nights that were nominally
scheduled as cook nights **And** she returns to VibeMeals later in the week

**When** she looks at her week summary

**Then** the app should highlight **what she did accomplish**:

- "You cooked at home 2 nights this week 👏 That's likely ~$40–$60 saved vs
  delivery."

**And Then** it should:

- **Not** scold or penalize her for nights she didn't cook

- **Not** demand that she backfill or "log" every takeout night for the system
  to function

- Use these signals to gently tune future recommendations:

  - maybe more ultra-fast fallback options

  - maybe fewer planned cook nights if 3+ repeatedly fail

#### Design/Eng Notes

- Week summary celebrates wins, never highlights "failures"

- "Saved vs delivery" is approximate and light-touch, not precise budget
  tracking

- Learning from skipped meals happens silently in the background

---

### 7.X Plan Stability – Once Planned, Don't Move the Ground

Learning and optimization are allowed to influence **future weeks**, but once a
plan is accepted and shopped for, it becomes a contract.

#### Principle:
After the user has accepted a plan and completed the main shop, VibeMeals must
**not silently change the ground under their feet.**

Concretely, for the **current week**:

- We do **not** silently:

  - swap tonight's recipe,

  - change core ingredients (e.g., chicken → tofu),

  - reduce portion sizes, or

  - remove planned dinners

…without the user taking an explicit action (swap, move, delete, change
servings).

#### Allowed changes:

- User-initiated:

  - "Swap this dinner"

  - "Move this to another day"

  - "Change servings to 6 instead of 4"

  - "We're eating out instead"

- Small, transparent clarifications:

  - "We slightly adjusted onion amount to match common pack sizes."

#### Not allowed:

- "Smart" behind-the-scenes re-planning that:

  - changes recipes,

  - drops ingredients,

  - or alters portions

#### without a clear user-triggered action.

We treat "accepted plan + main shop done" as **stable ground** the user can
trust. Learning, DLE improvements, and catalog changes shape **next week**, not
last week's plan.

#### Connection to G4:

This stability rule protects G4 (Plans bend, they don't break). "Bend" =
user-initiated swaps/moves are easy and encouraged. "Don't break" = system never
silently replans without user action.

---

## 8) Recipe Catalog & Time Bands

VibeMeals is not "all recipes." It's a **filtered catalog** of recipes that obey
our promises about time, effort, and logistics.

This section defines:

- What counts as a VibeMeals recipe

- The contract for each time band (Fast / Normal / Project)

- How we handle preflight, equipment, and portioning

- How recipes differ by household mode

If a recipe or content source can't meet these, it doesn't belong in the core
catalog.

---

### 8.1 Catalog Purpose – Logistics First, Not Infinite Discovery

The catalog exists to make **weekly dinner logistics** work:

- Plan → Shop → Cook → Learn

- Honest about time, effort, and pack sizes

- Friendly to leftovers and waste reduction

It is **not** intended to be:

- An exhaustive recipe database

- A food blog browser

- A place for extremely niche, one-off project recipes (except as clearly marked
  "Project" extras)

> If a recipe would look great on Pinterest but routinely breaks 5:00 pm, it
doesn't belong in the core catalog.

---

### 8.2 Time Bands – The Contract

Every recipe must be tagged with a time band that matches **real, end-to-end**
effort for a typical user of that type, **including**:

- Preheat time

- Active prep time

- Cooking time

- Cleanup impact (number of pots/pans)

We define:

#### FAST

- **Target:** ≤30 minutes total, "workday safe"

- **Structure:**

  - 1 pan/pot/sheet where possible (2 max, and only for good reason)

  - Minimal chopping, minimal "babysitting"

- **Examples:**

  - Sheet-pan chicken + veg

  - Tacos with simple toppings

  - One-pot pasta

FAST recipes must be:

- Default candidates for **weeknights** (especially for Ashley, Brianna, Kayla,
  DINKs)

- Safe for ADHD/low-energy nights when "activation" is the main enemy

#### NORMAL

- **Target:** ~30–50 minutes total

- **Structure:**

  - 1–2 main vessels (e.g., pan + pot, or pan + sheet)

  - Some chopping and sequencing, but not complex techniques

- **Examples:**

  - Stir-fries, skillet pastas

  - Simple bakes or chilis

  - Mildly more involved sheet-pan meals

NORMAL is the **default band** for "regular cooking energy" nights.

#### PROJECT

- **Target:** >50 minutes or multiple stages / specialized techniques

- **Structure:**

  - Multi-step, potentially multi-pot

  - May involve marinating, simmering, baking, resting

- **Examples:**

  - Lasagna

  - Braises, roasts, or multi-component meals

  - Fancy weekend dinners

PROJECT recipes must be:

- **Opt-in only** (never auto-selected for generic weeknights)

- Clearly surfaced as "weekend / special energy" meals

#### Connection to household modes (Section 5.2):

- **Family with Kids / Solo / Busy Weeknights:** Default to FAST on Mon–Thu,
  NORMAL on Fri, PROJECT opt-in for weekends

- **Empty Nest / DINK with cooking interest:** Can handle more NORMAL during the
  week, PROJECT as desired

- **Large Households:** Prefer FAST/NORMAL that scale gracefully; PROJECT
  requires explicit opt-in

> Time bands are promises, not vibes. If real-world users routinely experience a
recipe as longer/harder, we retag or remove it.

---

### 8.3 Preflight – No Hidden Time Bombs

Any recipe that requires **advance prep** must declare it explicitly:

Preflight includes:

- Thawing (frozen meat, frozen prepped items)

- Marinating (≥30–60 min)

- Soaking (beans, starches)

- Slow-cooker / long braise start times

- Anything that must start **hours before cooking**

Rules:

- Recipes with mandatory preflight **must not** be treated as FAST.

- Preflight must be modeled as:

  - structured metadata on the recipe

  - surfaced in:

    - planning (summary of the week)

    - Today view ("You're good" vs "You missed this step; here's Plan B")

- We aim to **avoid** recipes where missing preflight makes the meal impossible
  that night for ordinary users.

> If the only way a recipe works is "you remembered to start 6 hours ago," it's
a Project or doesn't belong in the core weeknight set.

---

### 8.4 Equipment Expectations

VibeMeals recipes assume **basic home kitchens**, not professional setups.

**Baseline equipment** (safe to assume for most users):

- Standard stove/oven

- 1–2 medium/large pans, 1–2 pots

- 1 baking sheet

- Basic utensils (knives, cutting board, spatula, tongs, mixing bowl, colander)

**Optional / advanced equipment** (must be explicit, not assumed):

- Slow cooker / Instant Pot / pressure cooker

- Grill

- Stand mixer / food processor

- Air fryer

- Specialty pans (wok, cast iron, Dutch oven) beyond a basic pan/pot

Rules:

- Recipes requiring non-baseline equipment must be **tagged** and not
  auto-injected into plans for users who don't opt in.

- For v1, we bias toward recipes that can be done with **baseline equipment**.

> If a recipe only makes sense with a niche device or multiple special pans,
it's not a default weeknight candidate.

---

### 8.5 Ingredient Philosophy

We favor **boring-but-available** over exotic-but-impressive.

- Bias toward ingredients that:

  - Are widely available at big-box / mainstream grocery stores

  - Come in reasonably-sized packs for our target households

- Limit recipes that:

  - Require many one-off ingredients users will use once and forget

  - Depend on niche specialty items outside Project recipes

We allow:

- Occasional "twist" ingredients (e.g., smoked paprika, fresh herbs) especially
  for:

  - Project meals

  - Ellen & Mark's "small twist" pattern

But:

- We do not allow weeks that require **many** new one-off ingredients at once,
  especially for budget-sensitive households.

---

### 8.6 Portions & Scaling

Every recipe must carry a **canonical "base servings"** and scale cleanly to the
household size.

Rules:

- Base recipe should be designed around a realistic household (e.g., 2 or 4).

- Scaling must:

  - Preserve ratios so flavor and cooking behavior remain sane

  - Respect pan capacity and oven space (no "just triple it" without thought)

- For large households (5–8+):

  - Some recipes may require **double-batch** or "cook in two pans" instructions

  - The system should prefer recipes that scale gracefully for them

> Portion logic is a first-class part of the recipe, not an afterthought.

---

### 8.7 Household-Mode Sensitivity

Not every recipe belongs in every household's default pool.

#### Catalog filtering by household mode (Section 5.2):

- **Solo / Planning for One (Kayla):**

  - Prioritize: Small-batch recipes, ones that store well as leftovers, easily
    halved recipes

  - Deprioritize: "Feeds 8" casseroles unless clear share/freeze intention

- **Family with Kids (Ashley / Brianna):**

  - Prioritize: Kid-tolerant flavors, "add heat at table" options for adults

  - Deprioritize: Extremely polarizing flavors or rare ingredients as defaults

- **Empty Nest / Older Couple (Ellen & Mark):**

  - Prioritize: Comfort rotation + gentle variations

  - Deprioritize: Endless heavy leftovers, complex multi-stage meals as defaults

- **Large / Multi-Gen Households:**

  - Prioritize: Crowd-friendly meals that scale well and tolerate holding time

  - Deprioritize: Extremely fiddly individual portions (e.g., 12 hand-assembled
    items)

- **DINKs / Hobbyist Cooks:**

  - Can opt into more ambitious recipes and multi-dish nights (opt-in behavior)

These are **catalog filtering rules**, not persona re-explanations—they
determine which recipes appear in default weekly plans for each mode.

---

### 8.8 Catalog Hygiene – When We Remove or Retag Recipes

Over time, we'll observe:

- time band violations (takes longer than promised)

- consistent skips

- recurring waste linked to certain recipes

We must:

- **Retag time bands** when real-world behavior shows they're wrong.

- **Adjust or remove recipes** that:

  - Repeatedly fail G1 (not actually cookable tonight)

  - Cause frequent waste (uncommon ingredients never used again)

  - Routinely trip preflight or equipment constraints for a meaningful user
    segment

We treat the catalog as **curated**, not static:

> It's better to have fewer, reliable recipes than a huge catalog that routinely
breaks our promises.

---

### 8.9 Alignment with Golden Experiences [G1–G6]

- **G1 – Tonight is actually cookable**

  - Time bands and preflight modeling are the core defense.

- **G2 – Planning is a 5–10 min check-in**

  - A curated catalog means less thrash and fewer "looks good but not realistic"
    picks.

- **G3 – Safe over clever**

  - Ingredients and portions are specified in a way that makes provisioning
    reliable.

- **G4 – Plans bend, they don't break**

  - Recipes chosen are flexible enough to move days without collapsing.

- **G5 – Budget & waste respected**

  - Limiting one-off ingredients and pack-size disasters reduces waste and
    regret.

- **G6 – Respect constraints & ability**

  - Equipment, difficulty, and health constraints are baked into catalog tags,
    not patched on top.

**These catalog rules are enforcement mechanisms for G1-G6, not
suggestions**—violating them means violating Golden Tests.

If adding recipes or an external feed would break these constraints, we do not
import them into the core catalog.

---

## 9) Success Looks Like...

### Week 1 (New User: First Escape from 5:00 pm Panic)

- Opens app, answers 2 quick questions (servings, time preference).

- Taps **"Generate Plan"**.

- Week fills with 7 realistic dinners (or a smaller configured number).

- Taps **"Next: Shop"**.

- Gets a store cart or CSV immediately—no pantry setup, no forms.

#### Total time: ~3 minutes.
They feel: "That was weirdly easy. Let's see if it actually works this week."
Pains touched: first hit on **5:00 pm panic**, **decision fatigue**, and
**scattered workflow**.

---

### Week 4 (Returning User: Less Second Trips, Less Mental Load)

- Taps **"Generate Plan"**.

- Sees familiar recipes mixed with new ones (repeat guard + learning).

- Optionally opens **Quick Review**: "Save ~$8 by reviewing what you have."

- Confirms 2–3 items they already own; removes them from the list.

- Proceeds to **Shop** in one tap.

#### Total time: ~5 minutes, ~$8 saved.
They feel: "This is starting to feel like *our* rotation, not a random app."
Pains touched: fewer **second trips**, lower **food waste guilt**, lighter
**decision fatigue**.

---

### Week 7 (Chaos Week: Plans That Bend, Not Break)

- Two evenings blow up with last-minute events (practice, work, illness).

- User skips Monday's and Wednesday's dinners in the app.

- Planner suggests:

  - Reusing Monday's ingredients on Friday or next week.

  - Freezing Wednesday's protein and pulling in a pantry-friendly backup meal.

- User makes quick in-app swaps and rerolls without rebuilding the whole week or
  cart.

#### Result:

- The plan **bends instead of breaking** when life happens.

- No spiral into "forget it, let's just order out all week."

- They still trust that planning is worth the 5–10 minute investment.

Pains touched: **plans that break when life happens**, **5:00 pm panic**, and
**second trips** (no rebuild from scratch).

---

### Week 12 (Power User: Less Waste, Almost No Dinner Drama)

- System knows household preferences deeply (no more "we never eat that"
  suggestions).

- Rarely suggests recipes they consistently dislike.

- Automatically nudges leftover-using recipes when patterns show up (extra rice,
  tortillas, shredded chicken).

- Quick Review is usually a low-friction "yep, we still have that" instead of a
  big task.

#### Total time: ~5 minutes, consistently good weeks.
They feel: "We don't argue about dinner anymore; we just run VibeMeals."

Pains touched: **food waste guilt** noticeably smaller, **decision fatigue** way
down, **5:00 pm panic** rare.

---

## 10) Non-Goals (Out of Scope for MVP)

- Social features (sharing recipes, following other users)

- Advanced nutrition tracking (macros, calories beyond basic display)

- Meal kit ordering (we provide the list, not the delivery)

- Restaurant recommendations or takeout integration

- Breakfast, snacks, desserts (dinner only for MVP)

- Multi-household management (single household account for MVP)

---

## 11) Why This Will Work (Through the Lens of Pain)

### Existing Solutions Fall Short

| Solution           | Where It Fails the User                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Recipe apps        | Great for ideas, terrible for **logistics**: no shopping or pack-size reality.         |
| Store apps         | Great for carts, blind to **what you're cooking** and how nights differ.               |
| Meal kit services  | Reduce panic, but are **expensive**, rigid, and subscription-locked.                   |
| Manual planning    | Can work, but is **time-consuming** and mentally heavy week after week.                |
| Meal planning apps | Often feel like **more admin**: lots of data entry and rules, little real relief.      |

Users end up cobbling together **three to five tools** and still experiencing:

- Nightly **5:00 pm panic**.

- **Second trips** and mid-meal ingredient surprises.

- Plans that shatter the moment real life intrudes.

- A constant background hum of **food waste guilt** and decision fatigue.

### VibeMeals' Advantage (Pain-First)

- **End-to-end, not piecemeal:** One place for Plan → Shop → Cook, so the
  scattered workflow collapses into a single weekly rhythm.

- **Safe defaults over gates:** You can always move forward. We default to
  **"add it"** so missing-ingredient pain goes away, and Quick Review is
  optional.

- **Built for chaos, not fantasy weeks:** Swaps, rerolls, and leftover-aware
  suggestions mean plans flex when life does, instead of punishing you.

- **Learns quietly from behavior:** No long surveys or pantry setup. The system
  watches what you cook, skip, and thumbs-down to reduce decision fatigue over
  time.

- **Respects time and energy:** A 5–10 minute weekly check-in replaces sprawling
  planning sessions; weeknights feel calmer because the heavy thinking already
  happened.

- **Makes waste reduction the default, not a chore:** Leftovers and pack sizes
  subtly steer future suggestions so "use it up" happens without spreadsheets or
  guilt trips.

If people stop feeling **panicked at 5:00 pm**, stop making **emergency second
trips**, stop **throwing away untouched food** every week, and stop **arguing
about what's for dinner**, VibeMeals is doing its job—regardless of how "fancy"
the feature list is.

---

## 12) Measuring Success

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
**Meals cooked per plan** - If people are actually cooking the meals, we're
delivering value. Everything else is vanity.

---

#### [Back to Index](index.md)

---

## Appendix A: Split-Screen – Ashley's Monday Without vs With VibeMeals

This side-by-side comparison shows the **same Monday** in Ashley's life, first
in her current reality, then with VibeMeals managing the weekly rhythm.

**Ashley:** 36, full-time job, 2 kids, 30–40 min commute. She is the de facto
dinner planner.

---

### 6:45 AM – Morning Scramble

| Without VibeMeals                                                                 | With VibeMeals                                                                |
|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| Getting kids up, hunting for shoes, tossing lunches together.                    | Same chaos: kids, shoes, lunch.                                              |
| In the back of her mind: "We really should plan dinners… maybe tonight?"         | In the back of her mind: "We already planned the week last night."           |
| Low-level dread: dinner is a giant question mark.                                | Low-level relief: dinner is decided; she just doesn't remember the details.  |

---

### 9:15 AM – Coffee Break at Work

| Without VibeMeals                                                                                  | With VibeMeals                                                                                          |
|----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Opens phone, scrolls social or Pinterest "for ideas."                                              | Quick glance at VibeMeals (if she wants).                                                              |
| Sees tons of pretty recipes, saves 1–2, but doesn't connect them to the week or schedule.          | Sees a simple weekly overview: "Mon – Skillet Chicken (Fast), Tue – Tacos (Normal)…".                  |
| Closes Pinterest with vague guilt: "I should sit down later and plan."                             | Closes VibeMeals in 10–15 seconds: "Okay, tonight is that fast skillet. I'm good."                     |

---

### 12:05 PM – Lunch at Desk

| Without VibeMeals                                                                                             | With VibeMeals                                                                                                        |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Half-thinking: "We probably have frozen something at home… I'll figure it out later."                         | VibeMeals (optionally) surfaces a **Heads up for tomorrow** card:                                                     |
| No structure around tomorrow's thaw/marinate needs; it's all in her head if at all.                           | "Tomorrow: Citrus Chicken (Normal). Needs chicken thawed by morning. ✅ Sounds good / 🔁 Change tomorrow's dinner."   |
| Any mental note like "remember to thaw chicken" is fragile and easy to forget.                                | She taps ✅ Sounds good. Now preflight is **tracked in the system**, not just her brain.                              |

---

### 4:30 PM – Leaving Work / Commute Home

| Without VibeMeals                                                                                                                     | With VibeMeals                                                                                                                           |
|---------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Walking to car thinking, **"What's for dinner?"**                                                                                     | Before starting the car, she opens VibeMeals for a few seconds.                                                                          |
| Runs mental options: frozen pizza? pasta? do we have sauce? did we use the last of the cheese?                                        | **Today view** says: "Tonight: Skillet Chicken & Veggies (Fast, ~25 min). No preflight needed. You're good to start when you're home."  |
| Considers swinging by store "just in case," or resigns herself to a default emergency meal.                                           | She sees tonight is a Fast recipe and clearly doable. Closes the app knowing exactly what's happening for dinner.                        |
| Stress level climbing; she still has pick-up, homework, and unknown dinner.                                                           | Stress lower: dinner is one fewer open loop in her head.                                                                                |

---

### 5:20 PM – Walking in the Door

| Without VibeMeals                                                                                          | With VibeMeals                                                                                                                         |
|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Kids unload school chaos: homework, forms, "I need a snack," "Can you sign this?"                          | Same kid chaos.                                                                                                                        |
| Ashley rummages through fridge/freezer:                                                                   | Phone buzzes (or she opens the app) with a calm prompt:                                                                                |
| - "We have chicken… but is it thawed?"                                                                    | "Ready when you are: Skillet Chicken & Veggies (Fast, ~25 min). • 8 min hands-on • 12 min simmer. Start whenever you're ready."       |
| - "Do we have enough veggies? What can I make that's not boring?"                                         | Two big buttons: **Start Cooking** / **Too tired? Show easier options**.                                                              |
| Decision-making load is high; she's switching between cabinets, fridge, freezer, and kids' questions.     | Decision-making is reduced to: cook the planned fast meal, or one-tap downgrade to something easier.                                  |

---

### 5:30–6:00 PM – Cooking Time (with Interruptions)

| Without VibeMeals                                                                                                                                          | With VibeMeals                                                                                                                                                          |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| She improvises: chops things, tries to remember a recipe she saw, or half-follows a blog recipe on her phone.                                             | In **Cooking Mode**, she sees one clear step at a time:                                                                                                                 |
| Needs to keep the recipe page awake; scrolls up/down; loses her place whenever a kid interrupts.                                                           | Step 1/7: "Chop chicken into bite-sized pieces (about 5 minutes). Tap when done."                                                                                       |
| Has to mentally juggle: timing sides, when to preheat, when to stir, and when to help with homework.                                                       | Steps are labeled **Hands-on** vs **Simmer/Wait**. When something goes in to simmer, VibeMeals says: "You've got ~10 minutes while this cooks—good time to help kids."  |
| If she gets pulled away, she may overcook or undercook something; stress spikes.                                                                           | If she gets pulled away, she comes back to a **clear marker** of where she left off; timers keep an eye on simmer/bake durations.                                      |

---

### 6:05 PM – Dinner on the Table

| Without VibeMeals                                                                                             | With VibeMeals                                                                                                          |
|---------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Dinner might be:                                                                                              | Skillet dinner is ready, aligned with what she saw in the app (~25 minutes).                                           |
| - A thrown-together meal that sort-of works, or                                                              | She didn't have to:                                                                                                     |
| - A "save the day" frozen option                                                                            | - pick a recipe from scratch                                                                                             |
|                                                                                                               | - calculate timing / multi-task from memory                                                                             |
| She's mentally replaying: "Did I use up the veggies? Did we waste anything? What about tomorrow?"            | VibeMeals has already accounted for ingredients across the week; tonight is **just tonight**, not a planning session.  |

---

### 8:15 PM – After Kids' Bedtime

| Without VibeMeals                                                                                                                                     | With VibeMeals                                                                                                                                                   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ashley is tired, doomscrolling or answering emails.                                                                                                   | Before scrolling, she might open VibeMeals for a brief look-ahead:                                                                                               |
| Tomorrow's dinner is a fuzzy idea at best: "We'll figure it out."                                                                                    | A **Tomorrow Preview** card: "Tomorrow: Citrus Chicken (Normal, 40 min). Needs chicken thawed by morning. ✅ I'll thaw it tonight / 🔁 Swap to no-thaw meal."     |
| She *might* remember to thaw something, but likely won't set a reminder.                                                                              | If she taps ✅, she drops chicken into the fridge when she heads to bed. If she taps 🔁 Swap, VibeMeals suggests 2–3 no-thaw alternatives that fit her week.      |
| The mental loop "remember to thaw something" follows her into bed.                                                                                    | She goes to bed with preflight either handled or swapped away. No mental loop required.                                                                         |

---

### 10:00 PM – Lights Out

| Without VibeMeals                                                                                                               | With VibeMeals                                                                                                                           |
|-------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Brain still spinning: "What's tomorrow look like? Did I buy enough? What if I forget to thaw? We should really plan better…"  | Brain quieter around dinner: plan exists, grocery run covered it, tomorrow's potential pitfall (thawing) has already been addressed.    |
| Vague guilt about not planning "properly" on the weekend.                                                                      | Sense of having a system: "We planned Sunday in a few minutes, and the app is catching details I would normally forget."                 |
| She's the system, and she knows she'll have to wing it again.                                                                  | VibeMeals is the system; she just steers with small decisions when she has energy.                                                      |

---

### Net Difference – Time, Effort, and Stress

#### Without VibeMeals

- Time spent **thinking about dinner** is scattered across the entire day:

  - Commute rumination

  - Mental inventory checks

  - Ad-hoc recipe hunting

- Effort is mostly **cognitive**: planning, remembering, juggling steps amidst
  chaos.

- Emotional load: feels solely responsible when things go wrong (takeout, waste,
  second trips).

#### With VibeMeals

- Time spent on dinner **decisions** is compressed into:

  - One short weekly session (Sun)

  - A few tiny check-ins (Today view, Tomorrow Preview)

- Effort is mostly **tapping through clear options**:

  - Start planned meal / downgrade / swap / quick feedback.

- Emotional load: feels supported by a system that:

  - remembers preflight

  - gives realistic meals

  - flexes when life blows up

If Monday feels this different, the rest of the week benefits from the same
underlying rhythms (plan → preflight → today view → flexible execution → light
feedback), making VibeMeals feel like an invisible logistics layer rather than
"another app she has to manage."

---

## Appendix B: Storyboard – Ashley's Monday with VibeMeals

This storyboard shows how VibeMeals quietly removes work from Ashley's day
without demanding attention or adding admin burden. Each touchpoint is measured
in seconds, not minutes.

### 6:45 AM – Morning Scramble

#### Context

- Kids half-dressed, searching for shoes.

- Ashley's making quick breakfasts and packing lunches.

- She remembers: "Oh yeah, we planned dinners yesterday."

#### VibeMeals' role

- **Does *not* demand attention.** No complex morning tasks, no "log your
  meals," nothing admin-y.

- There's a quiet reassurance in her head:

> "Dinner's already picked. I don't have to decide that today."

#### Key UX Point

- Planning happened on Sunday in <10 minutes, so Monday morning starts with
  **one fewer decision**.

---

### 9:15 AM – At Work, Quick Coffee Break

#### Context

- Ashley sits down at her desk, glances at her phone.

- She knows Monday evenings are usually medium chaos: homework + maybe a
  practice.

#### VibeMeals touchpoint (optional)

- She gets a tiny, non-urgent banner in the app (or optional notification):

> "This week's plan: > Mon – Skillet Chicken & Veggies (Fast) > Tue – Tacos
(Normal, busy-night friendly) > Wed – Sheet Pan Sausage (Fast)… > Looks good?
You can tweak anytime."

- She opens it for 15 seconds, nods, closes it.

#### Impact

- Light **reinforcement**: the plan exists, today is "Skillet Chicken & Veggies
  – Fast."

- No changes required. Zero mental overhaul.

---

### 12:05 PM – Lunch at Work

#### Context

- Ashley is eating at her desk.

- Monday's dinner **does not** need early preflight (it's a Fast, no-thaw
  recipe).

- But Tuesday's plan *does* (e.g., marinated chicken).

#### VibeMeals touchpoint (preflight, but not for tonight)

- She gets a small, calm prompt like:

> "Heads up for tomorrow (Tue): > Your [Citrus Chicken] needs chicken thawed by
tomorrow morning. > We'll remind you again at 8 pm tonight. > ❌ Change
tomorrow's dinner > ✅ Sounds good"

- Ashley taps **"Sounds good"** and goes back to work.

#### Impact

- Preflight is **handled in advance**, but not for tonight—so Monday remains
  frictionless.

- No mental load to "remember everything"; the system is doing the remembering.

---

### 4:30 PM – Leaving Work / Commute Home

#### Context

- Workday is done, brain is mush.

- Kids need pick-up. She's about to hit the "what's for dinner?" stress window.

#### VibeMeals touchpoint – Today View

Before she starts the car, she glances quickly at VibeMeals:

- The **Today** tab shows:

  - "Tonight: Skillet Chicken & Veggies (Fast, ~25 min)."

  - A tiny note: "No preflight needed. You're good to start when you get home."

  - Big button: **"Start Cooking When I'm Home"**

#### Impact

- Ashley knows **exactly** what's for dinner and that it's realistic for a tired
  evening.

- Zero recipe-hunting, no debating options on the drive home.

---

### 5:20 PM – Walking in the Door

#### Context

- Kids dumping backpacks, someone needs help with homework.

- Ashley has maybe 5 minutes to transition.

#### VibeMeals touchpoint – Gentle Cue

- Phone ping (or she opens "Today" view again):

> "Ready when you are: > Skillet Chicken & Veggies (Fast, ~25 min) > • 8 min
hands-on > • 12 min stovetop simmer > Start whenever you're ready."

- Two big options:

  - **Start Now**

  - **Too Tired? Show Easier Options**

She taps **"Start Now"**.

#### Impact

- She doesn't need to remember ingredient quantities or steps.

- She gets the sense: *"This is doable, even after today."*

---

### 5:30–6:00 PM – Cooking with Interruptions

#### Context

- Ashley is cooking.

- Kids interrupt her every few minutes:

  - "Can you help with this worksheet?"

  - "I can't find my shin guards."

#### VibeMeals touchpoint – Guided Steps

In **Cooking Mode**, the app:

- Shows just **one step at a time**, with a progress indicator:

  - Step 1/7: "Chop chicken into bite-size pieces (about 5 minutes). Tap when
    done."

- Marks tasks as:

  - **Hands-on** vs **Hands-off / Wait**

- Auto-suggests small breaks:

  - After she gets it simmering, it says:

> "You've got 10 minutes while this simmers. > Good time to: help with homework
/ set the table / just sit."

#### Impact

- She doesn't have to juggle a mental schedule of steps.

- If she gets pulled away, she can **see exactly where she left off**.

---

### 6:05 PM – Dinner on the Table

#### Context

- Skillet dinner is ready.

- It wasn't fancy, but it was warm, on time, and not chaotic.

#### VibeMeals touchpoint – Quick Outcome Check (Optional)

After dinner, while the kids clear plates, she opens VibeMeals for 10 seconds:

- Sees:

> "How did tonight's dinner go?" > 👍 Keep in rotation > 👎 Not for us > ➖ Skip
rating

She taps **👍 Keep in rotation**.

#### Impact

- System learns:

  - "This Fast, skillet-style recipe worked on a Monday."

- But she didn't have to write a review or do paperwork.

---

### 8:15 PM – Post-Kid Bedtime, Quiet Moment

#### Context

- Kids are (mostly) in bed.

- Ashley is tired but has a bit of scroll time.

#### VibeMeals touchpoint – Light Look Ahead

- VibeMeals shows a **Tomorrow Preview** card in the app:

> "Tomorrow (Tue): Citrus Chicken (Normal, 40 min). > Needs chicken thawed by
tomorrow morning. > ✅ I'll thaw it tonight > 🔁 Swap to a no-thaw meal"

- If she taps **"I'll thaw it tonight"**:

  - The app gently suggests:

> "Great. Toss the chicken into the fridge when you head to bed. We'll assume
it's handled, and you can still change tomorrow if needed."

- If she taps **"Swap to a no-thaw meal"**:

  - The app shows 2–3 no-preflight alternatives using similar ingredients.

#### Impact

- Tomorrow's potential failure (forgotten thaw) is **defused** the night before.

- It's a 15–30 second interaction, not another planning session.

---

### 10:00 PM – Lights Out

#### Context

- Ashley goes to sleep **not needing** to mentally rehearse:

  - what's for dinner tomorrow

  - whether she bought the right stuff

  - whether she'll remember to thaw or marinate anything.

#### VibeMeals' role

- No more tasks today.

- The app has:

  - Handled tonight.

  - Partially prepared tomorrow.

  - Stored a tiny bit of preference data (👍 on tonight's meal).

#### Net "Time & Effort" Change for Monday

Compared to her old normal, Ashley:

- Spent **zero minutes** debating dinner on the commute.

- Spent **zero minutes** checking recipes while cooking.

- Spent **maybe 1–2 minutes total** on micro interactions:

  - confirming she'd thaw chicken for tomorrow

  - giving quick feedback on tonight's meal

But she **saved**:

- At least 10–15 minutes of mental churn ("What's for dinner? Do we have X?").

- A big chunk of stress at 5:00 pm.

- The risk of a last-minute "we can't cook this" failure.

---

## 1) Cross-Persona Pain Matrix

Legend:

- **H** = High/intense pain

- **M** = Moderate/regular pain

- **L** = Low / occasional / background

| Pain / Persona                            | Ashley (FT mom) | Brianna (budget mom) | Kayla (solo) | Jake & Maya (DINK) | Ellen & Mark (empty nest) |
| ----------------------------------------- | --------------- | -------------------- | ------------ | ------------------ | ------------------------- |
| **5:00 pm panic / “what’s for dinner?”**  | **H**           | H                    | H            | M                  | L–M                       |
| **Second trips / missing ingredients**    | **H**           | H                    | M            | M                  | M                         |
| **Hidden preflight (thaw/marinate/etc.)** | **H**           | M                    | M            | M                  | M                         |
| **Planning dread / decision fatigue**     | **H**           | H                    | **H**        | M                  | M                         |
| **Food waste guilt (throwing food away)** | H               | **H**                | **H**        | M                  | M–H                       |
| **Budget stress / overspending**          | M               | **H**                | M            | L–M                | M                         |
| **Leftover overload / boredom**           | M               | M                    | **H**        | M                  | M–H                       |
| **Schedule volatility / plans change**    | H (kids/sports) | M                    | **H**        | **H**              | L–M                       |
| **Emotional blame / “I failed dinner”**   | **H**           | H                    | M–H          | M                  | M                         |
| **Rut / boredom with same meals**         | M               | M                    | M            | M                  | **H**                     |

### Quick read

- **Near-universal pains (must never regress):**

  - Planning dread / decision fatigue

  - Food waste guilt

  - Second trips / missing ingredients

  - Hidden preflight (even if intensity differs)

- **Persona-specific “spikes”:**

  - **Ashley:** 5pm panic, preflight, second trips, emotional blame, volatility

  - **Brianna:** budget + waste as *sharp* pains

  - **Kayla:** leftovers, volatility, “why bother cooking for one?” decision
    fatigue

  - **Jake & Maya:** volatility & “we went out instead” → waste

  - **Ellen & Mark:** rut/boredom + “don’t make me buy a new pantry”

This is the lens for “are we making any of these worse by accident?”

---

## 9) Experience Tests – Golden Stories We Must Not Break

Every release must keep these five stories true. If a change breaks any of them,
the change is wrong, even if the metrics look good.

### A) Ashley – Busy Weeknight, No Hidden Preflight  *(Tags: [G1, G2, G3])*

**Story:** On a busy weekday, Ashley walks in at 5:20 pm and *already* has a
realistic, provisioned, preflight-safe dinner lined up.

- **Given** Ashley planned her week and did the main shop

- **When** it’s a normal weeknight around 5–6 pm

- **Then** VibeMeals must:

  - Show exactly one clear, realistic answer to “What’s for dinner tonight?”

  - Ensure all **critical ingredients** for that dinner are on hand (no mid-cook
    surprises)

  - Surface any thaw/marinate/soak steps **earlier in the day**, not as fine
    print at 5pm

  - Let her either **do tonight’s plan** or **downgrade to something easier** in
    one or two taps

---

### B) Brianna – End-of-Month Groceries Don’t Feel Like a Gamble  *(Tags: [G2, G5])*

**Story:** At the end of the month, Brianna can plan 3–4 cheap dinners that use
what she has and see they’re affordable *before* she commits.

- **Given** Brianna is in a tight money week and asks for a budget-friendly plan

- **When** VibeMeals proposes dinners and builds a list

- **Then** VibeMeals must:

  - Favor **cheap, familiar recipes** and reuse likely-on-hand staples

  - Make it obvious that this is a **low-cost week** (even with rough cost)

  - Use Quick Review only to **optionally** remove items she truly has, never to
    drop critical ingredients automatically

  - Never require detailed budgeting/admin work to get value

---

### C) Kayla – Two Home-Cooked Dinners Instead of a Delivery Spiral  *(Tags: [G2, G4, G5, G6])*

**Story:** Kayla asks VibeMeals for “2 easy wins this week” and actually cooks
them, without being forced into a full 7-day grid.

- **Given** Kayla lives alone and opts for a light plan (e.g., “2 dinners this
  week”)

- **When** VibeMeals plans, provisions, and guides her through those meals

- **Then** VibeMeals must:

  - Plan only **2–3 cook nights**, not a full family-style week

  - Make each cook night feel “worth it” (1 cook → 1–2 extra easy meals, not a
    mountain of leftovers)

  - Offer super low-friction cooking flows that genuinely **compete with
    delivery** on effort

  - Treat delivery as allowed and normal; only highlight **small wins** (“you
    cooked twice”) rather than guilt

---

### D) Jake & Maya – “We Went Out Instead” Bends the Plan, Not Breaks It  *(Tags: [G4, G5])*

**Story:** On a planned cook night, they decide to go out. One tap tells
VibeMeals, and the meal/ingredients are gracefully rescheduled or rescued.

- **Given** Jake & Maya have a planned fresh-ingredient dinner for tonight

- **When** they choose “We’re eating out instead”

- **Then** VibeMeals must:

  - Treat this as a **first-class, normal** action (no sense of failure)

  - Offer simple options to **move** or **swap** that meal (e.g., move to
    tomorrow, to weekend, or replace with a freezer/pantry meal)

  - Adjust internal freshness so that ingredients are either used soon, frozen,
    or consciously skipped

  - Later, gently remind them to **use or freeze** borderline-fresh items,
    without shaming

---

### E) Ellen & Mark – Break the Rut Without a New Pantry  *(Tags: [G2, G5, G6])*

**Story:** They get 3 dinners planned: 2 old favorites, 1 small twist that
doesn’t require 10 new ingredients or fancy skills.

- **Given** Ellen & Mark ask for ~3 dinners that are “like our usual, but less
  boring”

- **When** VibeMeals plans their week and generates a list

- **Then** VibeMeals must:

  - Include **comfort meals** they recognize plus at least one **small twist**

  - Make twists structurally familiar (same general pattern, slightly different
    veg/seasoning)

  - Introduce at most **1–2 new ingredients** per week, and avoid big one-off
    pantry buys

  - Let them easily say “keep/ditch this twist” and evolve variety slowly, not
    all at once

---

#### Rule of thumb:
If a new feature or change makes any of these stories **less true, less
reliable, or more fragile**, we don’t ship it without fixing that regression.

---

## 10) Special Constraints – Overlays on Top of Personas

These are not full personas; they are overlays that can apply to Ashley,
Brianna, Kayla, etc. For any household that matches one of these, the following
pains and guardrails apply.

---

### 1) Health-Constrained Household (Allergies, Diabetes, Celiac, GERD, etc.)

#### Who this is

Anyone where **getting dinner wrong has health consequences**, not just “oops,
that was heavy”:

- Celiac/gluten-free, peanut/nut allergies, diabetes, cardiac/low-sodium,
  GERD/trigger foods, etc.

- Could be Ashley-with-celiac-kid, Brianna-with-diabetes, Kayla-with-GERD, etc.

#### How it amplifies core pains

- **Planning dread** now includes “will this make someone sick?”

- **Substitution & SKU mapping** become scary:

  - Hidden gluten/sugar/allergens in sauces, spice blends, broths.

- **Waste guilt** competes with **safety fear**:

  - “I *think* this is safe leftover…but if I’m wrong, it’s bad.”

#### Guardrails – We must NOT…

- **Do NOT** suggest or auto-swap recipes/SKUs that clearly violate a known
  restriction (e.g., gluten pasta into a celiac household once we know about
  it).

- **Do NOT** treat sauces, spice blends, pre-made bases as “just flavor” if they
  may hide restricted ingredients.

- **Do NOT** silently substitute branded products if we don’t know they’re safe
  for the constraint.

- **Do NOT** force them to re-answer preference/constraint questions every week;
  once learned, constraints must be respected.

#### Guardrails – We must…

- **Must** make it easy to mark a few hard constraints (“no gluten,” “low
  sugar,” “no nuts”) and treat them as hard stops.

- **Must** keep copy calm, not alarming; we don’t practice medicine, but we also
  don’t hand-wave away risk.

#### Experience target

> Someone with a clear restriction feels like VibeMeals “gets it” after setting
it once, and **never has to fight the app** to keep unsafe ingredients out of
the plan.

---

### 2) ADHD / Executive Dysfunction Overlay

#### Who this is

Anyone whose real enemy is **activation + follow-through**, not knowledge. Could
be Ashley-with-ADHD, Kayla-with-ADHD, a college student, etc.

#### How it amplifies core pains

- **Planning dread** → “I cannot handle a complex setup or big grid of
  decisions.”

- **5pm panic** is made worse by **time blindness** and starting late.

- **Cooking** is fragile:

  - Long instructions, multi-tasking, and interruptions cause derailment.

#### Guardrails – We must NOT…

- **Do NOT** rely on long wizards, multi-step setup flows, or “tag everything”
  requirements.

- **Do NOT** present giant “choose from 50 options” carousels at decision
  moments.

- **Do NOT** hide total time or preflight time; vague timing kills them.

- **Do NOT** require strict step-by-step logging to keep the system working.

#### Guardrails – We must…

- **Must** keep decisions to **very small sets** (1–3 strong options, not
  galleries).

- **Must** make time bands honest and visible (Fast / Normal / Project with real
  expectations).

- **Must** treat “one big button” actions as first-class (Generate Plan, Start
  Cooking, Too Tired → Easier Option).

#### Experience target

> An ADHD user can get from “I’m hungry” to “I’m cooking something doable” in
**one or two obvious taps**, without reading walls of text or making dozens of
little choices.

---

### 3) Shift Worker / Irregular Hours Overlay

#### Who this is

Nurses, EMTs, factory workers, gig workers with rotating shifts, anyone whose
weeks **don’t follow a 9–5, dinner-at-6 pattern**.

#### How it amplifies core pains

- **Preflight** is fragile:

  - “Morning” and “evening” are relative; thaw windows are weird.

- **Planning dread**:

  - Their schedule is complex; a rigid 7-night dinner grid feels wrong.

- **Energy crashes**:

  - After 12–14 hour shifts, even a “fast” recipe might be too much.

#### Guardrails – We must NOT…

- **Do NOT** assume “dinner” = 6–7 pm for everyone.

- **Do NOT** force a full 7-dinner plan pattern into their week by default.

- **Do NOT** shame skipped nights when shift chaos hits; chaos is normal here.

- **Do NOT** tie preflight to fixed clock times (“thaw by 11 am”) without
  acknowledging different main-meal times.

#### Guardrails – We must…

- **Must** support **fewer, strategically chosen cook days** (e.g., 2–3 anchor
  cooks, plus leftovers) instead of full coverage.

- **Must** allow flexible “main-meal time” preferences per day or pattern (e.g.,
  “my main meal is morning on these days”).

- **Must** heavily lean on freezer/pantry-friendly options for “on-shift” days.

#### Experience target

> A shift worker feels like VibeMeals is **aligned to their actual schedule**,
not nagging them to live like a 9–5 family.

---

### 4) Large / Multi-Generational Household Overlay

#### Who this is

Households feeding **5–8+ people** regularly: big families, multi-gen homes,
shared households.

#### How it amplifies core pains

- **Second trips / missing ingredients** are catastrophic:

  - You can’t run out of protein with a full table.

- **Portion anxiety** is constant:

  - Recipes default to 4 servings; they routinely need 6–8+.

- **Waste** and **overspend** are magnified by scale.

#### Guardrails – We must NOT…

- **Do NOT** assume 4 servings is “standard”; scaling is not optional here.

- **Do NOT** under-portion recipes by default; “serves 4” for them is “not
  enough.”

- **Do NOT** quietly shrink quantities because “we think you still have some”
  when feeding a big group.

- **Do NOT** rely on fuzzy pantry guesses to drop *bulk* staples like rice,
  pasta, or meat.

#### Guardrails – We must…

- **Must** let them easily set a **default headcount** and treat that as sacred
  in planning and lists.

- **Must** be conservative on quantities for core components (better slight
  leftovers than hungry people).

- **Must** be extra-careful with “critical ingredients” for mains when headcount
  >4.

#### Experience target

> The person cooking for 6–8 feels like “if VibeMeals says this will feed us, it
actually will,” without constant manual up-scaling and mental math.

---

### 5) Low-Confidence / New Cook Overlay

#### Who this is

People who **haven’t cooked much** or don’t trust themselves in the kitchen:

- New grads, newly single, folks who grew up without learning to cook, etc.

#### How it amplifies core pains

- **Planning dread** includes “I might pick something I can’t actually cook.”

- **Cooking** is high-stress:

  - Vague instructions (“season to taste”) are terrifying.

  - Technique-y recipes feel like traps.

- **Waste guilt** is higher:

  - “If I mess this up, that’s dinner and money gone.”

#### Guardrails – We must NOT…

- **Do NOT** assume cooking vocabulary is obvious (deglaze, al dente, blanch,
  etc.).

- **Do NOT** hide crucial technique details in throwaway lines.

- **Do NOT** pile on multiple pans/complex equipment for “normal” nights.

- **Do NOT** punish mistakes with scolding copy or complex recovery flows.

#### Guardrails – We must…

- **Must** favor **simple, forgiving recipes** for low-confidence users
  (one-pan, one-pot, sheet-pan).

- **Must** write instructions as if you’re talking to a smart beginner:

  - concrete cues (“until the chicken is no longer pink inside”) instead of
    jargon.

- **Must** keep equipment expectations modest (no assuming specialty tools
  unless explicitly enabled).

#### Experience target

> A new cook reading a VibeMeals recipe feels **talked to like a friendly
guide**, not tested; they believe “I can actually pull this off.”

---

### 6) Food-as-Hobby / Confident Cook Overlay

#### Who this is

People who **enjoy cooking and are already competent**:

- They read food blogs, experiment, host dinner parties.

- Their pain is logistics, not creativity.

#### How it modifies core pains

- **Planning dread**:

  - Comes from juggling ideas, not from lack of recipes.

- **Shopping**:

  - They often plan multiple complex meals and want one clean, accurate list.

- **Coordination pain**:

  - Timing mains + sides + multiple recipes for guests is tricky.

#### Guardrails – We must NOT…

- **Do NOT** dumb everything down to the point of condescension (over-explaining
  basics they already know).

- **Do NOT** lock them into only “fast & simple” options if they’ve signaled
  they like projects.

- **Do NOT** obstruct multi-dish planning (main + sides) with overly linear,
  beginner-only flows.

#### Guardrails – We must…

- **Must** shine at **logistics for complex weeks**: consolidate ingredients,
  avoid duplicate buys, respect their plan.

- **Must** still model timing & preflight, but allow “project nights” by choice.

- **Must** keep beginner aids optional (toggles, profiles) so confident cooks
  can dial them down.

#### Experience target

> A confident cook feels like VibeMeals is their **ops assistant**, not a
remedial cooking course: it handles timing and shopping, and stays out of the
way of creativity.

---

## 11) Experience Tests – Golden v1.1

These are the **6 non-negotiable experiences** VibeMeals must protect.

All persona stories and special-constraint stories are examples of these. If a
change breaks any of these, we don’t ship it.

---

### 1. Tonight Is Actually Cookable

**North Star:** If there’s a dinner on tonight’s plan and the user did the main
shop, that dinner is genuinely doable at their usual “dinner time”.

#### Given

- A user (any household type) has:

  - accepted a plan

  - completed the main shop for that plan

#### When

- It’s their usual main-meal window (e.g., 5–7 pm for Ashley, 9 am for
  night-shift Kayla)

- They open VibeMeals “Today”

**Then** VibeMeals must:

- Show **one clear primary option** for tonight’s dinner

- Ensure all **critical ingredients** are on hand (no “oh no, we’re out of
  chicken/tortillas”)

- Ensure any required **preflight** (thaw/marinate/soak) was:

  - surfaced earlier at a realistic time, or

  - gracefully handled (backup/swap) if missed

- Fit the dinner into the promised **time band** (Fast / Normal / Project) for
  that user’s typical evening energy

- Surface the **preflight state** on Today (“you’re covered” vs “you missed
   it—here’s the auto-downgrade/backup”).

> Covers: Ashley 5pm panic, ADHD activation, shift workers, large households,
low-confidence cooks. > If this fails, the app has failed its core promise.

---

### 2. Planning Is a 5–10 Minute Check-In, Not a Project

**North Star:** Weekly planning never turns into a 45-minute admin session,
regardless of household type.

#### Given

- A user opens VibeMeals to plan “this week’s dinners”

  - Ashley: family of 4–5

  - Brianna: budget-stretched mom

  - Kayla: single, wants 2 wins

  - Ellen & Mark: 2 people, 3 meals

  - Etc.

#### When

- They generate or adjust a plan for the upcoming week

**Then** VibeMeals must:

- Produce a **sane default plan** in one tap (no blank grid), sized to their
  household profile:

  - families: ~4–7 dinners

  - singles: 2–4 dinners

  - empty nesters: 3–4 dinners

- Let them adjust the plan (swap/reroll/delete) in **under 5–10 minutes** for
  normal weeks

- Avoid long wizards, mandatory surveys, pantry setup, or tagging marathons as
  prerequisites

> If a new flow makes planning feel like a chore or homework—especially for
Ashley, Brianna, or Kayla—it breaks this golden test.

---

### 3. Safe Over Clever: Critical Ingredients Are Never Dropped

**North Star:** The app may over-include cheap things, but it **never** risks
missing a core ingredient for any planned meal.

#### Given

- A plan is accepted

- A shopping list/cart is generated

- The fuzzy “pantry brain” thinks some items *might* still be on hand

#### When

- VibeMeals builds and optionally optimizes the list

**Then** VibeMeals must:

- Always include **all critical ingredients** by default

- Treat pantry/fuzzy signals as **optional optimization only**, surfaced via
  Quick Review:

  - “You might already have these – want to remove them?”

- Never auto-remove critical ingredients purely on guesswork

- Be extra conservative for:

  - large households (portion/pack sizing)

  - health constraints (no unsafe swaps)

- For health constraints, never map to an unsafe SKU; if no safe SKU exists,
   **flag and swap** instead of shipping an unsafe plan.

> This is the shield against second trips, mid-cook disasters, and app-induced
“we’re out of chicken” moments.

---

### 4. Plans Bend, They Don’t Break

**North Star:** When life happens—kids get sick, shifts move, friends invite you
out—the plan flexes without creating chaos or guilt.

#### Given

- A dinner was planned for a specific day

- Reality changes:

  - Ashley’s sports night explodes

  - Jake & Maya decide to go out

  - Shift-worker Kayla loses a night to a schedule change

#### When

- The user marks tonight as “Skip”, “We’re eating out”, or similar

**Then** VibeMeals must:

- Treat this as **normal, supported behavior**, not a failure

- Offer **1–2 simple adjustments**:

  - move the meal to another day

  - swap in a simpler backup

  - freeze/rescue ingredients when relevant

- Keep the rest of the week intact as much as possible

- Use calm, non-judgy copy:

  - No “you fell off the plan”; only “want to move or simplify this?”

> If any feature makes skipping/swapping feel like “breaking” the app, it fails
this golden rule.

---

### 5. Budget & Waste Are Respected, Not Turned into Admin Work

**North Star:** Whether it’s end-of-month Brianna or solo Kayla, VibeMeals
quietly helps reduce overspending and waste without turning the user into a
bookkeeper.

#### Given

- A user is:

  - budget-sensitive (Brianna, large household), or

  - guilt-sensitive about waste (Kayla, Ellen & Mark)

- They’ve used VibeMeals for at least one week, so the app has some
  purchase/plan history

#### When

- They plan a new week and review the list

**Then** VibeMeals must:

- Bias plans toward **cost-appropriate meals** when the user signals “keep it
  cheap”

- Surface **simple, low-risk savings**:

  - “You probably still have rice from last week – want to skip buying more?”

- Use fuzzy pantry knowledge to:

  - suggest “use-it-up” meals, and

  - gently steer away from repeatedly wasted items

- Never:

  - require detailed price entry, manual inventory, or complex budgeting flows

  - shame them for past waste

> If “being smart about money/waste” starts to feel like a second job, this
golden test is violated.

---

### 6. Respect Hard Constraints and Ability Levels

**North Star:** The app never makes users feel unsafe, stupid, or talked down
to—whether they have health constraints, ADHD, are new to cooking, or are
experienced cooks.

#### Given

- A user has indicated any of the following:

  - Health constraints (e.g., “no gluten,” “no nuts,” “low sugar”)

  - Low cooking confidence / beginner status

  - High cooking confidence / “I enjoy cooking”

  - Executive dysfunction / ADHD (“keep it simple”)

#### When

- VibeMeals:

  - recommends recipes

  - maps ingredients to SKUs

  - presents cooking steps

**Then** VibeMeals must:

- Treat health constraints as **hard filters**: never intentionally suggest
  clearly unsafe meals/SKUs

- For beginners:

  - Use concrete, non-jargony instructions and modest equipment expectations

- For confident cooks:

  - Avoid condescending over-explanations; focus on logistics (timing,
    consolidation)

- For ADHD/overwhelmed users:

  - Keep decision surfaces small and paths obvious (“do this” vs “easier
    option”)

> If any change makes a constrained user fight the app (to stay safe) or feel
stupid/lectured, this golden test is broken.

---

## 12) Traceability – Stories to Golden Gates

Quick map from stories to the six goldens for faster review and regression
spotting.

- **[G1] Tonight Is Actually Cookable:** Ashley – Busy Weeknight; Story 1: No
  Missing Critical Ingredients; Story 2: No Hidden Preflight; Kayla
  (shift-worker timing) examples.

- **[G2] Planning Is a 5–10 Minute Check-In:** Brianna – End-of-Month Groceries;
  Kayla – Two Easy Wins; Ellen & Mark – Break the Rut; planning/setup flows.

- **[G3] Safe Over Clever (Critical Ingredients):** Ashley – Busy Weeknight;
  Story 1: No Missing Critical Ingredients; health-constrained SKU safety.

- **[G4] Plans Bend, They Don’t Break:** Jake & Maya – We Went Out; Story 3:
  Plans That Bend; Kayla – Delivery Spiral avoidance; shift-worker reschedules.

- **[G5] Budget & Waste Respected:** Brianna budget weeks; Jake & Maya waste
  avoidance; Kayla low-commitment weeks; Ellen & Mark gentle variety without
  pantry bloat.

- **[G6] Respect Constraints & Ability:** Kayla – Two Easy Wins (ADHD/solo);
  Ellen & Mark (not condescending); beginner/low-confidence recipes;
  health-constraint overlays.

---

## 13) Roadmap & Phasing

### 13.1 v1 Thin Slice – What Must Ship

These surfaces must exist in v1 and behave in line with all principles, golden
tests, and constraints defined in this document.

#### Planner (Week View)

- 5–10 min weekly check-in (G2)

- Generates week shape based on household mode (Section 5.2)

- Lets user lock/swap/reroll dinners

- Shows high-level preflight demands for the week

#### Today View

- Single clear answer: "Here's tonight's dinner" (G1)

- Preflight state (good / missed / Plan B available)

- One-tap "Too much → easier option" and "We're eating out instead" (G4)

#### Shop / List → Cart

- Clean de-duplicated list grouped by aisle (G3)

- Optional Quick Review ("you might already have…") that removes only
  non-critical items

- Export: cart-link where supported, CSV/print otherwise

#### Cooking Mode

- Step-by-step, numbered instructions

- Time-aware (Fast/Normal/Project bands from Section 8)

- Parallelizes steps to hit time band without confusion

#### Settings / Household Profile (lightweight)

- Household mode + headcount (Section 5.2)

- How many dinners/week, rough budget sensitivity

- Simple constraints (no pork, no gluten, ADHD-friendly, beginner cook)

#### Success Metrics:

- Golden Test G1 (Tonight Is Cookable) passes 95%+ of the time

- Golden Test G2 (Planning ≤10 min) for 90%+ of plans

- Golden Test G3 (No second trips) for 85%+ of weeks

---

### 13.2 V2 (Months 5–8): Intelligence & Flexibility

#### Add:

- Pack-size reuse (leftover magnets)

- Budget bands ($/$$/$$$) and light cost signals

- Health constraint filters (celiac, diabetes, etc.)

- Household tempo profiles (busy/normal nights)

- Multi-dish coordination (main + side timing)

- Leftover remix suggestions

#### Success Metrics:

- Golden Test 4 (Plans Bend) recovery rate >90%

- Golden Test 5 (Budget/Waste) user satisfaction >80%

- Retention week-over-week >85%

---

### 13.3 V3+ (Months 9+): Scale & Polish

#### Consider:

- Multi-store support (Costco + regular)

- Household sharing (Planner + Cook roles)

- Equipment preference modeling

- Advanced preference learning (cuisine, spice, etc.)

- Nutrition visibility (optional, never required)

#### Defer/Never:

- Social features / recipe sharing

- Calorie tracking / macro goals

- Required pantry inventory

- Complex tagging systems

---

## 14) Learning & Adaptation Principles

VibeMeals "learns you" over time, but **never** at the cost of trust, stability,
or safety.

This section defines:

- What we learn from

- What we refuse to do

- How fast we adapt

- How we stay transparent and correctable

If a personalization idea conflicts with these principles, we don't ship it.

---

### 14.1 Day-One Contract: It Works Before It "Knows You"

Learning is a bonus, not a requirement.

- The app must be **useful on week 1** with almost no data:

  - Safe assumptions, conservative shopping list, popular & kid-friendly
    defaults.

- We **never** require:

  - Pantry setup

  - Long surveys

  - "Tell us all your preferences" wizards before the system can perform.

> Personalization makes a good system *better*. It does not unlock a broken
system.

---

### 14.2 Signals We Learn From

We learn primarily from **behavior**, not long questionnaires.

#### Explicit signals:

- Thumbs up / thumbs down on recipes

- Marking a meal as "cooked," "skipped," or "swapped"

- "Don't show this again"-style actions

- Adding/removing specific recipes from the plan

#### Implicit signals:

- Edits to the shopping list (especially recurring removals / additions)

- Quick Review choices ("have it" vs "need it")

- Which recipes actually get cooked vs repeatedly skipped

- How often "Too much for today / give me something easier" is used

- Store choices and recurring ingredient preferences (e.g., ground turkey >
  ground beef)

We **do not** assume every one-off choice is a preference; we look for patterns.

#### Signal weighting:

- Explicit signals (thumbs up/down, "don't show again") are weighted **higher**
  than implicit signals.

- Implicit patterns require **multiple occurrences** before influencing
  recommendations.

- One-off behaviors ("I skipped salmon once") do not override explicit
  preferences or established patterns.

---

### 14.3 What We Learn (And What We Don't)

Over time, VibeMeals forms a **lightweight household profile**, not a
psychoanalysis.

#### We learn things like:

- **Time & effort patterns**

  - How often they actually cook "Project" meals vs Fast/Normal

  - Whether 45–50 minute "Normal" dinners succeed or fail on weeknights

- **Taste & pattern preferences**

  - Proteins they lean toward/away from (chicken vs beef vs vegetarian)

  - Flavor families and cuisines they seem to like (Mexican, Italian, etc.)

  - How kid-sensitive a household is (how often "kid-safe" meals are eaten vs
    rejected)

- **Cost & waste patterns**

  - Ingredients that often go unused (e.g., spinach bought and thrown out)

  - Pack sizes that are consistently right/wrong for this household

  - Whether "cheap but boring" vs "slightly nicer" tends to survive cooking
    reality

- **Leftover & repetition tolerance**

  - Whether "cook once, eat twice" patterns succeed or lead to skipped leftovers

  - Whether they enjoy planned leftovers or get bored quickly

#### We explicitly do *not* learn or infer:

- Weight, diet morality, or any judgmental framing ("you should eat healthier")

- Deep psychological traits ("you're impulsive," "you lack discipline")

- Detailed nutrient tracking (macros, calories) beyond basic labels

> We learn just enough to make planning, shopping, and cooking **less
annoying**, not to make claims about who you are.

---

### 14.4 How Fast We Adapt (Pace & Stability)

We prioritize **stability over hyper-reactive personalization**.

- One bad week does **not** erase a household's identity.

  - Two thumbs-downs on beef in one week ≠ "no beef ever again."

- We require **repeated patterns over time** before big shifts:

  - Many skips / thumbs-downs for similar recipes

  - Many "cooked & liked" events for a pattern we want to promote

- We prefer **gradual shifts**:

  - "Fewer beef dinners over the next few weeks"

  - "Slightly more vegetarian options introduced slowly"

  - "Spinach shows up less often if it gets skipped or wasted frequently"

For safety-critical constraints (e.g., no gluten, no nuts):

- Once marked, they are treated as **hard rules immediately**, not "something to
  learn."

- Adaptation there is about **variety within the constraint**, not whether to
  honor it.

#### Connection to household modes (Section 5.2):

- Learning tunes preferences **within** a household mode's default week shape,
  not wholesale redefinition.

- A "Family with Kids" household (4–7 dinners/week) may learn to prefer 5 over
  6, but the system won't suddenly suggest 2 dinners/week based on one chaotic
  month.

- Week shape adjustments require sustained pattern changes (multiple weeks) and
  explicit user confirmation.

---

### 14.5 Guardrails: What Learning Must *Never* Do

To protect Golden Experiences [G1–G6], learning **must not**:

- **Break G1 (Tonight is actually cookable)**

  - Never "personalize" by suggesting ambitious recipes on nights where this
    household historically fails.

  - Never hide preflight or extend time bands just because a user "likes" a
    recipe.

- **Break G2 (Planning is a 5–10 min check-in)**

  - Never require more tagging, more ratings, or more manual data just to learn.

  - No "rate every meal to improve your plan"-style nagging.

- **Break G3 (Safe over clever)**

  - Never drop critical ingredients due to "We think you have this" patterns.

  - Never override a health constraint because "you seemed okay with it once."

- **Break G4 (Plans bend, they don't break)**

  - Never punish users for skipping or moving meals.

  - Skips & "we went out instead" are inputs, not failures.

- **Break G5 (Budget & waste respected)**

  - Never aggressively chase cost or waste reduction at the risk of missing
    essentials.

  - Never push weird leftover hacks just to avoid throwing something out.

- **Break G6 (Respect constraints & ability)**

  - Never escalate difficulty just because meals were cooked; ability flags are
    explicit.

  - Never silently undo constraints (health, ADHD, beginner) because usage looks
    "inconsistent."

---

### 14.6 Transparency: Learning Should Be Legible

When learning affects what the user sees, we explain **why** in one sentence.

Examples:

- "We're suggesting fewer spinach dinners because they often get skipped."

- "You've cooked fast sheet-pan meals most weeknights; we're prioritizing
  those."

- "You've thumbs-downed most beef recipes lately; want to skip beef for a
  while?"

Principles:

- Explanations are **short, optional, and non-technical**.

- Users should be able to say "yes, that matches my reality" or "no, stop doing
  that."

#### Tone guardrails (connects to Section 4.1):

- ❌ **Never say:** "Based on your behavior patterns, we've detected inconsistent
  meal completion rates."

- ✅ **Say instead:** "You've cooked fast sheet-pan meals most weeknights; we're
  prioritizing those."

- ❌ **Never say:** "Analysis indicates reduced engagement with vegetarian
  options."

- ✅ **Say instead:** "You've skipped most veggie dinners lately; want fewer for
  a while?"

Explanations use the same "tired but competent friend" voice defined in Section
4.1—never clinical, never judgmental.

---

### 14.7 User Control: Easy to Nudge, Easy to Reset

Users must be able to **course-correct** the system without starting over.

- **Nudges:**

  - "Show this less often"

  - "Skip this protein/cuisine for a while"

  - "More meals like this"

- **Resets (local, not nuclear):**

  - "Stop treating me as a beginner" / "Give me simpler recipes again"

  - "Stop trying to use up this ingredient"

  - "Reset my cuisine preferences; give me a fresh mix"

When in doubt:

- We favor **user intention** (explicit taps) over inferred behavior.

- We assume the user knows their life better than any pattern we detect.

---

### 14.8 Baseline Behavior When We Don't Know Yet

In low-data or ambiguous situations, VibeMeals defaults to:

- **Safety over cleverness** (include the ingredient, simplify the meal, err on
  easier time bands).

- **Popular, boring-but-solid recipes** over niche or risky picks.

- **Short-term trials**:

  - Introduce 1–2 new things at a time, measure response, and roll back quickly
    if they fail.

> The worst behavior in a low-data state should be "a bit generic," not "wildly
wrong."

---

### 14.9 How This Connects to the DLE

The Dinner Logistics Engine (DLE) uses learning to:

- Adjust plan shapes (how many dinners, which time bands)

- Tune provisioning (how many packs, what sizes, which staples to buy less of)

- Suggest "use-it-up" recipes when waste patterns are clear

But the DLE **must always** obey:

- G1/G3 safety guarantees (cookable tonight, no missing essentials)

- G4's flexibility (easy to bend the plan)

- This section's pace, transparency, and user-control rules

If a learning or optimization idea conflicts with these, the DLE does **not**
adopt it.

---

## 15) System Boundaries & Integrations

VibeMeals sits in the middle of a messy ecosystem: stores, delivery apps,
calendars, kitchen realities.

This section defines **what VibeMeals owns**, **what it doesn't**, and **how it
integrates** without overpromising. If a feature proposal crosses these
boundaries, we either rethink it or explicitly re-scope it.

---

### 15.1 What VibeMeals Owns

VibeMeals is responsible for:

1. **Weekly Plan Logic**

  - Turning "this is my household + this is my week" into a realistic set of
     dinners.

  - Honoring week shapes by household mode (families vs solo vs empty nesters).

  - Respecting constraints and golden experiences [G1–G6].

2. **Dinner Logistics Engine (DLE)**

  - Translating a plan into:

    - concrete ingredients,

    - sensible pack sizes,

    - conservative quantities for the household size.

  - Tracking leftovers and residual pack sizes *fuzzily* to suggest reuse.

  - Modeling preflight (thaw/marinate) and time bands accurately.

3. **Shopping Lists & Cart Blueprints**

  - Generating accurate, de-duplicated shopping lists.

  - Grouping items logically (produce, meat, pantry, etc.).

  - Mapping recipes → ingredients → generic product types (e.g., "boneless
     skinless chicken breast, ~2 lb").

4. **Cooking Flow**

  - Transforming recipes into clear, step-by-step Cooking Mode.

  - Coordinating timing and preflight so "Tonight" is actually cookable.

5. **Learning & Personalization**

  - Adapting plan shapes, recipe choices, and leftover suggestions based on
     behavior.

  - Enforcing learning & adaptation principles (Section 14).

> Short version: we own **what you plan to cook, what you need to buy, and how
you actually cook it.**

---

### 15.2 What VibeMeals Does *Not* Own

VibeMeals does **not** own:

1. **Real-Time Store Inventory**

  - We do not promise that the store:

    - has every item in stock,

    - has the exact brand/size we suggest,

    - won't substitute something.

  - Our guarantee is **logical provisioning**, not real-time stock.

2. **Payments, Fulfillment & Delivery**

  - We don't process payments.

  - We don't schedule or guarantee delivery or pickup windows.

  - Store apps and delivery services own:

    - fees,

    - substitutions,

    - delays,

    - missing items.

3. **Precise Pantry Inventory**

  - We are not a barcode scanner or full inventory system.

  - We never require users to log every item in and out.

  - Our "pantry brain" is **fuzzy**, based on behavior and timelines, not a
     precise count.

4. **Nutrition, Diet Coaching, or Medical Advice**

  - We are not a macro tracker or diet app.

  - We don't prescribe diets or give medical advice.

  - We respect user-declared constraints (e.g., no gluten) but do not diagnose
     or treat conditions.

5. **Social Graph & Recipe Sharing**

  - We are not a social network.

  - No feeds, follows, likes, or public profiles in v1.

  - Any sharing is lightweight and optional (e.g., "share this list/plan").

> Short version: stores own **stock and money**; users own their **bodies and
medical choices**; we stay in our logistics lane.

---

### 15.3 Store & Cart Integrations

VibeMeals integrates with stores and carts as a **smart front-end** for
planning, not a replacement for store apps.

#### We do:

- Generate store-ready lists and cart "blueprints":

  - Generic product specs (e.g., "2 lb chicken breast," "1× 1 lb dry pasta").

  - When possible, map to **specific SKUs** for selected stores.

- Support export paths:

  - Deep-link or API-based cart creation for supported retailers.

  - CSV / copy-paste / printable lists for everything else.

#### We don't:

- Guarantee exact product availability or price.

- Meddle with:

  - how stores handle substitutions,

  - how promos/discounts are applied,

  - how orders get picked or delivered.

#### Failure handling:

If the store is missing something or substitutes:

- VibeMeals should offer:

  - simple fallback logic ("if no fresh broccoli, use frozen mixed veg"), **when
    we know it's safe**, and

  - a way for the user to confirm/adjust before cooking.

- We never pretend a missing item is present; we treat it as a gap to work
  around in Today/Cooking Mode.

---

### 15.4 Pantry Brain Boundaries

VibeMeals uses a **fuzzy pantry brain**, not an exact inventory.

#### We infer that you probably have:

- pantry staples (oil, salt, basic spices) after you've bought them once,

- pack-based leftovers (half a bag of rice, half a carton of broth, tortillas,
  etc.),

- recent purchases (within a reasonable time window for shelf life).

#### We must not:

- Drop critical ingredients from the list solely because "we think you still
  have them."

- Require users to log every pantry item, expiration date, or quantity.

#### We may:

- Suggest:

  - "You likely still have this—want to skip buying more?"

  - "You bought tortillas last week; want a recipe that uses them up?"

- Let users override quickly:

  - "Nope, we're actually out"

  - "Stop trying to use this ingredient up"

> The pantry brain is there to **save money and reduce waste**, never to put the
user in a position of missing essentials.

---

### 15.5 Calendar, Reminders & External Tools

We cooperate with external tools; we don't try to replace them.

#### Possible integrations:

- Calendar:

  - Show major events alongside plan creation ("Tue: late practice → pick a Fast
    meal").

  - Optional "preflight reminders" via calendar or notifications.

- Task/reminder systems:

  - "Move chicken to fridge before bed"

  - "Start slow cooker by 9am"

#### Boundaries:

- We never require users to live inside our app all day.

- We avoid spamming reminders; preflight and "tonight's dinner" are the main
  candidates.

- Calendar is a **planning input and nudge channel**, not a second source of
  truth for the plan itself.

---

### 15.6 Data & Privacy Posture (High-Level)

This is not a full privacy policy, but a product stance.

#### We use data to:

- Make planning faster and smarter.

- Reduce second trips, waste, and 5pm panic.

- Learn household patterns in line with Section 14.

#### We do not use data to:

- Shame users for behavior (takeout, waste, missed meals).

- Sell individual user patterns to third parties for targeting/ads (if that's
  adopted as a company stance).

- Infer sensitive health or psychological traits beyond what users explicitly
  tell us.

> If a data use doesn't clearly improve Plan → Shop → Cook → Learn in a way that
respects G1–G6, we don't do it.

---

### 15.7 Boundary Checks for New Features

When evaluating a new feature or integration, we ask:

1. **Is this core to Plan → Shop → Cook → Learn?**

  - If not, why are we doing it?

2. **Are we accidentally owning something a store or external tool should own?**

  - Payments, real-time stock, full inventory, diet coaching, social feeds.

3. **Does this feature respect our boundaries on:**

  - Golden Experiences [G1–G6]

  - Learning & Adaptation (Section 14)

  - Catalog & Time Band rules (Section 8)

  - Tone & Emotional Contract (Section 4.1)

If the answer to any of these is "no," the feature must be re-scoped or dropped.

---

## 16) Appendices

---

## Appendix C: Persona Experience Stories (Pain-Lens + Acceptance Tests)

> **Note:** For narrative context on each persona, see their complete stories in
[Experience Tests – Golden Stories We Must Not
Break](#experience-tests--golden-stories-we-must-not-break). The canonical
experience narratives are maintained as Stories A–E (Ashley, Brianna, Kayla,
Jake & Maya, Ellen & Mark) in that section.

This appendix provides implementation-ready **Given/When/Then** acceptance tests
derived from the Golden Stories.

### Acceptance Stories (Given/When/Then Ready)

#### Story 1: Brianna – End-of-Month Groceries Don't Feel Like a Gamble  *(Tags: [G2, G5])*

**Story:** End-of-month groceries feel controlled instead of terrifying.

#### Context / Goal

Brianna is a budget-stretched single mom (2 kids). End of month, money is tight.
She needs to:

- Plan **a few cheap dinners** that kids will eat

- **Use what she already has** (rice, beans, basics)

- Avoid overspending and **avoid buying stuff that will go to waste**

We want VibeMeals to **reduce financial anxiety**, not add "budget admin" work.

#### Scenario 1: Build a Budget-Conscious Week From Leftovers + Cheap Staples

**Given** Brianna has used VibeMeals for at least one prior week **And** last
week's plan + list show she bought rice and beans **And** she indicates money is
tight (e.g., chooses "budget-friendly week" or similar)

**When** she opens the app near the end of the month **And** requests a new
weekly plan (e.g., "Plan 4 budget dinners this week")

**Then** VibeMeals should propose a plan that:

- Favors **low-cost, familiar recipes** (tacos, rice/bean bowls, pasta bake,
  etc.)

- Reuses **recently bought staples** (rice, beans) without depending on perfect
  pantry data

- Avoids requiring lots of new, one-off ingredients

- Clearly **distinguishes** core ingredients from "nice-to-have" add-ons

**And Then** the app should show a **rough, clearly cheap** cost profile (e.g.,
"This is a low-cost week" / "On the cheaper side"), without requiring her to
input exact prices.

---

#### Scenario 2: Quick Review Saves Money Without Risking Second Trips

**Given** Brianna has accepted the proposed plan **And** VibeMeals generates a
shopping list from that plan **And** the internal "fuzzy pantry" believes she
likely still has some items (e.g., rice, spices, oil)

**When** she opens Quick Review before shopping

**Then** VibeMeals should:

- Present a **short list** of "You might already have these" items, prioritized
  by:

  - pantry-style items (rice, spices, oil)

  - recently purchased items from the last 1–2 weeks

- Let her **easily uncheck** those items to remove them from the list

- Never remove **critical meal-breaking ingredients** unless she explicitly
  confirms

**And Then** the app should **not** block or nag her if she skips Quick Review
entirely; the full list still includes all critical ingredients.

---

#### Scenario 3: End-of-Week Waste Avoidance Without Shame

**Given** Brianna has cooked at least some of the planned meals **And** some
pack-based ingredients (like tortillas, beans, sour cream) are likely partially
used

**When** she returns to VibeMeals at the end of the week **Or** starts planning
the next week

**Then** VibeMeals should gently suggest:

- "You bought tortillas and beans recently; want to plan a cheap meal that uses
  them?"

**And Then** the suggestion must:

- Be **optional** (no blocking gates if she ignores it)

- Use **plain, non-judgy language** ("Want to get more mileage from…", not "You
  wasted…")

- Bias toward **cheap, kid-friendly recipes** that fit her profile

**And Then** the system should **not require** her to reconcile exact quantities
or log what went bad; it uses fuzzy time + usage to decay confidence.

---

#### Story 2: Kayla – Two Home-Cooked Dinners Instead of a Delivery Spiral  *(Tags: [G2, G4, G5, G6])*

**Story:** A "planning-for-one" week where two home-cooked dinners actually
happen, instead of collapsing into DoorDash + guilt.

#### Context / Goal

Kayla lives alone, works hybrid, and has a volatile social/gym schedule. She
wants to:

- Cook at home **a little more** (e.g., 2 nights/week), not become a meal-prep
  machine

- Avoid drowning in leftovers

- Avoid buying "healthy groceries" that rot while she orders delivery anyway

We want VibeMeals to **compete with delivery on effort and emotional load**, not
with a fantasy version of her.

#### Scenario 1: Planning Only 2 Cook Nights for a Single Person

**Given** Kayla sets up VibeMeals as a single-person household **And** indicates
she wants to start small (e.g., "Help me cook at home ~2 nights this week")
**And** optionally sets low leftover tolerance (e.g., "I get bored of repeats")

**When** she asks VibeMeals for this week's dinners

**Then** the planner should propose a **small plan**, such as:

- 2 cook nights within the next 5–7 days

- Each cook night producing **1–2 extra portions**, explicitly planned as:

  - "You'll cook once and get 2 meals out of it" (e.g., Mon dinner + Tue
    lunch/dinner)

- No default assumption of a full 7-dinner grid

**And Then** the UI should emphasize **"2 wins this week"** instead of "complete
coverage" messaging.

---

#### Scenario 2: 6:30 pm, Tired, But Tonight's Home-Cooked Dinner Still Happens

**Given** it's a day with a planned cook night for Kayla **And** VibeMeals has
already provisioned the ingredients (she shopped at some point) **And** she has
no major conflict scheduled that evening

**When** it's around 6–7 pm **And** she opens VibeMeals "Today" view

**Then** the app should:

- Show **one clear, low-friction option** for tonight:

  - "Tonight: One-pan lemon chicken & potatoes (~25–30 minutes, 1 pan, 2 meals
    for you)"

- Emphasize:

  - small effort (time, dishes)

  - clear payoff (tonight + one more meal without extra cooking)

**And Then** starting this recipe should **feel easier** than:

- scrolling apps for delivery

- making tons of decisions ("what do I want?" "how much will it cost?")

---

#### Scenario 3: Leftover Boredom Doesn't Turn Into Rotting Containers

**Given** Kayla has cooked one of her planned dinners **And** the plan
explicitly schedules a second "leftover event" (e.g., next day's dinner) using
the remaining portion **And** she sometimes reschedules or skips meals

**When** she completes the first meal **And** opens VibeMeals the next day

**Then** the app should:

- Clearly remind her of the **planned leftover meal**:

  - "Tonight: Leftover lemon chicken & potatoes (~5 min, reheat)"

- Offer a **low-effort remix option** if straightforward repeats fail often:

  - "Too bored of this? Try this 10–15 min remix (e.g., turn into a wrap/bowl)."

**And Then** if she skips the leftover event:

- The app should **not** shame her:

  - No "You wasted food" messaging

- But it may adjust her model:

  - Decrease leftover tolerance for future plans

  - Offer more "1 cook → 1–2 eats max" patterns rather than 4+ portions

---

#### Scenario 4: Delivery Is Allowed Without Shame, but Progress Is Visible

**Given** Kayla sometimes orders delivery on nights that were nominally
scheduled as cook nights **And** she returns to VibeMeals later in the week

**When** she looks at her week summary

**Then** the app should highlight **what she did accomplish**:

- "You cooked at home 2 nights this week 👏 That's likely ~$40–$60 saved vs
  delivery."

**And Then** it should:

- **Not** scold or penalize her for nights she didn't cook

- **Not** demand that she backfill or "log" every takeout night for the system
  to function

- Use these signals to gently tune future recommendations:

  - maybe more ultra-fast fallback options

  - maybe fewer planned cook nights if 3+ repeatedly fail

---

#### Story 3: Jake & Maya – "We Went Out Instead" Doesn't Turn Groceries Into Trash  *(Tags: [G4, G5])*

**Story:** Last-minute social plans don't silently convert planned fresh dinners
into wasted food.

#### Context / Goal

Jake & Maya are a DINK couple:

- Both work long hours in the city.

- They cook some nights, go out others, often on short notice.

- Their pattern:

  - Shop Sunday with good intentions.

  - Say "yes" to drinks/dinner invites midweek.

  - Throw away raw chicken/veggies on Sunday and joke about it, but it stings.

We want VibeMeals to:

- Make it easy to say **"we're eating out tonight"**.

- Automatically **rescue or adjust** the affected meal so ingredients don't just
  rot.

- Do this **without** making them feel like they "broke" the plan.

#### Scenario: One-Tap "We're Eating Out" and Smart Reschedule

**Given** Jake & Maya have planned a week in VibeMeals **And** the plan includes
a fresh ingredient dinner on Wednesday (e.g., "Sheet-pan chicken & veg") **And**
they have already shopped for that plan (so raw chicken + veg are in the fridge)

**When** it's Wednesday afternoon **And** they decide to go out with friends
instead of cooking **And** one of them opens VibeMeals and marks tonight as
**"We're eating out"** (or equivalent action)

**Then** the app should immediately:

- Acknowledge this as a **normal, supported choice**, not a failure:

  - e.g., "Got it, enjoy your night out 🙌"

- Offer to **reschedule or adjust** the planned meal, with simple options, such
  as:

  - "Move sheet-pan chicken to tomorrow (Thu)"

  - "Move it to the weekend"

  - "Replace it with a freezer/pantry-friendly backup later this week"

**And Then** upon choosing an option (e.g., move to Thu):

- The **dinner plan for Thu** is automatically updated:

  - Wednesday's sheet-pan meal moves to Thu's slot.

- Any existing Thu meal (if there was one) is:

  - moved to a nearby day, or

  - offered as "Would you like to skip or shift this?" in one extra, clear step.

**And Then** the app should **update internal freshness expectations** for the
chicken and veg:

- Mark them as "still likely safe" for the new day (e.g., Thu), but closer to
  their freshness limit.

- If the new day is pushing a borderline window (e.g., 4–5 days after purchase),
  the app should:

  - Prefer **sooner reschedules**

  - Or offer an alternative: "If that feels too late for fresh chicken, we can
    swap this to a freezer-based meal."

---

#### Scenario: Late-Week Reminder Before Food Spoils

**Given** Jake & Maya have moved Wednesday's sheet-pan chicken to Thursday via
the above flow **And** they **still haven't cooked it** by the time Friday or
Saturday rolls around **And** the system's "freshness window" for raw chicken is
nearing its limit

**When** they open VibeMeals late in the week (or receive a timely nudge)

**Then** the app should:

- Surface a small, calm reminder, not an alarm:

  - "You still have chicken and veggies from earlier this week. Want to cook or
    freeze them before they go bad?"

- Offer **two or more clear options**:

  - "Cook them tonight with an ultra-simple version"

  - "Move them to the freezer and swap in a pantry-based meal"

  - "Skip this meal and we'll keep it in mind for next week's plan (if frozen)"

**And Then** whichever option they choose:

- Should adjust the plan **without requiring manual cleanup**:

  - Mark the sheet-pan meal as cooked, skipped, or frozen.

  - Update future planning to:

    - Favor using the frozen chicken soon, if they froze it.

    - Or reduce reliance on fresh-chicken-heavy meals if they repeatedly skip
      them.

**And Then** the copy must remain **non-judgmental**:

- No "You wasted food" or "You failed to cook as planned."

- Only "Want to use this up?" and "Here are your choices."

---

#### Story 4: Ellen & Mark – Gentle Variety Without 10 New Ingredients  *(Tags: [G2, G5, G6])*

**Story:** They get light variety layered on their groove without stocking a new
pantry or learning fancy techniques.

#### Context / Goal

Ellen & Mark are empty nesters with a tight 5-meal rotation (spaghetti, grilled
chicken, chili, breakfast-for-dinner, frozen pizza). They want small twists, not
a reinvention. They dislike buying one-off spices or tools they'll never use
again.

#### Scenario: Small Plan, Familiar Patterns, Minimal New Stuff

**Given** Ellen & Mark set up VibeMeals as a 2-person household **And** they
prefer 3 dinners/week with light variety **And** they have a known base rotation
captured in the app

**When** they ask VibeMeals for this week's plan

**Then** the planner should:

- Propose ~3 dinners that reuse their base patterns (e.g., pasta, grilled
  chicken, chili) with small twists

- Limit "new" ingredients to 0–2 low-cost, easy-to-find items (e.g., one herb
  blend, one veg)

- Flag novelty as **optional** (e.g., "new rub" can be skipped without breaking
  the meal)

- Avoid assigning techniques that require new tools or skills

---

#### Scenario: Shopping List Stays Familiar

**Given** they've accepted the plan **And** VibeMeals builds the list

**Then** the list should:

- Heavily reuse pantry staples they likely already buy (oil, garlic, onion,
  basic herbs)

- Group "new this week" items clearly and keep that group short

- Offer Quick Review that defaults to **keeping** staples on the list (safety
  first) but lets them uncheck if they know they have them

- Avoid one-off specialty items unless explicitly requested

---

#### Scenario: Cooking Night Feels Familiar, Not a Re-Learn

**Given** it's the "twist" night (e.g., grilled chicken with a new herb rub)
**And** they start Cooking Mode

**Then** the steps should:

- Mirror their usual pattern (season → sear/roast → rest) with a small variation

- Avoid introducing new gadgets or multi-pot complexity

- Finish in a predictable time band (their usual for that dish type)

---

#### Scenario: End-of-Week Reflection Without Admin

**Given** they finish the week

**When** VibeMeals prompts for feedback (optional)

**Then** it should:

- Offer one-tap "Keep in rotation" / "Not for us" for the new twist

- If kept, treat it as a variant of their base (not a whole new category)

- If rejected, bias future weeks to other gentle twists, not to more novelty

---
