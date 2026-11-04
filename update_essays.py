import json

with open('C:/PORTFOLIO WEBSITE/content/essays.json', encoding='utf-8') as f:
    data = json.load(f)

# Add FAQ sections to each essay body
faq_section = '''<!-- People Also Ask -->
<h3>Related Questions</h3>
<dl>
  <dt>How do AI agents handle CAPTCHAs?</dt>
  <dd>AI agents use human-in-the-loop checkpoints, session continuity, and site-specific adaptations to gracefully handle CAPTCHAs rather than trying to bypass them.</dd>
  <dt>What's the best edge device for computer vision?</dt>
  <dd>NVIDIA Jetson Nano ($199) offers the best balance of performance and price, capable of 22 FPS with INT8-quantized YOLOv8.</dd>
  <dt>Is OWASP relevant for AI projects?</dt>
  <dd>Yes - AI agents need input validation, output sanitization, session management, and authorization checks at every step, similar to traditional web app security.</dd>
</dl>'''

# Fix mediumUrl to None for all essays and add FAQ
for essay in data['essays']:
    essay['mediumUrl'] = None
    # Only add FAQ if not already present
    if 'People Also Ask' not in essay.get('body', ''):
        essay['body'] = essay['body'].rstrip('</p>') + faq_section + '</p>'

with open('C:/PORTFOLIO WEBSITE/content/essays.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Updated essays with FAQ sections and fixed mediumUrl')