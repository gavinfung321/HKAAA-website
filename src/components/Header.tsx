import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale, useMessages } from '../i18n';
import type { Locale } from '../i18n/types';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const NAV_SECTION_IDS = [
  { key: 'process' as const, sectionId: 'process-section' },
  { key: 'whyUs' as const, sectionId: 'why-us-section' },
  { key: 'services' as const, sectionId: 'services-section' },
  { key: 'plans' as const, sectionId: 'pricing-section' },
  { key: 'team' as const, sectionId: 'team-section' },
];

const SECTION_IDS = [
  'hero-section',
  ...NAV_SECTION_IDS.map((item) => item.sectionId),
  'contact-section',
] as const;

/**
 * Fixed nav (#35) — transparent at rest; dark plate when scrolled or mobile menu open.
 * Desktop scroll-spy underline; Contact quiet fill aligned with mobile.
 * EN | 繁 locale toggle (#i18n).
 */
export function Header({ scrollToSection }: HeaderProps) {
  const { locale, setLocale } = useLocale();
  const t = useMessages();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('hero-section');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const contactClassName =
    'rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-purple-500/25 hover:bg-white/15';

  const langBtn = (code: Locale, label: string) => {
    const active = locale === code;
    return (
      <button
        type="button"
        onClick={() => setLocale(code)}
        className={`px-1 text-sm font-medium transition-colors ${
          active ? 'text-white' : 'text-white/40 hover:text-white/70'
        }`}
        aria-pressed={active}
        aria-label={code === 'en' ? 'English' : '繁體中文'}
      >
        {label}
      </button>
    );
  };

  const langToggle = (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language">
      {langBtn('en', 'EN')}
      <span className="text-white/25" aria-hidden>
        |
      </span>
      {langBtn('zh-Hant', '繁')}
    </div>
  );

  return (
    <nav
      className={`fixed z-50 w-full transition-colors duration-300 ${
        isScrolled || isMenuOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <img
              src="/brand/logo.png"
              alt="HKAAA Logo"
              className="h-7 w-auto object-contain md:h-10"
              loading="eager"
            />
            <div className="gradient-text text-xl font-bold md:text-2xl">HKAAA</div>
          </button>

          <div className="hidden items-center space-x-8 md:flex">
            {NAV_SECTION_IDS.map((item) => {
              const isActive = activeSectionId === item.sectionId;
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`nav-link transition-colors ${
                    isActive ? 'nav-link--active text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t.nav[item.key]}
                </button>
              );
            })}
            {langToggle}
            <a
              onClick={() => scrollToSection('contact-section')}
              role="button"
              className={contactClassName}
            >
              {t.nav.contact}
            </a>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {langToggle}
            <button
              type="button"
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pb-5 pt-2">
          <div className="space-y-2">
            {NAV_SECTION_IDS.map((item) => {
              const isActive = activeSectionId === item.sectionId;
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.sectionId);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left transition-colors ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t.nav[item.key]}
                </button>
              );
            })}
          </div>
          <a
            onClick={() => {
              scrollToSection('contact-section');
              setIsMenuOpen(false);
            }}
            role="button"
            className={`mt-5 inline-block ${contactClassName}`}
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}
