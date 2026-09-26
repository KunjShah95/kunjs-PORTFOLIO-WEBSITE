import Link from 'next/link'

import { Hero } from '@/components/home/Hero'
import { NowStrip } from '@/components/home/NowStrip'
import { ProjectIndex } from '@/components/work/ProjectIndex'
import { LabList } from '@/components/lab/LabList'
import { NoteIndex } from '@/components/writing/NoteIndex'
import { Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { itemListLd } from '@/lib/seo'
import { getLab, getNotes, getNow, getProjects } from '@/lib/content'
import { IDENTITY, SOCIALS } from '@/lib/site'
import s from './page.module.css'

export default function HomePage() {
  const now = getNow()
  const projects = getProjects()
  const lab = getLab()
  const notes = getNotes()

  return (
    <>
      <JsonLd
        data={itemListLd('Shipped work by Kunj Shah', projects.map((p) => ({
          name: p.title,
          path: `/work/${p.slug}`,
          description: p.summary,
        })))}
      />

      <Hero now={now} />

      {/* ------------------------------------------------------------ NOW */}
      <section className={`shell ${s.now}`} aria-label="Current status">
        <NowStrip now={now} />
      </section>

      {/* ----------------------------------------------------------- WORK */}
      <section className={`band surface-minimal ${s.work}`} id="work" aria-labelledby="work-heading">
        <div className="shell">
          <Marker
            index="01"
            label="Work"
            aside={`${projects.length} shipped systems`}
          />
          <h2 className="visually-hidden" id="work-heading">
            Shipped work
          </h2>
          <p className={s.sectionLede}>
            Systems that run in production, with the reasoning behind them
            written up in full. No concept pieces, no mock-ups.
          </p>
          <ProjectIndex projects={projects} />
          <p className={s.sectionFoot}>
            <Link href="/work" className="link-wipe mono">
              All case studies →
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ LAB */}
      <section
        className={`band surface-blueprint ${s.lab}`}
        id="lab"
        aria-labelledby="lab-heading"
      >
        <div className="shell">
          <Marker index="02" label="Lab" aside="Unfinished, on purpose" />
          <h2 className="visually-hidden" id="lab-heading">
            Lab experiments
          </h2>
          <p className={s.labLede}>
            <span className={s.labLedeLead}>Work is shipped. Lab is exploring.</span>{' '}
            Every entry states a hypothesis, the technologies involved, and what
            actually happened — including the parts that did not work.
          </p>
          <LabList entries={lab} />
          <p className={s.sectionFoot}>
            <Link href="/lab" className="link-wipe mono">
              The lab index →
            </Link>
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- STACK */}
      <section className={`band surface-minimal ${s.stack}`} aria-labelledby="stack-heading">
        <div className="shell">
          <Marker index="03" label="Stack" aside="Evidence, not self-assessment" />
          <h2 className="visually-hidden" id="stack-heading">
            Technology map
          </h2>
          <p className={s.sectionLede}>
            Every technology on this site is linked to the system it was used in.
            There is no skill percentage anywhere on this site, because I have no
            way to measure one honestly.
          </p>
          <p className={s.stackCta}>
            <Link href="/stack" className="link-wipe mono">
              Open the technology map →
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- WRITING */}
      <section className={`band surface-minimal ${s.writing}`} aria-labelledby="writing-heading">
        <div className="shell">
          <Marker index="04" label="Writing" aside="Field Notes" />
          <h2 className="visually-hidden" id="writing-heading">
            Field Notes
          </h2>
          <p className={s.sectionLede}>
            Notes on systems, engineering decisions and the failures. The
            failures are the useful part.
          </p>
          <NoteIndex notes={notes.slice(0, 4)} />
          <p className={s.sectionFoot}>
            <Link href="/writing" className="link-wipe mono">
              All {notes.length} notes →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- ABOUT */}
      <section className={`band surface-minimal ${s.about}`} aria-labelledby="about-heading">
        <div className="shell">
          <div className={s.aboutGrid}>
            <div>
              <Marker index="05" label="About" />
              <h2 className={s.aboutTitle} id="about-heading">
                Engineering first.
                <br />
                Product second.
                <br />
                <em>Both at once.</em>
              </h2>
            </div>
            <div className={s.aboutBody}>
              <p>
                I build AI systems end to end: the retrieval layer, the agent
                loop, the service around it, and the reason it is shaped that
                way. Most of what I have shipped was shaped by a failure —
                a hallucination, a cold start, a claim I could not evidence.
              </p>
              <p>
                What I care about is the part that is usually skipped. What the
                system does when it is wrong. Who owns the decision. Whether the
                number on the dashboard can be traced back to something real.
              </p>
              <p className={s.aboutSocials}>
                {SOCIALS.slice(0, 3).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={s.aboutSocial}
                  >
                    {social.label} ↗
                  </a>
                ))}
              </p>
              <p className={s.aboutFoot}>
                <Link href="/about" className="link-wipe mono">
                  More about how I work →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
