<#
.PARAMETER Apply
  Without this switch the script only reports what it would change.
  With it, each eligible README is updated through the authenticated gh CLI.

Uses the profile README plus the repositories that the portfolio already cites
as shipped work. Repos that already link to /proof-of-work are skipped, so a
second run is a no-op. Forks are never touched.
#>
param([switch]$Apply)

$ErrorActionPreference = "Stop"

$owner = "KunjShah95"
$targets = @(
  "KunjShah95",
  "walkcast",
  "onramp",
  "benchmax",
  "archmind-ai",
  "EngineerOS",
  "agentic-crm",
  "lattice",
  "reverseinterview",
  "EquityLens",
  "intelligent-learning-assistant",
  "Smart-flow-ai",
  "SENTINEL-CLI",
  "ai-railway",
  "gapminer",
  "UPI-FRAUD-DETECTION-SYSTEM",
  "TOKENIZER-FROM-SCRATCH"
)

$marker = "https://kunjshah.in/proof-of-work"
$block = @"

---
Built by [Kunj Shah](https://kunjshah.in), AI engineer in Ahmedabad.
[See the shipped-project portfolio and 138+ merged PRs (67 public)]($marker).
Available for [fixed-scope AI agent projects](https://kunjshah.in/hire-ai-agent-developer).
"@

$changed = 0
$skipped = 0
$missing = 0

foreach ($repo in $targets) {
  $info = gh api "repos/$owner/$repo" 2>$null | ConvertFrom-Json
  if (-not $info -or $info.fork) {
    Write-Output "SKIP  $repo (missing or fork)"
    $skipped++
    continue
  }

  $readme = gh api "repos/$owner/$repo/readme" 2>$null | ConvertFrom-Json
  if (-not $readme -or -not $readme.content) {
    Write-Output "SKIP  $repo (no README)"
    $missing++
    continue
  }

  $text = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(($readme.content -replace '\s', '')))
  if ($text.Contains($marker)) {
    Write-Output "SKIP  $repo (already linked)"
    $skipped++
    continue
  }

  $newText = $text.TrimEnd() + "`n" + $block + "`n"
  $path = $readme.path

  if ($Apply) {
    $b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($newText))
    # Passing base64 as an argument overflows the Windows command line; read it from a file instead.
    $tmp = Join-Path $env:TEMP "gh-readme-$repo.b64"
    [IO.File]::WriteAllText($tmp, $b64)
    gh api "repos/$owner/$repo/contents/$path" -X PUT `
      -f message="docs: link portfolio and proof of work from README" `
      -F "content=@$tmp" `
      -f sha="$($readme.sha)" | Out-Null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    Write-Output "WRITE $repo ($path)"
  } else {
    Write-Output "WRITE $repo ($path) [+$([Math]::Round(($newText.Length - $text.Length) / 1kb, 1)) KiB]"
  }
  $changed++
}

Write-Output ""
Write-Output "would_change=$changed skipped=$skipped no_readme=$missing apply=$Apply"
