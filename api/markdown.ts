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

> https://kunjshah.dev

## Summary

Full Stack AI/ML & Automation Specialist based in Ahmedabad, IN.

Focus: Full Stack AI, Autonomous Automation, Neural Intelligence, Workflow Engineering

## Pages

- Home: https://kunjshah.dev/
- About: https://kunjshah.dev/about
- Projects: https://kunjshah.dev/projects
- Skills: https://kunjshah.dev/skills
- Experience: https://kunjshah.dev/experience
- Education: https://kunjshah.dev/education
- Labs: https://kunjshah.dev/labs
- AI Videos: https://kunjshah.dev/ai-videos
- Contact: https://kunjshah.dev/contact

## Tech Stack

Python, TypeScript, React, FastAPI, LangChain, PyTorch, OpenCV, Docker, Vercel, Cloudflare, Firebase, Supabase

---

*Generated for AI agents. Last updated: 2026-05-02*
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