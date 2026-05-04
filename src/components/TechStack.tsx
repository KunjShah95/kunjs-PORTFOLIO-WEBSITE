import { motion } from 'framer-motion'
import { BrainCircuit, Server, Layout, Wrench } from 'lucide-react'

const techCategories = [
  {
    title: "AI / ML",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    skills: ["PyTorch", "LangChain", "CrewAI", "Agentic Reasoning", "OpenAI APIs", "LLaMA-3", "Hugging Face", "Pinecone", "ChromaDB"]
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    skills: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase"]
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    skills: ["Docker", "Git", "GitHub Actions", "Vercel", "AWS", "Linux", "Nginx"]
  }
]

export function TechStack() {
  return (
    <section className="section-padding bg-surface/30 relative">
      <div className="container-aligned">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            The tools and frameworks I use to build scalable, intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-surface border border-border shadow-sm flex flex-col h-full hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg ${cat.bg}`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-txt">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1.5 rounded-md bg-bg border border-border text-xs font-medium text-muted group-hover:text-txt transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}