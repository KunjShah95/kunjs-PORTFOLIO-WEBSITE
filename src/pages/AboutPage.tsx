import { PageHeader } from '../components/ui/PageHeader';
import { Rule } from '../components/ui/Rule';
import { SKILL_GROUPS, EXPERIENCE } from '../data/portfolio';

export function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="A short biography, written in first person."
        lede="I'm Kunj — an AI engineer working on agentic systems, retrieval pipelines, and the messy boundary where models meet production."
        center
      />

      <article className="max-w-manifest mx-auto px-6 py-24">
        <div className="max-w-prose mx-auto">
            <section id="bio">
              <h2 className="display text-3xl mb-6">Bio</h2>
              <p className="text-lg leading-relaxed text-ink-primary">
                I build agents that ship to real users. My work spans autonomous research workflows, voice-driven operating systems, retrieval-augmented generation at scale, and the operational scaffolding that keeps these things reliable in production.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
                I'm based in Ahmedabad, IN. I work with founders and small teams who need an AI engineer who can take a system from whiteboard to production in weeks, not quarters.
              </p>
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
                Building multi-agent research workflows. Writing essays about what breaks in production. Reading <em>Designing Data-Intensive Applications</em> for the third time.
              </p>
            </section>

            <Rule label="Stack" />
            <section id="stack">
              <h2 className="display text-3xl mb-6">What I work with</h2>
              <p className="text-ink-secondary leading-relaxed mb-10 max-w-prose">
                The tools I reach for when shipping a system end-to-end — from the first prompt to the production deploy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule/12 border border-rule/12 -mx-1">
                {SKILL_GROUPS.map((group, i) => {
                  const Icon = group.icon;
                  return (
                    <article
                      key={group.category}
                      className="group relative bg-paper p-7 transition-colors duration-base ease-out-soft hover:bg-elevated"
                    >
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

                      <span
                        aria-hidden
                        className="absolute top-0 left-0 h-px w-0 bg-ink-primary group-hover:w-full transition-all duration-slow ease-out-soft"
                      />
                    </article>
                  );
                })}
              </div>
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
        </div>
      </article>
    </>
  );
}
