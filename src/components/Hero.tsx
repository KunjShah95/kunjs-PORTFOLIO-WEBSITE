import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Cpu, Globe, Shield, Gauge, Terminal, Box } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'

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

function SystemStatus({ label, status }: { label: string, status: 'online' | 'active' | 'ready' }) {
  const colors = {
    online: 'bg-green-500',
    active: 'bg-cyan-500', 
    ready: 'bg-blue-500'
  }
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted font-mono">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
        <span className="text-xs font-mono text-txt uppercase">{status}</span>
      </div>
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
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-surface border border-border backdrop-blur-sm shadow-sm">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted">Built AI tools | Multi-agent systems | Deployed apps</span>
                <LiveIndicator />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-txt leading-tight tracking-tight mb-6"
            >
              AI Engineer building <br />
              <span className="text-primary">autonomous agent systems</span> & <br /> real-world LLM applications
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted max-w-xl mb-8"
            >
              I design, build, and deploy intelligent systems, complex workflows, and automation tools that solve actual business problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/labs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Try Live Demos
              </Link>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-4 p-5 rounded-xl bg-surface border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-txt">System Status</span>
              </div>
              <SystemStatus label="ML Pipeline" status="active" />
              <SystemStatus label="Agent Framework" status="ready" />
              <SystemStatus label="API Gateway" status="online" />
              <SystemStatus label="Vector Store" status="ready" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-txt">Production Ready</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-green-500/20 text-green-400">v2.4.1</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">API Latency</span>
                  <span className="font-mono text-txt">23ms</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surfaceHighlight">
                  <div className="h-full w-[92%] rounded-full bg-primary" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Error Rate</span>
                  <span className="font-mono text-green-400">0.08%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}