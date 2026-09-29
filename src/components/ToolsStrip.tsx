import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMessages } from '../i18n';

type Tool = {
  name: string;
  /** Inline mono mark — currentColor */
  mark: ReactNode;
};

const iconClass = 'h-5 w-5 shrink-0 md:h-6 md:w-6';

/** Delivery + AI stack HKAAA uses on client work (#29). */
const tools: Tool[] = [
  {
    name: 'Calendly',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.071 3.429C14.142 1.788 8.858 1.788 3.929 3.429 1.788 4.143.714 6.286.714 8.571v6.858c0 2.285 1.074 4.428 3.215 5.142 4.929 1.641 10.213 1.641 15.142 0 2.141-.714 3.215-2.857 3.215-5.142V8.571c0-2.285-1.074-4.428-3.215-5.142zM12 16.286A4.286 4.286 0 1 1 12 7.714a4.286 4.286 0 0 1 0 8.572z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M5.859 0H12v5.859A5.859 5.859 0 1 1 5.859 0zm0 9.07H12v5.86A5.859 5.859 0 1 1 5.859 9.07zM12 18.141h5.859A5.859 5.859 0 1 1 12 18.14zM12 0h5.859A5.859 5.859 0 0 1 18 11.719 5.859 5.859 0 0 1 12 5.86z" />
      </svg>
    ),
  },
  {
    name: 'Framer',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4 0h16v8H12zm0 8h8v8H4zm8 8h8l-8 8z" />
      </svg>
    ),
  },
  {
    name: 'Cursor',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z" />
        <path d="M11.925 0L1.5 6l10.425 6L22.35 6 11.925 0z" opacity=".7" />
        <path d="M1.5 6v12l10.425-6L1.5 6z" opacity=".5" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    mark: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.3041 3.541h-3.6723l6.696 16.918H24Zm-10.6082 0L0 20.459h3.6977l1.3918-3.5347h7.1008l1.4102 3.5347h3.6977L10.3918 3.5409Zm-.3254 9.8354 2.3258-5.8363 2.3259 5.8363z" />
      </svg>
    ),
  },
];

function ToolMark({ tool }: { tool: Tool }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 text-white/55 transition-colors duration-300 hover:text-white/80 md:gap-3">
      <span className="opacity-90">{tool.mark}</span>
      <span className="text-sm font-medium tracking-wide md:text-[0.95rem]">
        {tool.name}
      </span>
    </div>
  );
}

/**
 * Quiet mono tools marquee — “Stack we build with” (#29).
 * Capped width (not full-bleed); marquee scrolls inside the shorter track.
 */
export function ToolsStrip() {
  const t = useMessages();
  const reduceMotion = useReducedMotion();
  const loop = [...tools, ...tools];

  return (
    <section
      id="tools-strip"
      className="relative overflow-hidden bg-gray-900 pb-4 pt-2 md:pb-6 md:pt-3"
      aria-label={t.tools.label}
    >
      <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 md:mb-6 md:text-[11px]">
        {t.tools.label}
      </p>

      {reduceMotion ? (
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 md:gap-x-10">
          {tools.map((tool) => (
            <ToolMark key={tool.name} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="group/tools relative mx-auto max-w-5xl overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-gray-900 to-transparent md:w-14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-gray-900 to-transparent md:w-14"
            aria-hidden
          />

          <div className="tools-marquee flex w-max items-center gap-10 pl-6 group-hover/tools:[animation-play-state:paused] md:gap-12 md:pl-8">
            {loop.map((tool, i) => (
              <ToolMark key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
