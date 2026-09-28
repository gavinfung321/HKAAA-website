import { useReducedMotion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

/** Mix prior clients + Asian personas. Title · industry; one Founder, one CEO. */
const testimonials: Testimonial[] = [
  {
    name: 'John',
    role: 'Founder · Marketing',
    image:
      'https://framerusercontent.com/images/ETgoVdeITLLIYCHTFNeVuZDMyQY.png',
    quote:
      'The automation features have saved us countless hours. Managing multiple accounts is now a breeze.',
  },
  {
    name: 'Daniel',
    role: 'CPA Partner · Accounting',
    image: '/testimonials/accountant.png',
    quote:
      'We finally have a site clients trust. Enquiries come in clean, and follow-up is simple.',
  },
  {
    name: 'Robby',
    role: 'Growth lead · Agency',
    image: '/testimonials/robby.png',
    quote:
      'The chatbot handles client questions like a pro, saving me hours of back-and-forth. That leaves me free to focus on the big picture.',
  },
  {
    name: 'Mei',
    role: 'Brand lead · Retail',
    image: '/testimonials/ecommerce.png',
    quote:
      'The new site looks sharp on mobile and the chatbot catches questions while we sleep.',
  },
  {
    name: 'Mike',
    role: 'Content lead · Media',
    image: '/testimonials/mike.png',
    quote:
      'Completely transformed how I plan and post content. The analytics dashboard is a game-changer.',
  },
  {
    name: 'Sophia',
    role: 'CEO · Consulting',
    image: '/testimonials/ceo.png',
    quote:
      'Clear scope, honest timeline, and a team we can reach. The site was only the start.',
  },
];

const REST_SPOT = { x: '28%', y: '18%' };
const TILT_X_MAX = 3;
const TILT_Y_MAX = 4;
const AUTO_MS = 5200;
const COUNT = testimonials.length;

/** Shortest signed distance on a circular ring (−floor(n/2) … +floor(n/2)). */
function ringOffset(index: number, active: number, n: number) {
  let o = (index - active) % n;
  if (o > n / 2) o -= n;
  if (o < -n / 2) o += n;
  return o;
}

function TestimonialCardFace({
  item,
  index,
  active,
  allowTilt,
}: {
  item: Testimonial;
  index: number;
  active: boolean;
  allowTilt: boolean;
}) {
  const label = String(index).padStart(2, '0');
  const cardRef = useRef<HTMLElement>(null);

  const resetSpot = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--spot-x', REST_SPOT.x);
    el.style.setProperty('--spot-y', REST_SPOT.y);
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (!active || !allowTilt) return;
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
      className={`testimonial-card relative flex h-full w-full flex-col p-5 md:p-6 ${
        active ? '' : 'pointer-events-none'
      }`}
      style={
        {
          '--spot-x': REST_SPOT.x,
          '--spot-y': REST_SPOT.y,
          '--tilt-x': '0deg',
          '--tilt-y': '0deg',
        } as CSSProperties
      }
    >
      <div className="relative z-[2] flex items-center gap-3 border-b border-white/10 pb-3 md:gap-4 md:pb-4">
        <img
          src={item.image}
          alt=""
          className="h-11 w-11 rounded-lg object-cover ring-1 ring-white/15 md:h-12 md:w-12"
          loading="lazy"
          width={48}
          height={48}
        />
        <div className="min-w-0">
          <p className="truncate text-base font-medium text-white/95 md:text-[1.05rem]">
            {item.name}
          </p>
          <p className="truncate text-xs uppercase tracking-wide text-white/40">
            {item.role}
          </p>
        </div>
      </div>

      <p
        className={`relative z-[2] flex-1 py-4 text-base leading-relaxed text-white/70 md:py-5 md:text-lg md:leading-[1.55] ${
          active ? '' : 'line-clamp-4'
        }`}
      >
        “{item.quote}”
      </p>

      <div className="relative z-[2] flex items-center border-t border-white/10 pt-3">
        <span className="text-[11px] tracking-[0.14em] text-white/30">
          {label}
        </span>
      </div>
    </article>
  );
}

/**
 * Coverflow testimonials — center spotlight, slow auto-rotate, click/drag to flip.
 */
export const TestimonialsSection = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragRef = useRef<{
    id: number;
    x: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const go = useCallback((next: number) => {
    setActive(((next % COUNT) + COUNT) % COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % COUNT);
  }, []);
  const goPrev = useCallback(() => {
    setActive((i) => (i - 1 + COUNT) % COUNT);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % COUNT);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  const onStagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    dragRef.current = { id: e.pointerId, x: e.clientX, moved: false };
    setPaused(true);
  };

  const onStagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 8) drag.moved = true;
  };

  const onStagePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const moved = drag.moved;
    dragRef.current = null;
    if (moved && Math.abs(dx) > 48) {
      suppressClickRef.current = true;
      if (dx < 0) goNext();
      else goPrev();
    }
    window.setTimeout(() => setPaused(false), 80);
  };

  return (
    <section
      id="testimonials-section"
      className="relative overflow-hidden bg-gray-900 py-16 md:py-20"
      aria-label="Client testimonials"
    >
      <div className="mx-auto mb-10 max-w-3xl px-6 text-center md:mb-14">
        <h2 className="text-3xl font-normal leading-tight tracking-tight text-white/85 md:text-5xl md:leading-[1.15]">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Sites
          </span>{' '}
          that work.
          <br />
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Clients
          </span>{' '}
          who stay.
        </h2>
      </div>

      {reduceMotion ? (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6">
          {testimonials.map((item, i) => (
            <div
              key={item.name}
              className="h-[18rem] w-[min(84vw,22rem)] md:h-[20rem] md:w-[24rem]"
            >
              <TestimonialCardFace
                item={item}
                index={i + 1}
                active
                allowTilt={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="testimonial-coverflow relative w-full touch-pan-y"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
          onPointerCancel={onStagePointerUp}
        >
          <div className="testimonial-coverflow__stage relative mx-auto h-[19rem] w-full md:h-[22rem]">
            {testimonials.map((item, i) => {
              const offset = ringOffset(i, active, COUNT);
              const abs = Math.abs(offset);
              const isActive = offset === 0;
              // Hide far-edge peeks (±3); show center + two on each side
              const hidden = abs > 2;
              const scale =
                isActive ? 1 : abs === 1 ? 0.92 : 0.84;
              const opacity =
                isActive ? 1 : abs === 1 ? 0.95 : 0.78;

              return (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`${item.name}: ${item.role}`}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={abs <= 1 ? 0 : -1}
                  className="testimonial-coverflow__item absolute left-1/2 top-0 origin-center border-0 bg-transparent p-0 text-left"
                  style={
                    {
                      '--cf-offset': offset,
                      '--cf-abs': abs,
                      width: 'min(72vw, 20rem)',
                      height: '100%',
                      zIndex: COUNT - abs,
                      opacity: hidden ? 0 : opacity,
                      pointerEvents: hidden ? 'none' : 'auto',
                      transform: `
                        translateX(-50%)
                        translateX(calc(var(--cf-offset) * var(--cf-step)))
                        translateZ(calc(var(--cf-abs) * -70px))
                        rotateY(calc(var(--cf-offset) * -32deg))
                        scale(${scale})
                      `,
                    } as CSSProperties
                  }
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    go(i);
                  }}
                >
                  <div
                    className={`h-full w-full transition-[filter] duration-500 ${
                      isActive ? '' : 'brightness-[0.7]'
                    }`}
                  >
                    <TestimonialCardFace
                      item={item}
                      index={i + 1}
                      active={isActive}
                      allowTilt={!reduceMotion}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
