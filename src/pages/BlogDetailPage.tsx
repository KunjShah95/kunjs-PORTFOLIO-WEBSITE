import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLOGS } from '../data/portfolio';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { blogDateToIsoDate } from '../lib/seo-dates';
import { Kicker } from '../components/ui/Kicker';

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug);
  if (!blog) return <Navigate to="/blogs" replace />;
  const idx = BLOGS.findIndex((b) => b.slug === slug);
  const prev = idx > 0 ? BLOGS[idx - 1] : null;
  const next = idx < BLOGS.length - 1 ? BLOGS[idx + 1] : null;
  const related = BLOGS.filter((b) => b.slug !== slug && b.category === blog.category).slice(0, 2);

  const tags = blog.tags?.map((t) => t.toLowerCase().replace(/\s+/g, '-')) ?? []

  return (
    <article>
      <SEO
        title={`${blog.title} — Kunj Shah`}
        description={blog.excerpt}
        url={`${SITE_URL}/blogs/${blog.slug}`}
        type="article"
        articleHeadline={blog.title}
        articleSection={blog.category}
        articleTags={tags}
        keywords={[...tags, blog.category, 'Kunj Shah', 'AI essay']}
        datePublished={blogDateToIsoDate(blog.date)}
        dateModified={blogDateToIsoDate(blog.date)}
        articleImage={blog.coverImage ? `${SITE_URL}${blog.coverImage}` : `${SITE_URL}/og-image.png`}
        breadcrumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Writing', item: `${SITE_URL}/blogs` },
          { name: blog.title, item: `${SITE_URL}/blogs/${blog.slug}` },
        ]}
      />
      <header className="py-16 md:py-24 border-b border-rule/10">
        <div className="max-w-manifest mx-auto px-6">
          <div className="flex justify-center mb-8">
            <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
              <ArrowLeft className="w-3.5 h-3.5" /> All essays
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <Kicker accent>{blog.category} &middot; {blog.date}</Kicker>
            <h1 className="display text-4xl md:text-5xl mt-4 leading-tight tracking-tightest">{blog.title}</h1>
            <p className="mt-6 text-xl text-ink-secondary leading-relaxed font-display italic">{blog.excerpt}</p>
            <div className="mt-8 pt-6 border-t border-rule/10 flex items-center justify-center gap-4">
              <div className="kicker">By Kunj Shah</div>
              <div className="kicker">{blog.readTime ?? '5 min read'}</div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="max-w-manifest mx-auto px-6 py-16">
        <div className="max-w-prose mx-auto prose-editorial">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content ?? ''}
          </ReactMarkdown>
        </div>
      </div>

      <footer className="border-t border-rule/10 py-12">
        <div className="max-w-prose mx-auto px-6">
          {/* Prev / Next — session depth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {prev ? (
              <Link to={`/blogs/${prev.slug}`} className="group p-4 rounded-xl border border-rule/10 bg-elevated hover:border-accent/20 transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary">&larr; Previous</div>
                <div className="font-display text-sm font-semibold text-ink-primary group-hover:text-accent mt-1 line-clamp-1">{prev.title}</div>
                <div className="font-mono text-[11px] text-ink-tertiary mt-1">{prev.category} · {prev.date}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/blogs/${next.slug}`} className="group p-4 rounded-xl border border-rule/10 bg-elevated hover:border-accent/20 transition-colors text-right md:text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary">Next &rarr;</div>
                <div className="font-display text-sm font-semibold text-ink-primary group-hover:text-accent mt-1 line-clamp-1">{next.title}</div>
                <div className="font-mono text-[11px] text-ink-tertiary mt-1">{next.category} · {next.date}</div>
              </Link>
            ) : <div />}
          </div>

          {related.length > 0 && (
            <div className="mb-10">
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-tertiary mb-3">Related in {blog.category}</div>
              <div className="grid grid-cols-1 gap-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blogs/${r.slug}`} className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-rule/10 bg-elevated hover:border-accent/20 transition-colors">
                    <div>
                      <div className="font-display text-sm font-semibold group-hover:text-accent">{r.title}</div>
                      <div className="font-mono text-[11px] text-ink-tertiary mt-0.5">{r.date} · {r.readTime} min read</div>
                    </div>
                    <span className="text-ink-quaternary group-hover:text-accent">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="kicker">Continue reading</div>
          <Link to="/blogs" className="display text-2xl mt-3 inline-block hover:underline decoration-ink-primary/40 underline-offset-4">
            More essays &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
}
