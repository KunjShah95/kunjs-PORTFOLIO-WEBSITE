import { EXPERIENCE } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';

export function ExperiencePage() {
  return (
    <>
      <PageHeader
        kicker="Experience"
        title="Work history, oldest to newest."
        lede="Roles, side projects, and the occasional freelance sprint."
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <article key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12 border-b border-rule/12 last:border-0">
              <div className="md:col-span-3">
                <div className="kicker">{exp.period}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="display text-2xl">{exp.role}</h3>
                <div className="font-mono text-sm text-ink-secondary mt-1">
                  {exp.company}
                </div>
                <p className="mt-4 text-ink-secondary leading-relaxed max-w-prose">{exp.description}</p>
                {exp.skills && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.skills.map((s: string) => (
                      <span key={s} className="px-2 h-6 inline-flex items-center rounded-full bg-elevated text-xs font-mono text-ink-secondary">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
