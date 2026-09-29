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
  localeFromPathname,
  pathForLocale,
  type Locale,
} from './types';

const dictionaries: Record<Locale, Messages> = {
  en,
  'zh-Hant': zhHant,
};

type LocaleContextValue = {
  locale: Locale;
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

function syncDocumentHead(locale: Locale, messages: Messages) {
  const { title, description } = messages.meta;
  document.title = title;
  document.documentElement.lang = HTML_LANG[locale];

  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:locale', locale === 'zh-Hant' ? 'zh_HK' : 'en_HK');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);

  const path = pathForLocale(locale).replace(/\/$/, '') || '/';
  const canonicalUrl = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

  upsertLink('canonical', { href: canonicalUrl });
  upsertLink('alternate', { hreflang: 'en', href: `${SITE_ORIGIN}/` });
  upsertLink('alternate', { hreflang: 'zh-Hant', href: `${SITE_ORIGIN}/zh` });
  upsertLink('alternate', { hreflang: 'x-default', href: `${SITE_ORIGIN}/` });
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== 'undefined'
      ? localeFromPathname(window.location.pathname)
      : 'en',
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    const hash = window.location.hash;
    const nextPath = pathForLocale(next, hash);
    if (`${window.location.pathname}${window.location.hash}` !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    try {
      localStorage.setItem('hkaaa-locale', next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      setLocaleState(localeFromPathname(window.location.pathname));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const messages = dictionaries[locale];

  useEffect(() => {
    syncDocumentHead(locale, messages);
  }, [locale, messages]);

  const value = useMemo(
    () => ({ locale, messages, setLocale }),
    [locale, messages, setLocale],
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
