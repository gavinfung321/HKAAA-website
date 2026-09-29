import { useRef, type CSSProperties, type PointerEvent } from 'react';
import { Check } from 'lucide-react';
import { GradientBeamCta } from './ui/GradientBeamCta';
import { useMessages } from '../i18n';

const TILT_X_MAX = 2.5;
const TILT_Y_MAX = 3.5;

const PLAN_META = [
  { isPopular: false, restSpot: { x: '78%', y: '32%' } },
  { isPopular: true, restSpot: { x: '70%', y: '24%' } },
  { isPopular: false, restSpot: { x: '22%', y: '70%' } },
] as const;

type PlanView = {
  name: string;
  blurb: string;
  features: readonly string[];
  isPopular: boolean;
  restSpot: { x: string; y: string };
};

function PlanCard({ plan, popularLabel }: { plan: PlanView; popularLabel: string }) {
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

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-py * TILT_X_MAX * 2).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(px * TILT_Y_MAX * 2).toFixed(2)}deg`);
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetSpot}
      className={`plan-card group relative flex h-full flex-col overflow-hidden rounded-[1.15rem] p-7 md:p-8 ${
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
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
          {plan.name}
        </h3>
        {plan.isPopular && (
          <span className="shrink-0 rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/70">
            {popularLabel}
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
            className={`flex items-start gap-3 text-sm leading-relaxed md:text-[15px] ${
              plan.isPopular ? 'text-white/90' : 'text-white/75'
            }`}
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                plan.isPopular ? 'text-violet-200' : 'text-violet-300/80'
              }`}
              strokeWidth={1.75}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-[1] min-h-0 flex-1" aria-hidden />
    </article>
  );
}

/**
 * Plans — dialed glass shelf, white title, one Book a Call.
 */
export const PricingSection = () => {
  const t = useMessages();
  const plans: PlanView[] = t.plans.items.map((item, i) => ({
    ...item,
    ...PLAN_META[i],
  }));

  return (
    <section
      id="pricing-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 md:px-10 md:py-24 lg:px-12"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-4 text-center animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
            {t.plans.h2Before}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.plans.h2Highlight}
            </span>
            {t.plans.h2After ? ` ${t.plans.h2After}` : ''}
          </h2>
          <p className="text-base leading-relaxed text-gray-400 md:text-lg">{t.plans.sub}</p>
        </div>

        <div className="relative mt-14 md:mt-16 animate-on-scroll">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[115%] max-w-none -translate-x-1/2 -translate-y-[46%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(55,142,254,0.07)_0%,rgba(99,102,241,0.04)_38%,transparent_68%)]"
          />
          <div className="relative z-[1] grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.isPopular
                    ? 'h-full md:-translate-y-5 md:z-[1]'
                    : 'h-full md:opacity-[0.9]'
                }
              >
                <PlanCard plan={plan} popularLabel={t.plans.popular} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 animate-on-scroll md:mt-16">
          <p className="text-sm text-gray-400">{t.plans.quoteNote}</p>
          <GradientBeamCta>{t.plans.cta}</GradientBeamCta>
        </div>
      </div>
    </section>
  );
};
