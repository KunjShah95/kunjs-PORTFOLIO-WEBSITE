import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'kunj-portfolio-loaded';

export function InitialLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem(SESSION_KEY);
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 800);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] bg-paper flex items-center justify-center"
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-4xl tracking-tightest text-ink-primary"
          >
            Kunj Shah
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
