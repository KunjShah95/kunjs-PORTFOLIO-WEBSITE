import json

with open('C:/PORTFOLIO WEBSITE/content/essays.json', encoding='utf-8') as f:
    data = json.load(f)

# Fix mediumUrl to None for all essays
for essay in data['essays']:
    essay['mediumUrl'] = None

# Add FAQ sections to each essay body
faq_section = '''<!-- People Also Ask -->\n<h3>Related Questions</h3>\n<dl>\n  <dt>How do AI agents handle CAPTCHAs?</dt>\n  <dd>AI agents use human-in-the-loop checkpoints, session continuity, and site-specific adaptations to gracefully handle CAPTCHAs rather than trying to bypass them.</dd>\n  <dt>What's the best edge device for computer vision?</dt>\n  <dd>NVIDIA Jetson Nano ($199) offers the best balance of performance and price, capable of 22 FPS with INT8-quantized YOLOv8.</dd>\n  <dt>Is OWASP relevant for AI projects?</dt>\n  <dd>Yes - AI agents need input validation, output sanitization, session management, and authorization checks at every step, similar to traditional web app security.</dd>\n</dl>'''

# Add FAQ to essays that don't have it yet
for essay in data['essays']:
    if 'People Also Ask' not in essay.get('body', ''):
        essay['body'] = essay['body'].rstrip('</p>') + faq_section + '</p>'

with open('C:/PORTFOLIO WEBSITE/content/essays.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print('Fixed essays with FAQ sections and fixed mediumUrl')