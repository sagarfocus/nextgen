import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Home page — "Industries We Serve" section content.
 *
 * Eight specialty cards (left list) and six floating tags (right SVG visual)
 * each carry their own glyph. The large inline SVG diagram (orbits, hub,
 * data nodes) stays in `src/pages/Home/Industries.tsx` — it's bespoke art,
 * not data. Display strings come from i18n via the hooks exported below.
 */

const PlusIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 14" />
  </svg>
);

const SparkleIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2 13.7 9.2 20.8 11 13.7 12.8 12 19.8 10.3 12.8 3.2 11 10.3 9.2 12 2.2Z" />
    <path
      d="M19 3.6 19.8 5.9 22.1 6.6 19.8 7.4 19 9.7 18.2 7.4 15.9 6.6 18.2 5.9 19 3.6Z"
      opacity=".75"
    />
  </svg>
);

const ToothIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 3.2c-2.6 0-4.3 1.7-4.3 4.4 0 1.9.5 3.3 1 4.9.4 1.4.6 3 .9 4.6.3 1.6.9 3.8 1.7 3.8.7 0 1.1-1.4 1.4-3 .3-1.8.8-2.9 1.8-2.9h2.6c1 0 1.5 1.1 1.8 2.9.3 1.6.7 3 1.4 3 .8 0 1.4-2.2 1.7-3.8.3-1.6.5-3.2.9-4.6.5-1.6 1-3 1-4.9 0-2.7-1.7-4.4-4.3-4.4-1.6 0-2.8 1.1-4 1.1-1.2 0-2.4-1.1-4-1.1z" />
  </svg>
);

const BrainIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9.5 3.5a2.8 2.8 0 0 0-2.8 2.8v.4A2.8 2.8 0 0 0 4 9.5v1.3a2.8 2.8 0 0 0 0 4.4v1.3a2.8 2.8 0 0 0 2.7 2.8 2.8 2.8 0 0 0 2.8 2.7" />
    <path d="M14.5 3.5a2.8 2.8 0 0 1 2.8 2.8v.4A2.8 2.8 0 0 1 20 9.5v1.3a2.8 2.8 0 0 1 0 4.4v1.3a2.8 2.8 0 0 1-2.7 2.8 2.8 2.8 0 0 1-2.8 2.7" />
    <line x1="12" y1="3.5" x2="12" y2="20.5" />
    <path d="M8 10h2M14 10h2M8 14h2M14 14h2" />
  </svg>
);

const BabyFaceIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="6.5" r="2.5" />
    <circle cx="12" cy="14" r="7.5" />
    <circle cx="9.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    <path d="M9.6 16.6c.7.7 1.6 1 2.4 1s1.7-.3 2.4-1" />
  </svg>
);

const SpineIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2v20" />
    <path d="M8 5h8" />
    <path d="M7 9h10" />
    <path d="M8 13h8" />
    <path d="M7 17h10" />
    <path d="M9 21h6" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3v6a4 4 0 0 0 8 0V3" />
    <path d="M10 13v3a4 4 0 0 0 8 0v-2" />
    <circle cx="18" cy="11" r="2" />
  </svg>
);

type SpecialtyKey =
  | 'er'
  | 'urgentCare'
  | 'medspa'
  | 'dental'
  | 'chiro'
  | 'mental'
  | 'primary'
  | 'pediatrics';

type TagKey = 'er' | 'urgentCare' | 'medspa' | 'dental' | 'mental' | 'pediatrics';

type PillarKey = 'cost' | 'competition' | 'compliance';

export interface HomeIndustryTag {
  slot: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';
  name: string;
  icon: ReactElement;
}

export interface HomeIndustrySpecialty {
  key: SpecialtyKey;
  name: string;
  meta: string;
  tone: 'sage' | 'periwinkle' | 'clay';
  icon: ReactElement;
}

interface SpecialtyStatic {
  key: SpecialtyKey;
  tone: 'sage' | 'periwinkle' | 'clay';
  icon: ReactElement;
}

