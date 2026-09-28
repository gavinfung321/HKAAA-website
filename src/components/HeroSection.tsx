import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { CloudFieldBackground } from './effects/cloud-field/CloudFieldBackground';
import { RotatingHeroPhrase } from './RotatingHeroPhrase';
import { GradientBeamCta } from './ui/GradientBeamCta';

/**
 * First-viewport hero: brand lockup, POV headline + rotator, one CTA, cloud-field stage.
 * Left-aligned type on all breakpoints; desktop offset so the field reads as the stage.
 * On scroll-out, clouds approach the copy (shader u_scroll); type lags slightly.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollProgressRef.current = reduceMotion ? 0 : v;
  });

  useEffect(() => {
    scrollProgressRef.current = reduceMotion ? 0 : scrollYProgress.get();
  }, [reduceMotion, scrollYProgress]);

  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 50]);
  const copyX = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 12]);

  return (
    <div
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-[100svh] overflow-hidden bg-[#050510]"
    >
      <CloudFieldBackground scrollProgressRef={scrollProgressRef} />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 28% 50%, rgba(5,5,16,0.72) 0%, transparent 68%)',
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-gray-900 from-20% via-gray-900/50 to-transparent md:h-52"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-6 pb-20 pt-28 md:px-10 md:pb-24 md:pt-24 lg:px-12">
        <motion.div
          className="w-full max-w-xl text-left will-change-transform"
          style={{ x: copyX, y: copyY }}
        >
          <p className="mb-4 text-2xl font-semibold tracking-[-0.02em] text-white animate-[fadeInLeft_0.9s_ease-out] opacity-0 [animation-fill-mode:forwards] md:mb-5 md:text-3xl lg:text-4xl">
            HKAAA
          </p>

          <h1 className="mb-5 text-[2.75rem] font-normal leading-[1.08] tracking-[-0.02em] text-white animate-[slideInRight_1s_ease-out_0.05s] opacity-0 [animation-fill-mode:forwards] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
            <span className="block md:whitespace-nowrap">
              Elevate with better
            </span>
            <span className="mt-0.5 block md:mt-1">
              <RotatingHeroPhrase />
            </span>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-gray-300/95 animate-[fadeInLeft_1s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards] md:mb-10 md:text-lg">
            We build your next-level website, drive organic traffic, and deploy AI when
            you&apos;re ready.
          </p>

          <div className="flex flex-col items-start gap-3.5 animate-[scaleIn_1s_ease-out_0.55s] opacity-0 [animation-fill-mode:forwards]">
            <GradientBeamCta />
            <p className="max-w-sm text-sm leading-snug text-gray-400">
              From first site to automation. One team in Hong Kong.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
