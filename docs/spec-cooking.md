# Cooking Mode – v1 Specification

**Version:** 1.0.0  
**Status:** Implementation-Ready  
**Wired to:** VibeMeals Vision v4.6.0 (`vision.md`)  
**Golden Tests:** G1, G4, G6  
**Last Updated:** December 7, 2025  

> This spec defines **Cooking Mode**: the step-by-step execution surface that turns a recipe into dinner.  
> Must deliver on time band promises and provide escape hatches when reality changes.

---

## 1. Purpose

Cooking Mode is the **"actually make the thing"** surface.

- Primary job: Guide user through recipe steps clearly enough to hit promised time band (G1).

- Secondary: Surface preflight issues early and provide escape routes (G4).

- Tertiary: Keep steps simple for ADHD/beginner users (G6).

#### Golden tests

- **G1:** Tonight is actually cookable (time band promise must hold)

- **G4:** Plans bend, they don't break (bail-out flows supported)

- **G6:** Respect constraints & ability (steps are beginner-friendly)

---

## 2. Layout (Wireframe-Level)

### 2.1 Header

- Recipe title: `Sheet-Pan Chicken & Veg`

- Time band + estimate: `Fast · ~25 min`

- Progress: `Step 3 of 8`

### 2.2 Current Step Display

Large, centered:

- **Step number:** `3`

- **Instruction text:** (2-3 sentences max)

- "While chicken bakes, chop broccoli into bite-sized florets."

- **Optional inline timing:**

- "This should take ~3 minutes."

- **Optional inline tip:**

- "Pro tip: Florets about 1-2 inches work best for even roasting."

### 2.3 Navigation Controls

Bottom of screen:

- **[← Previous]** (to review prior step)

- **[Next →]** (advance to next step)

- **[Pause / Exit]** (returns to Today with option to resume later)

### 2.4 Optional Parallel Step Indicator

For steps that can run concurrently:

- Small badge: "Meanwhile…" or timer icon

- Example: "While pasta boils (10 min), chop vegetables."

---

## 3. Core Flows

### 3.1 Happy Path (Normal Cooking)

#### Given

- User taps **[Start Cooking]** from Today

- All preflight requirements met

- All ingredients present

#### Flow

1. Cooking Mode opens to Step 1.

1. User reads step, performs action, taps **[Next]**.

1. Repeat for all steps.

1. Final step includes:

- "Plate and serve!"

- **[Done]** button → returns to Today or offers feedback prompt.

#### Time band adherence

- Steps must be written/ordered so that:

- Fast recipes: ~20-30 min total execution

- Normal recipes: ~30-50 min total execution

- Project recipes: >50 min, clearly communicated upfront

#### Guardrails (G1)

- If actual execution routinely exceeds promised time band, recipe must be retagged or steps rewritten.

---

### 3.2 Missed Preflight Discovered Mid-Cook

#### Given

- User starts Cooking Mode

- Step 2 or 3 reveals: "Remove marinated chicken from fridge"

- System knows (or user indicates) preflight was not done

#### Then Cooking Mode must

1. Pause at that step.

1. Show clear message:

- ⚠️ "It looks like the chicken wasn't marinated. This recipe won't work as planned."

1. Offer escape options:

- **[Go back to Today]** → triggers Today's "missed preflight" flow (swap/move/backup).

- **[Try to continue anyway]** (only if safe; otherwise hide this option).

**Tone:** Supportive, not blaming (vision §4.1).

---

### 3.3 "This Is Taking Too Long" Escape

#### Given

- User is mid-cook and realizes they don't have time/energy to finish

#### Then Cooking Mode provides

- **[Pause / Exit]** button always visible.

- On tap:

- "Want to finish this later or switch to something easier?"

- [Resume later] (saves progress, returns to Today)

- [Switch to easier option] → returns to Today's "Too much tonight" flow

#### Guardrails

- Exit must be guilt-free and low-friction (1-2 taps).

- No "Are you sure you want to give up?" shaming copy.

---

### 3.4 Timer/Pacing Cues (v1 Lite)

For steps >5 min:

- Show estimated duration: "Simmer for 15 minutes."

- Optional: Built-in timer widget (or prompt to set phone timer).

For parallel steps:

- Use "Meanwhile…" indicator to show user can multitask.

- Example:

- Step 3: "Put chicken in oven (25 min)."

- Step 4: "Meanwhile, chop vegetables."

#### v1 scope

- Text-based cues are sufficient.

- Full timer integration can be v2.

---

## 4. Design Guardrails (from Vision)

### 4.1 Step Clarity (G6: Beginner-friendly)

- **No walls of text.**

- Max 2-3 sentences per step.

- **No assumed techniques.**

- If a step says "julienne," include a one-line inline tip or link.

- **Clear sequencing.**

- Steps must be numbered and linear (avoid "go back to step 2" loops).

### 4.2 Time Band Promise (G1)

- Steps must be written/ordered to hit promised time band.

- If testing reveals consistent overruns:

- Recipe is retagged (Fast → Normal) or

- Steps are rewritten for efficiency.

### 4.3 Tone (§4.1: Supportive, not bossy)

- ✅ "While the chicken bakes, chop the broccoli."

- ❌ "You should have already prepped the broccoli."

- ✅ "This should take about 3 minutes."

- ❌ "Hurry up and finish this step."

### 4.4 Escape Routes (G4)

- **[Pause / Exit]** always visible.

- No guilt-based copy on exit.

- Easy path back to Today for swaps/reschedules.

---

## 5. Open Questions / v2 Ideas

- Built-in timer with alerts.

- Voice-guided mode (hands-free).

- Multi-dish coordination (e.g., "Start side dish at step 4 of main").

- Inline video clips for complex techniques.

- "How does this look?" photo checkpoints for key steps.

