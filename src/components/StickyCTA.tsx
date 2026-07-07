import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function StickyCTA() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const finalCta = document.getElementById('final-cta');
    const onScroll = () => {
      const pastThreshold = window.scrollY > 600;
      if (finalCta) {
        const rect = finalCta.getBoundingClientRect();
        const finalCtaVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setShow(pastThreshold && !finalCtaVisible);
      } else {
        setShow(pastThreshold);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/contact') return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-30 hidden md:block transition-all duration-base ease-out-soft ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Link
        to="/contact"
        className="group inline-flex items-center gap-2 px-5 h-11 rounded-md bg-inverse text-ink-inverse font-body text-sm font-medium hover:bg-accent transition-colors duration-base ease-out-soft shadow-[0_8px_24px_-8px_rgb(0_0_0_/0.25)]"
      >
        Have an agent to ship?
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
