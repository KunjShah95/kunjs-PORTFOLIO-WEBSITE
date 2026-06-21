import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';
import { BentoGrid, BentoCard } from '../components/bento';
import { useReveal } from '../hooks/useReveal';

const FILTERS = ['All', 'AI Agents', 'RAG', 'Voice', 'Infra', 'Open Source'];

export function ProjectsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);
  const { ref, inView } = useReveal({ amount: 0.1 });

  return (
    <>
      <PageHeader
        kicker="Projects"
        title={`${PROJECTS.length} things I've built, broken down by year.`}
        lede="Production systems, prototypes, and the occasional weekend experiment. Click any project for the full case study."
        center
      />

      <section ref={ref} className="max-w-manifest mx-auto px-6 py-16">
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

        {inView && (
          <BentoGrid cols={3} className="border border-rule/12">
            {filtered.map((p) => (
              <BentoCard key={p.slug} variant="default" className="p-6 flex flex-col group">
                <Kicker>{p.category}</Kicker>
                <h3 className="display text-xl mt-3 leading-tight flex-1">
                  <Link to={`/projects/${p.slug}`} className="group-hover:underline decoration-ink-primary/40 underline-offset-4">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-ink-secondary line-clamp-3">{p.desc}</p>
                <div className="mt-6 pt-4 border-t border-rule/12 flex items-center justify-between">
                  <div className="kicker">{p.impact}</div>
                  <Link to={`/projects/${p.slug}`} className="inline-flex items-center gap-1 text-xs">
                    Case study <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        )}
      </section>
    </>
  );
}
