/**
 * Spoonacular to VibeMeals Recipe Mapper
 *
 * Converts Spoonacular extract API responses into VibeMeals Recipe objects
 * with intelligent heuristics for criticality, preflight, and metadata.
 */
// ============================================================================
// Utility Functions
// ============================================================================
// HTML entity decoder
function decodeHtmlEntities(text) {
    return text
        .replace(/&#039;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ');
}
// ============================================================================
// Mapper Function
// ============================================================================
export function mapSpoonacularToVibeMeals(data) {
    // Extract ingredients
    const ingredients = (data.extendedIngredients || []).map(ing => mapIngredient(ing, data.title));
    // Extract steps
    const steps = extractSteps(data);
    // Calculate time
    const estimatedMinutes = Math.ceil((data.readyInMinutes || 45) * 1.25);
    const timeBand = classifyTimeBand(estimatedMinutes);
    // Detect preflight requirements
    const preflight = detectPreflight(data, ingredients);
    // Extract tags
    const tags = extractTags(data, timeBand, preflight);
    // Equipment detection
    const equipmentTags = detectEquipment(data, steps);
    // Determine leftover strategy based on servings
    const servings = data.servings || 4;
    let leftoverStrategy = 'NONE';
    if (servings >= 10) {
        leftoverStrategy = 'COOK_ONCE_EAT_TWICE';
    }
    else if (servings >= 8) {
        leftoverStrategy = 'EXPECTED';
    }
    return {
        id: generateRecipeId(data.title),
        name: data.title,
        slug: slugify(data.title),
        metadata: {
            timeBand,
            estimatedMinutes,
            equipmentTags,
            leftoverStrategy,
        },
        ingredients,
        preflight,
        steps,
        tags,
    };
}
// ============================================================================
// Ingredient Mapping
// ============================================================================
function mapIngredient(ing, recipeName) {
    const displayName = ing.name;
    const amount = ing.amount || 1;
    const unit = normalizeUnit(ing.unit);
    return {
        ingredientId: generateIngredientId(displayName),
        displayName,
        amount,
        unit,
        criticality: inferCriticality(displayName, recipeName),
        kind: inferKind(displayName),
        shoppingCategory: inferShoppingCategory(displayName, ing.aisle),
    };
}
function normalizeUnit(unit) {
    if (!unit)
        return 'UNIT';
    const normalized = unit.toLowerCase().trim();
    const unitMap = {
        'lb': 'LB', 'lbs': 'LB', 'pound': 'LB', 'pounds': 'LB',
        'oz': 'OZ', 'ounce': 'OZ', 'ounces': 'OZ',
        'kg': 'KG', 'kilogram': 'KG', 'kilograms': 'KG',
        'g': 'GRAM', 'gram': 'GRAM', 'grams': 'GRAM',
        'cup': 'CUP', 'cups': 'CUP', 'c': 'CUP',
        'tablespoon': 'TBSP', 'tablespoons': 'TBSP', 'tbsp': 'TBSP', 'tbs': 'TBSP',
        'teaspoon': 'TSP', 'teaspoons': 'TSP', 'tsp': 'TSP',
        'ml': 'ML', 'milliliter': 'ML', 'milliliters': 'ML',
    };
    return unitMap[normalized] || 'UNIT';
}
function inferCriticality(displayName, recipeName) {
    const lower = displayName.toLowerCase();
    const recipeLower = recipeName.toLowerCase();
    // NON_CRITICAL: aromatics (unless in recipe name)
    if (lower.match(/^(garlic|onion|shallot|ginger)$/) && !recipeLower.includes(lower)) {
        return 'NON_CRITICAL';
    }
    // NON_CRITICAL: fats and oils
    if (lower.match(/oil|butter|lard|shortening|ghee/)) {
        return 'NON_CRITICAL';
    }
    // NON_CRITICAL: spices and seasonings
    if (lower.match(/salt|pepper|paprika|cumin|oregano|basil|thyme|bay|chili powder|cayenne|cinnamon/)) {
        return 'NON_CRITICAL';
    }
    // NON_CRITICAL: condiments and flavor enhancers
    if (lower.match(/worcestershire|soy sauce|fish sauce|hot sauce|mustard|vinegar|lemon|lime/)) {
        return 'NON_CRITICAL';
    }
    // NON_CRITICAL: garnishes (herbs used for finishing/topping)
    if (lower.match(/^(parsley|cilantro|green onion|chive|scallion|dill|mint)$/)) {
        return 'NON_CRITICAL';
    }
    // CRITICAL: main proteins
    if (lower.match(/chicken|beef|pork|fish|salmon|shrimp|tofu|beans|lentils|turkey|lamb/)) {
        return 'CRITICAL';
    }
    // CRITICAL: main carbs
    if (lower.match(/pasta|rice|noodle|tortilla|bread|potato|quinoa/)) {
        return 'CRITICAL';
    }
    // CRITICAL: primary vegetables (in recipe name or significant quantity)
    if (lower.match(/mushroom|broccoli|spinach|kale|cauliflower|zucchini|eggplant|squash|bell pepper/)) {
        return 'CRITICAL';
    }
    // CRITICAL: dairy that defines the dish
    if (lower.match(/cheese|cream|sour cream|yogurt|milk/) && recipeLower.match(/creamy|cheese|alfredo/)) {
        return 'CRITICAL';
    }
    // Default to CRITICAL for safety (better to over-flag than miss critical items)
    return 'CRITICAL';
}
function inferKind(displayName) {
    const lower = displayName.toLowerCase();
    if (lower.match(/chicken|beef|pork|fish|salmon|shrimp|tofu|beans|lentils|turkey|lamb|sausage/)) {
        return 'PROTEIN';
    }
    if (lower.match(/pasta|rice|noodle|tortilla|bread|potato|quinoa/)) {
        return 'CARB';
    }
    if (lower.match(/broccoli|carrot|spinach|lettuce|tomato|pepper|onion|zucchini|kale|mushroom|cauliflower/)) {
        return 'VEG';
    }
    if (lower.match(/cheese|milk|cream|yogurt|butter/)) {
        return 'DAIRY';
    }
    if (lower.match(/oil|lard|shortening|ghee/)) {
        return 'FAT_OIL';
    }
    if (lower.match(/salt|pepper|paprika|cumin|oregano|basil|thyme|chili powder|cinnamon|garlic powder/)) {
        return 'SPICE';
    }
    if (lower.match(/sauce|ketchup|mayo|mustard|salsa|worcestershire|soy sauce/)) {
        return 'CONDIMENT';
    }
    return 'OTHER';
}
function inferShoppingCategory(displayName, aisle) {
    const lower = displayName.toLowerCase();
    // Use Spoonacular aisle if available
    if (aisle) {
        const aisleLower = aisle.toLowerCase();
        if (aisleLower.includes('meat') || aisleLower.includes('seafood'))
            return 'MEAT_SEAFOOD';
        if (aisleLower.includes('produce'))
            return 'PRODUCE';
        if (aisleLower.includes('dairy') || aisleLower.includes('egg'))
            return 'DAIRY_EGGS';
        if (aisleLower.includes('frozen'))
            return 'FROZEN';
        if (aisleLower.includes('pantry') || aisleLower.includes('baking') || aisleLower.includes('spice')) {
            return 'PANTRY_DRY';
        }
    }
    // Fallback to name-based detection
    if (lower.match(/chicken|beef|pork|fish|salmon|shrimp|turkey|lamb/)) {
        return 'MEAT_SEAFOOD';
    }
    if (lower.match(/broccoli|carrot|spinach|lettuce|tomato|pepper|onion|zucchini|mushroom|garlic/)) {
        return 'PRODUCE';
    }
    if (lower.match(/cheese|milk|cream|yogurt|butter|egg/)) {
        return 'DAIRY_EGGS';
    }
    if (lower.match(/frozen/)) {
        return 'FROZEN';
    }
    if (lower.match(/pasta|rice|flour|sugar|oil|sauce|spice|salt|pepper|bean|lentil/)) {
        return 'PANTRY_DRY';
    }
    return 'OTHER';
}
// ============================================================================
// Steps Extraction
// ============================================================================
function extractSteps(data) {
    const steps = [];
    // Merge all instruction blocks (handles parallel steps)
    if (data.analyzedInstructions && data.analyzedInstructions.length > 0) {
        let stepCounter = 1;
        data.analyzedInstructions.forEach(instructionBlock => {
            // Add block name as a step if it exists (e.g., "Meanwhile, prep the stir-fry")
            if (instructionBlock.name && instructionBlock.name.trim()) {
                steps.push({
                    stepNumber: stepCounter++,
                    instruction: instructionBlock.name,
                });
            }
            instructionBlock.steps.forEach(step => {
                steps.push({
                    stepNumber: stepCounter++,
                    instruction: decodeHtmlEntities(step.step),
                });
            });
        });
        return steps;
    }
    // Fallback to instructions string
    if (data.instructions) {
        const instructionLines = Array.isArray(data.instructions)
            ? data.instructions
            : data.instructions.split(/\n+/).filter(Boolean);
        instructionLines.forEach((line, i) => {
            const cleaned = line.trim().replace(/^\d+\.\s*/, '');
            if (cleaned.length > 10) {
                steps.push({
                    stepNumber: i + 1,
                    instruction: decodeHtmlEntities(cleaned),
                });
            }
        });
    }
    return steps;
}
// ============================================================================
// Preflight Detection
// ============================================================================
function detectPreflight(data, ingredients) {
    const preflight = [];
    const allText = [
        data.title,
        data.summary || '',
        ...extractSteps(data).map(s => s.instruction),
    ].join(' ').toLowerCase();
    // Detect MARINATE
    if (allText.match(/marinate|marinade/)) {
        const hours = allText.match(/(\d+)\s*(hour|hr)/)?.[1];
        const minutes = allText.match(/(\d+)\s*(minute|min)/)?.[1];
        const defaultHours = hours ? parseInt(hours) : minutes ? Math.ceil(parseInt(minutes) / 60) : 2;
        preflight.push({
            type: 'MARINATE',
            description: `Marinate for at least ${defaultHours} hour${defaultHours > 1 ? 's' : ''} (or overnight for best results)`,
            hoursBeforeCook: defaultHours,
        });
    }
    // Detect SLOW_COOK
    if (allText.match(/slow cooker|crockpot|crock pot/)) {
        const hours = allText.match(/(\d+)-?(\d+)?\s*hour/)?.[1];
        const defaultHours = hours ? parseInt(hours) : 6;
        preflight.push({
            type: 'SLOW_COOK',
            description: `Prepare in morning for slow cooker (${defaultHours}+ hours cook time)`,
            hoursBeforeCook: defaultHours,
        });
    }
    // Detect LONG_PREP (rising, resting, overnight)
    if (allText.match(/rise|rising|proof|proofing|rest.*overnight|refrigerate.*overnight|\d+[–-]\d+\s*hour/)) {
        const hourMatch = allText.match(/(\d+)[–-](\d+)\s*hour/);
        const minHours = hourMatch ? parseInt(hourMatch[1]) : 8;
        preflight.push({
            type: 'LONG_PREP',
            description: `Allow ${minHours}+ hours for rising/resting (or prepare night before)`,
            hoursBeforeCook: minHours,
        });
    }
    // Detect THAW
    const hasFrozenProtein = ingredients.some(ing => ing.displayName.toLowerCase().match(/frozen.*(?:chicken|beef|fish|shrimp)/));
    if (hasFrozenProtein || allText.match(/thaw|defrost/)) {
        preflight.push({
            type: 'THAW',
            description: 'Thaw frozen protein in refrigerator overnight',
            hoursBeforeCook: 12,
        });
    }
    return preflight;
}
// ============================================================================
// Tags Extraction
// ============================================================================
function extractTags(data, timeBand, preflight) {
    const tags = [];
    // Cuisine tags
    if (data.cuisines && data.cuisines.length > 0) {
        tags.push(...data.cuisines.map(c => c.toLowerCase().replace(/\s+/g, '_')));
    }
    // Diet tags
    if (data.diets && data.diets.length > 0) {
        tags.push(...data.diets.map(d => d.toLowerCase().replace(/\s+/g, '_')));
    }
    // Format tags
    const title = data.title.toLowerCase();
    const allText = [title, data.summary || ''].join(' ').toLowerCase();
    if (title.match(/one pot|one-pot|one pan/))
        tags.push('one_pot');
    if (title.match(/sheet pan|sheet-pan|baking sheet/))
        tags.push('sheet_pan');
    if (title.match(/slow cooker|crockpot/))
        tags.push('slow_cooker');
    if (title.match(/instant pot|pressure cooker/))
        tags.push('instant_pot');
    if (title.match(/batch|big batch/))
        tags.push('batch_cook');
    // Time-based tags
    if (timeBand === 'FAST')
        tags.push('quick');
    if (preflight.some(p => p.type === 'MARINATE' || p.type === 'SLOW_COOK' || p.type === 'LONG_PREP')) {
        tags.push('make_ahead');
    }
    // Vibe tags
    if (allText.match(/comfort|cozy|hearty/))
        tags.push('comfort_food');
    if (title.match(/easy|simple|quick|weeknight/) || timeBand === 'FAST')
        tags.push('kid_friendly');
    if (title.match(/budget|cheap|frugal/) || data.sourceUrl?.includes('budgetbytes')) {
        tags.push('budget_friendly');
    }
    if (allText.match(/healthy|nutritious|wholesome/))
        tags.push('healthy');
    if (title.match(/meal prep/))
        tags.push('meal_prep');
    // Deduplicate
    return [...new Set(tags)];
}
// ============================================================================
// Equipment Detection
// ============================================================================
function detectEquipment(data, steps) {
    const equipment = [];
    const allText = [data.title, ...steps.map(s => s.instruction)].join(' ').toLowerCase();
    if (allText.match(/dutch oven/))
        equipment.push('DUTCH_OVEN');
    if (allText.match(/sheet pan|baking sheet/))
        equipment.push('SHEET_PAN');
    if (allText.match(/slow cooker|crockpot|crock pot/))
        equipment.push('SLOW_COOKER');
    if (allText.match(/instant pot|pressure cooker/))
        equipment.push('INSTANT_POT');
    if (allText.match(/blender/))
        equipment.push('BLENDER');
    if (allText.match(/food processor/))
        equipment.push('FOOD_PROCESSOR');
    if (allText.match(/grill|grilling/))
        equipment.push('GRILL');
    return [...new Set(equipment)];
}
// ============================================================================
// Utilities
// ============================================================================
function classifyTimeBand(minutes) {
    if (minutes <= 30)
        return 'FAST';
    if (minutes <= 50)
        return 'NORMAL';
    return 'PROJECT';
}
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
function generateRecipeId(name) {
    return `r_${slugify(name)}`;
}
function generateIngredientId(displayName) {
    return `ing_${slugify(displayName)}`;
}
