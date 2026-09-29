import { useCallback, useState, type CSSProperties } from 'react';
import { headingJoinGap, useLocale, useMessages } from '../i18n';
import { LayoutGrid, type WorkCard } from './work/LayoutGrid';

const WORK_META: {
  id: string;
  thumbnail: string;
  video?: string;
  className: string;
  href: string;
}[] = [
  {
    id: 'cpa',
    thumbnail: '/work/cpa.jpg',
    video: '/work/cpa-scroll.mp4?v=4',
    className: 'md:col-span-2',
    href: 'https://meridian-cpa.bolt.host/',
  },
  {
    id: 'choco',
    thumbnail: '/work/choco.jpg',
    video: '/work/choco-scroll.mp4?v=4',
    className: 'md:col-span-1',
    href: 'https://www.chocoave.com/',
  },
  {
    id: 'mayer',
    thumbnail: '/work/mayer.jpg',
    video: '/work/mayer-scroll.mp4?v=4',
    className: 'md:col-span-1',
    href: 'https://mayerautogate.com/',
  },
  {
    id: 'petite',
    thumbnail: '/work/petite.jpg',
    video: '/work/petite-hover.mp4',
    className: 'md:col-span-1',
    href: 'https://www.instagram.com/petite.home.kitchen/',
  },
  {
    id: 'speedy',
    thumbnail: '/work/speedy.jpg',
    video: '/work/speedy-scroll.mp4?v=4',
    className: 'md:col-span-1',
    href: 'https://speedy-move.com/',
  },
];

/**
 * Work showcase — photo LayoutGrid expand (visuals-first shell).
 */
export function WorkSection() {
  const t = useMessages();
  const { locale } = useLocale();
  const gap = headingJoinGap(locale);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onSelect = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const cards: WorkCard[] = WORK_META.map((meta) => {
    const item = t.work.items[meta.id as keyof typeof t.work.items] as {
      title: string;
      blurb: string;
      visit: string;
      tag?: string;
    };
    return {
      id: meta.id,
      thumbnail: meta.thumbnail,
      video: meta.video,
      className: meta.className,
      title: item.title,
      blurb: item.blurb,
      tag: item.tag,
      visitLabel: item.visit,
      visitHref: meta.href,
    };
  });

  return (
    <section
      id="work-section"
      className="relative isolate overflow-hidden bg-gray-900 px-6 py-14 md:px-10 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center animate-on-scroll">
          <h2 className="text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {t.work.h2Before}
            {gap}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t.work.h2Highlight}
            </span>
            {t.work.h2After ? `${gap}${t.work.h2After}` : null}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-400 md:mt-4 md:text-lg">
            {t.work.sub}
          </p>
        </div>

        <div
          className="mt-10 animate-on-scroll sm:mt-12"
          style={{ '--animation-delay': '0.08s' } as CSSProperties}
        >
          <LayoutGrid
            cards={cards}
            selectedId={selectedId}
            onSelect={onSelect}
            closeLabel={t.work.close}
          />
        </div>
      </div>
    </section>
  );
}
