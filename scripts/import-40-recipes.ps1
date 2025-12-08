# Import all 40 MVP recipes
# Run from project root: .\scripts\import-40-recipes.ps1

$urls = @(
    # FAST (≤30 min) – Chaos Night Heroes (16)
    "https://www.budgetbytes.com/sheet-pan-chicken-fajitas/",
    "https://www.budgetbytes.com/one-pot-creamy-mushroom-pasta/",
    "https://www.budgetbytes.com/easy-fried-rice/",
    "https://www.budgetbytes.com/pantry-pasta/",
    "https://www.budgetbytes.com/ground-beef-tacos/",
    "https://www.budgetbytes.com/quesadillas/",
    "https://www.budgetbytes.com/sheet-pan-sausage-and-veggies/",
    "https://www.budgetbytes.com/one-pot-beef-and-cabbage-stir-fry/",
    "https://www.budgetbytes.com/15-minute-vegetable-lo-mein/",
    "https://www.budgetbytes.com/weeknight-black-bean-tacos/",
    "https://minimalistbaker.com/easy-pizza-dough/",
    "https://www.seriouseats.com/spaghetti-aglio-olio-recipe",
    "https://www.budgetbytes.com/one-pot-chili-mac/",
    "https://www.budgetbytes.com/creamy-tomato-garlic-pasta/",
    "https://www.budgetbytes.com/sheet-pan-greek-chicken-and-veggies/",
    "https://www.budgetbytes.com/vegetable-fried-rice/",
    
    # NORMAL (30–60 min) – Weeknight Winners (16)
    "https://www.budgetbytes.com/baked-chicken-drumsticks/",
    "https://www.budgetbytes.com/one-pot-beef-and-mushroom-stroganoff/",
    "https://www.budgetbytes.com/creamy-tomato-and-spinach-pasta/",
    "https://www.budgetbytes.com/baked-ziti/",
    "https://www.budgetbytes.com/one-pot-cheeseburger-pasta/",
    "https://www.budgetbytes.com/slow-cooker-white-chicken-chili/",
    "https://www.budgetbytes.com/oven-roasted-chicken-shawarma/",
    "https://www.budgetbytes.com/one-pot-creamy-cajun-chicken-pasta/",
    "https://www.budgetbytes.com/sheet-pan-kielbasa-potatoes-and-veggies/",
    "https://www.budgetbytes.com/one-pot-teriyaki-chicken-and-rice/",
    "https://www.budgetbytes.com/baked-mac-and-cheese/",
    "https://www.budgetbytes.com/one-pot-beef-barley-soup/",
    "https://minimalistbaker.com/cauliflower-tacos-with-cashew-crema/",
    "https://www.seriouseats.com/best-black-bean-burger-recipe",
    "https://www.budgetbytes.com/one-pan-salmon-and-asparagus/",
    "https://www.budgetbytes.com/sheet-pan-balsamic-chicken-and-veggies/",
    
    # PROJECT (>60 min) – Weekend / Batch / Preflight (8)
    "https://www.budgetbytes.com/slow-cooker-chili/",
    "https://www.budgetbytes.com/slow-cooker-pulled-pork/",
    "https://www.budgetbytes.com/homemade-meat-sauce/",
    "https://www.budgetbytes.com/slow-cooker-bolognese-sauce/",
    "https://www.budgetbytes.com/lasagna-soup/",
    "https://www.budgetbytes.com/slow-cooker-bbq-ribs/",
    "https://www.budgetbytes.com/overnight-oats-6-ways/",
    "https://www.budgetbytes.com/big-batch-beef-and-bean-chili/"
)

Write-Host "🚀 Starting import of 40 MVP recipes..." -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

$successCount = 0
$failureCount = 0
$failed = @()

for ($i = 0; $i -lt $urls.Count; $i++) {
    $url = $urls[$i]
    $num = $i + 1
    Write-Host "[$num/40] Importing: $url" -ForegroundColor Cyan
    
    try {
        npm run import:url -- $url 2>&1 | Out-Null
        $successCount++
        Write-Host "     ✅ Success" -ForegroundColor Green
    } catch {
        $failureCount++
        $failed += $url
        Write-Host "     ❌ Failed: $_" -ForegroundColor Red
    }
    
    # Small delay to avoid rate limiting
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "📊 Import Summary" -ForegroundColor Cyan
Write-Host "✅ Successful: $successCount / 40" -ForegroundColor Green
Write-Host "❌ Failed: $failureCount / 40" -ForegroundColor $(if ($failureCount -gt 0) { "Red" } else { "Green" })

if ($failureCount -gt 0) {
    Write-Host ""
    Write-Host "Failed URLs:" -ForegroundColor Yellow
    $failed | ForEach-Object { Write-Host "  - $_" }
}

Write-Host ""
Write-Host "Next: Check recipes in src/domain/recipes/" -ForegroundColor Cyan
Write-Host "Then: Update fixtures/recipes.seed.ts with all imports" -ForegroundColor Cyan
