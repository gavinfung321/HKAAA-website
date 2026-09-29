import type { CSSProperties } from 'react';
import { PackageCheck, Sparkles, Users } from 'lucide-react';
import { BackgroundPaths } from './ui/background-paths';
import { GlassCard } from './ui/GlassCard';
import { headingJoinGap, useLocale, useMessages } from '../i18n';

const ICONS = [PackageCheck, Users, Sparkles] as const;

/**
 * Why Choose Us (#23) — centered header + spread glass cards (trial layout).
 * Legacy zig-zag in `WhyUsSection.legacy.tsx`.
 */
export function WhyUsSection() {
  const t = useMessages();
  const { locale } = useLocale();
  const gap = headingJoinGap(locale);

  return (
    <section
      id="why-us-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-14 md:px-10 md:py-20 lg:px-12"
    >
      <BackgroundPaths className="z-0 opacity-90" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {t.whyUs.h2Before}{gap}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.whyUs.h2Highlight}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
            {t.whyUs.sub}
          </p>
        </div>

        <ul className="mt-12 flex flex-col items-center justify-center gap-8 sm:mt-14 md:flex-row md:flex-wrap md:items-stretch md:gap-7 lg:gap-9">
          {t.whyUs.reasons.map((reason, index) => {
            const Icon = ICONS[index] ?? PackageCheck;
            return (
              <li
                key={reason.label}
                className="animate-on-scroll"
                style={{ '--animation-delay': `${0.08 + index * 0.07}s` } as CSSProperties}
              >
                <GlassCard
                  label={reason.label}
                  title={reason.title}
                  subhead={reason.subhead}
                  body={reason.body}
                  icon={Icon}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
