import { useRef } from 'react';
import { Quote } from './ui/Quote';
import { SectionLabel } from './ui/SectionLabel';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  source?: string;
}

export function Testimonials({ items = [] }: { items?: Testimonial[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  if (!items.length) return null;
  const [first, ...rest] = items;

  return (
    <section className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <SectionLabel number="05" label="Words from collaborators" />
        <Quote attribution={first.author} source={first.role}>
          {first.quote}
        </Quote>
        {rest.length > 0 && (
          <div className="mt-12 -mx-6 overflow-x-auto" ref={railRef} style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 px-6 pb-4 snap-x snap-mandatory">
              {rest.map((t, i) => (
                <article key={i} className="flex-shrink-0 w-80 snap-start border-l border-accent pl-6">
                  <p className="text-base leading-relaxed text-ink-primary">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 kicker">{t.author}{t.role && ` · ${t.role}`}</footer>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
