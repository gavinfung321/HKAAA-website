import { useEffect, useRef, useState } from 'react';
import type { ComponentType, CSSProperties, PointerEvent } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { cn } from '../lib/utils';
import { useMessages } from '../i18n';
import {
  ChatbotVisual,
  ContentVisual,
  LeadGenVisual,
  SeoVisual,
  WebDesignVisual,
  WorkflowVisual,
  type ServiceVisualProps,
} from './services/ServiceVisuals';

type Service = {
  name: string;
  headline: string;
  visual: ComponentType<ServiceVisualProps>;
  span: string;
};

const SERVICE_META: Omit<Service, 'name' | 'headline'>[] = [
  { visual: WebDesignVisual, span: 'lg:col-span-4' },
  { visual: SeoVisual, span: 'lg:col-span-3' },
  { visual: ContentVisual, span: 'lg:col-span-3' },
  { visual: ChatbotVisual, span: 'lg:col-span-3' },
  { visual: WorkflowVisual, span: 'lg:col-span-4' },
  { visual: LeadGenVisual, span: 'lg:col-span-3' },
];

const BORDER_MASK: CSSProperties = {
  padding: 'var(--rim)',
  background:
    'radial-gradient(200px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.95), rgba(232,121,249,0.7) 30%, transparent 65%)',
};

const INNER_GLOW: CSSProperties = {
  background:
    'radial-gradient(320px circle at var(--spot-x) var(--spot-y), rgba(168,85,247,0.16), transparent 60%)',
};

const GLINT_LAP_SECONDS = 18;
const GLINT_HOVER_SPEED = 3.5;

type Sparkle = { left: string; top: string; delay: number; streak?: number };

const SPARKLES: Sparkle[] = [
  { left: '8%', top: '2%', delay: 0 },
  { left: '22%', top: '0%', delay: 0.9, streak: -20 },
  { left: '47%', top: '3%', delay: 0.4 },
  { left: '71%', top: '1%', delay: 1.3 },
  { left: '90%', top: '4%', delay: 0.2, streak: 25 },
  { left: '99%', top: '28%', delay: 1.1 },
  { left: '98%', top: '56%', delay: 0.6, streak: 70 },
  { left: '99%', top: '82%', delay: 1.6 },
  { left: '84%', top: '98%', delay: 0.3 },
  { left: '60%', top: '100%', delay: 1.2, streak: 10 },
  { left: '36%', top: '97%', delay: 0.7 },
  { left: '13%', top: '99%', delay: 1.5, streak: -15 },
  { left: '1%', top: '74%', delay: 0.5 },
  { left: '0%', top: '44%', delay: 1.4, streak: -70 },
  { left: '2%', top: '18%', delay: 0.8 },
];

