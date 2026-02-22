import { Skills } from '../components/Skills'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { Cpu, Terminal, Shield } from 'lucide-react'

export function SkillsPage() {
  const secondaryStats = [
    { label: 'RUNTIME', value: 'LINUX', icon: Terminal },
    { label: 'CORE', value: 'PYTHON', icon: Cpu },
    { label: 'OPS', value: 'DEVOPS', icon: Shield },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title="Skills & Tech Stack"
        description="A comprehensive map of Kunj Shah's AI Systems Engineering capabilities and technology stack."
        url="https://kunjshah.dev/skills"
      />

      <div className="container-aligned space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Cpu className="w-4 h-4" />
              Technical Background
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Skills & Tech Stack
            </h1>
          </div>

          <div className="flex gap-6 pb-2">
            {secondaryStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1.5 text-muted text-xs">
                  <stat.icon className="w-3 h-3" />
                  <span>{stat.label}</span>
                </div>
                <div className="text-sm font-semibold text-txt">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="text-lg text-muted font-light leading-relaxed">
            Specialized in the construction of autonomous agentic flows and full-stack AI applications. My stack is curated for rapid prototyping and scale.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Skills />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-border/50">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary">Ethical AI</h4>
            <p className="text-xs text-muted font-light leading-relaxed">
              Commitment to building safe, explainable, and human-aligned autonomous systems. Priority on bias mitigation.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary">Open Source</h4>
            <p className="text-xs text-muted font-light leading-relaxed">
              Active contributor to the agentic ecosystem. Building tools that empower developers to deploy scalable agents.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-primary">Research Sync</h4>
            <p className="text-xs text-muted font-light leading-relaxed">
              Constantly indexing the latest research from arXiv and major AI labs to maintain an edge in state-of-the-art architectures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

