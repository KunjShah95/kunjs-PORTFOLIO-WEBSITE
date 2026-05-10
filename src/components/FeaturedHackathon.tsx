import { motion } from 'framer-motion'
import { Trophy, Medal, Users, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const featuredHackathon = {
  title: "AMD Slingshot",
  subtitle: "Hardware + AI Innovation Challenge",
  role: "Finalist",
  description: "Selected as a finalist in the AMD Slingshot hackathon focusing on hardware-accelerated AI solutions and innovative tech challenges.",
  date: "Feb 2026",
  teamSize: 3,
  tech: ["AI/ML", "Hardware Integration", "Python", "Innovation"],
  features: [
    "Hardware-accelerated AI",
    "Innovation Challenge",
    "Advanced Tech Solutions"
  ],
  participants: "500+",
  teams: "150+"
}

export function FeaturedHackathon() {
  return (
    <section className="section-padding bg-bg relative">
      <div className="absolute inset-0 tech-grid-layer opacity-30" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-mono text-muted uppercase tracking-wider">Featured Achievement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
            Latest <span className="text-primary">Hackathon Win</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-2xl bg-surface border border-border overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5" />
          
          <div className="relative p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                    <Medal className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-blue-400">Finalist</span>
                  </div>
                  <span className="text-sm text-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredHackathon.date}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-bold text-txt mb-2">
                  {featuredHackathon.title}
                </h3>
                <p className="text-lg text-primary font-medium mb-4">
                  {featuredHackathon.subtitle}
                </p>
                <p className="text-muted mb-6">
                  {featuredHackathon.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {featuredHackathon.teamSize} members
                  </span>
                  <span>{featuredHackathon.participants} participants</span>
                  <span>{featuredHackathon.teams} teams</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredHackathon.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-bg border border-border text-[11px] font-mono text-txtDim uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {featuredHackathon.features.slice(0, 2).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="hidden lg:block">
                <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <div className="text-2xl font-bold text-txt mb-2">Finalist</div>
                  <div className="text-muted">out of {featuredHackathon.teams} teams</div>
                  <div className="text-sm text-muted mt-2">{featuredHackathon.subtitle}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface border border-border text-txt font-semibold hover:bg-surfaceHighlight transition-colors shadow-sm"
          >
            View All Hackathons
            <Trophy className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}