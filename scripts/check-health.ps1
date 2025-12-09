#!/usr/bin/env pwsh
# scripts/check-health.ps1
# Runs the small suite of checks we use to detect drift: types sync, unit tests, and pragmatic markdown lint.

$ErrorActionPreference = 'Stop'

Write-Host "Starting VibeMeals health check..."

Write-Host "\n1) Type sync validation"
try {
  pwsh -Command "npm run validate:types";
  Write-Host "-> types sync: OK" -ForegroundColor Green
} catch {
  Write-Host "-> types sync: FAILED" -ForegroundColor Red
  throw
}

Write-Host "\n2) Unit tests"
try {
  pwsh -Command "npm test";
  Write-Host "-> tests: OK" -ForegroundColor Green
} catch {
  Write-Host "-> tests: FAILED" -ForegroundColor Red
  throw
}

Write-Host "\n3) Pragmatic markdown lint"
try {
  pwsh -Command "npm run lint:md";
  Write-Host "-> markdown lint (pragmatic): OK" -ForegroundColor Green
} catch {
  Write-Host "-> markdown lint (pragmatic): FAILED" -ForegroundColor Yellow
  # Don't throw here: lint failures aren't drift in types/tests sense
}

Write-Host "\nHealth check complete." -ForegroundColor Cyan
