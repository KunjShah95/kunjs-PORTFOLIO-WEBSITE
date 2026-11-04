$filePath = "C:\PORTFOLIO WEBSITE\content\essays.json"
$json = Get-Content -Path $filePath -Raw | ConvertFrom-Json

$faqSection = @"
<!-- People Also Ask -->
<h3>Related Questions</h3>
<dl>
  <dt>How do AI agents handle CAPTCHAs?</dt>
  <dd>AI agents use human-in-the-loop checkpoints, session continuity, and site-specific adaptations to gracefully handle CAPTCHAs rather than trying to bypass them.</dd>
  <dt>What's the best edge device for computer vision?</dt>
  <dd>NVIDIA Jetson Nano ($199) offers the best balance of performance and price, capable of 22 FPS with INT8-quantized YOLOv8.</dd>
  <dt>Is OWASP relevant for AI projects?</dt>
  <dd>Yes - AI agents need input validation, output sanitization, session management, and authorization checks at every step, similar to traditional web app security.</dd>
</dl>
"@

# Process each essay
foreach ($essay in $json.essays) {
    # Fix mediumUrl to null
    $essay.mediumUrl = $null
    
    # Add FAQ body if missing, or append to existing body
    if (-not $essay.body) {
        $essay.body = "<p><em>Essay content about " + $essay.title + "</em></p>" + $faqSection + "</p>"
    } elseif (-not $essay.body.Contains("People Also Ask")) {
        $essay.body = $essay.body.TrimEnd("</p>".ToCharArray()) + $faqSection + "</p>"
    }
}

$json | ConvertTo-Json -Depth 10 | Set-Content -Path $filePath -Encoding utf8
Write-Host "Updated essays with FAQ sections and fixed mediumUrl"