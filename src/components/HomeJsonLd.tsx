import { useEffect } from 'react';
import { SITE_ORIGIN, useLocale, useMessages } from '../i18n';

const SCRIPT_ID = 'hkaaa-jsonld';

/**
 * Home-page JSON-LD: Organization + WebSite (GEO / SEO). No FAQPage.
 */
export function HomeJsonLd() {
  const { locale, page } = useLocale();
  const t = useMessages();

  useEffect(() => {
    if (page !== 'home') {
      document.getElementById(SCRIPT_ID)?.remove();
      return;
    }

    const path = locale === 'zh-Hant' ? '/zh' : '/';
    const url = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
    const inLanguage = locale === 'zh-Hant' ? 'zh-Hant' : 'en';

    const graph = [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Hong Kong AI Automation Agency',
        alternateName: ['HKAAA', '香港人工智能自動化機構'],
        url: `${SITE_ORIGIN}/`,
        logo: `${SITE_ORIGIN}/brand/logo.png`,
        email: 'info@hkaiautomation.com',
        telephone: '+852-9167-8204',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road',
          addressLocality: 'Kowloon',
          addressCountry: 'HK',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Hong Kong',
        },
        knowsAbout: [
          'Hong Kong web design',
          'web design',
          'AI automation',
          'Hong Kong AI',
          'Hong Kong AI automation',
          'SEO',
          '香港網頁設計',
          '香港 AI',
          '香港 AI 自動化',
        ],
        sameAs: [
          'https://www.facebook.com/profile.php?id=61572987646180',
          'https://www.instagram.com/hkaiautomation/',
          'https://x.com/hkaiautomation',
          'https://www.linkedin.com/company/105922732',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    ];

    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    document.getElementById('hkaaa-jsonld-bootstrap')?.remove();

    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = SCRIPT_ID;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(payload);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [locale, page, t]);

  return null;
}