const HOME_INDUSTRY_SPECIALTIES_STATIC: readonly SpecialtyStatic[] = [
  { key: 'er', tone: 'sage', icon: <PlusIcon /> },
  { key: 'urgentCare', tone: 'periwinkle', icon: <ClockIcon /> },
  { key: 'medspa', tone: 'clay', icon: <SparkleIcon /> },
  { key: 'dental', tone: 'sage', icon: <ToothIcon /> },
  { key: 'chiro', tone: 'periwinkle', icon: <SpineIcon /> },
  { key: 'mental', tone: 'clay', icon: <BrainIcon /> },
  { key: 'primary', tone: 'sage', icon: <StethoscopeIcon /> },
  { key: 'pediatrics', tone: 'periwinkle', icon: <BabyFaceIcon /> },
];

interface TagStatic {
  slot: HomeIndustryTag['slot'];
  key: TagKey;
  icon: ReactElement;
}

const HOME_INDUSTRY_TAGS_STATIC: readonly TagStatic[] = [
  { slot: 't1', key: 'er', icon: <PlusIcon /> },
  { slot: 't2', key: 'urgentCare', icon: <ClockIcon /> },
  { slot: 't3', key: 'medspa', icon: <SparkleIcon /> },
  { slot: 't4', key: 'dental', icon: <ToothIcon /> },
  { slot: 't5', key: 'mental', icon: <BrainIcon /> },
  { slot: 't6', key: 'pediatrics', icon: <BabyFaceIcon /> },
];

const PILLAR_KEYS: readonly PillarKey[] = ['cost', 'competition', 'compliance'];

/** React hook for the eight specialty cards. */
export function useHomeIndustrySpecialties(): readonly HomeIndustrySpecialty[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_INDUSTRY_SPECIALTIES_STATIC.map((s) => ({
        key: s.key,
        name: t(`industries.specialties.${s.key}.name`),
        meta: t(`industries.specialties.${s.key}.meta`),
        tone: s.tone,
        icon: s.icon,
      })),
    [t]
  );
}

/** React hook for the six floating tags in the SVG visual. */
export function useHomeIndustryTags(): readonly HomeIndustryTag[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_INDUSTRY_TAGS_STATIC.map((tag) => ({
        slot: tag.slot,
        name: t(`industries.tags.${tag.key}`),
        icon: tag.icon,
      })),
    [t]
  );
}

/** React hook for the three "varies on" pillars. */
export function useHomeIndustryPillars(): readonly string[] {
  const { t } = useTranslation('home');
  return useMemo(() => PILLAR_KEYS.map((k) => t(`industries.pillars.${k}`)), [t]);
}

export interface HomeIndustryCopy {
  eyebrow: string;
  title: string;
  lead: string;
  pillarsLabel: string;
  strapBefore: string;
  strapAfter: string;
}

/** React hook for the section's static copy strings. */
export function useHomeIndustryCopy(): HomeIndustryCopy {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('industries.eyebrow'),
      title: t('industries.title'),
      lead: t('industries.lead'),
      pillarsLabel: t('industries.pillarsLabel'),
      strapBefore: t('industries.strap.brand'),
      strapAfter: t('industries.strap.after'),
    }),
    [t]
  );
}

export interface HomeIndustryStat {
  key: 'campaigns' | 'adSpend' | 'roi';
  label: string;
  num: string;
}

const HOME_INDUSTRY_STATS_STATIC: readonly { key: HomeIndustryStat['key']; num: string }[] = [
  { key: 'campaigns', num: '500+' },
  { key: 'adSpend', num: '$10M+' },
  // The third stat's number uses the `&times;` JSX entity (rendered as ×).
  { key: 'roi', num: '3×' },
];

/** React hook for the three numeric stats above the specialty list. */
export function useHomeIndustryStats(): readonly HomeIndustryStat[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_INDUSTRY_STATS_STATIC.map((s) => ({
        key: s.key,
        label: t(`industries.stats.${s.key}`),
        num: s.num,
      })),
    [t]
  );
}
