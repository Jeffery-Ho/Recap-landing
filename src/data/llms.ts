// /llms-full.txt for LLM crawlers (llmstxt.org): both languages in full, built from the same copy and release data as the
// pages. The short /llms.txt is hand-written in public/.
import { changeGroups, releases } from './releases';
import { aso, copy, pricing, site, sitePath, type Locale } from './site';

const url = (locale: Locale, page = '') => new URL(sitePath(locale, page), site.origin).href;
const join = (lines: readonly string[]) => lines.join(' ').replace(/\s+/g, ' ').trim();
// Sentences that only make sense on the page itself, like the interactive instant print.
const offPage = (text: string) => text.replace(/\s*(Try it right here\.|就在这里试试。)/g, '');

function plans(locale: Locale) {
  const p = copy[locale].pricingCopy;
  const [, yearly, lifetime] = pricing[locale];
  return [
    `- ${p.free.name} (${p.free.price}): ${p.free.features.join(', ')}.`,
    `- Absolute ${p.yearly.name} (${yearly.price} ${yearly.period}): ${p.yearly.features.join(', ')}.`,
    `- Absolute ${p.lifetime.name} (${lifetime.price}, ${lifetime.period}): ${p.lifetime.features.join(', ')}.`,
    `- ${p.footnote}`,
  ];
}

function features(locale: Locale) {
  const t = copy[locale];
  return [
    ...t.features.map((f) => `- ${f.label}: ${join(f.title)} ${f.body}${'note' in f && f.note ? ` ${f.note}` : ''}`),
    ...t.browse.items.map((b) => `- ${b.label}: ${b.title} ${offPage(b.body)}${b.absolute ? ` (${t.browse.absolute})` : ''}`),
    `- ${t.chapters.share}: ${t.share.body} ${t.share.templates.body}`,
    `- ${t.chapters.stats}: ${t.heatmap.body}`,
  ];
}

function section(locale: Locale) {
  const t = copy[locale];
  const zh = locale === 'zh';
  return [
    `## ${zh ? '简体中文' : 'English'} — ${url(locale)}`,
    '',
    `${t.title}`,
    '',
    t.description,
    '',
    `${join(t.heroLines.map((line) => line.replace(/\{\d\}/g, '')))} ${t.heroDescription} ${t.heroNote}`,
    '',
    `### ${zh ? '功能' : 'Features'}`,
    '',
    ...features(locale),
    '',
    `### ${zh ? '隐私' : 'Privacy'}`,
    '',
    join(t.privacySection.title),
    t.privacySection.lead,
    '',
    ...t.privacySection.items.map((item) => `- ${item.title}: ${item.body}`),
    '',
    `### ${zh ? '定价' : 'Pricing'}`,
    '',
    t.pricingCopy.lead,
    '',
    ...plans(locale),
    '',
    `### ${zh ? '安装' : 'Install'}`,
    '',
    t.install.lead,
    '',
    ...t.install.steps.map((step, i) => `${i + 1}. ${step}`),
    `TestFlight: ${site.testflightUrl}`,
    '',
    `### ${t.faq}`,
    '',
    ...t.questions.flatMap((q) => [`**${q.question}**`, q.answer, '']),
    `### ${t.updates.title}`,
    '',
    ...releases.flatMap((r) => [
      `#### v${r.version} — ${r.title[locale]}`,
      r.body[locale],
      ...changeGroups.flatMap((group) => {
        const items = r.changes[locale][group];
        return items?.length ? [`${t.updates.groups[group]}:`, ...items.map((item) => `- ${item}`)] : [];
      }),
      '',
    ]),
    '',
  ];
}

export function llmsFull() {
  return [
    `# ${aso.appName}`,
    '',
    `> ${copy.en.description}`,
    '',
    `App Store subtitle: ${aso.subtitle.en} (${aso.subtitle.zh}). Keywords: ${aso.keywords.en.join(', ')}; ${aso.keywords.zh.join('、')}.`,
    '',
    `Developer: ${site.developer.name} (${site.developer.url}). Support: ${site.contactEmail}.`,
    '',
    ...section('en'),
    ...section('zh'),
  ].join('\n');
}
