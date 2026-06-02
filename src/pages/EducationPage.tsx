import { EDUCATION } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';

export function EducationPage() {
  return (
    <>
      <PageHeader
        kicker="Education"
        title="Where I studied."
        lede="Formal education plus the courses and programs that shaped how I work."
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="space-y-8">
          {EDUCATION.map((edu, i) => (
            <article key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-rule/12 last:border-0">
              <div className="md:col-span-3">
                <div className="kicker">{edu.period}</div>
              </div>
              <div className="md:col-span-9">
                <h3 className="display text-2xl">{edu.degree}</h3>
                <div className="font-mono text-sm text-ink-secondary mt-1">{edu.school}</div>
                {edu.summary && <p className="mt-3 text-ink-secondary leading-relaxed max-w-prose">{edu.summary}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
