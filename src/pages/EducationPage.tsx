import { EDUCATION } from '../data/portfolio';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { PageHeader } from '../components/ui/PageHeader';

export function EducationPage() {
  return (
    <>
      <SEO
        title="Education — Kunj Shah"
        description="Educational background of Kunj Shah — B.Tech Computer Science at Indus University, Ahmedabad. AI/ML integration and automation."
        url={`${SITE_URL}/education`}
      />
      <PageHeader
        kicker="Education"
        title="Where I studied."
        lede="Formal education plus the courses and programs that shaped how I work."
        center
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto space-y-8">
          {EDUCATION.map((edu, i) => (
            <article key={i} className="pb-8 border-b border-rule/12 last:border-0">
              <div className="kicker">{edu.period}</div>
              <h3 className="display text-2xl mt-2">{edu.degree}</h3>
              <div className="font-mono text-sm text-ink-secondary mt-1">{edu.school}</div>
              {edu.summary && <p className="mt-3 text-ink-secondary leading-relaxed">{edu.summary}</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
