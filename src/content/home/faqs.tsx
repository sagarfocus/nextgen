import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

/**
 * Home page — FAQ section content.
 *
 * `text` must stay in sync with the rendered `a` answer — it feeds the
 * schema.org JSON-LD payload built in `src/pages/Home/index.tsx`. Edit
 * both representations in `locales/{en,es}/home.json` together.
 *
 * The accordion display in `src/pages/Home/FAQ.tsx` reads `a` (ReactNode
 * — some answers include `<strong>` spans). The JSON-LD builder reads
 * `text` (plain string). The same translations are used to produce both
 * via the hook below.
 */

type FaqKey = 'results' | 'hipaa' | 'size' | 'monthly' | 'contract';

export interface HomeFaqItem {
  /** Stable identifier for the React key + JSON lookup. */
  key: FaqKey;
  /** Display question; also feeds the `Question.name` field in JSON-LD. */
  q: string;
  /** Rendered answer for the accordion (may include `<strong>`). */
  a: ReactNode;
  /** Plain-text version of `a` for the schema.org `Answer.text` field. */
  text: string;
  defaultOpen?: boolean;
}

interface FaqStatic {
  key: FaqKey;
  defaultOpen?: boolean;
  /** Builds the rich (ReactNode) answer from translated fragments. */
  renderAnswer: (t: TFunction<'home'>) => ReactNode;
}

const FAQ_STATIC: readonly FaqStatic[] = [
  {
    key: 'results',
    defaultOpen: true,
    renderAnswer: (t) => (
      <>
        {t('faq.items.results.aLead')}
        <strong>{t('faq.items.results.aStrong')}</strong>
        {t('faq.items.results.aRest')}
      </>
    ),
  },
  {
    key: 'hipaa',
    renderAnswer: (t) => <>{t('faq.items.hipaa.a')}</>,
  },
  {
    key: 'size',
    renderAnswer: (t) => (
      <>
        {t('faq.items.size.aLead')}
        <strong>{t('faq.items.size.aStrong1')}</strong>
        {t('faq.items.size.aMid')}
        <strong>{t('faq.items.size.aStrong2')}</strong>
        {t('faq.items.size.aRest')}
      </>
    ),
  },
  {
    key: 'monthly',
    renderAnswer: (t) => <>{t('faq.items.monthly.a')}</>,
  },
  {
    key: 'contract',
    renderAnswer: (t) => (
      <>
        {t('faq.items.contract.aLead')}
        <strong>{t('faq.items.contract.aStrong')}</strong>
        {t('faq.items.contract.aRest')}
      </>
    ),
  },
];

/** React hook returning the FAQ items with translated `q`/`a`/`text`. */
export function useHomeFaqs(): readonly HomeFaqItem[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      FAQ_STATIC.map((f) => ({
        key: f.key,
        q: t(`faq.items.${f.key}.q`),
        a: f.renderAnswer(t),
        text: t(`faq.items.${f.key}.text`),
        defaultOpen: f.defaultOpen,
      })),
    [t]
  );
}

export interface HomeFaqHead {
  eyebrow: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  intro: string;
}

/** React hook for the FAQ section head (eyebrow, split-line title, intro). */
export function useHomeFaqHead(): HomeFaqHead {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('faq.head.eyebrow'),
      titleLine1: t('faq.head.titleLine1'),
      titleLine2Lead: t('faq.head.titleLine2Lead'),
      titleLine2Accent: t('faq.head.titleLine2Accent'),
      intro: t('faq.head.intro'),
    }),
    [t]
  );
}

export interface HomeFaqStillCard {
  title: string;
  para1: string;
  para2: string;
  ctaText: string;
}

/** React hook for the "Still have questions?" card on the left column. */
export function useHomeFaqStillCard(): HomeFaqStillCard {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      title: t('faq.still.title'),
      para1: t('faq.still.para1'),
      para2: t('faq.still.para2'),
      ctaText: t('faq.still.ctaText'),
    }),
    [t]
  );
}
