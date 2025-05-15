import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

export const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'BASIC',
      description: 'For small businesses or startups looking to get started with AI-powered insights.',
      monthlyPrice: 5000,
      yearlyPrice: 4000,
      monthlyUrl: 'https://buy.stripe.com/6oE3cA8IL3N10mccMM',
      yearlyUrl: 'https://buy.stripe.com/7sI14s5wz2IX1qgbIL',
      features: [
        '1 Custom AI Workflow',
        'Basic Chatbot Build',
        'Up to 500 AI-powered actions/month',
        'Basic Integration'
      ],
      isPopular: false,
    },
    {
      name: 'PRO',
      description: 'For growing businesses needing more integrations and advanced features.',
      monthlyPrice: 15000,
      yearlyPrice: 12000,
      monthlyUrl: 'https://buy.stripe.com/bIYdReaQTbftb0Q289',
      yearlyUrl: 'https://buy.stripe.com/aEU7sQf795V95Gw148',
      features: [
        '3 Custom AI Workflows',
        'Advanced Custom Chatbot',
        'Up to 2,500 AI-powered actions/month',
        'Advanced Integrations'
      ],
      isPopular: true,
    },
    {
      name: 'PREMIUM',
      description: 'For established businesses or enterprises that need comprehensive AI solutions.',
      monthlyPrice: 45000,
      yearlyPrice: 36000,
      monthlyUrl: 'https://buy.stripe.com/00g5kI4sv3N1fh6dQS',
      yearlyUrl: 'https://buy.stripe.com/4gw8wUbUX0AP0mceUZ',
      features: [
        'Unlimited Custom AI Workflows',
        'Enterprise-Grade Custom Chatbot',
        'Up to 10,000 AI-powered actions/month',
        'Full Integration Suite',
        'Custom AI Model Training'
      ],
      isPopular: false,
    },
  ];

  return (
    <section id="pricing-section" className="pt-12 md:pt-16 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-16">
        <div className="space-y-6 text-center animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-normal mb-6">
            Transparent <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Pricing</span> Plans
          </h2>
        </div>

        {/* Toggle Button for Monthly/Yearly Plans */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="bg-[#111] rounded-full p-1.5 flex items-center backdrop-blur-sm border border-white/5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isYearly 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>
          <p className="text-sm text-gray-400">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-medium">
              {isYearly ? 'You\'re saving 20% with yearly billing!' : 'Switch to yearly billing to save 20%'}
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative overflow-hidden ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/30'
                  : 'bg-zinc-900/30 border-white/10'
              } rounded-[20px] p-8 border ${
                plan.isPopular
                  ? 'md:scale-105 md:-translate-y-2'
                  : ''
              } backdrop-blur-sm transition-all duration-500 hover:border-purple-500/20 hover:bg-zinc-900/40`}
            >
              {plan.isPopular && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/30">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-4">
                {plan.isPopular && <Zap className="w-5 h-5 text-purple-400" />}
                <h3 className="text-sm font-medium text-gray-400">
                {plan.name}
                </h3>
              </div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-6xl font-medium text-white relative group">
                  ${(isYearly ? plan.yearlyPrice : plan.monthlyPrice).toLocaleString()}
                  {isYearly && (
                    <span className="absolute -top-4 -right-4 text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">
                      -20%
                    </span>
                  )}
                </span>
                <span className="text-gray-400">/month</span>
              </div>

              <p className="text-gray-400 text-sm mb-8">
                {plan.description}
              </p>
              
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center space-x-3 text-gray-400"
                  >
                    <Check className="w-4 h-4 text-purple-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={isYearly ? plan.yearlyUrl : plan.monthlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 w-full py-3 rounded-full transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : 'bg-white/10 text-white hover:bg-white/20'
                } text-center inline-block`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};