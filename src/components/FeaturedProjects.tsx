import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { SectionLabel } from './ui/SectionLabel';
import { Kicker } from './ui/Kicker';

export function FeaturedProjects() {
  const list = PROJECTS.slice(0, 3);
<<<<<<< HEAD
=======
  const [hero, ...supporting] = list;
>>>>>>> redesign/editorial-2026-06-02

  return (
    <section id="work" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
<<<<<<< HEAD
        <SectionLabel number="01" label="Selected work" className="justify-center" />
        <div className="text-center mb-12">
          <h2 className="display text-4xl md:text-5xl max-w-2xl mx-auto">
            Three things I built that I&rsquo;m proud of.
          </h2>
          <div className="mt-6">
=======
        <SectionLabel number="01" label="Selected work" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <h2 className="md:col-span-8 display text-4xl md:text-5xl">
            Three things I built that I&rsquo;m proud of.
          </h2>
          <div className="md:col-span-4 flex md:justify-end items-end">
>>>>>>> redesign/editorial-2026-06-02
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink-primary">
              All projects ({PROJECTS.length})
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
          {list.map((p, i) => (
=======
        {/* Asymmetric grid: hero card spans 2x2, supporting cards stack on the right. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
          {/* HERO — col-span-2 row-span-2 on md+, full-width on mobile */}
          {hero && (
            <motion.article
              key={hero.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="group bg-paper p-8 md:p-10 flex flex-col md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[480px]"
            >
              <div className="flex items-center justify-between mb-6">
                <Kicker accent>
                  {String(1).padStart(2, '0')} &middot; {hero.category ?? 'Project'}
                </Kicker>
                {hero.impact && (
                  <span className="font-mono text-xs text-ink-tertiary tabular-nums">
                    {hero.impact}
                  </span>
                )}
              </div>
              <h3 className="display text-3xl md:text-4xl lg:text-5xl leading-[1.05] max-w-xl">
                <Link to={`/projects/${hero.slug}`} className="hover:text-accent transition-colors">
                  {hero.title}
                </Link>
              </h3>
              <p className="mt-6 text-ink-secondary text-base md:text-lg leading-relaxed flex-1 max-w-prose">
                {hero.desc}
              </p>
              {hero.tech && (
                <div className="mt-8 pt-6 border-t border-rule/12">
                  <Kicker className="block mb-3">Stack</Kicker>
                  <ul className="flex flex-wrap gap-1.5">
                    {hero.tech.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-xs text-ink-primary px-2.5 py-1 border border-rule/12 rounded-pill bg-elevated/50"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                to={`/projects/${hero.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-primary group-hover:text-accent transition-colors"
              >
                Read case study
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.article>
          )}

          {/* SUPPORTING — two compact sidebar cards */}
          {supporting.map((p, i) => (
>>>>>>> redesign/editorial-2026-06-02
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
<<<<<<< HEAD
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-paper p-8 flex flex-col"
            >
              <Kicker>{String(i + 1).padStart(2, '0')} &middot; {p.category ?? 'Project'}</Kicker>
              <h3 className="display text-2xl mt-3 leading-tight">
=======
              transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
              className="group bg-paper p-6 md:p-7 flex flex-col"
            >
              <Kicker className="mb-3">
                {String(i + 2).padStart(2, '0')} &middot; {p.category ?? 'Project'}
              </Kicker>
              <h3 className="display text-xl md:text-2xl leading-tight flex-1">
>>>>>>> redesign/editorial-2026-06-02
                <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                  {p.title}
                </Link>
              </h3>
<<<<<<< HEAD
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
=======
              {p.desc && (
                <p className="mt-3 text-sm text-ink-secondary leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
              )}
              <div className="mt-5 pt-4 border-t border-rule/12 flex items-center justify-between">
                {p.impact && (
                  <span className="font-mono text-xs text-ink-tertiary tabular-nums">{p.impact}</span>
                )}
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs text-ink-primary group-hover:text-accent transition-colors ml-auto"
                >
                  Read
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
>>>>>>> redesign/editorial-2026-06-02
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
