import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import enPages from '@/locales/en/pages.json';

export interface FAQItem {
  num: string;
  q: string;
  a: ReactNode;
}

export interface FAQCategory {
  id: string;
  num: string;
  title: string;
  navLabel: string;
  items: FAQItem[];
}

/**
 * Static English fallback for module-level uses (e.g. JSON-LD schema
 * generation that runs outside React). Mirrors the structure produced
 * by `useFAQCategories`, but answers are rendered as plain strings.
 */
type EnFaqCategories = typeof enPages.faq.categories;

const renderEnAnswer = (item: Record<string, unknown>): string => {
  const segments = [
    item.aBefore,
    item.aBold,
    item.aMid,
    item.aBold1,
    item.aMid1,
    item.aBold2,
    item.aMid2,
    item.aBold3,
    item.aAfter,
    item.a,
    item.p1Before,
    item.p1Bold,
    item.p1Bold1,
    item.p1Mid,
    item.p1Bold2,
    item.p1After,
    item.p1,
    item.p2,
  ];
  const text = segments.filter((s): s is string => typeof s === 'string').join('');
  if (Array.isArray(item.list)) return `${text} ${(item.list as string[]).join(' ')}`.trim();
  return text;
};

const CATEGORY_KEY_MAP: ReadonlyArray<{
  id: string;
  num: string;
  key: keyof EnFaqCategories;
  itemKeys: ReadonlyArray<{ num: string; key: string }>;
}> = [
  {
    id: 'cat-01',
    num: '01',
    key: 'gettingStarted',
    itemKeys: [
      { num: '01.01', key: 'onboarding' },
      { num: '01.02', key: 'prep' },
      { num: '01.03', key: 'consult' },
      { num: '01.04', key: 'regions' },
    ],
  },
  {
    id: 'cat-02',
    num: '02',
    key: 'pricing',
    itemKeys: [
      { num: '02.01', key: 'cost' },
      { num: '02.02', key: 'contracts' },
      { num: '02.03', key: 'included' },
      { num: '02.04', key: 'setup' },
    ],
  },
  {
    id: 'cat-03',
    num: '03',
    key: 'services',
    itemKeys: [
      { num: '03.01', key: 'inhouse' },
      { num: '03.02', key: 'creative' },
      { num: '03.03', key: 'ehr' },
    ],
  },
  {
    id: 'cat-04',
    num: '04',
    key: 'compliance',
    itemKeys: [
      { num: '04.01', key: 'baa' },
      { num: '04.02', key: 'phi' },
      { num: '04.03', key: 'offboard' },
    ],
  },
  {
    id: 'cat-05',
    num: '05',
    key: 'reporting',
    itemKeys: [
      { num: '05.01', key: 'cadence' },
      { num: '05.02', key: 'kpis' },
      { num: '05.03', key: 'noResults' },
    ],
  },
];

/**
 * Static fallback (English) — usable outside React. Used to build
 * the FAQPage JSON-LD schema at module-load time.
 */
export const CATEGORIES: readonly FAQCategory[] = CATEGORY_KEY_MAP.map((cat) => {
  const catNode = enPages.faq.categories[cat.key] as {
    title: string;
    navLabel: string;
    items: Record<string, { q: string } & Record<string, unknown>>;
  };
  return {
    id: cat.id,
    num: cat.num,
    title: catNode.title,
    navLabel: catNode.navLabel,
    items: cat.itemKeys.map(({ num, key }) => {
      const itemNode = catNode.items[key];
      return {
        num,
        q: itemNode.q,
        a: renderEnAnswer(itemNode),
      };
    }),
  };
});

/**
 * React hook for the FAQ list. Live-translates on language change.
 * Pulls from the `pages:faq.categories.*` tree.
 */
