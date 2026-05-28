import { useMemo } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

export interface Tier {
  featured?: boolean;
  badge?: string;
  name: string;
  amount: string;
  period?: string;
  tagline: string;
  bestFor: string;
  ctaLabel: string;
  ctaHref: string;
  includesLabel: string;
  includes: string[];
  notLabel?: string;
  notIncluded?: string[];
  notesLabel?: string;
  notes?: string[];
}

const readList = (t: TFunction, key: string): string[] => {
  const raw = t(key, { returnObjects: true }) as unknown;
  return Array.isArray(raw) ? (raw as string[]) : [];
};

/** React hook for the three pricing tiers. */
export function useTiers(): readonly Tier[] {
  const { t } = useTranslation('pricing');
  return useMemo(
    () => [
      {
        name: t('tiers.starter.name'),
        amount: t('tiers.starter.amount'),
        period: t('tiers.starter.period'),
        tagline: t('tiers.starter.tagline'),
        bestFor: t('tiers.starter.bestFor'),
        ctaLabel: t('tiers.starter.ctaLabel'),
        ctaHref: '/contact',
        includesLabel: t('tiers.starter.includesLabel'),
        includes: readList(t, 'tiers.starter.includes'),
        notLabel: t('tiers.starter.notLabel'),
        notIncluded: readList(t, 'tiers.starter.notIncluded'),
      },
      {
        featured: true,
        badge: t('tiers.growth.badge'),
        name: t('tiers.growth.name'),
        amount: t('tiers.growth.amount'),
        period: t('tiers.growth.period'),
        tagline: t('tiers.growth.tagline'),
        bestFor: t('tiers.growth.bestFor'),
        ctaLabel: t('tiers.growth.ctaLabel'),
        ctaHref: '/contact',
        includesLabel: t('tiers.growth.includesLabel'),
        includes: readList(t, 'tiers.growth.includes'),
        notLabel: t('tiers.growth.notLabel'),
        notIncluded: readList(t, 'tiers.growth.notIncluded'),
      },
      {
        name: t('tiers.scale.name'),
        amount: t('tiers.scale.amount'),
        tagline: t('tiers.scale.tagline'),
        bestFor: t('tiers.scale.bestFor'),
        ctaLabel: t('tiers.scale.ctaLabel'),
        ctaHref: '/contact',
        includesLabel: t('tiers.scale.includesLabel'),
        includes: readList(t, 'tiers.scale.includes'),
        notesLabel: t('tiers.scale.notesLabel'),
        notes: readList(t, 'tiers.scale.notes'),
      },
    ],
    [t]
  );
}
