import { HACKATHONS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';

export function HackathonsPage() {
  return (
    <>
      <PageHeader
        kicker="Hackathons"
        title={`${HACKATHONS.length} sprints, ranked by what I learned.`}
        lede="Short bursts of building, usually with a team of 1-3. Not all wins, but all shipped."
        center
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto space-y-12">
          {HACKATHONS.map((h, i) => (
            <article key={i} className="pb-12 border-b border-rule/12 last:border-0">
              <div className="flex items-center gap-3">
                <div className="kicker">{h.year}</div>
                {h.event && <span className="text-ink-quaternary">/</span>}
                {h.event && <span className="font-mono text-xs text-ink-tertiary">{h.event ?? h.name}</span>}
              </div>
              <h3 className="display text-2xl mt-2">{h.title ?? h.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-sm text-accent">
                {h.placement && <span>{h.placement}</span>}
                {h.team && (
                  <>
                    {h.placement && <span className="text-ink-tertiary">/</span>}
                    <span>Team of {h.team}</span>
                  </>
                )}
              </div>
              <p className="mt-4 text-ink-secondary leading-relaxed">{h.description ?? h.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
