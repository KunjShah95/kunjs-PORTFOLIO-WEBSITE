import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { MetaRow } from '../components/ui/MetaRow';
import { Rule } from '../components/ui/Rule';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
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
          {project.videoUrl && (() => {
            const u = new URL(project.videoUrl)
            const id = u.searchParams.get('v')
            return id ? (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-12 block aspect-video overflow-hidden rounded-md border border-rule/12 bg-sunken relative"
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt={`${project.title} demo video`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-paper fill-current ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            ) : null
          })()}
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
        </div>
      </article>
    </>
  );
}
