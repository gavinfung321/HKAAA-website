export type Locale = 'en' | 'zh-Hant';

export const LOCALES: Locale[] = ['en', 'zh-Hant'];

export const LOCALE_PATH: Record<Locale, string> = {
  en: '/',
  'zh-Hant': '/zh',
};

export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  'zh-Hant': 'zh-Hant',
};

export const SITE_ORIGIN = 'https://hkaiautomation.com';

export function localeFromPathname(pathname: string): Locale {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/zh' || path.startsWith('/zh/')) return 'zh-Hant';
  return 'en';
}

export function headingJoinGap(locale: Locale) {
  return locale === 'en' ? ' ' : '';
}

export function pathForLocale(locale: Locale, hash = ''): string {
  const base = LOCALE_PATH[locale];
  const h = hash && !hash.startsWith('#') ? `#${hash}` : hash;
  if (base === '/') return `/${h}`;
  return `${base}${h}`;
}
