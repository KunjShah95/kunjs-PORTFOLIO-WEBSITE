import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen } from 'lucide-react';
import { PROJECTS, BLOGS } from '../data/portfolio';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { PageHeader } from '../components/ui/PageHeader';
import { MetaRow } from '../components/ui/MetaRow';
import { Rule } from '../components/ui/Rule';
import { LiquidGlass, SpotlightCard } from '../components/effects';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;
  const caseStudy = project.caseStudy
    ? BLOGS.find((b) => b.slug === project.caseStudy)
    : null;

  const metrics = project.metrics ? Object.entries(project.metrics) : null;
  const benchmarks = project.benchmarks ? Object.entries(project.benchmarks) : null;

  return (
    <>
      <SEO
        title={`${project.title} — Kunj Shah`}
        description={`${project.desc} ${project.outcome ? `Outcome: ${project.outcome}` : ''} Stack: ${(project.tech ?? []).join(', ')}. Full case study with architecture, benchmarks, and lessons learned.`}
        url={`${SITE_URL}/projects/${project.slug}`}
        image={`${SITE_URL}/og-image.png`}
        projectData={{
          name: project.title,
          description: project.desc,
          url: `${SITE_URL}/projects/${project.slug}`,
          applicationCategory: project.category,
          programmingLanguage: (project.tech ?? []).slice(0, 3).join(', '),
        }}
      />
      <PageHeader
        kicker={project.category ?? 'Project'}
        title={project.title}
        lede={project.desc}
        center
      >
        <div className="mt-6 flex items-center gap-3 flex-wrap justify-center">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
            <ArrowLeft className="w-3.5 h-3.5" /> All projects
          </Link>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-primary underline decoration-ink-primary/30 underline-offset-4 hover:decoration-ink-primary/60">
              Live demo <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
              Source code <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </PageHeader>

      <article className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto">

          {/* Meta row */}
          <div className="mb-12">
            <MetaRow
              items={[
                { label: 'Role', value: 'Lead engineer' },
                { label: 'Status', value: project.impact ?? 'Archived' },
                { label: 'Stack', value: (project.tech ?? []).join(' · ') || '—' },
              ]}
            />
          </div>

          {/* Key Metrics Grid */}
          {metrics && metrics.length > 0 && (
            <div className="mb-12 p-6 rounded-2xl border border-rule/12 bg-elevated/60 noise-texture">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent font-bold">Key Metrics</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {metrics.slice(0, 4).map(([key, val]) => (
                  <div key={key} className="flex flex-col gap-0.5">
                    <span className="display text-xl font-bold text-ink-primary tabular-nums">{val}</span>
                    <span className="font-mono text-[11px] text-ink-tertiary leading-tight">{key}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Outcome */}
          <div className="space-y-8 mb-12">
            <div>
              <h2 className="display text-2xl mb-3">Problem</h2>
              <p className="text-base leading-relaxed text-ink-secondary">{project.problem ?? project.desc}</p>
            </div>
            {project.outcome && (
              <div>
                <h2 className="display text-2xl mb-3">Outcome</h2>
                <p className="text-base leading-relaxed text-ink-primary font-medium">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* Architecture */}
          {project.architecture && (
            <>
              <Rule label="Architecture" />
              <div className="mb-10">
                <h2 className="display text-2xl mb-4">Architecture &amp; Design</h2>
                <div className="p-6 rounded-2xl border border-rule/12 bg-sunken/30 font-mono text-sm leading-relaxed text-ink-secondary">
                  <div className="flex items-center gap-2 mb-4 text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-bold text-xs uppercase tracking-wider">System Overview</span>
                  </div>
                  {project.architecture}
                </div>
              </div>
            </>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <>
              <Rule label="Challenges" />
              <div className="mb-10">
                <h2 className="display text-2xl mb-4">Engineering Challenges</h2>
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent font-mono text-sm shrink-0 mt-0.5">0{i + 1}</span>
                      <p className="text-base leading-relaxed text-ink-secondary">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Benchmarks */}
          {benchmarks && benchmarks.length > 0 && (
            <>
              <Rule label="Benchmarks" />
              <div className="mb-10">
                <h2 className="display text-2xl mb-4">Benchmarks &amp; Performance</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {benchmarks.map(([key, val]) => (
                    <div key={key} className="p-4 rounded-xl border border-rule/12 bg-elevated/40">
                      <div className="text-accent font-bold text-lg tabular-nums font-mono">{val}</div>
                      <div className="text-[12px] text-ink-tertiary mt-0.5 font-mono">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Lessons */}
          {project.lessons && project.lessons.length > 0 && (
            <>
              <Rule label="Lessons Learned" />
              <div className="mb-10">
                <h2 className="display text-2xl mb-4">Lessons Learned</h2>
                <div className="space-y-3">
                  {project.lessons.map((l, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-xl border border-rule/12 bg-accent/5">
                      <span className="text-accent mt-0.5">*</span>
                      <p className="text-sm leading-relaxed text-ink-secondary">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Case Study Link */}
          {caseStudy && (
            <>
              <Rule label="The Full Story" />
              <div className="mt-4 mb-20">
                <Link
                  to={`/blogs/${caseStudy.slug}`}
                  className="block group no-underline"
                >
                  <SpotlightCard className="rounded-2xl">
                    <LiquidGlass
                      intensity="subtle"
                      tint="rgba(124, 118, 255, 0.08)"
                      className="p-6 md:p-8 border border-rule/12 rounded-2xl hover:border-accent/30 transition-all group"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                          <BookOpen className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="font-mono text-xs text-accent font-bold uppercase tracking-wider">Deep Dive Case Study</div>
                          <h3 className="display text-xl font-bold mt-2 text-ink-primary group-hover:text-accent transition-colors">
                            {caseStudy.title}
                          </h3>
                          <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                            {caseStudy.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-3 text-sm text-ink-tertiary">
                            <span>{caseStudy.date}</span>
                            <span>&middot;</span>
                            <span>{caseStudy.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </LiquidGlass>
                  </SpotlightCard>
                </Link>
              </div>
            </>
          )}
        </div>
      </article>
    </>
  );
}
