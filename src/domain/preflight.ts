// Spec: spec-today.md §3.2 (Preflight detection logic), vision.md §4.2
// src/domain/preflight.ts
//
// Detects preflight requirements for recipes based on recipe metadata and current time.
// Calculates if requirements have been met or if they'll be missed.

import {
  Recipe,
  RecipePreflightRequirement,
  PreflightStatus,
  IsoDate,
} from './types';

/**
 * Calculate hours remaining until cooking starts
 * Assumes cooking happens at 6 PM (18:00) on the given date
 *
 * @param cookDate - ISO date of the meal (e.g., '2025-01-13')
 * @param now - Current timestamp (for testing)
 * @returns Hours remaining until 6 PM on that date, or negative if past
 */
export function hoursUntilCook(cookDate: IsoDate, now: Date = new Date()): number {
  const [year, month, day] = cookDate.split('-').map(Number);
  const cookTime = new Date(year, month - 1, day, 18, 0, 0); // 6 PM
  const msRemaining = cookTime.getTime() - now.getTime();
  const hoursRemaining = msRemaining / (1000 * 60 * 60);
  return hoursRemaining;
}

/**
 * Check if a single preflight requirement has been met
 * This is a heuristic that assumes:
 * - SLOW_COOK requirements are met if prep started before required hours
 * - MARINATE requirements are met if enough time has passed
 * - THAW requirements are met if enough time has passed (assume 24h per LB)
 * - LONG_PREP is assumed met if started early morning
 *
 * @param requirement - The preflight requirement
 * @param cookDate - ISO date when meal will be cooked
 * @param now - Current timestamp
 * @returns true if requirement is considered met, false otherwise
 */
function checkRequirementMet(
  requirement: RecipePreflightRequirement,
  cookDate: IsoDate,
  now: Date = new Date(),
): boolean {
  const hoursRemaining = hoursUntilCook(cookDate, now);

  switch (requirement.type) {
    case 'SLOW_COOK': {
      // SLOW_COOK met if still have required hours (or within 1 hour margin)
      const hoursRequired = requirement.hoursBeforeCook ?? requirement.hoursBefore ?? 4;
      return hoursRemaining > hoursRequired - 1;
    }

    case 'MARINATE': {
      // MARINATE met if still have required hours
      const hoursRequired = requirement.hoursBeforeCook ?? requirement.hoursBefore ?? 2;
      return hoursRemaining > hoursRequired - 1;
    }

    case 'THAW': {
      // THAW met if still have required hours (assume 24 hours per LB)
      // Most frozen proteins are 0.5-2 LB, so assume 24-48 hours needed
      const hoursRequired = requirement.hoursBeforeCook ?? requirement.hoursBefore ?? 24;
      return hoursRemaining > hoursRequired - 1;
    }

    case 'LONG_PREP': {
      // LONG_PREP met if it's before 10 AM (3 hours to prep before cook)
      const isEarlyMorning = now.getHours() < 10;
      return isEarlyMorning || hoursRemaining > 3;
    }

    default: {
      // Backward compatibility: treat legacy CHILL/SOAK/FREEZE as LONG_PREP-style
      const legacyType = (requirement.type as string | undefined)?.toUpperCase();
      if (legacyType === 'CHILL' || legacyType === 'SOAK' || legacyType === 'FREEZE') {
        const hoursRequired = requirement.hoursBeforeCook ?? requirement.hoursBefore ?? 4;
        return hoursRemaining > hoursRequired - 1;
      }
      return true; // Unknown types assumed OK
    }
  }
}

/**
 * Detect preflight status for a recipe on a given date
 * Returns whether preflight requirements are met, all good, or have been missed
 *
 * @param recipe - Recipe to check
 * @param cookDate - ISO date when meal will be cooked
 * @param now - Current timestamp
 * @returns PreflightStatus indicating requirement status
 */
