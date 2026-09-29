import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export type WorkCard = {
  id: string;
  thumbnail: string;
  video?: string;
  className: string;
  title: string;
  blurb: string;
  tag?: string;
  visitLabel: string;
  visitHref: string;
};

type LayoutGridProps = {
  cards: WorkCard[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  closeLabel: string;
};

/** Tailwind `md` — desktop keeps Aceternity expand; below this uses a fixed sheet. */
const DESKTOP_MQ = '(min-width: 768px)';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MQ).matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

/**
 * Photo grid with Framer layoutId expand on desktop (Aceternity pattern).
 * Mobile opens a viewport-fixed bottom sheet instead (grid cards stay put).
 * Desktop hover plays muted scroll preview when `video` is set.
 */
export function LayoutGrid({ cards, selectedId, onSelect, closeLabel }: LayoutGridProps) {
  const selected = cards.find((c) => c.id === selectedId) ?? null;
  const lastSelectedRef = useRef<WorkCard | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();

  if (selected) lastSelectedRef.current = selected;
  const lastSelected = lastSelectedRef.current;

  useEffect(() => {
    if (!selectedId) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelect(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedId, onSelect]);

  useEffect(() => {
    if (selectedId) setHoveredId(null);
  }, [selectedId]);

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        {cards.map((card) => {
          const isSelected = selectedId === card.id;
          // Desktop-only: morph card into expand overlay. Mobile keeps the tile in-grid.
          const expandInGrid = isSelected && isDesktop;
          const showVideo = !isSelected && hoveredId === card.id && Boolean(card.video);
          return (
            <li
              key={card.id}
              className={cn('min-h-[16rem] list-none md:min-h-[20rem]', card.className)}
            >
              <motion.div
                layoutId={isDesktop ? `card-${card.id}` : undefined}
                onClick={() => {
                  if (isDesktop) {
                    onSelect(isSelected ? null : card.id);
                    return;
                  }
                  if (!isSelected) onSelect(card.id);
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType !== 'mouse' || isSelected || !card.video) return;
                  setHoveredId(card.id);
                }}
                onPointerLeave={() => {
                  if (hoveredId === card.id) setHoveredId(null);
                }}
                role={expandInGrid ? 'dialog' : undefined}
                aria-modal={expandInGrid || undefined}
                aria-labelledby={expandInGrid ? titleId : undefined}
                className={cn(
                  'relative overflow-hidden rounded-2xl',
                  expandInGrid
                    ? // unchanged desktop expand sizing
                      'absolute inset-0 z-50 m-auto flex h-[min(72vh,34rem)] w-[min(92vw,38rem)] cursor-default flex-col md:h-[min(70vh,36rem)] md:w-[min(48vw,40rem)]'
                    : cn(
                        'h-full w-full cursor-pointer bg-gray-950',
                        lastSelected?.id === card.id ? 'z-40' : 'z-0',
                      ),
                )}
              >
                <motion.img
                  layoutId={isDesktop ? `image-${card.id}` : undefined}
                  src={card.thumbnail}
                  alt=""
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300',
                    showVideo ? 'opacity-0' : 'opacity-100',
                  )}
                  draggable={false}
                />

                {card.video && !expandInGrid && (
                  <HoverVideo src={card.video} active={showVideo} />
                )}

                {!expandInGrid && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 pb-4 pt-16">
                    <p className="text-base font-medium tracking-tight text-white md:text-lg">
                      {card.title}
                    </p>
                    {card.tag ? (
                      <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-white/55">
                        {card.tag}
                      </p>
                    ) : null}
                  </div>
                )}

                {expandInGrid && (
                  <SelectedCard
                    card={card}
                    titleId={titleId}
                    closeLabel={closeLabel}
                    closeRef={closeRef}
                    onClose={() => onSelect(null)}
                  />
                )}
              </motion.div>
            </li>
          );
        })}
      </ul>

      {/* Desktop-only dimmer (absolute over the grid). Mobile modal has its own backdrop. */}
      <motion.button
        type="button"
        aria-label={closeLabel}
        tabIndex={selectedId && isDesktop ? 0 : -1}
        onClick={() => onSelect(null)}
        className={cn(
          'absolute inset-0 z-40 bg-black',
          selectedId && isDesktop ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        initial={false}
        animate={{ opacity: selectedId && isDesktop ? 0.4 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {selected && !isDesktop ? (
                <MobileWorkSheet
                  key={selected.id}
                  card={selected}
                  titleId={titleId}
                  closeLabel={closeLabel}
                  closeRef={closeRef}
                  onClose={() => onSelect(null)}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

/** Mobile-only: fixed centered modal portaled to body. */
function MobileWorkSheet({
  card,
  titleId,
  closeLabel,
  closeRef,
  onClose,
}: {
  card: WorkCard;
  titleId: string;
  closeLabel: string;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:hidden">
      <motion.button
        type="button"
        aria-label={closeLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative z-10 flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-gray-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/10] w-full shrink-0">
          <img
            src={card.thumbnail}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            draggable={false}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
          >
            {closeLabel}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-gray-950 px-5 pb-5 pt-5">
          {card.tag ? (
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
              {card.tag}
            </p>
          ) : null}
          <h3 id={titleId} className="text-xl font-medium tracking-tight text-white">
            {card.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-white/80" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {card.blurb}
          </p>
          <a
            href={card.visitHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white"
          >
            {card.visitLabel}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function HoverVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.load();
      const tryPlay = () => {
        el.currentTime = 0;
        const play = el.play();
        if (play) play.catch(() => {});
      };
      if (el.readyState >= 2) tryPlay();
      else {
        const onCanPlay = () => {
          el.removeEventListener('canplay', onCanPlay);
          tryPlay();
        };
        el.addEventListener('canplay', onCanPlay);
        return () => el.removeEventListener('canplay', onCanPlay);
      }
    } else {
      el.pause();
      if (el.readyState >= 1) el.currentTime = 0;
    }
  }, [active, src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      preload="metadata"
      onLoadedData={() => setReady(true)}
      onCanPlay={() => setReady(true)}
      className={cn(
        'pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-top transition-opacity duration-300',
        active && ready ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
}

function SelectedCard({
  card,
  titleId,
  closeLabel,
  closeRef,
  onClose,
}: {
  card: WorkCard;
  titleId: string;
  closeLabel: string;
  closeRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <div className="relative z-[60] flex h-full w-full flex-col justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/70 to-black/35"
      />
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
      >
        {closeLabel}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative z-20 px-6 pb-6 pt-14 md:px-8 md:pb-8 md:pt-16"
        onClick={(e) => e.stopPropagation()}
      >
        {card.tag ? (
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            {card.tag}
          </p>
        ) : null}
        <h3 id={titleId} className="text-2xl font-medium tracking-tight text-white md:text-3xl">
          {card.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/72 md:mt-3.5 md:text-[0.95rem] md:leading-7">
          {card.blurb}
        </p>
        <a
          href={card.visitHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          {card.visitLabel}
        </a>
      </motion.div>
    </div>
  );
}
