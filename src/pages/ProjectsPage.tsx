import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';

const FILTERS = ['All', 'AI Agents', 'RAG', 'Voice', 'Infra', 'Open Source'];

export function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <PageHeader
        kicker="Projects"
        title={`${PROJECTS.length} things I've built, broken down by year.`}
        lede="Production systems, prototypes, and the occasional weekend experiment. Click any project for the full case study."
        center
      />

      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-rule/12 items-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3 h-8 rounded-md text-sm transition-colors ${
                active === f
                  ? 'bg-ink-primary text-ink-inverse'
                  : 'border border-rule/12 text-ink-secondary hover:border-rule/32'
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto kicker self-center">{filtered.length} of {PROJECTS.length}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
          {filtered.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.06 }}
              className="bg-paper p-6 flex flex-col group"
            >
              <Kicker>{p.category}</Kicker>
              <h3 className="display text-xl mt-3 leading-tight flex-1">
                <Link to={`/projects/${p.slug}`} className="group-hover:text-accent transition-colors">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-ink-secondary line-clamp-3">{p.desc}</p>
              <div className="mt-6 pt-4 border-t border-rule/12 flex items-center justify-between">
                <div className="kicker">{p.impact}</div>
                <Link to={`/projects/${p.slug}`} className="inline-flex items-center gap-1 text-xs group-hover:text-accent transition-colors">
                  Case study <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
