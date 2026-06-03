import { motion } from 'framer-motion';
import { SKILL_GROUPS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';

export function SkillsPage() {
  const groups: Array<{ name: string; items: string[] }> = SKILL_GROUPS.map((g) => ({
    name: g.category,
    items: g.skills,
  }));

  return (
    <>
      <PageHeader
        kicker="Skills"
        title="Tools I reach for, grouped by what they do."
        lede="Not a comprehensive list — just the things I use often enough to have opinions about."
        center
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule/12">
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-paper p-8"
            >
              <Kicker>{g.name}</Kicker>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="px-3 h-7 inline-flex items-center rounded-full bg-elevated border border-rule/12 text-sm font-mono text-ink-primary">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
