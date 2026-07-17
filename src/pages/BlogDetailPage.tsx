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
      />
      <header className="py-16 md:py-24 border-b border-rule/12">
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
            <div className="mt-8 pt-6 border-t border-rule/12 flex items-center justify-center gap-4">
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

      <footer className="border-t border-rule/12 py-16">
        <div className="max-w-prose mx-auto px-6">
          <div className="kicker">Continue reading</div>
          <Link to="/blogs" className="display text-2xl mt-3 inline-block hover:underline decoration-ink-primary/40 underline-offset-4">
            More essays &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
}
