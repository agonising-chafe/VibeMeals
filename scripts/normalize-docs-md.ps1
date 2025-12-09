# Normalize docs markdown: add code-fence language, strip trailing colons, collapse duplicate adjacent headings
# Run from repo root
$ErrorActionPreference = 'Stop'
$files = Get-ChildItem -Path "docs" -Recurse -Filter *.md
foreach ($f in $files) {
  Write-Host "Processing $($f.FullName)"
  $text = Get-Content -Raw -Encoding UTF8 $f.FullName
  $orig = $text

  # 1) Add language 'text' to fences that have no language (handles 3+ backticks)
  $text = [regex]::Replace($text, '(?m)^(?<ticks>`{3,})[ \t]*$', '${ticks}text')

  # 2) Strip trailing colons from headings like '# Heading:' -> '# Heading'
  $text = [regex]::Replace($text, '(?m)^(#{1,6}\s+.+?):\s*$', '$1')

  # 3) Collapse exact adjacent duplicate headings (keep one)
  $text = [regex]::Replace($text, '(?m)^(#{1,6}\s+.+)\r?\n\1(\r?\n?)', '$1$2')

  # 4) Collapse 2+ consecutive blank (or whitespace-only) lines to a single blank line
  $text = [regex]::Replace($text, '(?m)(\r?\n[ \t]*){2,}', "`r`n`r`n")

  # 5) Normalize ordered-list prefixes to use '1.' style (helps MD029 auto-checkers)
  $text = [regex]::Replace($text, '(?m)^(\s*)\d+\.\s+', '${1}1. ')

  if ($text -ne $orig) {
    Set-Content -Path $f.FullName -Value $text -Encoding UTF8
    Write-Host "Updated $($f.FullName)"
  } else {
    Write-Host "No changes for $($f.FullName)"
  }
}
