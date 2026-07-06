export const prerender = false

export async function GET(request: Request) {
  const acceptHeader = request.headers.get('accept') || ''
  const userAgent = request.headers.get('user-agent') || ''
  
  const isMarkdownRequest = 
    acceptHeader.includes('text/markdown') ||
    acceptHeader.includes('text/plain') ||
    userAgent.includes('Claude-User') ||
    userAgent.includes('OpenAI') ||
    userAgent.includes('GPT') ||
    userAgent.includes('Google-Extended') ||
    userAgent.includes('Applebot') ||
    userAgent.includes('Anthropic') ||
    userAgent.includes('ClaudeBot') ||
    userAgent.includes('Bytespider') ||
    userAgent.includes('AI2Bot') ||
    userAgent.includes('anthropic') ||
    userAgent.includes('ChatGPT') ||
    userAgent.includes('Perplexity') ||
    userAgent.includes('You.com')

  const content = `# Kunj Shah — AI Engineer & Agent Builder

> Personal portfolio website for Kunj Shah, an AI engineer building autonomous agents and generative AI applications.

## Summary

Kunj Shah is an AI engineer and agent builder based in Ahmedabad, IN. Specializes in:
- Full Stack AI
- Autonomous Automation
- Neural Intelligence
- Workflow Engineering

## Canonical URL
- https://kunjshah.vercel.app/

## Core Stack

### Languages & Frameworks
- Python, TypeScript, React, FastAPI, LangChain/LangGraph, PyTorch, OpenCV, Docker

### Cloud & Infrastructure
- Vercel, Cloudflare, Firebase, Supabase

## Key Pages

- Home: https://kunjshah.vercel.app/
- About: https://kunjshah.vercel.app/about
- Projects: https://kunjshah.vercel.app/projects
- Skills: https://kunjshah.vercel.app/skills
- Experience: https://kunjshah.vercel.app/experience
- Education: https://kunjshah.vercel.app/education
- Labs: https://kunjshah.vercel.app/labs
- AI Videos: https://kunjshah.vercel.app/ai-videos
- Contact: https://kunjshah.vercel.app/contact
- Writing: https://kunjshah.vercel.app/blogs
- Hackathons: https://kunjshah.vercel.app/hackathons

## Profiles (same person)

- GitHub (primary): https://github.com/KunjShah95
- GitHub (alt): https://github.com/KunjShah01
- LinkedIn: https://www.linkedin.com/in/kunjshah05
- X (Twitter): https://x.com/kunjshah_dev
- Hugging Face: https://huggingface.co/kunjshah01
- Peerlist: https://peerlist.io/kunjshah
- Medium: https://medium.com/@kkshah2005

## Verified Achievements

- Detected a 23% performance gap in commercial healthcare AI triage models
- Reduced compliance audit time from 3 weeks to 4 hours
- Achieved 98.7% defect detection accuracy with 4.2x speedup
- Reduced API costs by 65% via smart model routing
- Captured 94% wait-time prediction accuracy
- Increased quiz completion rates by 45% through adaptive difficulty
- Consolidated 13+ security tools into a single CLI command
- Reduced roadmap generation from 10 days to 15 seconds

---

*This file is generated for AI crawlers. Last updated: 2026-06-03*
`

  if (isMarkdownRequest) {
    const tokenCount = Math.ceil(content.length / 4).toString()
    
    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Content-Type-Options': 'nosniff',
        'x-markdown-tokens': tokenCount,
        'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
      },
    })
  }

  return new Response('Not Found', { status: 404 })
}