export function useFAQCategories(): readonly FAQCategory[] {
  const { t } = useTranslation('pages');
  return useMemo(
    () => [
      {
        id: 'cat-01',
        num: '01',
        title: t('faq.categories.gettingStarted.title'),
        navLabel: t('faq.categories.gettingStarted.navLabel'),
        items: [
          {
            num: '01.01',
            q: t('faq.categories.gettingStarted.items.onboarding.q'),
            a: (
              <>
                <p>
                  {t('faq.categories.gettingStarted.items.onboarding.p1Before')}
                  <strong>{t('faq.categories.gettingStarted.items.onboarding.p1Bold')}</strong>
                  {t('faq.categories.gettingStarted.items.onboarding.p1After')}
                </p>
                <p>{t('faq.categories.gettingStarted.items.onboarding.p2')}</p>
              </>
            ),
          },
          {
            num: '01.02',
            q: t('faq.categories.gettingStarted.items.prep.q'),
            a: (
              <>
                <p>{t('faq.categories.gettingStarted.items.prep.p1')}</p>
                <ul>
                  {(
                    t('faq.categories.gettingStarted.items.prep.list', {
                      returnObjects: true,
                    }) as string[]
                  ).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            num: '01.03',
            q: t('faq.categories.gettingStarted.items.consult.q'),
            a: (
              <p>
                {t('faq.categories.gettingStarted.items.consult.aBefore')}
                <strong>{t('faq.categories.gettingStarted.items.consult.aBold')}</strong>
                {t('faq.categories.gettingStarted.items.consult.aAfter')}
              </p>
            ),
          },
          {
            num: '01.04',
            q: t('faq.categories.gettingStarted.items.regions.q'),
            a: <p>{t('faq.categories.gettingStarted.items.regions.a')}</p>,
          },
        ],
      },
      {
        id: 'cat-02',
        num: '02',
        title: t('faq.categories.pricing.title'),
        navLabel: t('faq.categories.pricing.navLabel'),
        items: [
          {
            num: '02.01',
            q: t('faq.categories.pricing.items.cost.q'),
            a: (
              <>
                <p>
                  {t('faq.categories.pricing.items.cost.p1Before')}
                  <strong>{t('faq.categories.pricing.items.cost.p1Bold1')}</strong>
                  {t('faq.categories.pricing.items.cost.p1Mid')}
                  <strong>{t('faq.categories.pricing.items.cost.p1Bold2')}</strong>
                  {t('faq.categories.pricing.items.cost.p1After')}
                </p>
                <p>{t('faq.categories.pricing.items.cost.p2')}</p>
              </>
            ),
          },
          {
            num: '02.02',
            q: t('faq.categories.pricing.items.contracts.q'),
            a: (
              <p>
                {t('faq.categories.pricing.items.contracts.aBefore')}
                <strong>{t('faq.categories.pricing.items.contracts.aBold')}</strong>
                {t('faq.categories.pricing.items.contracts.aAfter')}
              </p>
            ),
          },
          {
            num: '02.03',
            q: t('faq.categories.pricing.items.included.q'),
            a: (
              <>
                <p>{t('faq.categories.pricing.items.included.p1')}</p>
                <ul>
                  {(
                    t('faq.categories.pricing.items.included.list', {
                      returnObjects: true,
                    }) as string[]
                  ).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </>
            ),
          },
          {
            num: '02.04',
            q: t('faq.categories.pricing.items.setup.q'),
            a: <p>{t('faq.categories.pricing.items.setup.a')}</p>,
          },
        ],
      },
      {
        id: 'cat-03',
        num: '03',
        title: t('faq.categories.services.title'),
        navLabel: t('faq.categories.services.navLabel'),
        items: [
          {
            num: '03.01',
            q: t('faq.categories.services.items.inhouse.q'),
            a: (
              <>
                <p>{t('faq.categories.services.items.inhouse.p1')}</p>
                <p>{t('faq.categories.services.items.inhouse.p2')}</p>
              </>
            ),
          },
          {
            num: '03.02',
            q: t('faq.categories.services.items.creative.q'),
            a: <p>{t('faq.categories.services.items.creative.a')}</p>,
          },
          {
            num: '03.03',
            q: t('faq.categories.services.items.ehr.q'),
            a: (
              <>
                <p>{t('faq.categories.services.items.ehr.p1')}</p>
                <p>{t('faq.categories.services.items.ehr.p2')}</p>
              </>
            ),
          },
        ],
      },
      {
        id: 'cat-04',
        num: '04',
        title: t('faq.categories.compliance.title'),
        navLabel: t('faq.categories.compliance.navLabel'),
        items: [
          {
            num: '04.01',
            q: t('faq.categories.compliance.items.baa.q'),
            a: (
              <p>
                {t('faq.categories.compliance.items.baa.aBefore')}
                <strong>{t('faq.categories.compliance.items.baa.aBold')}</strong>
                {t('faq.categories.compliance.items.baa.aAfter')}
              </p>
            ),
          },
          {
            num: '04.02',
            q: t('faq.categories.compliance.items.phi.q'),
            a: (
              <>
                <p>{t('faq.categories.compliance.items.phi.p1')}</p>
                <p>{t('faq.categories.compliance.items.phi.p2')}</p>
              </>
            ),
          },
          {
            num: '04.03',
            q: t('faq.categories.compliance.items.offboard.q'),
            a: <p>{t('faq.categories.compliance.items.offboard.a')}</p>,
          },
        ],
      },
      {
        id: 'cat-05',
        num: '05',
        title: t('faq.categories.reporting.title'),
        navLabel: t('faq.categories.reporting.navLabel'),
        items: [
          {
            num: '05.01',
            q: t('faq.categories.reporting.items.cadence.q'),
            a: (
              <p>
                {t('faq.categories.reporting.items.cadence.aBefore')}
                <strong>{t('faq.categories.reporting.items.cadence.aBold1')}</strong>
                {t('faq.categories.reporting.items.cadence.aMid1')}
                <strong>{t('faq.categories.reporting.items.cadence.aBold2')}</strong>
                {t('faq.categories.reporting.items.cadence.aMid2')}
                <strong>{t('faq.categories.reporting.items.cadence.aBold3')}</strong>
                {t('faq.categories.reporting.items.cadence.aAfter')}
              </p>
            ),
          },
          {
            num: '05.02',
            q: t('faq.categories.reporting.items.kpis.q'),
            a: <p>{t('faq.categories.reporting.items.kpis.a')}</p>,
          },
          {
            num: '05.03',
            q: t('faq.categories.reporting.items.noResults.q'),
            a: <p>{t('faq.categories.reporting.items.noResults.a')}</p>,
          },
        ],
      },
    ],
    [t]
  );
}
