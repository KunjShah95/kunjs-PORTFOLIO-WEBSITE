import { PageHeader } from '../components/ui/PageHeader';
import { Rule } from '../components/ui/Rule';
import { SKILL_GROUPS, EXPERIENCE } from '../data/portfolio';
import { TracingBeam } from '../components/effects/TracingBeam';
import { TextReveal } from '../components/effects/TextReveal';
import { BentoGrid, BentoCard } from '../components/bento';

export function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="A short biography, written in first person."
        lede="I build in the open and ship to small audiences. The short version: agents, retrieval, and the backend to make them real."
        center
      />

      <article className="max-w-manifest mx-auto px-6 py-24">
        <TracingBeam className="max-w-prose mx-auto">
            <section id="bio">
              <h2 className="display text-3xl mb-6">Bio</h2>
              <TextReveal
                text="I'm 21, fourth-year CS at Indus University in Ahmedabad. Four hackathon finals, two production systems, one chatbot I still apologize for. I build agents in the hours I should be studying and write about the parts that broke."
                as="p"
                className="text-lg leading-relaxed text-ink-primary"
                delay={0.1}
              />
              <TextReveal
                text="My work has covered research workflows, voice interfaces, and the parts of retrieval that break when you push past the demo. I've shipped four hackathon finals, two production systems, and one chatbot I'm still embarrassed about."
                as="p"
                className="mt-6 text-lg leading-relaxed text-ink-secondary"
                delay={0.25}
              />
              <TextReveal
                text="If you write to me, I write back. Most weeks I'm working with founders and small teams who need someone to take a system from whiteboard to production in a few weeks, not a few quarters."
                as="p"
                className="mt-6 text-lg leading-relaxed text-ink-secondary"
                delay={0.4}
              />
            </section>

            <Rule label="Principles" />
            <section id="principles">
              <h2 className="display text-3xl mb-6">Principles</h2>
              <ol className="space-y-6">
                <li>
                  <div className="kicker">01</div>
                  <h3 className="display text-xl mt-2">Ship to learn.</h3>
                  <p className="mt-2 text-ink-secondary">A prototype in a notebook is a hypothesis. A deployed system with five users is a fact.</p>
                </li>
                <li>
                  <div className="kicker">02</div>
                  <h3 className="display text-xl mt-2">Agents are workflows first, prompts second.</h3>
                  <p className="mt-2 text-ink-secondary">The right architecture is 80% of the work. Prompt engineering is the last 20%.</p>
                </li>
                <li>
                  <div className="kicker">03</div>
                  <h3 className="display text-xl mt-2">Show the work.</h3>
                  <p className="mt-2 text-ink-secondary">Code, traces, costs, latency. If you can&rsquo;t show it, you don&rsquo;t know it.</p>
                </li>
                <li>
                  <div className="kicker">04</div>
                  <h3 className="display text-xl mt-2">Boring tech where it counts.</h3>
                  <p className="mt-2 text-ink-secondary">Postgres over a new vector DB. Cron over a queue. Boring is reliable.</p>
                </li>
              </ol>
            </section>

            <Rule label="Now" />
            <section id="now">
              <h2 className="display text-3xl mb-6">What I&rsquo;m doing now</h2>
              <p className="text-lg leading-relaxed text-ink-primary">
                Building a multi-agent research workflow that I keep rewriting. Writing essays about the parts that broke. Reading <em>Designing Data-Intensive Applications</em> for the third time, and finally understanding chapters I skimmed twice.
              </p>
            </section>

            <Rule label="Stack" />
            <section id="stack">
              <h2 className="display text-3xl mb-6">What I work with</h2>
              <p className="text-ink-secondary leading-relaxed mb-10 max-w-prose">
                The tools I reach for when shipping a system end-to-end — from the first prompt to the production deploy.
              </p>
              <BentoGrid cols={2} gap="sm" className="border border-rule/12 -mx-1">
                {SKILL_GROUPS.map((group, i) => {
                  const Icon = group.icon;
                  return (
                    <BentoCard key={group.category} variant="flat" hover="translate" className="p-7">
                      <div className="flex items-start justify-between mb-5">
                        <span className="kicker">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {Icon && (
                          <Icon
                            className="w-5 h-5 text-ink-tertiary group-hover:text-ink-primary transition-colors duration-base ease-out-soft"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        )}
                      </div>

                      <h3 className="display text-2xl leading-tight">
                        {group.category}
                      </h3>
                      <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                        {group.description}
                      </p>

                      <div className="mt-6 pt-5 border-t border-rule/12">
                        <div className="kicker mb-3">Stack</div>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.skills.map((skill) => (
                            <li
                              key={skill}
                              className="font-mono text-xs text-ink-primary px-2.5 py-1 border border-rule/12 rounded-pill bg-elevated/50 group-hover:border-rule/32 transition-colors"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </BentoCard>
                  );
                })}
              </BentoGrid>
            </section>

            <Rule label="CV" />
            <section id="cv">
              <h2 className="display text-3xl mb-6">Experience</h2>
              <div className="space-y-8">
                {EXPERIENCE.map((exp, i) => (
                  <article key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-8 border-b border-rule/12 last:border-0">
                    <div className="md:col-span-3">
                      <div className="kicker">{exp.period}</div>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="display text-xl">{exp.role}</h3>
                      <div className="font-mono text-sm text-ink-secondary mt-1">{exp.company}</div>
                      <p className="mt-3 text-ink-secondary leading-relaxed">{exp.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
        </TracingBeam>
      </article>
    </>
  );
}
