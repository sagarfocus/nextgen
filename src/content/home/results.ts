import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Home page — "Proof of Work" section content.
 *
 * The featured stat's giant inline SVG illustration (Instagram post mockup,
 * growth curve, analytics bars) stays in `src/pages/Home/Results.tsx` —
 * it's bespoke rendering, not data.
 */

type SmallStatKey = 'er' | 'urgentCare' | 'medspaNetwork';

export interface HomeSmallStat {
  key: SmallStatKey;
  tag: string;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  ariaLabel: string;
}

export interface HomeResultsHead {
  eyebrow: string;
  title: string;
  sub: string;
}

/** React hook for the section header copy. */
export function useHomeResultsHead(): HomeResultsHead {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('results.head.eyebrow'),
      title: t('results.head.title'),
      sub: t('results.head.sub'),
    }),
    [t]
  );
}

export interface HomeResultsFeatured {
  tag: string;
  value: number;
  suffix: string;
  duration: number;
  label: string;
  ariaLabel: string;
}

/** React hook for the big featured stat card. */
export function useHomeResultsFeatured(): HomeResultsFeatured {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      tag: t('results.featured.tag'),
      value: 312,
      suffix: '%',
      duration: 2,
      label: t('results.featured.label'),
      ariaLabel: t('results.featured.ariaLabel'),
    }),
    [t]
  );
}

interface SmallStatStatic {
  key: SmallStatKey;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
}

const HOME_RESULTS_SMALL_STATS_STATIC: readonly SmallStatStatic[] = [
  { key: 'er', value: 47, suffix: '%' },
  { key: 'urgentCare', value: 2.8, suffix: '×', decimals: 1 },
  { key: 'medspaNetwork', value: 1.2, prefix: '$', suffix: 'M', decimals: 1 },
];

/** React hook for the three smaller stat cards. */
export function useHomeResultsSmallStats(): readonly HomeSmallStat[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_RESULTS_SMALL_STATS_STATIC.map((s) => ({
        key: s.key,
        tag: t(`results.stats.${s.key}.tag`),
        value: s.value,
        prefix: s.prefix,
        suffix: s.suffix,
        decimals: s.decimals,
        label: t(`results.stats.${s.key}.label`),
        ariaLabel: t(`results.stats.${s.key}.ariaLabel`),
      })),
    [t]
  );
}
