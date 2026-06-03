import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HACKATHONS } from '../data/portfolio';
import { SectionLabel } from './ui/SectionLabel';

export function FeaturedHackathon() {
  const featured = HACKATHONS[0];
  if (!featured) return null;

  const name = featured.title ?? featured.name;
  const summary = featured.description ?? featured.summary;
  const eventLabel = featured.event ?? featured.name;

  return (
    <section id="hackathons" className="py-24 md:py-32 border-b border-rule/12 bg-elevated">
      <div className="max-w-manifest mx-auto px-6">
        <SectionLabel number="02" label="Hackathons" className="justify-center" />
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="kicker">{eventLabel} · {featured.year}</div>
            <h2 className="display text-4xl md:text-5xl mt-3 leading-tight">
              <Link to="/hackathons" className="hover:text-accent transition-colors">
                {name}
              </Link>
            </h2>
            <p className="mt-6 text-ink-secondary text-lg leading-relaxed">
              {summary}
            </p>
            <dl className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 pt-6 border-t border-rule/12">
              {featured.placement && (
                <div>
                  <dt className="kicker">Placement</dt>
                  <dd className="font-mono text-sm text-ink-primary mt-1">{featured.placement}</dd>
                </div>
              )}
              {featured.team && (
                <div>
                  <dt className="kicker">Team</dt>
                  <dd className="font-mono text-sm text-ink-primary mt-1">{featured.team}</dd>
                </div>
              )}
              {featured.prize && (
                <div>
                  <dt className="kicker">Prize</dt>
                  <dd className="font-mono text-sm text-ink-primary mt-1">{featured.prize}</dd>
                </div>
              )}
              <div>
                <dt className="kicker">View all</dt>
                <dd className="font-mono text-sm mt-1">
                  <Link to="/hackathons" className="text-accent hover:underline">&rarr; {HACKATHONS.length} entries</Link>
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <Link to="/hackathons" className="group inline-flex items-center gap-2 px-6 h-12 rounded-md border border-rule/12 bg-paper hover:border-accent transition-colors">
              <span className="font-mono text-sm text-ink-secondary group-hover:text-accent transition-colors">Open case study</span>
              <ArrowUpRight className="w-4 h-4 text-ink-tertiary group-hover:text-accent transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
