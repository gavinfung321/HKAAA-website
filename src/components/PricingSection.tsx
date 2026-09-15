import React from 'react';
import { Check, Zap } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/hkaiautomationagency/30min';

const plans = [
  {
    name: 'Launch',
    blurb: 'A professional website.',
    features: [
      '5-page site (Home, About, Services, Team, Contact)',
      'Enquiry form',
      'Built with you in working sessions',
    ],
    isPopular: false,
  },
  {
    name: 'Practice',
    blurb: 'A bilingual website.',
    features: [
      'Everything in Launch',
      'English + Traditional Chinese',
      'SEO and WhatsApp',
      'Optional site chatbot',
    ],
    isPopular: true,
  },
  {
    name: 'Partner',
    blurb: 'Site plus ongoing automation.',
    features: [
      'Everything in Practice',
      'Monthly working sessions',
      'Workflows, chatbot, and AI outreach',
    ],
    isPopular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing-section" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-16">
        <div className="space-y-6 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-normal mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Plans</span> for your business
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Websites, plus chatbots, workflow automation, and AI outreach when you need them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch animate-on-scroll">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden flex flex-col ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/30 md:scale-105 md:-translate-y-2'
                  : 'bg-zinc-900/30 border-white/10'
              } rounded-[20px] p-8 border backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-zinc-900/40`}
            >
              {plan.isPopular && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/30">
                    Most chosen
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                {plan.isPopular && <Zap className="w-5 h-5 text-purple-400" />}
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {plan.name}
                </h3>
              </div>

              <p className="text-2xl font-medium text-white mb-8">
                {plan.blurb}
              </p>

              <ul className="space-y-3 mt-auto">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start space-x-3 text-gray-400"
                  >
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 animate-on-scroll">
          <p className="text-gray-400 text-sm">Every plan is quoted to your scope.</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
};
