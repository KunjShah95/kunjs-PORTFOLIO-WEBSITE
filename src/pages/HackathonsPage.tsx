import { HACKATHONS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';

export function HackathonsPage() {
  return (
    <>
      <PageHeader
        kicker="Hackathons"
        title={`${HACKATHONS.length} sprints, ranked by what I learned.`}
        lede="Short bursts of building, usually with a team of 1-3. Not all wins, but all shipped."
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="space-y-12">
          {HACKATHONS.map((h, i) => (
            <article key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-rule/12 last:border-0">
              <div className="md:col-span-3">
                <div className="kicker">{h.year}</div>
                <div className="font-mono text-xs text-ink-tertiary mt-1">{h.event ?? h.name}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="display text-2xl">{h.title ?? h.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-sm text-accent">
                  {h.placement && <span>{h.placement}</span>}
                  {h.team && (
                    <>
                      {h.placement && <span className="text-ink-tertiary">/</span>}
                      <span>Team of {h.team}</span>
                    </>
                  )}
                </div>
                <p className="mt-4 text-ink-secondary leading-relaxed max-w-prose">{h.description ?? h.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
