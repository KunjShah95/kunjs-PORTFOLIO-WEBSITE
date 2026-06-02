import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOGS } from '../data/portfolio';
import { PageHeader } from '../components/ui/PageHeader';
import { Kicker } from '../components/ui/Kicker';

export function BlogsPage() {
  const byYear = BLOGS.reduce((acc, blog) => {
    const year = blog.date?.match(/\d{4}/)?.[0] ?? 'Undated';
    (acc[year] = acc[year] || []).push(blog);
    return acc;
  }, {} as Record<string, typeof BLOGS>);

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <PageHeader
        kicker="Writing"
        title={`${BLOGS.length} essays on AI, agents, and shipping.`}
        lede="Long-form notes from building production systems. No newsletter, no schedule — published when there's something worth saying."
      />
      <section className="max-w-manifest mx-auto px-6 py-16">
        {years.map((year) => (
          <div key={year} className="mb-16 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-4 mb-4 border-b border-rule/12">
              <div className="md:col-span-3">
                <div className="kicker">{year}</div>
                <div className="font-mono text-3xl text-ink-primary mt-1">{byYear[year].length}</div>
              </div>
            </div>
            <div className="divide-y divide-rule/12">
              {byYear[year].map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-6 hover:bg-elevated/50 -mx-4 px-4 rounded-sm transition-colors"
                  >
                    <div className="md:col-span-3">
                      <Kicker>{blog.category}</Kicker>
                      <div className="font-mono text-xs text-ink-tertiary mt-1">{blog.date}</div>
                    </div>
                    <div className="md:col-span-7">
                      <h3 className="display text-2xl group-hover:text-accent transition-colors leading-tight">{blog.title}</h3>
                      <p className="mt-2 text-sm text-ink-secondary line-clamp-2">{blog.excerpt}</p>
                    </div>
                    <div className="md:col-span-2 flex md:justify-end items-start">
                      <div className="kicker">{blog.readTime ?? '5 min'}</div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
