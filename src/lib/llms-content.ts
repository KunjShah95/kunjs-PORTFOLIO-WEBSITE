import { PROJECTS, EXPERIENCE, EDUCATION, IDENTITY, SOCIALS } from '@/data/portfolio'

export async function getContent(): Promise<string> {
  const lines: string[] = []

  lines.push('# Kunj Shah — AI Engineer & Agent Builder')
  lines.push('')
  lines.push('> Personal portfolio website for Kunj Shah, an AI engineer building autonomous agents and generative AI applications.')
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(`Kunj Shah is an AI engineer and agent builder based in ${IDENTITY.location}. Specializes in:`)
  IDENTITY.focus.forEach(f => lines.push(`- ${f}`))
  lines.push('')
  lines.push('## Canonical URL')
  lines.push('- https://kunjshah.dev/')
  lines.push('')
  lines.push('## Core Stack')
  lines.push('')
  lines.push('### Languages & Frameworks')
  lines.push('- Python, TypeScript, React, FastAPI, LangChain, PyTorch, OpenCV, Docker')
  lines.push('')
  lines.push('### Cloud & Infrastructure')
  lines.push('- Vercel, Cloudflare, Firebase, Supabase')
  lines.push('')
  lines.push('## Key Pages')
  lines.push('')
  lines.push('- Home: https://kunjshah.dev/')
  lines.push('- About: https://kunjshah.dev/about')
  lines.push('- Projects: https://kunjshah.dev/projects')
  lines.push('- Skills: https://kunjshah.dev/skills')
  lines.push('- Experience: https://kunjshah.dev/experience')
  lines.push('- Education: https://kunjshah.dev/education')
  lines.push('- Labs: https://kunjshah.dev/labs')
  lines.push('- AI Videos: https://kunjshah.dev/ai-videos')
  lines.push('- Contact: https://kunjshah.dev/contact')
  lines.push('')
  lines.push('## Social Profiles')
  lines.push('')
  SOCIALS.forEach(s => {
    lines.push(`- ${s.name}: ${s.url}`)
  })
  lines.push('')

  if (PROJECTS && PROJECTS.length > 0) {
    lines.push('## Projects')
    lines.push('')
    PROJECTS.forEach((project) => {
      lines.push(`### ${project.title}`)
      if (project.desc) lines.push(project.desc)
      if (project.tech?.length) {
        lines.push(`**Tech:** ${project.tech.join(', ')}`)
      }
      if (project.demo) lines.push(`- Demo: ${project.demo}`)
      if (project.github) lines.push(`- Repo: ${project.github}`)
      if (project.slug) lines.push(`- https://kunjshah.dev/projects/${project.slug}`)
      lines.push('')
    })
  }

  if (EXPERIENCE && EXPERIENCE.length > 0) {
    lines.push('## Experience')
    lines.push('')
    EXPERIENCE.forEach((exp) => {
      lines.push(`### ${exp.role} at ${exp.company}`)
      if (exp.period) lines.push(`*${exp.period}*`)
      if (exp.description) lines.push(exp.description)
      lines.push('')
    })
  }

  if (EDUCATION && EDUCATION.length > 0) {
    lines.push('## Education')
    lines.push('')
    EDUCATION.forEach((edu) => {
      lines.push(`### ${edu.school}`)
      if (edu.degree) lines.push(edu.degree)
      if (edu.period) lines.push(`*${edu.period}*`)
      lines.push('')
    })
  }

  lines.push('---')
  lines.push('')
  lines.push(`*This file is generated for AI crawlers. Last updated: ${new Date().toISOString().split('T')[0]}*`)

  return lines.join('\n')
}