import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { Check } from 'lucide-react';
import { CALENDLY_URL, GradientBeamCta } from './ui/GradientBeamCta';

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
    /** Resting spotlight — bottom-left so cards differ at rest */
    restSpot: { x: '12%', y: '88%' },
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
    restSpot: { x: '50%', y: '8%' },
  },
  {
    name: 'Partner',
    blurb: 'Site plus automation.',
    features: [
      'Everything in Practice',
      'Monthly working sessions',
      'Workflows, chatbot, and AI outreach',
    ],
    isPopular: false,
    /** Resting spotlight — top-right */
    restSpot: { x: '88%', y: '12%' },
  },
];

function PlanCard({
  plan,
}: {
  plan: (typeof plans)[number];
}) {
  const cardRef = useRef<HTMLElement>(null);

  const resetSpot = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--spot-x', plan.restSpot.x);
    el.style.setProperty('--spot-y', plan.restSpot.y);
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--spot-x', `${x}%`);
    el.style.setProperty('--spot-y', `${y}%`);

    // Soft 3D tilt toward cursor (stronger on hover)
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-py * 14).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(px * 18).toFixed(2)}deg`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetSpot}
      className={`plan-card group relative flex flex-col overflow-hidden rounded-2xl p-7 md:p-8 ${
        plan.isPopular ? 'plan-card--popular' : ''
      }`}
      style={
        {
          '--spot-x': plan.restSpot.x,
          '--spot-y': plan.restSpot.y,
          '--tilt-x': '0deg',
          '--tilt-y': '0deg',
        } as CSSProperties
      }
    >
      <div className="relative z-[1] mb-5 flex items-center justify-between gap-3">
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-gray-300/90">
          {plan.name}
        </h3>
        {plan.isPopular && (
          <span className="shrink-0 rounded-full border border-purple-400/30 bg-purple-500/15 px-2.5 py-1 text-[11px] font-medium tracking-wide text-purple-200">
            Most chosen
          </span>
        )}
      </div>

      <p className="relative z-[1] min-h-[2.5rem] text-xl font-normal tracking-tight text-white md:min-h-[3rem] md:text-2xl">
        {plan.blurb}
      </p>

      <ul className="relative z-[1] mt-8 space-y-3 border-t border-white/10 pt-6">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm leading-relaxed text-gray-300/90 md:text-[15px]"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-purple-300"
              strokeWidth={1.75}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Plans — centered header, glass 3D cards with cursor spotlight (#18).
 */
export const PricingSection = () => {
  return (
    <section
      id="pricing-section"
      className="bg-gray-900 px-6 py-16 md:px-10 md:py-24 lg:px-12"
      style={{ perspective: '1200px' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Plans
            </span>{' '}
            for your business
          </h2>
          <p className="text-base leading-relaxed text-gray-400 md:text-lg">
            Websites, plus chatbots, workflow automation, and AI outreach when you need them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-7 animate-on-scroll">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 animate-on-scroll md:mt-14">
          <p className="text-sm text-gray-400">Every plan is quoted to your scope.</p>
          <GradientBeamCta href={CALENDLY_URL} />
        </div>
      </div>
    </section>
  );
};
