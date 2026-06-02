import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BLOGS } from '../data/portfolio';
import { Kicker } from '../components/ui/Kicker';

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = BLOGS.find((b) => b.slug === slug);
  if (!blog) return <Navigate to="/blogs" replace />;

  return (
    <article>
      <header className="py-16 md:py-24 border-b border-rule/12">
        <div className="max-w-manifest mx-auto px-6">
          <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink-primary">
            <ArrowLeft className="w-3.5 h-3.5" /> All essays
          </Link>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 max-w-3xl">
            <Kicker accent>{blog.category} &middot; {blog.date}</Kicker>
            <h1 className="display text-4xl md:text-5xl mt-4 leading-tight tracking-tightest">{blog.title}</h1>
            <p className="mt-6 text-xl text-ink-secondary leading-relaxed font-display italic">{blog.excerpt}</p>
            <div className="mt-8 pt-6 border-t border-rule/12 flex items-center gap-4">
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
          <Link to="/blogs" className="display text-2xl mt-3 inline-block hover:text-accent transition-colors">
            More essays &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
}
