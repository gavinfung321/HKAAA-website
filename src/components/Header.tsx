import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export function Header({ scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Process', 'Why Us', 'Our Services', 'Plans', 'Team'];

  return (
    <nav 
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('hero-section')} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://i.imgur.com/ixZQlZJ.png" 
              alt="HKAAA Logo" 
              className="h-8 w-auto md:h-10 object-contain"
              loading="eager"
              priority="high"
            />
            <div className="text-2xl font-bold gradient-text">HKAAA</div>
          </button>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item === 'Process') scrollToSection('process-section');
                  if (item === 'Why Us') scrollToSection('why-us-section');
                  if (item === 'Our Services') scrollToSection('services-section');
                  if (item === 'Plans') scrollToSection('pricing-section');
                  if (item === 'Team') scrollToSection('team-section');
                  if (item === 'Contact') scrollToSection('contact-section');
                }}
                className="nav-link text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <a 
              onClick={() => scrollToSection('contact-section')}
              role="button"
              className="px-6 py-2 rounded-full text-sm font-medium border border-white/10 hover:border-purple-500/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => {
                if (item === 'Process') scrollToSection('process-section');
                if (item === 'Why Us') scrollToSection('why-us-section');
                if (item === 'Our Services') scrollToSection('services-section');
                if (item === 'Plans') scrollToSection('pricing-section');
                if (item === 'Team') scrollToSection('team-section');
                if (item === 'Contact') scrollToSection('contact-section');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
          <a 
            onClick={() => {
              scrollToSection('contact-section');
              setIsMenuOpen(false);
            }}
            role="button"
            className="px-6 py-2 rounded-full text-sm font-medium mt-4 border border-white/10 hover:border-purple-500/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}