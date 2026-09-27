import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PHRASES = ['Websites', 'SEO', 'Chatbots', 'Automation'] as const;

const INTERVAL_MS = 2800;

type RotatingHeroPhraseProps = {
  className?: string;
};

/**
 * Vertical slide rotator for the hero phrase.
 * Clipped tightly so exit frames don’t ghost under the line above.
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
      <span
        className={`bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${className ?? ''}`}
        aria-live="polite"
      >
        {PHRASES[0]}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex h-[1.15em] min-w-[11ch] items-center justify-start overflow-hidden align-bottom max-md:mx-auto max-md:justify-center ${className ?? ''}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phrase}
          className="absolute left-0 top-0 whitespace-nowrap bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent max-md:right-0 max-md:left-0 max-md:text-center"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
      <span className="invisible whitespace-nowrap" aria-hidden>
        Automation
      </span>
    </span>
  );
}
