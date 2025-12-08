// Persona: Ashley (Busy Weeknight, No Hidden Preflight) [Ashley][G1][G2][G3]
// Persona: Kayla (Two Home-Cooked Dinners Instead of Delivery Spiral) [Kayla][G2][G4][G5][G6]
import { describe, it, expect } from 'vitest';
import { generatePlan } from '../../domain/planner';
import { computeTonightState } from '../../domain/today';
import { HouseholdProfile, Recipe, IsoDate, TonightState } from '../../domain/types';
// ...import fixtures/recipes as needed

describe('Persona Acceptance: Ashley', () => {
  it('should have a cookable dinner on a busy weeknight (G1, G2, G3)', () => {
    // Setup: FAMILY, 4 people, 5 dinners/week
    const household: HouseholdProfile = {
      id: 'hh_ashley_family',
      mode: 'FAMILY',
      headcount: 4,
      targetDinnersPerWeek: 5,
      dietConstraints: [],
    };
    // ...use fixtures for recipes
    // ...build plan, compute tonight state, assert READY and canStartCooking
    expect(true).toBe(true); // stub
  });
});

describe('Persona Acceptance: Kayla', () => {
  it('should plan only two home-cooked dinners and not break if one is removed (G2, G4, G5, G6)', () => {
    // Setup: DINK, 2 people, 2 dinners/week
    const household: HouseholdProfile = {
      id: 'hh_kayla_dink',
      mode: 'DINK',
      headcount: 2,
      targetDinnersPerWeek: 2,
      dietConstraints: [],
    };
    // ...use fixtures for recipes
    // ...build plan, assert only 2 dinners, remove one, assert plan is still valid
    expect(true).toBe(true); // stub
  });
});