function TileSparkles({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-3 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {SPARKLES.map((s, i) => (
            <motion.span
              key={i}
              className={cn(
                'absolute rounded-full',
                s.streak === undefined ? 'h-[2px] w-[2px] bg-white' : 'h-px w-2 bg-purple-200',
              )}
              style={{ left: s.left, top: s.top, rotate: s.streak ?? 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ServiceTileProps = {
  service: Service;
  index: number;
  hovered: boolean;
  dimmed: boolean;
  onHoverChange: (index: number | null) => void;
};

function ServiceTile({ service, index, hovered, dimmed, onHoverChange }: ServiceTileProps) {
  const { name, headline, visual: Visual } = service;
  const articleRef = useRef<HTMLElement>(null);
  const reduceMotion = !!useReducedMotion();
  const [replay, setReplay] = useState(0);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const parallaxX = useSpring(offsetX, { stiffness: 150, damping: 18 });
  const parallaxY = useSpring(offsetY, { stiffness: 150, damping: 18 });

  const glintRotate = useMotionValue(index * 67);
  const glintControls = useRef<AnimationPlaybackControls | null>(null);
  const onScreen = useInView(articleRef);

  useEffect(() => {
    if (reduceMotion || !onScreen) return;
    const from = glintRotate.get() % 360;
    const controls = animate(glintRotate, [from, from + 360], {
      duration: GLINT_LAP_SECONDS,
      ease: 'linear',
      repeat: Infinity,
    });
    glintControls.current = controls;
    return () => {
      controls.stop();
      glintControls.current = null;
    };
  }, [glintRotate, onScreen, reduceMotion]);

  useEffect(() => {
    if (glintControls.current) glintControls.current.speed = hovered ? GLINT_HOVER_SPEED : 1;
  }, [hovered, onScreen]);

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const el = articleRef.current;
    if (!el || event.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    el.style.setProperty('--spot-x', `${mx}px`);
    el.style.setProperty('--spot-y', `${my}px`);
    if (!reduceMotion) {
      offsetX.set((0.5 - mx / rect.width) * 14);
      offsetY.set((0.5 - my / rect.height) * 10);
    }
  };

  const handleEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    onHoverChange(index);
    setReplay((n) => n + 1);
  };

  const handleLeave = () => {
    offsetX.set(0);
    offsetY.set(0);
    onHoverChange(null);
  };

  const handleTap = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') setReplay((n) => n + 1);
  };

  return (
    <>
      <article
        ref={articleRef}
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onPointerUp={handleTap}
        className={cn(
          'service-tile group relative flex h-[272px] flex-col overflow-hidden rounded-3xl transition-[opacity,transform,box-shadow] duration-500 md:h-[288px]',
          hovered && 'service-tile--hovered',
          dimmed && 'scale-[0.985] opacity-50',
        )}
        style={{ '--spot-x': '50%', '--spot-y': '0px' } as CSSProperties}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={INNER_GLOW}
        />
        <div aria-hidden className="service-tile__groove pointer-events-none absolute z-20" />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 z-20 blur-[5px] transition-opacity duration-500',
            hovered ? 'opacity-80' : 'opacity-50',
          )}
        >
          <div className="service-tile__ring service-tile__bloom absolute inset-0 rounded-3xl">
            <motion.div
              className="service-tile__glint absolute left-1/2 top-1/2"
              style={{ x: '-50%', y: '-50%', rotate: glintRotate }}
            />
          </div>
        </div>
        <div aria-hidden className="service-tile__ring service-tile__rim pointer-events-none absolute inset-0 z-20 rounded-3xl">
          <motion.div
            className={cn(
              'service-tile__glint absolute left-1/2 top-1/2 transition-opacity duration-500',
              hovered ? 'opacity-100' : 'opacity-90',
            )}
            style={{ x: '-50%', y: '-50%', rotate: glintRotate }}
          />
        </div>
        <div
          aria-hidden
          className="service-tile__ring pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={BORDER_MASK}
        />

        <div className="relative z-10 px-6 pt-6">
          <h3 className="text-xl font-medium tracking-tight text-purple-400 md:text-2xl">{name}</h3>
          <p className="mt-1 text-sm leading-snug text-gray-300 md:text-[15px]">{headline}</p>
        </div>

        <motion.div style={{ x: parallaxX, y: parallaxY }} className="relative mt-4 min-h-0 flex-1">
          <Visual hovered={hovered} replay={replay} />
        </motion.div>
      </article>
      {!reduceMotion && <TileSparkles active={hovered} />}
    </>
  );
}

/**
 * Our Services (#25) — two-row bento, website first.
 * Legacy six-card grid in `ServicesSection.legacy.tsx`.
 */
export function ServicesSection() {
  const t = useMessages();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services: Service[] = t.services.items.map((item, i) => ({
    ...item,
    ...SERVICE_META[i],
  }));

  return (
    <section
      id="services-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-14 md:px-10 md:py-20 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_65%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 animate-on-scroll md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {t.services.h2Before}{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.services.h2Highlight}
            </span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-gray-400 md:pb-2 md:text-lg">
            {t.services.sub}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-10 lg:gap-5">
          {services.map((service, index) => (
            <li
              key={`${service.name}-${index}`}
              className={cn('animate-on-scroll relative', service.span)}
              style={{ '--animation-delay': `${0.06 + index * 0.06}s` } as CSSProperties}
            >
              <ServiceTile
                service={service}
                index={index}
                hovered={hoveredIndex === index}
                dimmed={hoveredIndex !== null && hoveredIndex !== index}
                onHoverChange={setHoveredIndex}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
