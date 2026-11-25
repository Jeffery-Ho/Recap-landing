import { aso, copy, faqItems, pricing, site, sitePath, type Locale } from './site';
import { releases } from './releases';

export const CANONICAL_ORIGIN = 'https://www.recapmoments.app';
export const HREFLANG = { en: 'en', zh: 'zh-CN', xDefault: 'x-default' } as const;
export const SITEMAP_LASTMOD = '2026-11-23';
export const INDEXABLE_PAGES = ['', 'privacy', 'terms', 'credits', 'changelog', 'contact'] as const;

export function absoluteUrl(locale: Locale, page = '') {
  return `${site.origin}${sitePath(locale, page)}`;
}

export function shareImage(locale: Locale) {
  return `${site.origin}${locale === 'zh' ? '/og-home-zh.jpg' : '/og-home.jpg'}`;
}

export function sitemapRoutes() {
  const pages = INDEXABLE_PAGES.filter((page) => site.legalApproved || !['privacy', 'terms'].includes(page));
  return pages.flatMap((page) => (['en', 'zh'] as Locale[]).map((locale) => ({ locale, page, loc: absoluteUrl(locale, page) })));
}

function howToSteps(locale: Locale) {
  const answer = faqItems(locale).find((item) => item.id === 'installation')?.answer ?? '';
  return answer.split(/(?<=\.)\s+|(?<=。)/).map((text) => text.trim()).filter((text) => text.length > 12).slice(0, 2);
}

export function structuredData(locale: Locale, page: string, title: string, description: string, canonical: string) {
  const t = copy[locale];
  const origin = site.origin;
  const inLanguage = locale === 'zh' ? HREFLANG.zh : HREFLANG.en;
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Recap',
    url: `${origin}/`,
    logo: `${origin}/app-icon.png`,
    ...(site.contactEmail ? {
      email: site.contactEmail,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.contactEmail,
        availableLanguage: ['English', 'Chinese'],
      },
    } : {}),
    sameAs: ['https://github.com/Jeffery-Ho/Recap-landing', site.developer.url],
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${origin}/`,
    name: 'Recap',
    inLanguage: locale === 'zh' ? [HREFLANG.en, HREFLANG.zh] : HREFLANG.en,
    publisher: { '@id': organizationId },
  };
  const webpage = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage,
    isPartOf: { '@id': websiteId },
  };
  const graph: Record<string, unknown>[] = [organization, website, webpage];
  if (page !== '') return { '@context': 'https://schema.org', '@graph': graph };

  const paid = pricing[locale];
  const currency = locale === 'zh' ? 'CNY' : 'USD';
  const priceValue = (raw: string) => raw.replace(/[^0-9.]/g, '');
  const app = {
    '@type': ['SoftwareApplication', 'MobileApplication'],
    '@id': `${origin}/#application`,
    name: aso.appName[locale],
    alternateName: 'Recap',
    slogan: aso.subtitle[locale],
    keywords: aso.keywords[locale].join(', '),
    description: t.description,
    url: `${origin}/`,
    applicationCategory: 'PhotoApplication',
    operatingSystem: 'iOS 18.6 or later',
    isAccessibleForFree: true,
    softwareVersion: releases[0]?.version,
    ...(site.testflightUrl ? { downloadUrl: site.testflightUrl, installUrl: site.testflightUrl } : {}),
    screenshot: locale === 'zh' ? `${origin}/onboarding/week-zh.jpg` : `${origin}/onboarding/week-en.jpg`,
    image: `${origin}/app-icon.png`,
    featureList: t.pricingCopy.free.features,
    offers: [
      { '@type': 'Offer', name: t.pricingCopy.free.name, price: '0', priceCurrency: currency, description: t.pricingCopy.free.description, url: `${canonical}#pricing` },
      { '@type': 'Offer', name: t.pricingCopy.yearly.name, price: priceValue(paid[1].price), priceCurrency: currency, description: t.pricingCopy.yearly.description, url: `${canonical}#pricing` },
      { '@type': 'Offer', name: t.pricingCopy.lifetime.name, price: priceValue(paid[2].price), priceCurrency: currency, description: t.pricingCopy.lifetime.description, url: `${canonical}#pricing` },
    ],
    publisher: { '@id': organizationId },
  };
  const faqs = faqItems(locale);
  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    inLanguage,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  graph.push(app, faqPage);
  const steps = howToSteps(locale);
  if (steps.length >= 2) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${canonical}#install`,
      name: t.install.help,
      description: t.install.lead,
      inLanguage,
      step: steps.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, text })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
