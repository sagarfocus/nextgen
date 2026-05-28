import { useMemo } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@/components/icons';

export interface ValueFAQ {
  q: string;
  a: string;
}

export interface ValueEntry {
  slug: string;
  num: string;
  /** i18n sub-key under `about:values.items` for this entry. */
  i18nKey: 'patientFirst' | 'revenueAccountable' | 'complianceWithoutCompromise';
  title: string;
  blurb: string;
  text: string;
  icon: ReactElement;
  visual: ReactNode;
  lead: string;
  body: string;
  longBody: string[];
  dontTitle: string;
  dontList: string[];
  doTitle: string;
  doList: string[];
  proof: { v: string; l: string };
  faqs: ValueFAQ[];
}

interface ValueSpec {
  slug: string;
  num: string;
  i18nKey: 'patientFirst' | 'revenueAccountable' | 'complianceWithoutCompromise';
  icon: ReactElement;
  buildVisual: (t: TFunction) => ReactNode;
}

const VALUE_SPECS: readonly ValueSpec[] = [
  {
    slug: 'patient-first-marketing',
    num: '/01',
    i18nKey: 'patientFirst',
    icon: (
      <svg
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    buildVisual: (t) => (
      <div className="ab-value-visual ab-value-visual-compare" aria-hidden="true">
        <div className="ab-vv-row ab-vv-row-bad">
          <span className="ab-vv-chip ab-vv-chip-bad">
            <XIcon />
            {t('values.items.patientFirst.visual.bad1')}
          </span>
          <span className="ab-vv-chip ab-vv-chip-bad">
            <XIcon />
            {t('values.items.patientFirst.visual.bad2')}
          </span>
        </div>
        <div className="ab-vv-row ab-vv-row-good">
          <span className="ab-vv-chip ab-vv-chip-good">
            <CheckIcon />
            {t('values.items.patientFirst.visual.good1')}
          </span>
          <span className="ab-vv-chip ab-vv-chip-good">
            <CheckIcon />
            {t('values.items.patientFirst.visual.good2')}
          </span>
        </div>
      </div>
    ),
  },
  {
    slug: 'revenue-accountable-results',
    num: '/02',
    i18nKey: 'revenueAccountable',
    icon: (
      <svg
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    buildVisual: (t) => (
      <div className="ab-value-visual ab-value-visual-stats" aria-hidden="true">
        <div className="ab-vv-stat">
          <span className="ab-vv-stat-l">{t('values.items.revenueAccountable.visual.cpaLabel')}</span>
          <span className="ab-vv-stat-v">{t('values.items.revenueAccountable.visual.cpaValue')}</span>
          <span className="ab-vv-stat-d ab-vv-down">{t('values.items.revenueAccountable.visual.cpaDelta')}</span>
        </div>
        <div className="ab-vv-stat">
          <span className="ab-vv-stat-l">{t('values.items.revenueAccountable.visual.showLabel')}</span>
          <span className="ab-vv-stat-v">{t('values.items.revenueAccountable.visual.showValue')}</span>
          <span className="ab-vv-stat-d ab-vv-up">{t('values.items.revenueAccountable.visual.showDelta')}</span>
        </div>
        <div className="ab-vv-stat">
          <span className="ab-vv-stat-l">{t('values.items.revenueAccountable.visual.roasLabel')}</span>
          <span className="ab-vv-stat-v">{t('values.items.revenueAccountable.visual.roasValue')}</span>
          <span className="ab-vv-stat-d ab-vv-up">{t('values.items.revenueAccountable.visual.roasDelta')}</span>
        </div>
      </div>
    ),
  },
  {
    slug: 'compliance-without-compromise',
    num: '/03',
    i18nKey: 'complianceWithoutCompromise',
    icon: (
      <svg
        width={26}
        height={26}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
        <path d="M9 12 L 11 14 L 15 10" />
      </svg>
    ),
    buildVisual: (t) => (
      <div className="ab-value-visual ab-value-visual-badges" aria-hidden="true">
        <span className="ab-vv-badge">
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
          </svg>
          {t('values.items.complianceWithoutCompromise.visual.hipaa')}
        </span>
        <span className="ab-vv-badge">
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
          </svg>
          {t('values.items.complianceWithoutCompromise.visual.baa')}
        </span>
        <span className="ab-vv-badge">
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          {t('values.items.complianceWithoutCompromise.visual.encrypted')}
        </span>
      </div>
    ),
  },
];

/** React hook for the About Values list. Live-translates on language change. */
export function useValueEntries(): readonly ValueEntry[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      VALUE_SPECS.map((spec) => {
        const base = `values.items.${spec.i18nKey}`;
        const dontList = t(`${base}.dontList`, { returnObjects: true }) as string[];
        const doList = t(`${base}.doList`, { returnObjects: true }) as string[];
        const faqsRaw = t(`${base}.faqs`, { returnObjects: true }) as ValueFAQ[];
        return {
          slug: spec.slug,
          num: spec.num,
          i18nKey: spec.i18nKey,
          title: t(`${base}.title`),
          blurb: t(`${base}.blurb`),
          text: t(`${base}.text`),
          icon: spec.icon,
          visual: spec.buildVisual(t),
          lead: t(`${base}.lead`),
          body: t(`${base}.body`),
          longBody: [
            t(`${base}.longBody1`),
            t(`${base}.longBody2`),
            t(`${base}.longBody3`),
          ],
          dontTitle: t(`${base}.dontTitle`),
          dontList: Array.isArray(dontList) ? dontList : [],
          doTitle: t(`${base}.doTitle`),
          doList: Array.isArray(doList) ? doList : [],
          proof: {
            v: t(`${base}.proofValue`),
            l: t(`${base}.proofLabel`),
          },
          faqs: Array.isArray(faqsRaw) ? faqsRaw : [],
        };
      }),
    [t]
  );
}

/** Returns the static slug list (no i18n required). */
export const VALUE_SLUGS: readonly string[] = VALUE_SPECS.map((s) => s.slug);

/** Returns the order index of a slug, or -1. */
export const valueIndex = (slug: string): number =>
  VALUE_SPECS.findIndex((s) => s.slug === slug);

export const valueDetailHref = (slug: string): string => `/about/value/${slug}`;
