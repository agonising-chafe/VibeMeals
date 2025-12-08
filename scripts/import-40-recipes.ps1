# Import all 40 MVP recipes with resilience features
# Run from project root: .\scripts\import-40-recipes.ps1
# Resume interrupted runs: .\scripts\import-40-recipes.ps1 -Resume

param(
    [switch]$Resume = $false,
    [string]$CheckpointFile = "import-checkpoint.json"
)

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

# ============================================================================
# Checkpoint Management
# ============================================================================

function LoadCheckpoint {
    if ((Test-Path $CheckpointFile) -and $Resume) {
        $checkpoint = Get-Content $CheckpointFile | ConvertFrom-Json
        Write-Host "[*] Resuming from checkpoint..." -ForegroundColor Yellow
        return $checkpoint
    }
    return @{ processed = @(); successful = @(); failed = @() }
}

function SaveCheckpoint {
    param($checkpoint)
    $checkpoint | ConvertTo-Json | Set-Content $CheckpointFile
}

function UpdateCheckpoint {
    param($checkpoint, $url, $success, $importError)
    $checkpoint.processed += $url
    if ($success) {
        $checkpoint.successful += $url
    } else {
        $checkpoint.failed += @{ url = $url; error = $importError; timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss") }
    }
}

# ============================================================================
# Import with Retry Logic
# ============================================================================

function ImportRecipeWithRetry {
    param(
        [string]$url,
        [int]$retryCount = 3,
        [int]$initialDelayMs = 1000
    )
    
    for ($attempt = 1; $attempt -le $retryCount; $attempt++) {
        try {
            $output = npm run import:url -- $url 2>&1
            return @{ success = $true; output = $output; error = $null }
        } catch {
            $importError = $_.Exception.Message
            
            # Detect rate limiting and bail early
            if ($importError -match "(429|rate)" -or $output -match "(429|rate)") {
                return @{ success = $false; output = $output; error = "Rate limited (HTTP 429)" }
            }
            
            # Detect non-recoverable errors
            if ($importError -match "(404|not found|invalid|malformed)") {
                return @{ success = $false; output = $output; error = $importError }
            }
            
            # Log retry attempt
            if ($attempt -lt $retryCount) {
                $delayMs = $initialDelayMs * [Math]::Pow(2, $attempt - 1)
                Write-Host "     [RETRY] Attempt $attempt failed, retrying in ${delayMs}ms..." -ForegroundColor Yellow
                Start-Sleep -Milliseconds $delayMs
            }
        }
    }
    
    return @{ success = $false; output = $null; error = "Failed after $retryCount attempts" }
}

# ============================================================================
# Main Import Loop
# ============================================================================

Write-Host "[*] Batch Recipe Importer (v2 - Resilient)" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Gray

$checkpoint = LoadCheckpoint
$startIndex = $checkpoint.processed.Count
$successCount = $checkpoint.successful.Count
$failureCount = $checkpoint.failed.Count

if ($Resume -and $startIndex -gt 0) {
    Write-Host "Resuming from index $startIndex ($successCount successful, $failureCount failed so far)" -ForegroundColor Cyan
}

Write-Host ""

for ($i = $startIndex; $i -lt $urls.Count; $i++) {
    $url = $urls[$i]
    $num = $i + 1
    Write-Host "[$num/40] Importing: $url" -ForegroundColor Cyan
    
    $result = ImportRecipeWithRetry -url $url
    
    if ($result.success) {
        $successCount++
        UpdateCheckpoint $checkpoint $url $true $null
        Write-Host "     [OK] Success" -ForegroundColor Green
    } else {
        $failureCount++
        $errorMsg = if ($result.error) { $result.error } else { "Unknown error" }
        UpdateCheckpoint $checkpoint $url $false $errorMsg
        Write-Host "     [FAIL] Failed: $errorMsg" -ForegroundColor Red
    }
    
    # Save checkpoint after each import
    SaveCheckpoint $checkpoint
    
    # Adaptive delay: longer pause if we're hitting rate limits
    if ($result.error -match "429|rate") {
        Write-Host "     [WAIT] Rate limit detected, pausing 30 seconds..." -ForegroundColor Yellow
        Start-Sleep -Seconds 30
    } else {
        Start-Sleep -Milliseconds 800
    }
}

# ============================================================================
# Final Report
# ============================================================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Gray
Write-Host "[*] Import Summary" -ForegroundColor Cyan
Write-Host "[OK] Successful: $successCount / 40" -ForegroundColor Green
Write-Host "[FAIL] Failed: $failureCount / 40" -ForegroundColor $(if ($failureCount -gt 0) { "Red" } else { "Green" })
Write-Host "[STAT] Success Rate: $([Math]::Round(($successCount / 40) * 100))%" -ForegroundColor Cyan

if ($failureCount -gt 0) {
    Write-Host ""
    Write-Host "Failed Recipes:" -ForegroundColor Yellow
    $checkpoint.failed | ForEach-Object { 
        Write-Host "  [$($_.timestamp)] $($_.url)" -ForegroundColor Red
        Write-Host "       Error: $($_.error)" -ForegroundColor DarkRed
    }
    
    # Export failures to CSV for analysis
    $csvPath = "import-failures.csv"
    $checkpoint.failed | ConvertTo-Csv -NoTypeInformation | Set-Content $csvPath
    Write-Host ""
    Write-Host "[*] Failure report exported to: $csvPath" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[*] Checkpoint file: $CheckpointFile (safe to delete after successful run)" -ForegroundColor Gray
Write-Host "[*] Next: Review generated recipes in src/domain/recipes/" -ForegroundColor Cyan
Write-Host "[*] Then: Update fixtures/recipes.seed.ts with all imports" -ForegroundColor Cyan
