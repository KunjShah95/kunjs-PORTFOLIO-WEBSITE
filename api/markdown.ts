export const prerender = false

export function getConfig() {
  return {
    runtime: 'edge',
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  
  // Check if requesting markdown
  const acceptHeader = request.headers.get('accept') || ''
  const userAgent = request.headers.get('user-agent') || ''
  
  const wantsMarkdown = 
    acceptHeader.includes('text/markdown') ||
    acceptHeader.includes('text/plain') ||
    userAgent.includes('Claude') ||
    userAgent.includes('OpenAI') ||
    userAgent.includes('GPT') ||
    userAgent.includes('Google-Extended') ||
    userAgent.includes('Applebot') ||
    userAgent.includes('Anthropic') ||
    userAgent.includes('Perplexity')

  if (wantsMarkdown || url.pathname === '/api/llms') {
    const content = `# Kunj Shah

AI Engineer & Agent Builder

> https://kunjshah.vercel.app/

## Summary

Full Stack AI/ML & Automation Specialist based in Ahmedabad, IN.

Focus: Full Stack AI, Autonomous Automation, Neural Intelligence, Workflow Engineering

## Pages

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
- Peerlist: https://peerlist.io/kunjshah
- Medium: https://medium.com/@kkshah2005

## Tech Stack

Python, TypeScript, React, FastAPI, LangChain/LangGraph, PyTorch, OpenCV, Docker, Vercel, Cloudflare, Firebase, Supabase

---

*Generated for AI agents. Last updated: 2026-06-03*
`
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

  // For regular requests, redirect to home page
  return new Response('Redirecting to home...', {
    status: 302,
    headers: {
      'Location': '/',
    },
  })
}