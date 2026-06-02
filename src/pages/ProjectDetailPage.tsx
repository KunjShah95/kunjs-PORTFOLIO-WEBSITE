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
      >
        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
            <ArrowLeft className="w-3.5 h-3.5" /> All projects
          </Link>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <MetaRow
              items={[
                { label: 'Role', value: 'Lead engineer' },
                { label: 'Status', value: project.impact ?? 'Archived' },
                { label: 'Stack', value: (project.tech ?? []).slice(0, 3).join(' · ') || '—' },
              ]}
            />
          </div>
          <div className="md:col-span-9 max-w-prose">
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
        </div>
      </article>
    </>
  );
}
