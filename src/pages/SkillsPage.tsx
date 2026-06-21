import { SKILL_GROUPS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';
import { BentoGrid, BentoCard } from '../components/bento';
import { useReveal } from '../hooks/useReveal';

export function SkillsPage() {
  const groups: Array<{ name: string; items: string[] }> = SKILL_GROUPS.map((g) => ({
    name: g.category,
    items: g.skills,
  }));

  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <>
      <PageHeader
        kicker="Skills"
        title="Tools I reach for, grouped by what they do."
        lede="Not a comprehensive list — just the things I use often enough to have opinions about."
        center
      />
      <section ref={ref} className="max-w-manifest mx-auto px-6 py-16">
        {isVisible && (
          <BentoGrid cols={2} gap="sm" className="border border-rule/12">
            {groups.map((g) => (
              <BentoCard key={g.name} variant="outlined" hover="translate" className="p-8">
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
