import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'Process', sectionId: 'process-section' },
  { label: 'Why Us', sectionId: 'why-us-section' },
  { label: 'Services', sectionId: 'services-section' },
  { label: 'Plans', sectionId: 'pricing-section' },
  { label: 'Team', sectionId: 'team-section' },
] as const;

const SECTION_IDS = [
  'hero-section',
  ...NAV_ITEMS.map((item) => item.sectionId),
  'contact-section',
] as const;

/**
 * Fixed nav (#35) — transparent at rest; dark plate when scrolled or mobile menu open.
 * Desktop scroll-spy underline; Contact quiet fill aligned with mobile.
 */
export function Header({ scrollToSection }: HeaderProps) {
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
        // Bias toward the section under the fixed nav / upper viewport
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const contactClassName =
    'rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-purple-500/25 hover:bg-white/15';

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
              className="h-8 w-auto object-contain md:h-10"
              loading="eager"
            />
            <div className="gradient-text text-2xl font-bold">HKAAA</div>
          </button>

          <div className="hidden items-center space-x-8 md:flex">
            {NAV_ITEMS.map((item) => {
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
                  {item.label}
                </button>
              );
            })}
            <a
              onClick={() => scrollToSection('contact-section')}
              role="button"
              className={contactClassName}
            >
              Contact Us
            </a>
          </div>

          <button
            type="button"
            className="md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pb-5 pt-2">
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
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
                  {item.label}
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
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
