import { ArrowRight } from 'lucide-react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

const CALENDLY_URL = 'https://calendly.com/hkaiautomationagency/30min';

type GradientBeamCtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href?: string;
  children?: ReactNode;
};

/**
 * Authored gradient-beam pill CTA (DOM/CSS), regraded to HKAAA purple/pink.
 * Glass face + hollow beam ring so the hero shows through (backdrop-blur).
 * Reduced-motion: beam and dots pause via CSS.
 */
export function GradientBeamCta({
  href = CALENDLY_URL,
  children = 'Book a Call',
  className,
  ...props
}: GradientBeamCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full',
        'px-10 py-4 text-base font-medium tracking-wide text-white',
        'transition-all duration-500 hover:scale-[1.02]',
        'hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.65)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400',
        className
      )}
      {...props}
    >
      {/* Beam as a ring only (mask punches out the center so glass can blur the hero) */}
      <span
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
        style={{
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
        aria-hidden
      >
        <span className="gradient-beam-spin absolute inset-[-120%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#c084fc_310deg,#ec4899_340deg,#a855f7_360deg)]" />
      </span>

      {/* Glass face */}
      <span
        className="pointer-events-none absolute inset-[2px] z-[1] overflow-hidden rounded-full border border-white/10 bg-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-md backdrop-saturate-150"
        aria-hidden
      >
        <span className="absolute inset-0 bg-gradient-to-b from-purple-300/15 via-transparent to-pink-500/10" />
        <span
          className="gradient-beam-dots absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-1/2 w-2/3 -translate-x-1/2 rounded-full bg-purple-400/15 blur-2xl transition-colors duration-500 group-hover:bg-pink-400/30" />
      </span>

      <span className="relative z-10 drop-shadow-sm">{children}</span>
      <ArrowRight
        className="relative z-10 ml-2 h-4 w-4 drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </a>
  );
}

export { CALENDLY_URL };
