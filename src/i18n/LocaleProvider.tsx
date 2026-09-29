import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { en, type Messages } from './dictionaries/en';
import { zhHant } from './dictionaries/zh-Hant';
import {
  HTML_LANG,
  SITE_ORIGIN,
  appPageFromPathname,
  localeFromPathname,
  pathForLocale,
  type AppPage,
  type Locale,
} from './types';

const dictionaries: Record<Locale, Messages> = {
  en,
  'zh-Hant': zhHant,
};

type LocaleContextValue = {
  locale: Locale;
  page: AppPage;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function upsertLink(rel: string, attrs: Record<string, string>) {
  const selector = Object.entries(attrs)
    .filter(([k]) => k === 'hreflang' || k === 'id')
    .map(([k, v]) => `[${k}="${v}"]`)
    .join('');
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]${selector}`,
  );
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function absoluteUrl(path: string) {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

function syncDocumentHead(locale: Locale, messages: Messages, page: AppPage) {
  const title =
    page === 'privacy'
      ? messages.legal.privacyTitle
      : page === 'terms'
        ? messages.legal.termsTitle
        : messages.meta.title;
  const description =
    page === 'privacy'
      ? messages.legal.privacyDescription
      : page === 'terms'
        ? messages.legal.termsDescription
        : messages.meta.description;

  document.title = title;
  document.documentElement.lang = HTML_LANG[locale];

  const canonicalUrl = absoluteUrl(pathForLocale(locale, '', page));
  const ogImage = `${SITE_ORIGIN}${locale === 'zh-Hant' ? '/og-zh.jpg' : '/og.jpg'}`;

  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:locale', locale === 'zh-Hant' ? 'zh_HK' : 'en_HK');
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('name', 'twitter:image', ogImage);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);

  upsertLink('canonical', { href: canonicalUrl });
  upsertLink('alternate', {
    hreflang: 'en',
    href: absoluteUrl(pathForLocale('en', '', page)),
  });
  upsertLink('alternate', {
    hreflang: 'zh-Hant',
    href: absoluteUrl(pathForLocale('zh-Hant', '', page)),
  });
  upsertLink('alternate', {
    hreflang: 'x-default',
    href: absoluteUrl(pathForLocale('en', '', page)),
  });
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== 'undefined'
      ? localeFromPathname(window.location.pathname)
      : 'en',
  );
  const [page, setPage] = useState<AppPage>(() =>
    typeof window !== 'undefined'
      ? appPageFromPathname(window.location.pathname)
      : 'home',
  );

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      const hash = page === 'home' ? window.location.hash : '';
      const nextPath = pathForLocale(next, hash, page);
      if (`${window.location.pathname}${window.location.hash}` !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }
      try {
        localStorage.setItem('hkaaa-locale', next);
      } catch {
        /* ignore */
      }
    },
    [page],
  );

  useEffect(() => {
    const onPop = () => {
      setLocaleState(localeFromPathname(window.location.pathname));
      setPage(appPageFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const messages = dictionaries[locale];

  useEffect(() => {
    syncDocumentHead(locale, messages, page);
  }, [locale, messages, page]);

  const value = useMemo(
    () => ({ locale, page, messages, setLocale }),
    [locale, page, messages, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export function useMessages() {
  return useLocale().messages;
}
