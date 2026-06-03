import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';

const LABS = [
  {
    id: 'L01',
    title: 'Synthetic Memory',
    status: 'Stable',
    description: 'Architecture for recursive state persistence in non-deterministic agent clusters.',
    stack: ['Redis', 'Vector DB'],
  },
  {
    id: 'L02',
    title: 'Neural Protocol',
    status: 'Beta',
    description: 'Standardized handshake logic for multi-modal cross-agent task synchronization.',
    stack: ['gRPC', 'Protobuf'],
  },
  {
    id: 'L03',
    title: 'Context Window Optimizer',
    status: 'Experimental',
    description: 'Building a memory compression system that intelligently prioritizes relevant context for long-running agent sessions.',
    stack: ['llama.cpp', 'Semantic Chunking'],
  },
];

export function LabsPage() {
  return (
    <>
      <PageHeader
        kicker="Labs"
        title="Experiments, prototypes, and abandoned ideas."
        lede="Things I'm tinkering with outside of production work. Most of these will never ship. That's the point."
        center
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
          {LABS.map((l, i) => (
            <article key={i} className="bg-paper p-6 flex flex-col">
              <Kicker>{l.status ?? 'Experiment'}</Kicker>
              <h3 className="display text-xl mt-3 leading-tight flex-1">
                {'url' in l && l.url ? (
                  <a href={l.url as string} target="_blank" rel="noopener noreferrer" className="hover:underline decoration-ink-primary/40 underline-offset-4">
                    {l.title}
                  </a>
                ) : (
                  l.title
                )}
              </h3>
              <p className="mt-3 text-sm text-ink-secondary line-clamp-3">{l.description}</p>
              {l.stack && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {l.stack.slice(0, 3).map((s: string) => (
                    <span key={s} className="px-2 h-6 inline-flex items-center rounded-full bg-elevated text-xs font-mono text-ink-secondary">{s}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
