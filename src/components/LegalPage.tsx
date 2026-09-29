import type { ReactNode } from 'react';
import { getLegalDoc, type LegalBlock } from '../content/legal';
import { pathForLocale, useLocale } from '../i18n';

function Inline({ text, linkPolicy }: { text: string; linkPolicy: boolean }) {
  const { locale } = useLocale();
  const privacyHref = pathForLocale(locale, '', 'privacy');
  const re = linkPolicy
    ? /(info@hkaiautomation\.com|https:\/\/www\.pcpd\.org\.hk|Privacy Policy|私隱政策)/g
    : /(info@hkaiautomation\.com|https:\/\/www\.pcpd\.org\.hk)/g;

  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token === 'info@hkaiautomation.com') {
      parts.push(
        <a
          key={match.index}
          href="mailto:info@hkaiautomation.com"
          className="text-purple-300 underline-offset-2 hover:underline"
        >
          {token}
        </a>,
      );
    } else if (token.startsWith('https://')) {
      parts.push(
        <a
          key={match.index}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-300 underline-offset-2 hover:underline"
        >
          {token}
        </a>,
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={privacyHref}
          className="text-purple-300 underline-offset-2 hover:underline"
        >
          {token}
        </a>,
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function Blocks({
  blocks,
  linkPolicy,
}: {
  blocks: LegalBlock[];
  linkPolicy: boolean;
}) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'ul' ? (
          <ul key={i} className="my-3 list-disc space-y-1 pl-5 text-white/70">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
            <Inline text={block.text} linkPolicy={linkPolicy} />
          </p>
        ),
      )}
    </>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { locale } = useLocale();
  const doc = getLegalDoc(locale, kind);
  const linkPolicy = kind === 'terms';

  return (
    <main className="bg-gray-900 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-32">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/40">
          HKAAA
        </p>
        <h1 className="mt-3 text-3xl font-normal tracking-tight text-white md:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-white/45">{doc.lastUpdated}</p>
        <Blocks blocks={doc.intro} linkPolicy={linkPolicy} />
        {doc.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-xl font-normal text-white md:text-2xl">
              {section.heading}
            </h2>
            <Blocks blocks={section.blocks} linkPolicy={linkPolicy} />
          </section>
        ))}
      </article>
    </main>
  );
}
