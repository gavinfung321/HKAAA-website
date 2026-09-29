import type { CSSProperties } from 'react';
import { LaserMatrixBackground } from './effects/laser-matrix/LaserMatrixBackground';
import { headingJoinGap, useLocale, useMessages } from '../i18n';

/**
 * Process timeline — left-aligned over Matrix Junction laser.
 */
export function ProcessSection() {
  const t = useMessages();
  const { locale } = useLocale();
  const gap = headingJoinGap(locale);

  return (
    <section
      id="process-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 md:px-10 md:py-24 lg:px-12"
    >
      <LaserMatrixBackground className="z-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-gray-900 via-gray-900/70 to-transparent md:h-36"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent md:h-36"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent md:via-gray-900/45"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-xl text-left animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.process.h2Before}{gap}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.process.h2Highlight}
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">{t.process.sub}</p>
        </div>

        <ol className="relative mt-14 max-w-2xl md:mt-16">
          <div
            aria-hidden
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-gradient-to-b from-purple-500/40 via-white/10 to-transparent md:left-[0.9375rem]"
          />

          {t.process.steps.map((step, index) => (
            <li
              key={step.number}
              className="group relative flex gap-5 pb-12 last:pb-0 md:gap-8 md:pb-16 animate-on-scroll"
              style={{ '--animation-delay': `${0.12 + index * 0.1}s` } as CSSProperties}
            >
              <div className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center md:h-8 md:w-8">
                <span className="absolute inset-0 rounded-full border border-white/15 bg-gray-900/80 transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-[0_0_16px_rgba(192,132,252,0.55)]" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-purple-400/80 transition-all duration-300 group-hover:scale-150 group-hover:bg-purple-300 md:h-2 md:w-2" />
              </div>

              <div className="min-w-0 flex-1 origin-left pt-0.5 md:pt-1">
                <span className="inline-block font-mono text-xs tracking-[0.14em] text-purple-400/70 transition-all duration-300 group-hover:text-purple-300 md:text-sm">
                  {step.number}
                </span>
                <h3 className="mt-1.5 origin-left text-2xl font-normal tracking-tight text-white transition-all duration-300 group-hover:scale-[1.06] group-hover:drop-shadow-[0_0_18px_rgba(232,121,249,0.45)] md:text-3xl">
                  <span className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-white">
                    {step.title}
                  </span>
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200 md:text-base">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
