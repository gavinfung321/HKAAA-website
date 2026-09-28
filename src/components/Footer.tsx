import { Facebook, Instagram, Linkedin, X } from 'lucide-react';
import { WireframeLandscapeBackground } from './effects/wireframe-landscape/WireframeLandscapeBackground';

const EXPLORE = [
  { label: 'Process', href: '#process-section' },
  { label: 'Why Us', href: '#why-us-section' },
  { label: 'Services', href: '#services-section' },
  { label: 'Plans', href: '#pricing-section' },
  { label: 'Team', href: '#team-section' },
  { label: 'Contact', href: '#contact-section' },
] as const;

const SOCIALS = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=61572987646180',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/hkaiautomation/',
    label: 'Instagram',
  },
  { icon: X, href: 'https://x.com/hkaiautomation', label: 'X' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/105922732',
    label: 'LinkedIn',
  },
] as const;

const linkClass =
  'text-sm text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400';

/**
 * Site footer (#33) — Brand / Explore / Connect over wireframe landscape.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-gray-950">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90" aria-hidden>
        <WireframeLandscapeBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-gray-950 via-gray-950/55 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-gray-950/90 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <a
              href="#hero-section"
              className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
            >
              <img
                src="https://i.imgur.com/ixZQlZJ.png"
                alt=""
                className="h-8 w-auto"
              />
              <span className="text-xl font-medium tracking-tight text-white">HKAAA</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              From first site to automation. One team in Hong Kong.
            </p>
            <div className="flex gap-2.5 pt-1">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-400"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
              Connect
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="tel:+85291678204" className={linkClass}>
                  +852 9167 8204
                </a>
              </li>
              <li>
                <a href="mailto:info@hkaiautomation.com" className={linkClass}>
                  info@hkaiautomation.com
                </a>
              </li>
              <li>
                <a href="#contact-section" className={linkClass}>
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-white/40">
            © {currentYear} HKAAA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
