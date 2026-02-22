import { motion } from 'framer-motion'
import { Trophy, Calendar } from 'lucide-react'
import { SEO } from '../components/SEO'

export function HackathonsPage() {
  const hackathons = [
    {
      title: 'AIDTM Hackathon',
      award: 'Participant',
      project: 'Organized by Adani',
      description: 'Participated in AIDTM Hackathon organized by Adani.',
      date: 'JAN 2026'
    },
    {
      title: 'Odoo Adani Hackathon',
      award: 'Finalist',
      project: 'Odoo x Adani',
      description: 'Selected for the final round out of 100+ teams in the Odoo Adani Hackathon.',
      date: 'JAN 2026'
    },
    {
      title: 'Autonomous Hacks',
      award: 'Finalist',
      project: 'Autonomous AI Build',
      description: 'Selected out of 2000+ teams in the online round, and from 300+ teams in the offline final round at Autonomous Hacks.',
      date: 'JAN 2026'
    },
    {
      title: 'AMD Slingshot',
      award: 'Participant',
      project: 'Hardware + AI Innovation',
      description: 'Participated in AMD Slingshot hackathon challenge.',
      date: 'FEB 2026'
    },
    {
      title: 'Odoo Gandhinagar',
      award: 'Finalist',
      project: 'Odoo Build',
      description: 'Selected for the final round out of 350+ teams at Odoo Gandhinagar.',
      date: 'AUG 2025'
    },
    {
      title: 'SIH Hackathon (College Level)',
      award: 'Finalist',
      project: 'Smart India Hackathon Build',
      description: 'Qualified as finalist at college-level SIH hackathon.',
      date: 'SEPT 2025'
    },
    {
      title: 'Open Source Workshop',
      award: 'Participant',
      project: 'Community Workshop',
      description: 'Participated in open source workshop and collaborative sessions.',
      date: 'SEPT 2025'
    },
    {
      title: 'Walmart Hackathon',
      award: 'Participant',
      project: 'Retail Tech Challenge',
      description: 'Participated in Walmart innovation hackathon challenge.',
      date: 'JULY 2025'
    },
    {
      title: 'Google Agentic AI Hackathon',
      award: 'Participant',
      project: 'Agentic AI Systems',
      description: 'Participated in Google Agentic AI Hackathon.',
      date: 'JULY 2025'
    },
    {
      title: 'Yorkie Hackathon',
      award: 'Participant',
      project: 'Rapid Build Sprint',
      description: 'Participated in Yorkie Hackathon 2025.',
      date: 'MAY 2025'
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title="Hackathons"
        description="Hackathon achievements and awards won by Kunj Shah. Competitive programming and rapid prototyping."
        url="https://kunjshah.dev/hackathons"
      />

      <div className="container-aligned space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Trophy className="w-4 h-4" />
              Competitions
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Hackathon Record
            </h1>
          </div>
        </div>

        <div className="grid gap-6">
          {hackathons.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all flex flex-col md:grid md:grid-cols-12 gap-6 items-start md:items-center"
            >
              <div className="md:col-span-8 flex items-start gap-6">
                <div className="p-3 bg-surfaceHighlight rounded-md hidden sm:block">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-txt group-hover:text-primary transition-colors">
                      {h.title.replace(/_/g, ' ')}
                    </h3>
                    <div className="text-xs font-medium text-primary">{h.award}</div>
                  </div>

                  <div className="pl-4 border-l-2 border-border/50 space-y-1">
                    <div className="text-xs text-muted font-medium">Project: {h.project}</div>
                    <p className="text-sm text-muted font-light leading-relaxed max-w-2xl">{h.description}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex justify-start md:justify-end w-full">
                <div className="flex items-center gap-2 text-xs font-medium text-muted bg-surfaceHighlight px-3 py-1.5 rounded-full border border-border">
                  <Calendar className="w-3 h-3" />
                  {h.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 text-sm text-muted text-center">
          And many more hackathons I participated in across AI, open-source, and product innovation tracks.
        </div>
      </div>
    </div>
  )
}
