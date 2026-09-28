import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'framer-motion';
import {
  Bell,
  Bot,
  Database,
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  PenLine,
  Play,
  Search,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export type ServiceVisualProps = {
  /** Pointer is over the tile. */
  hovered: boolean;
  /** Bumps on each hover-in or tap; visuals replay their intro when it changes. */
  replay: number;
};

function useTilePlayback<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = !!useReducedMotion();
  return { ref, play: inView && !reduceMotion, reduceMotion };
}

function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, '')}`;
}

/* ─── Web Design: mini site assembling in a browser ─── */

export function WebDesignVisual({ replay }: ServiceVisualProps) {
  const { ref, play, reduceMotion } = useTilePlayback<HTMLDivElement>();

  const reveal = (step: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 8 },
    animate: play || reduceMotion ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.45, delay: 0.1 + step * 0.12, ease: 'easeOut' },
  });

  return (
    <div ref={ref} className="absolute inset-x-6 -bottom-3 top-2">
      <div className="h-full overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-[#0c0a12]/90 shadow-[0_-12px_40px_-24px_rgba(168,85,247,0.6)]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-3 max-w-[170px] flex-1 truncate rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-gray-500">
            yourbusiness.hk
          </span>
        </div>

        <div key={reduceMotion ? 0 : replay} className="space-y-3 px-4 pt-3">
          <motion.div {...reveal(0)} className="flex items-center justify-between">
            <span className="h-2.5 w-10 rounded bg-gradient-to-r from-purple-400 to-pink-400" />
            <span className="flex gap-2">
              <span className="h-1.5 w-6 rounded bg-white/15" />
              <span className="h-1.5 w-6 rounded bg-white/15" />
              <span className="h-1.5 w-6 rounded bg-white/15" />
            </span>
          </motion.div>

          <motion.div {...reveal(1)} className="space-y-1.5">
            <span className="block h-3 w-3/4 rounded bg-white/60" />
            <span className="block h-3 w-1/2 rounded bg-gradient-to-r from-purple-400 to-pink-400" />
          </motion.div>

          <motion.div {...reveal(2)} className="flex gap-2">
            <span className="h-5 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="h-5 w-14 rounded-full border border-white/15" />
          </motion.div>

          <motion.div {...reveal(3)} className="grid grid-cols-3 gap-2">
            <span className="h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
            <span className="h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
            <span className="h-12 rounded-lg border border-white/10 bg-white/[0.04]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── SEO: your site climbs to #1 ─── */

const SEO_FINAL = ['you', 'a', 'b'] as const;
const SEO_START = ['a', 'b', 'you'] as const;

export function SeoVisual({ replay }: ServiceVisualProps) {
  const { ref, play, reduceMotion } = useTilePlayback<HTMLDivElement>();
  const [order, setOrder] = useState<readonly string[]>(SEO_START);

  useEffect(() => {
    if (reduceMotion) {
      setOrder(SEO_FINAL);
      return;
    }
    if (!play) return;
    setOrder(SEO_START);
    const timer = window.setTimeout(() => setOrder(SEO_FINAL), replay === 0 ? 900 : 550);
    return () => window.clearTimeout(timer);
  }, [play, reduceMotion, replay]);

  const isTop = order[0] === 'you';

  return (
    <div ref={ref} className="absolute inset-x-6 bottom-5 top-1 flex flex-col gap-2.5">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300">
        <Search className="h-3.5 w-3.5 text-purple-400" strokeWidth={2.25} />
        web design hong kong
      </div>

      <ul className="flex flex-col gap-1.5">
        {order.map((id) =>
          id === 'you' ? (
            <motion.li
              layout
              key={id}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-purple-100">yourbusiness.hk</span>
                <AnimatePresence>
                  {isTop && (
                    <motion.span
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ delay: reduceMotion ? 0 : 0.35 }}
                      className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-1.5 text-[10px] font-semibold text-white"
                    >
                      #1
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="mt-1.5 block h-1.5 w-3/4 rounded bg-white/20" />
            </motion.li>
          ) : (
            <motion.li
              layout
              key={id}
              transition={{ type: 'spring', stiffness: 240, damping: 26 }}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
            >
              <span className="block h-1.5 w-20 rounded bg-white/15" />
              <span className="mt-1.5 block h-1.5 w-2/3 rounded bg-white/10" />
            </motion.li>
          ),
        )}
      </ul>
    </div>
  );
}

/* ─── Content: channel icons drifting along an arc ─── */

const CONTENT_ICONS: LucideIcon[] = [FileText, Instagram, Play, Linkedin, PenLine, Facebook, Mail];

const CONTENT_TONES = [
  'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-transparent',
  'bg-[#1b1526] text-purple-200 border-white/10',
  'bg-purple-200 text-purple-900 border-transparent',
];

type ArcItemProps = {
  progress: MotionValue<number>;
  index: number;
  count: number;
  icon: LucideIcon;
};

function ArcItem({ progress, index, count, icon: Icon }: ArcItemProps) {
  const t = useTransform(progress, (p) => (p + index / count) % 1);
  const left = useTransform(t, (v) => `${-10 + v * 120}%`);
  const y = useTransform(t, (v) => (v * 2 - 1) ** 2 * 40);
  const rotate = useTransform(t, (v) => (v * 2 - 1) * 26);
  const opacity = useTransform(t, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <motion.span
      style={{ left, y, rotate, opacity, x: '-50%' }}
      whileHover={{ scale: 1.25, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className={cn(
        'absolute top-[28%] flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg shadow-black/40',
        CONTENT_TONES[index % CONTENT_TONES.length],
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </motion.span>
  );
}

export function ContentVisual({ hovered }: ServiceVisualProps) {
  const { ref, play } = useTilePlayback<HTMLDivElement>();
  const progress = useMotionValue(0.04);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (!play) return;
    const controls = animate(progress, [progress.get(), progress.get() + 1], {
      duration: 26,
      ease: 'linear',
      repeat: Infinity,
    });
    controlsRef.current = controls;
    return () => {
      controls.stop();
      controlsRef.current = null;
    };
  }, [play, progress]);

  useEffect(() => {
    if (controlsRef.current) controlsRef.current.speed = hovered ? 2.2 : 1;
  }, [hovered, play]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {CONTENT_ICONS.map((icon, index) => (
        <ArcItem
          key={index}
          progress={progress}
          index={index}
          count={CONTENT_ICONS.length}
          icon={icon}
        />
      ))}
    </div>
  );
}

/* ─── Chatbot: a short customer exchange ─── */

const bubbleIn = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' },
} as const;

function BotAvatar() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
      <Bot className="h-3.5 w-3.5 text-white" strokeWidth={2.25} />
    </span>
  );
}

export function ChatbotVisual({ replay }: ServiceVisualProps) {
  const { ref, play, reduceMotion } = useTilePlayback<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(4);
      return;
    }
    if (!play) return;
    setStep(0);
    const timers = [
      window.setTimeout(() => setStep(1), 200),
      window.setTimeout(() => setStep(2), 900),
      window.setTimeout(() => setStep(3), 2100),
      window.setTimeout(() => setStep(4), 2700),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [play, reduceMotion, replay]);

  const enter = reduceMotion ? { initial: false as const } : bubbleIn;

  return (
    <div ref={ref} className="absolute inset-x-6 bottom-5 top-1 flex flex-col gap-2">
      {step >= 1 && (
        <motion.p
          {...enter}
          className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-xs text-gray-100"
        >
          Are you open on Saturday?
        </motion.p>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {step === 2 && (
          <motion.div key="typing" {...enter} exit={{ opacity: 0 }} className="flex items-end gap-2">
            <BotAvatar />
            <span className="flex gap-1 rounded-2xl rounded-bl-md border border-purple-400/20 bg-purple-500/15 px-3 py-2.5">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-purple-200"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
                />
              ))}
            </span>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div key="reply" {...enter} className="flex items-end gap-2">
            <BotAvatar />
            <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-purple-400/20 bg-gradient-to-br from-purple-500/30 to-pink-500/20 px-3 py-2 text-xs text-white">
              Yes, 10am–6pm. Want me to book you in?
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {step >= 4 && (
        <motion.div {...enter} className="ml-8 flex gap-1.5">
          <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-2.5 py-1 text-[11px] text-purple-100">
            Book Sat 11am
          </span>
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-gray-400">
            Another time
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Workflow: one enquiry fans out to three actions ─── */

const WORKFLOW_BRANCHES = [
  { d: 'M160 42 C160 88 60 78 60 108', cx: 60, label: 'Airtable', icon: Database },
  { d: 'M160 42 L160 108', cx: 160, label: 'Reply', icon: Mail },
  { d: 'M160 42 C160 88 260 78 260 108', cx: 260, label: 'Team', icon: Bell },
];

const NODE_IDLE = 'rgba(255,255,255,0.14)';
const NODE_LIT = 'rgba(236,72,153,0.95)';
const PULSE_BURST = { duration: 1.1, repeatDelay: 0.5 };

export function WorkflowVisual({ hovered }: ServiceVisualProps) {
  const { ref, play, reduceMotion } = useTilePlayback<HTMLDivElement>();
  const gradientId = useSvgId('workflow-pulse');
  const drawn = play || reduceMotion;
  const burst = hovered && play;

  return (
    <div ref={ref} className="absolute inset-x-4 bottom-3 top-0">
      <svg viewBox="0 0 320 172" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {WORKFLOW_BRANCHES.map((branch, i) => (
          <g key={branch.label}>
            <motion.path
              d={branch.d}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1.5}
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={drawn ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
            />
            {play && (
              <motion.path
                key={burst ? 'burst' : 'idle'}
                d={branch.d}
                fill="none"
                pathLength={1}
                stroke={`url(#${gradientId})`}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="0.28 2"
                initial={{ strokeDashoffset: 0.28 }}
                animate={{ strokeDashoffset: -1 }}
                transition={
                  burst
                    ? { ...PULSE_BURST, repeat: Infinity, ease: 'easeInOut' }
                    : {
                        duration: 1.5,
                        delay: 0.9 + i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 1.4,
                        ease: 'easeInOut',
                      }
                }
              />
            )}
          </g>
        ))}

        <motion.rect
          x="98"
          y="8"
          width="124"
          height="34"
          rx="17"
          fill="#15111f"
          initial={false}
          animate={{ stroke: burst ? 'rgba(236,72,153,0.8)' : 'rgba(192,132,252,0.45)' }}
          transition={{ duration: 0.3 }}
        />
        <Zap x={113} y={17} width={16} height={16} color="#c084fc" strokeWidth={2.25} />
        <text x="135" y="29.5" fontSize="12" fill="#e9d5ff">
          New enquiry
        </text>

        {WORKFLOW_BRANCHES.map(({ cx, label, icon: Icon }) => (
          <g key={label}>
            <motion.circle
              key={burst ? 'burst' : 'idle'}
              cx={cx}
              cy={130}
              r={22}
              fill="#15111f"
              initial={false}
              animate={burst ? { stroke: [NODE_IDLE, NODE_IDLE, NODE_LIT, NODE_IDLE] } : { stroke: NODE_IDLE }}
              transition={
                burst
                  ? {
                      duration: PULSE_BURST.duration + PULSE_BURST.repeatDelay,
                      times: [0, 0.42, 0.52, 1],
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  : { duration: 0.3 }
              }
              strokeWidth={1.5}
            />
            <Icon x={cx - 9} y={121} width={18} height={18} color="#d8b4fe" strokeWidth={2} />
            <text x={cx} y={167} fontSize="10.5" fill="#9ca3af" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Lead gen: a visitor travels the path to a booked call ─── */

const LEAD_PATH = 'M14 128 C62 128 72 56 124 70 S196 136 250 30';
const LEAD_STOPS = [
  { at: 0, label: 'Visitor' },
  { at: 0.5, label: 'Enquiry' },
  { at: 1, label: 'Booked' },
];

export function LeadGenVisual({ hovered, replay }: ServiceVisualProps) {
  const { ref, play, reduceMotion } = useTilePlayback<HTMLDivElement>();
  const gradientId = useSvgId('lead-trail');
  const pathRef = useRef<SVGPathElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const [stops, setStops] = useState<{ x: number; y: number }[]>([]);
  const progress = useMotionValue(0);

  const pointAt = (p: number) => {
    const path = pathRef.current;
    if (!path) return { x: 14, y: 128 };
    return path.getPointAtLength(path.getTotalLength() * p);
  };

  const cx = useTransform(progress, (p) => pointAt(p).x);
  const cy = useTransform(progress, (p) => pointAt(p).y);
  const bookedRadius = useTransform(progress, [0, 0.9, 0.97, 1], [5, 5, 8, 5.5]);
  const toastOpacity = useTransform(progress, [0, 0.93, 0.98, 1], [0, 0, 1, 1]);
  const toastY = useTransform(progress, [0.93, 1], [6, 0]);

  useLayoutEffect(() => {
    setStops(LEAD_STOPS.map((stop) => pointAt(stop.at)));
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    if (!play) return;
    progress.set(0);
    const controls = animate(progress, [0, 1], {
      duration: 3.4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.9,
    });
    controlsRef.current = controls;
    return () => {
      controls.stop();
      controlsRef.current = null;
    };
  }, [play, reduceMotion, progress, replay]);

  useEffect(() => {
    if (controlsRef.current) controlsRef.current.speed = hovered ? 1.8 : 1;
  }, [hovered, replay, play]);

  return (
    <div ref={ref} className="absolute inset-x-5 bottom-4 top-1">
      <svg viewBox="0 0 264 150" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d={LEAD_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.25}
          strokeDasharray="4 5"
        />
        <motion.path
          d={LEAD_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2}
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        {stops.map((point, i) => {
          const isBooked = i === stops.length - 1;
          return (
            <g key={LEAD_STOPS[i].label}>
              {isBooked ? (
                <motion.circle cx={point.x} cy={point.y} r={bookedRadius} fill={`url(#${gradientId})`} />
              ) : (
                <circle cx={point.x} cy={point.y} r={4} fill="#15111f" stroke="rgba(216,180,254,0.6)" />
              )}
              <text
                x={point.x}
                y={point.y - 12}
                fontSize="10.5"
                fill={isBooked ? '#f5d0fe' : '#9ca3af'}
                textAnchor={i === 0 ? 'start' : isBooked ? 'end' : 'middle'}
              >
                {LEAD_STOPS[i].label}
              </text>
            </g>
          );
        })}

        <motion.g style={{ opacity: toastOpacity, y: toastY }}>
          <rect x="140" y="8" width="64" height="18" rx="9" fill={`url(#${gradientId})`} />
          <text x="172" y="20.5" fontSize="10" fontWeight="600" fill="#fff" textAnchor="middle">
            +1 enquiry
          </text>
        </motion.g>

        <motion.circle
          cx={cx}
          cy={cy}
          r={5}
          fill="#fff"
          style={{ filter: 'drop-shadow(0 0 6px rgba(236,72,153,0.9))' }}
        />
      </svg>
    </div>
  );
}
