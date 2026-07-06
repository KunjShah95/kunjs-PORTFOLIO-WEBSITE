import { SKILL_GROUPS } from '../data/portfolio';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';
import { BentoGrid, BentoCard } from '../components/bento';
import { useReveal } from '../hooks/useReveal';

export function SkillsPage() {
  const groups: Array<{ name: string; items: string[] }> = SKILL_GROUPS.map((g) => ({
    name: g.category,
    items: g.skills,
  }));

  const { ref, inView } = useReveal({ amount: 0.1 });

  return (
    <>
      <SEO
        title="Skills — Kunj Shah"
        description="The tools Kunj Shah ships with — React, FastAPI, LangChain, PyTorch, Docker, and cloud infra. Full stack, AI/ML, and DevOps skills."
        url={`${SITE_URL}/skills`}
      />
      <PageHeader
        kicker="Skills"
        title="Tools I reach for, grouped by what they do."
        lede="Not a comprehensive list — just the things I use often enough to have opinions about."
        center
      />
      <section ref={ref} className="max-w-manifest mx-auto px-6 py-16">
        {inView && (
          <BentoGrid cols={2} className="border border-rule/12">
            {groups.map((g) => (
              <BentoCard key={g.name} variant="inset" className="p-8">
                <Kicker>{g.name}</Kicker>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="px-3 h-7 inline-flex items-center rounded-full bg-elevated border border-rule/12 text-sm font-mono text-ink-primary">
                      {s}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            ))}
          </BentoGrid>
        )}
      </section>
    </>
  );
}
