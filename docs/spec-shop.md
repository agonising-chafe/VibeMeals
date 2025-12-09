# Shop – v1 Specification

**Version:** 1.0.0  
**Status:** Implementation-Ready  
**Wired to:** VibeMeals Vision v4.6.0 (`vision.md`)  
**Golden Tests:** G2, G3, G5, G6  
**Last Updated:** December 7, 2025  
**v1.0.0 Implementation:** Domain logic only (buildShoppingList in `src/domain/shop.ts`)  
**UI Implementation:** Planned for v1.1+ (Nuxt 3 / Pinia stores)

> This spec defines the **Shop** surface: turning a plan into a trustworthy list/cart,  
> with optional, low-burden optimization for budget and waste.
>
> **Note:** The sections below describe the eventual UI layout and flows. In v1.0.0, the core shopping logic (ingredient consolidation, categorization, criticality marking) is implemented and tested. The UI will be built in v1.1+.

---

## 1. Purpose

Shop is the **bridge between Plan and Store**.

- Primary job: Turn the current week's dinners into a **complete, conservative shopping list** (G3).

- Secondary: Offer a **small, optional Quick Review** to save money and reduce waste (G5).

#### Golden tests

- **G2:** Planning is a 5–10 min check-in (shopping list generation must be fast)

- **G3:** Safe over clever (no missing critical ingredients)

- **G5:** Budget & waste respected (optional optimization)

- **G6:** Respect constraints & ability (list respects dietary/equipment constraints)

---

## 2. Layout (Wireframe-Level)

### 2.1 Header

- Title: `Shop for This Week`

- Summary:

  - `5 dinners · Family of 4`

  - `You'll need ~24 items`

### 2.2 Shopping List

Grouped sections:

- Produce  

- Meat & Seafood  

- Dairy & Eggs  

- Pantry & Dry  

- Frozen

Each row:

- Checkbox

- Ingredient name (normalized)

- Quantity (with units)

- Context (hover/expand):

  - "Used in: Tacos, Chili"

### 2.3 Quick Review (Optional Panel)

Collapsible area:

- "Want to save a few dollars? You might already have these:"

- List of 5–10 **non-critical** items (staples):

  - e.g., oil, salt, common spices, rice, pasta

- For each:

  - Control: [Have it] [Not sure] [Need it]

  - Default: **Need it** (include on list)

### 2.4 Export Controls

- **[Send to Store App]** (for supported retailers)

- **[Download CSV]**

- **[Print / Copy List]**

---

## 3. Core Flows

### 3.1 Base List Generation

#### Given

- Planner has N dinners with recipes and servings set

- Household headcount known

#### Flow

1. System:

- Expands recipes → ingredients with quantities for household size.

- Consolidates duplicates:

  - e.g., `1 onion` + `2 onions` → `3 onions`.

- Maps ingredients to generic product specs:

  - "Chicken breast, boneless skinless (~2 lb)"

1. UI:

- Renders grouped list with quantities and context.

#### Guardrails (G3)

- All **critical ingredients** (proteins, main carbs, main veg, core sauces) must be included by default.

- Pantry brain must **not** auto-remove or downsize critical items based on guesswork.

---

### 3.2 Quick Review (Optional Optimization)

**Goal:** Let users save some money / reduce duplicates with **minimal effort**.

#### Flow

1. User sees an optional prompt:

- "Want to save a bit? Quick Review can remove staples you likely have."

1. On opening:

- Show up to ~5–10 items the system believes are staples or likely remaining:

  - e.g., oil, salt, pepper, basic spices, rice, flour, sugar.

1. For each item:

- Default: "Need it" (keep on list).

- User may choose:

  - "Have it" → remove from list.

  - "Not sure" → keep on list.

1. After Quick Review is closed, list reflects these changes.

#### Guardrails

- Quick Review **must never** surface:

  - Core proteins (chicken, ground beef),

  - Main carbs (pasta, rice for mains),

  - Key veg for main dishes
  as "you probably have this."

- Users can skip Quick Review entirely and still proceed.

---

### 3.3 Export & Store Integration

#### Behavior

- **[Send to Store App]**

  - Best-effort mapping of generic product specs → store SKUs.

  - Creates or updates a store cart / list.

  - User completes purchase within the store app.

- **[Download CSV]**

  - Simple file with columns:

    - Category, Name, Quantity, Unit, Notes/Recipes.

- **[Print / Copy]**

  - Printer-friendly and plain-text versions.

#### System boundaries (from `vision.md` §15)

- VibeMeals does **not**:

  - Guarantee real-time stock.

  - Own substitutions chosen by the store.

  - Handle payments, fees, or delivery schedules.

---

### 3.4 Handling Missing Items / Substitutions (v1 Bridge into Today)

#### Scenario

User completes store shop and later realizes:

- An item was out of stock, or

- A store substitution is materially different (e.g., turkey instead of chicken).

#### v1 Handling (minimal but explicit)

- User can mark an item as **missing** or **subbed** in Shop or Today:

  - "Mark as missing"  

  - "Mark as substituted: [free text or simple dropdown]"

- When an ingredient is marked missing for **tonight's** dinner:

  1. Today enters a **"missing ingredient"** state for that meal (similar to missed preflight):

  - "Looks like we don't have chicken for tonight."

  1. Today offers options:

  - **Swap tonight's dinner** to a recipe that doesn't need the missing item.

  - **Move this dinner** to another day (user can buy missing item later).

  - **Use a safe fallback**, when known:

    - e.g., "Use ground turkey instead of ground beef" (only if we know this is a safe substitution).

- For missing/non-critical items (e.g., garnish):

  - Today can suggest continuing with minor adjustments (e.g., "Skip cilantro; recipe will still work").

#### Guardrails

- We never pretend a missing core ingredient is present.  

- We only suggest substitutions that are known to be safe and sensible.  

- All flows must obey Plan Stability (no changes to other nights without user action).

---

## 4. Design Guardrails (from Vision)

- Default list must be **complete and conservative**:

  - It's okay to slightly overspecify; not okay to miss essentials.

- Quick Review is:

  - Optional,

  - Bounded (small set of items),

  - Focused on staples and low-risk items.

- No heavy budgeting UI in v1:

  - No requirement to enter prices or receipts.

- Tone follows the emotional contract:

  - No shame around cost or waste.

---

## 5. Open Questions / v2 Ideas

- Deeper budget modeling (per-meal cost ranges, weekly budget caps).

- Per-store availability knowledge (e.g., "this store never has X").

- Tracking which staples the user explicitly always stocks (e.g., "never add oil to my list again" toggle).

- Store pickup time slot integration.

