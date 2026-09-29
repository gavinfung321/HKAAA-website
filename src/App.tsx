import { useEffect } from 'react';
import { Header } from './components/Header';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ToolsStrip } from './components/ToolsStrip';
import { HomeJsonLd } from './components/HomeJsonLd';
import { LegalPage } from './components/LegalPage';
import { useLocale } from './i18n';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

function App() {
  const { page } = useLocale();

  useEffect(() => {
    if (page !== 'home') {
      window.scrollTo(0, 0);
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }

    return () => observer.disconnect();
  }, [page]);

  if (page === 'privacy' || page === 'terms') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header scrollToSection={scrollToSection} />
        <LegalPage kind={page} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <HomeJsonLd />
      <Header scrollToSection={scrollToSection} />

      <HeroSection />

      <ToolsStrip />

      <TestimonialsSection />

      <ProcessSection />

      <WhyUsSection />

      <ServicesSection />

      <PricingSection />

      <TeamSection />

      <ContactSection />

      <Footer />
    </div>
  );
}

export default App;
