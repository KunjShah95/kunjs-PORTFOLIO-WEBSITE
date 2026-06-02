import { PageHeader } from '../components/ui/PageHeader';
import { MetaRow } from '../components/ui/MetaRow';
import { Rule } from '../components/ui/Rule';
import { EXPERIENCE } from '../data/portfolio';

export function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="A short biography, written in first person."
        lede="I'm Kunj — an AI engineer working on agentic systems, retrieval pipelines, and the messy boundary where models meet production."
      />

      <article className="max-w-manifest mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <aside className="md:col-span-3">
            <nav className="sticky top-24 flex flex-col gap-2 text-sm" aria-label="Page sections">
              <div className="kicker mb-2">Index</div>
              <a href="#bio" className="text-ink-secondary hover:text-ink-primary">Bio</a>
              <a href="#principles" className="text-ink-secondary hover:text-ink-primary">Principles</a>
              <a href="#now" className="text-ink-secondary hover:text-ink-primary">Now</a>
              <a href="#stack" className="text-ink-secondary hover:text-ink-primary">Stack</a>
              <a href="#cv" className="text-ink-secondary hover:text-ink-primary">CV</a>
            </nav>
          </aside>

          <div className="md:col-span-9 max-w-prose">
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
              <MetaRow
                items={[
                  { label: 'Languages', value: 'TypeScript · Python · Go' },
                  { label: 'AI/Agents', value: 'LangGraph · CrewAI · Vapi' },
                  { label: 'Infra', value: 'Cloudflare · Vercel · Postgres' },
                  { label: 'Tools', value: 'Framer Motion · Tailwind · Vite' },
                ]}
              />
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
        </div>
      </article>
    </>
  );
}
