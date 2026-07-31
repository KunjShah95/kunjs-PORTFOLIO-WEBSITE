import { Marquee } from './effects/Marquee'

const STACK = [
  'PyTorch', 'LangGraph', 'CrewAI', 'OpenAI', 'LLaMA-3', 'Hugging Face', 'ChromaDB',
  'Pinecone', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'React', 'Next.js',
  'TypeScript', 'Tailwind', 'Docker', 'Vercel', 'AWS', 'Supabase',
]

/**
 * One quiet full-bleed tech strip directly under the hero. The single marquee
 * on the page (per layout discipline). Edges fade into the paper.
 */
export function TechMarquee() {
  return (
    <section
      aria-label="Tools and frameworks I work with"
      className="relative border-y border-rule/10 py-5 overflow-x-clip"
    >
      <Marquee items={STACK} />
      {/* edge fades — sit above pills so they melt at the sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-20 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-20 bg-gradient-to-l from-paper to-transparent" />
    </section>
  )
}