export function detectPreflightStatus(
  recipe: Recipe,
  cookDate: IsoDate,
  now: Date = new Date(),
): PreflightStatus {
  // No requirements = no preflight needed
  if (!recipe.preflight || recipe.preflight.length === 0) {
    return 'NONE_REQUIRED';
  }

  const hoursRemaining = hoursUntilCook(cookDate, now);

  // If past cook time, all preflight is missed
  if (hoursRemaining < 0) {
    return 'MISSED';
  }

  // Check each requirement
  const requirementStatuses = recipe.preflight.map(req => {
    const isMet = checkRequirementMet(req, cookDate, now);
    return { requirement: req, met: isMet };
  });

  // If any requirement is not met, status is MISSED
  const anyMissed = requirementStatuses.some(rs => !rs.met);
  if (anyMissed) {
    return 'MISSED';
  }

  // All requirements are still achievable
  return 'ALL_GOOD';
}

/**
 * Get a human-friendly description of preflight requirements
 * Useful for UI display and user guidance
 *
 * @param recipe - Recipe to describe
 * @returns Array of requirement descriptions
 */
export function describePreflightRequirements(recipe: Recipe): string[] {
  if (!recipe.preflight || recipe.preflight.length === 0) {
    return [];
  }

  return recipe.preflight.map(req => {
    switch (req.type) {
      case 'SLOW_COOK':
        return (
          `🍲 Slow cook for ${req.hoursBeforeCook || 4}+ hours ` +
          `(start by ${new Date(Date.now() + (req.hoursBeforeCook || 4) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
        );

      case 'MARINATE':
        return (
          `🥢 Marinate for ${req.hoursBeforeCook || 2}+ hours ` +
          `(start by ${new Date(Date.now() + (req.hoursBeforeCook || 2) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
        );

      case 'THAW':
        return (
          `❄️  Thaw for ${req.hoursBeforeCook || 24}+ hours ` +
          `(start by ${new Date(Date.now() + (req.hoursBeforeCook || 24) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
        );

      case 'LONG_PREP':
        return `⏰ Start preparation by 10 AM`;

      default:
        return req.description || `Requires ${req.type}`;
    }
  });
}

/**
 * Get preflight requirements that are at risk of being missed
 * Useful for alerts and notifications
 *
 * @param recipe - Recipe to check
 * @param cookDate - ISO date when meal will be cooked
 * @param hoursWarningThreshold - Hours before deadline to show warning (default 2)
 * @returns Array of requirements at risk
 */
export function getAtRiskRequirements(
  recipe: Recipe,
  cookDate: IsoDate,
  hoursWarningThreshold: number = 2,
  now: Date = new Date(),
): RecipePreflightRequirement[] {
  if (!recipe.preflight || recipe.preflight.length === 0) {
    return [];
  }

  const hoursRemaining = hoursUntilCook(cookDate, now);

  return recipe.preflight.filter(req => {
    const hoursRequired = req.hoursBeforeCook ?? req.hoursBefore ?? 2;
    const isAtRisk = hoursRemaining < hoursRequired + hoursWarningThreshold;
    return isAtRisk && hoursRemaining > 0; // Not already missed
  });
}

/**
 * Summary of preflight readiness across multiple recipes
 *
 * @param recipes - Recipes to summarize
 * @param cookDate - ISO date for cook day
 * @param now - Current timestamp
 * @returns Object with counts of requirements by status
 */
export interface PreflightSummary {
  totalRecipes: number;
  recipesWithPreflight: number;
  requirementsReady: number;
  requirementsAtRisk: number;
  requirementsMissed: number;
}

export function summarizePreflightStatus(
  recipes: Recipe[],
  cookDate: IsoDate,
  now: Date = new Date(),
): PreflightSummary {
  let requirementsReady = 0;
  let requirementsAtRisk = 0;
  let requirementsMissed = 0;
  let recipesWithPreflight = 0;

  recipes.forEach(recipe => {
    if (!recipe.preflight || recipe.preflight.length === 0) return;

    recipesWithPreflight++;

    recipe.preflight.forEach(req => {
      const status = detectPreflightStatus(recipe, cookDate, now);

      if (status === 'MISSED') {
        requirementsMissed++;
      } else if (status === 'ALL_GOOD') {
        const atRisk = getAtRiskRequirements(recipe, cookDate, 2, now);
        if (atRisk.some(r => r.type === req.type)) {
          requirementsAtRisk++;
        } else {
          requirementsReady++;
        }
      }
    });
  });

  return {
    totalRecipes: recipes.length,
    recipesWithPreflight,
    requirementsReady,
    requirementsAtRisk,
    requirementsMissed,
  };
}
