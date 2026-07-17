import { motion } from 'framer-motion'
import { BrainCircuit, Server, Layout, Wrench, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    <section className="section-padding bg-elevated/30 relative">
      <div className="container-aligned">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-primary">
              Tech <span className="text-accent">Stack</span>
            </h2>
            <Link 
              to="/skills"
              className="inline-flex items-center gap-1 text-sm text-ink-secondary hover:text-accent transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-lg text-ink-secondary max-w-2xl mx-auto">
            The tools and frameworks I use to build scalable, intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-elevated/50 border border-rule/50 shadow-sm flex flex-col h-full hover:border-accent/40 hover:bg-elevated/80 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${cat.bg} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold text-ink-primary group-hover:text-accent transition-colors">{cat.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 content-start flex-1">
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1.5 rounded-md bg-paper/50 border border-rule/12 text-[11px] font-mono text-ink-secondary group-hover:border-accent/20 group-hover:text-ink-primary transition-all hover:bg-accent/5 hover:border-accent/40 cursor-default"
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