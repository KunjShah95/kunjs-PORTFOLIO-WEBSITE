import { motion } from 'framer-motion'
import { Youtube, Play, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { SEO } from '../components/SEO'

const CHANNEL = {
  handle: '@kunjshah4158',
  url: 'https://www.youtube.com/@kunjshah4158',
  description:
    'Walkthroughs of agents I built, post-mortems of agents I broke, and the parts the docs do not tell you.',
}

export function VideosPage() {
  return (
    <>
      <SEO
        title="Videos"
        description="Videos by Kunj Shah on building, breaking, and shipping AI agents. Walkthroughs, post-mortems, and live builds."
        url="https://kunjshah.vercel.app/videos"
      />

      <PageHeader
        kicker="Videos"
        title="Build, break, post-mortem."
        lede="Walkthroughs of agents I built, the parts that broke, and what I learned writing them up."
        center
      />

      <section className="max-w-manifest mx-auto px-6 py-16 md:py-24">
        <div className="max-w-prose mx-auto">
          <motion.a
            href={CHANNEL.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex items-center justify-between gap-4 p-6 border border-rule/12 rounded-md bg-elevated/40 hover:border-ink-primary/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-md bg-[#ff0033]/10 text-[#ff0033]">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <div className="kicker">YouTube channel</div>
                <div className="font-mono text-base text-ink-primary mt-1">
                  {CHANNEL.handle}
                </div>
                <p className="mt-1 text-sm text-ink-tertiary max-w-md">
                  {CHANNEL.description}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-ink-tertiary group-hover:text-ink-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
          </motion.a>

          <div className="mt-12">
            <div className="kicker mb-4">Latest uploads</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule/12 border border-rule/12">
              {[1, 2, 3, 4].map((i) => (
                <motion.a
                  key={i}
                  href={CHANNEL.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-paper p-5 flex items-start gap-4 hover:bg-elevated transition-colors"
                >
                  <div className="relative w-20 h-12 flex-shrink-0 bg-elevated border border-rule/12 flex items-center justify-center rounded-sm">
                    <Play className="w-4 h-4 text-ink-tertiary group-hover:text-ink-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-ink-primary leading-snug group-hover:underline decoration-ink-primary/30 underline-offset-4 decoration-1">
                      Watch on YouTube &rarr;
                    </div>
                    <div className="mt-1 text-xs text-ink-tertiary">
                      {CHANNEL.handle}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-tertiary">
              Specific video embeds land here once they are uploaded. For now, the channel link above has everything.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
