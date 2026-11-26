<#
.SYNOPSIS
  Idempotent GitHub README backlink publisher for a client site.

.EXAMPLE
  .\publish-backlinks.ps1 -Owner acme -SiteUrl https://acme.dev `
    -ReposFile .\repos.txt

  .\publish-backlinks.ps1 ... -Apply   # actually write the READMEs
#>
param(
  [Parameter(Mandatory = $true)][string]$Owner,
  [Parameter(Mandatory = $true)][string]$SiteUrl,
  [string]$ProofUrl = "$SiteUrl/proof-of-work",
  [string]$HireUrl = "$SiteUrl/hire",
  [Parameter(Mandatory = $true)][string]$ReposFile,
  [switch]$Apply
)

$ErrorActionPreference = "Stop"
$site = $SiteUrl.TrimEnd('/')
$proof = $ProofUrl.TrimEnd('/')
$hire = $HireUrl.TrimEnd('/')
$repos = Get-Content $ReposFile | Where-Object { $_ -and -not $_.StartsWith('#') }

$block = @"

---
Built by a [{{ROLE}}]($site) based in {{LOCATION}}.
[See the shipped-project portfolio and merged PRs]($proof).
Available for [fixed-scope projects]($hire).
"@
$block = $block -replace '\{\{ROLE\}\}', 'independent engineer'

$changed = 0
foreach ($repo in $repos) {
  $info = gh api "repos/$Owner/$repo" 2>$null | ConvertFrom-Json
  if (-not $info -or $info.fork) { Write-Output "SKIP $repo (missing or fork)"; continue }

  $readme = gh api "repos/$Owner/$repo/readme" 2>$null | ConvertFrom-Json
  if (-not $readme -or -not $readme.content) { Write-Output "SKIP $repo (no README)"; continue }

  $text = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(($readme.content -replace '\s', '')))
  if ($text.Contains($proof)) { Write-Output "SKIP $repo (already linked)"; continue }

  $newText = $text.TrimEnd() + "`n" + $block + "`n"
  if ($Apply) {
    $b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($newText))
    # Read base64 from a file: a long argument overflows the Windows command line.
    $tmp = Join-Path $env:TEMP "gh-client-readme-$repo.b64"
    [IO.File]::WriteAllText($tmp, $b64)
    gh api "repos/$Owner/$repo/contents/$($readme.path)" -X PUT `
      -f message="docs: link portfolio from README" `
      -F "content=@$tmp" `
      -f sha="$($readme.sha)" | Out-Null
    Remove-Item $tmp -ErrorAction SilentlyContinue
    Write-Output "WRITE $repo ($($readme.path))"
  } else {
    Write-Output "WRITE $repo ($($readme.path)) [dry run]"
  }
  $changed++
}

Write-Output "would_change=$changed apply=$Apply"
