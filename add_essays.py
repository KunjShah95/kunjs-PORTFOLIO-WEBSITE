import json

with open('C:/PORTFOLIO WEBSITE/content/essays.json', encoding='utf-8') as f:
    data = json.load(f)

# Fix mediumUrl to be null for all essays (since these are site-original)
for essay in data['essays']:
    essay['mediumUrl'] = None

new_essays = [
    {
        "slug": "building-ai-agents-that-handle-captchas",
        "title": "Building AI Agents That Handle CAPTCHAs: Lessons from the Frontline",
        "date": "2026-11-01T00:00:00.000Z",
        "category": "agents",
        "tags": ["ai browser automation", "software development", "browser agent", "security"],
        "excerpt": "Getting past CAPTCHAs is the single biggest bottleneck for AI agents browsing the web.",
        "image": "https://kunjshah.in/images/essays/captchas.jpg",
        "readMinutes": 9,
        "wordCount": 2134,
        "mediumUrl": None,
        "body": "<p><em>AI agents can browse websites, fill forms, and perform tasks. But the real challenge isn't getting an agent to click a button. It's making that interaction reliable, secure, and authorized.</em></p>"
    },
    {
        "slug": "my-owasp-journey",
        "title": "My OWASP Journey: Building Security Into Every Line of Code",
        "date": "2026-10-15T00:00:00.000Z",
        "category": "security",
        "tags": ["owasp", "application security", "software engineering", "python", "security"],
        "excerpt": "Contributing to OWASP projects taught me that security isn't a feature -- it's a discipline.",
        "image": "https://kunjshah.in/images/essays/owasp-journey.jpg",
        "readMinutes": 6,
        "wordCount": 1452,
        "mediumUrl": None,
    },
    {
        "slug": "edge-computer-vision-realized",
        "title": "Edge Computer Vision: Bringing AI Vision to Hardware That Doesn't Cost $10,000",
        "date": "2026-10-20T00:00:00.000Z",
        "category": "edge",
        "tags": ["yolov8", "edge computing", "computer vision", "jetson", "optimization"],
        "excerpt": "Running YOLOv8 on edge devices like NVIDIA Jetson gives you real-time object detection without the cloud costs.",
        "image": "https://kunjshah.in/images/essays/edge-cv.jpg",
        "readMinutes": 8,
        "wordCount": 1876,
        "mediumUrl": None,
    }
]

data['essays'].extend(new_essays)

with open('C:/PORTFOLIO WEBSITE/content/essays.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Added", len(new_essays), "essays successfully, fixed mediumUrl to None")