import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PHRASES = ['Websites', 'SEO', 'Workflows', 'Outreach'] as const;

const INTERVAL_MS = 2500;

type RotatingHeroPhraseProps = {
  className?: string;
};

/**
 * Vertical blur/slide rotator for the hero middle phrase.
 * Freezes on the first phrase when prefers-reduced-motion is set.
 */
export function RotatingHeroPhrase({ className }: RotatingHeroPhraseProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const phrase = PHRASES[index];

  if (reduceMotion) {
    return (
      <span className={className} aria-live="polite">
        {PHRASES[0]}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex h-[1.15em] min-w-[9ch] items-center justify-center overflow-hidden align-bottom ${className ?? ''}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrase}
          className="absolute inset-x-0 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ y: '70%', opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-70%', opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
      {/* Reserve width for longest label so layout doesn’t jump */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        Workflows
      </span>
    </span>
  );
}
