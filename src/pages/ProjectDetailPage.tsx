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

  return (
    <>
      <SEO
        title={`${project.title} — Kunj Shah`}
        description={project.desc}
        url={`${SITE_URL}/projects/${project.slug}`}
      />
      <PageHeader
        kicker={project.category ?? 'Project'}
        title={project.title}
        lede={project.desc}
        center
      >
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
            <ArrowLeft className="w-3.5 h-3.5" /> All projects
          </Link>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-primary underline decoration-ink-primary/30 underline-offset-4 hover:decoration-ink-primary/60">
              Live <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
              Source <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </PageHeader>

      <article className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto">

          <div className="mb-10">
            <MetaRow
              items={[
                { label: 'Role', value: 'Lead engineer' },
                { label: 'Status', value: project.impact ?? 'Archived' },
                { label: 'Stack', value: (project.tech ?? []).slice(0, 3).join(' · ') || '—' },
              ]}
            />
          </div>
          <h2 className="display text-3xl mb-4">Overview</h2>
          <p className="text-lg leading-relaxed">{project.problem ?? project.desc}</p>

          {project.outcome && (
            <>
              <Rule label="Outcome" />
              <h2 className="display text-3xl mb-4">Outcome</h2>
              <p className="text-lg leading-relaxed">{project.outcome}</p>
            </>
          )}

          {caseStudy && (
            <>
              <Rule label="The Full Story" />
              <div className="mt-4">
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
                          <div className="font-mono text-xs text-accent font-bold uppercase tracking-wider">Case Study</div>
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
