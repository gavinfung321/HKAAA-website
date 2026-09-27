import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

type FloatingPathsProps = {
  position: number;
  animate: boolean;
};

function FloatingPaths({ position, animate }: FloatingPathsProps) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Soft violet — brand-adjacent, quieter than Process laser cyan */}
      <svg
        className="h-full w-full text-violet-300"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.025}
            initial={{ pathLength: 0.3, opacity: 0.55 }}
            animate={
              animate
                ? {
                    pathLength: 1,
                    opacity: [0.25, 0.55, 0.25],
                    pathOffset: [0, 1, 0],
                  }
                : { pathLength: 0.85, opacity: 0.35, pathOffset: 0 }
            }
            transition={
              animate
                ? {
                    duration: 22 + (path.id % 10),
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }
                : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}

type BackgroundPathsProps = {
  className?: string;
};

/**
 * Aceternity-style floating paths — background only (no demo title/CTA).
 * Stroke tinted violet to sit with HKAAA purple/pink accents.
 */
export function BackgroundPaths({ className }: BackgroundPathsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <FloatingPaths position={1} animate={!reduceMotion} />
      <FloatingPaths position={-1} animate={!reduceMotion} />
    </div>
  );
}
