import React from 'react';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, X } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://i.imgur.com/ixZQlZJ.png" 
                alt="HKAAA Logo" 
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold gradient-text">HKAAA</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform businesses through innovative AI solutions and automation strategies.
            </p>
          </div>

          {/* Empty Column */}
          <div></div>

          {/* Empty Column */}
          <div></div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/profile.php?id=61572987646180', label: 'Facebook' },
                { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/hkaiautomation/', label: 'Instagram' },
                { icon: <X className="w-5 h-5" />, href: 'https://x.com/hkaiautomation', label: 'X' },
                { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/company/105922732', label: 'LinkedIn' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/20 hover:bg-purple-500/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Follow us for the latest updates
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              © {currentYear} HKAAA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};