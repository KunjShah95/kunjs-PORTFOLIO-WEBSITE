import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { IDENTITY, SOCIALS } from '@/lib/site'
import s from './about.module.css'

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'How Kunj Shah thinks about engineering AI systems: what he builds, what he cares about, what has broken, and what he is currently exploring.',
  path: '/about',
})

const THINKING = [
  {
    n: '01',
    title: 'The failure is usually structural',
    body: 'Almost every agent failure I have debugged was a missing checkpoint, an unbounded loop, or a missing verification stage. A better model hides those failures right up until the day it does not. So I design for the failure case first and the happy path second.',
  },
  {
    n: '02',
    title: 'Accuracy is not the same as trustworthiness',
    body: 'A system can be 95% accurate and still hurt someone in the other 5%. If it affects a real decision, the edge cases are people, not bugs. That is why most of my outputs are framed as something a person can disagree with.',
  },
  {
    n: '03',
    title: 'Provenance beats polish',
    body: 'A citation is worth more than a confident paragraph. The single constraint that turned my workspace assistant from something that lies into something people rely on was: no source, no claim. Everything else was interface work.',
  },
  {
    n: '04',
    title: 'A number you cannot check is worse than no number',
    body: 'This is why there is no skill percentage anywhere on this site, and why every figure in a case study traces to a benchmark or a measurement. If I cannot evidence it, it does not go on the page.',
  },
  {
    n: '05',
    title: 'Boring edges, opinionated middles',
    body: 'Postgres for storage, a scheduler for jobs, HTTP between services. The interesting decisions belong in the retrieval strategy and the agent loop, not in the storage layer nobody will ever praise.',
  },
  {
    n: '06',
    title: 'Build to understand, not to ship',
    body: 'I have written a tokenizer, a vector database and a transformer from scratch, none of which were necessary. Each one was the fastest way I found to understand something I could then use correctly in work that mattered.',
  },
]

const CARING = [
  {
    title: 'Systems that fail legibly',
    body: 'When it breaks, I want it to break in a way that tells you why. Silent degradation is the failure mode I care about most — the model still answers, it is just wrong, and nobody notices for a month.',
  },
  {
    title: 'Decisions with an owner',
    body: 'Every threshold, every trade-off and every "this is good enough" should belong to a named person. Systems that make choices on someone’s behalf without them knowing are where the real damage happens.',
  },
  {
    title: 'The last mile of the stack',
    body: 'Cold starts, latency, index selection, the quantisation that keeps accuracy. The interesting engineering in an AI system is almost never in the model — it is in the four hundred milliseconds around it.',
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <div className="shell">
        <PageHeader
          index="04"
          title="About"
          lede="I build AI systems end to end — the retrieval layer, the agent loop, the service around it, and the reason it is shaped that way. Most of what I have shipped was shaped by a failure."
          meta={[
            { k: 'Based in', v: IDENTITY.location },
            { k: 'Focus', v: 'Agents, retrieval, model infra' },
            { k: 'Currently', v: 'Ideaboat — AI/ML intern' },
            { k: 'Status', v: 'Open to roles' },
          ]}
        />

        <div className={s.intro}>
          <p className={s.lede}>
            There is a specific kind of engineer I am trying to be: someone who
            can hold the retrieval strategy and the deployment topology in the
            same conversation, and who notices when a decision in one is
            quietly creating a problem in the other.
          </p>
          <div className={s.introCols}>
            <p>
              Most of my work is on the seam between an LLM and the system around
              it. That seam is where reliability actually lives — the chunking
              strategy, the index, the threshold, the retry, the citation. The
              model is the part everyone wants to talk about and the part that
              is least likely to be the thing that breaks.
            </p>
            <p>
              I work in the open. Every system on this site has its source
              linked, its architecture written out, and its failures described
              honestly. I have contributed to external projects including OWASP's
              agent-security regression harness and Microsoft's AI-Engineering-Coach,
              because being reviewed by people who do not know me is the cheapest
              quality control there is.
            </p>
          </div>
        </div>

        <section className={s.thinking} aria-labelledby="thinking-heading">
          <Marker index="A" label="How I think" aside="Six positions, all earned" />
          <h2 className="visually-hidden" id="thinking-heading">
            How I think about engineering AI systems
          </h2>
          <ol className={s.thinkingList}>
            {THINKING.map((item) => (
              <li className={s.thinkingItem} key={item.n}>
                <span className={s.thinkingN}>{item.n}</span>
                <h3 className={s.thinkingTitle}>{item.title}</h3>
                <p className={s.thinkingBody}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.caring} aria-labelledby="caring-heading">
          <Marker index="B" label="What I care about" />
          <h2 className="visually-hidden" id="caring-heading">
            What I care about
          </h2>
          <div className={s.caringGrid}>
            {CARING.map((c) => (
              <div className={s.caringItem} key={c.title}>
                <h3 className={s.caringTitle}>{c.title}</h3>
                <p className={s.caringBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={s.exploring} aria-labelledby="exploring-heading">
          <Marker index="C" label="What I am exploring now" aside="Live — see /lab" />
          <h2 className="visually-hidden" id="exploring-heading">
            Current explorations
          </h2>
          <ul className={s.exploringList}>
            <li>
              <span className={s.exploringTitle}>Retrieval precision</span>
              <span className={s.exploringBody}>
                Whether a cheap verification pass beats spending the same budget
                on a larger context window. So far: it depends entirely on the
                cost of being wrong.
              </span>
              <Link href="/lab/high-precision-rag" className={s.exploringLink}>
                LAB 02 →
              </Link>
            </li>
            <li>
              <span className={s.exploringTitle}>Local inference</span>
              <span className={s.exploringBody}>
                KV-cache quantisation and the memory-bandwidth wall. The reason
                local models are still slower than the cloud is rarely compute.
              </span>
              <Link href="/lab/local-inference" className={s.exploringLink}>
                LAB 01 →
              </Link>
            </li>
            <li>
              <span className={s.exploringTitle}>Agent security as a regression class</span>
              <span className={s.exploringBody}>
                Prompt injection treated as a testable property rather than an
                arms race. The open problem is gradual drift over a long-running
                goal, where no single step is exploitable.
              </span>
              <Link href="/lab/agent-security" className={s.exploringLink}>
                LAB 10 →
              </Link>
            </li>
          </ul>
        </section>

        <section className={s.elsewhere}>
          <Marker index="D" label="Elsewhere" />
          <ul className={s.elsewhereList}>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={s.elsewhereLink}
                >
                  <span>{social.label}</span>
                  <span className="faint">{social.handle}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={IDENTITY.resume} target="_blank" rel="noreferrer noopener" className={s.elsewhereLink}>
                <span>Résumé</span>
                <span className="faint">PDF</span>
              </a>
            </li>
          </ul>
          <p className={s.elsewhereFoot}>
            <Link href="/contact" className="link-wipe mono">
              Get in touch →
            </Link>
          </p>
        </section>
      </div>
    </>
  )
}
