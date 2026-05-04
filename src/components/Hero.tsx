import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Globe, Gauge, Terminal, Box, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

function MetricCard({ icon: Icon, label, value, trend, color }: { icon: any, label: string, value: string, trend?: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative p-4 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all duration-300 shadow-sm"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted font-medium uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-txt">{value}</span>
            {trend && <span className="text-xs text-green-400 font-mono">{trend}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-xs text-green-400 font-mono">LIVE</span>
    </div>
  )
}

export function Hero() {
  const projectCount = PROJECTS.length

  return (
    <section className="relative min-h-[94vh] bg-bg overflow-hidden flex items-center">
      <div className="absolute inset-0 tech-grid-layer" />
      <div className="absolute inset-0 grain-overlay" />
      
      <div className="relative z-10 container-aligned w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 lg:py-20">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-surface border border-border backdrop-blur-sm shadow-sm">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted">Building Production-Ready Intelligent Systems</span>
                <LiveIndicator />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-txt leading-tight tracking-tight mb-6"
            >
              <span className="block text-primary mb-2">AI Engineer</span> building production-ready intelligent systems
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-lg text-muted max-w-xl mb-8 leading-relaxed"
            >
              Stop paying for simple wrappers. I engineer autonomous agentic systems that replace manual workflows, save 40+ hours/week, and deliver measurable ROI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/contact"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_HERO_PRIMARY)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-[0.98]"
              >
                Let's Build Together
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_HERO_SECONDARY)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm active:scale-[0.98]"
              >
                View Systems
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_HERO_RESUME)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </motion.div>

            {/* Social Proof Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 pt-6 border-t border-border/50"
            >
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-txt">1.2M+</span>
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Requests Handled</span>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-txt">40+</span>
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Hours Saved/Wk</span>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-txt">3+</span>
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Hackathon Wins</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard 
                icon={Box} 
                label="Projects" 
                value={String(projectCount)} 
                trend="+2"
                color="bg-primary/20 text-primary"
              />
              <MetricCard 
                icon={Gauge} 
                label="Uptime" 
                value="99.9%" 
                trend="+0.1%"
                color="bg-green-500/20 text-green-400"
              />
              <MetricCard 
                icon={Cpu} 
                label="Models" 
                value="8" 
                trend="+3"
                color="bg-cyan-500/20 text-cyan-400"
              />
              <MetricCard 
                icon={Globe} 
                label="API Calls" 
                value="1.2M" 
                trend="+23%"
                color="bg-purple-500/20 text-purple-400"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 relative aspect-square max-w-[400px] mx-auto lg:mx-0 group"
            >
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative h-full w-full rounded-2xl bg-surface border border-border flex items-center justify-center p-8 overflow-hidden shadow-2xl">
                 <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                        <Cpu className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-bold text-txt">Engineering Excellence</h3>
                    <p className="text-sm text-muted">Focusing on scalability, reliability, and measurable business impact through AI integration.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}