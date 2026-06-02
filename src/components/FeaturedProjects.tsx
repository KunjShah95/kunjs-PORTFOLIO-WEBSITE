import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { SectionLabel } from './ui/SectionLabel';
import { Kicker } from './ui/Kicker';

export function FeaturedProjects() {
  const list = PROJECTS.slice(0, 3);

  return (
    <section id="work" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <SectionLabel number="01" label="Selected work" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <h2 className="md:col-span-8 display text-4xl md:text-5xl">
            Three things I built that I&rsquo;m proud of.
          </h2>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink-primary">
              All projects ({PROJECTS.length})
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-paper p-8 flex flex-col"
            >
              <Kicker>{String(i + 1).padStart(2, '0')} &middot; {p.category ?? 'Project'}</Kicker>
              <h3 className="display text-2xl mt-3 leading-tight">
                <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-4 text-ink-secondary text-sm leading-relaxed flex-1">
                {p.desc}
              </p>
              <dl className="mt-6 pt-6 border-t border-rule/12 space-y-2">
                {p.impact && (
                  <div className="flex justify-between">
                    <dt className="kicker">Impact</dt>
                    <dd className="font-mono text-xs text-ink-secondary">{p.impact}</dd>
                  </div>
                )}
                {p.tech && (
                  <div className="flex justify-between">
                    <dt className="kicker">Stack</dt>
                    <dd className="font-mono text-xs text-ink-secondary truncate ml-4">{p.tech.slice(0, 3).join(' · ')}</dd>
                  </div>
                )}
              </dl>
              <Link
                to={`/projects/${p.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-primary group-hover:text-accent transition-colors"
              >
                Read case study
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
