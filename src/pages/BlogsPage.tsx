import { Link } from 'react-router-dom';
import { BLOGS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';
import { BentoGrid, BentoCard } from '../components/bento';
import { useReveal } from '../hooks/useReveal';

export function BlogsPage() {
  const byYear = BLOGS.reduce((acc, blog) => {
    const year = blog.date?.match(/\d{4}/)?.[0] ?? 'Undated';
    (acc[year] = acc[year] || []).push(blog);
    return acc;
  }, {} as Record<string, typeof BLOGS>);

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));
  const { ref, isVisible } = useReveal({ threshold: 0.1 });

  return (
    <>
      <PageHeader
        kicker="Writing"
        title={`${BLOGS.length} essays on AI, agents, and shipping.`}
        lede="Long-form notes from building production systems. No newsletter, no schedule — published when there's something worth saying."
        center
      />
      <section ref={ref} className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {years.map((year) => (
            <div key={year} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-rule/12">
                <div className="kicker">{year}</div>
                <div className="font-mono text-3xl text-ink-primary">{byYear[year].length}</div>
              </div>
              {isVisible && (
                <BentoGrid cols={1} gap="sm">
                  {byYear[year].map((blog) => (
                    <BentoCard key={blog.id} variant="flat" hover="translate" className="py-6">
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="group flex flex-col md:flex-row gap-4 px-4"
                      >
                        <div className="md:w-1/4 shrink-0">
                          <Kicker>{blog.category}</Kicker>
                          <div className="font-mono text-xs text-ink-tertiary mt-1">{blog.date}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="display text-2xl group-hover:underline decoration-ink-primary/40 underline-offset-4 leading-tight">{blog.title}</h3>
                          <p className="mt-2 text-sm text-ink-secondary line-clamp-2">{blog.excerpt}</p>
                        </div>
                        <div className="md:w-16 shrink-0 flex md:justify-end items-start">
                          <div className="kicker">{blog.readTime ?? '5 min'}</div>
                        </div>
                      </Link>
                    </BentoCard>
                  ))}
                </BentoGrid>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
