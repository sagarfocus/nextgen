import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import whatWeDoImg from '@/assets/nextgen-image/whatwedoimg.png';
import whatWeDoImg1 from '@/assets/nextgen-image/whatwedoimg1.png';

export interface PillarFeature {
  icon: ReactElement;
  title: string;
  desc: string;
}

export interface Pillar {
  tag: string;
  title: string;
  text: string;
  icon: ReactElement;
  art: ReactElement;
  image?: string;
  features: PillarFeature[];
  metric: { value: string; label: string };
}

interface FeatureSpec {
  i18nKey: string;
  icon: ReactElement;
}

interface PillarSpec {
  i18nKey: 'acquisition' | 'infrastructure';
  icon: ReactElement;
  art: ReactElement;
  image?: string;
  features: readonly FeatureSpec[];
}

const ACQUISITION_FEATURES: readonly FeatureSpec[] = [
  {
    i18nKey: 'mapPack',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    i18nKey: 'paidMedia',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    i18nKey: 'funnels',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
];

const INFRA_FEATURES: readonly FeatureSpec[] = [
  {
    i18nKey: 'websiteDesign',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    i18nKey: 'brand',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l2.3 5.3L20 9l-4 4.2L17 20l-5-2.8L7 20l1-6.8L4 9l5.7-1.7L12 2z" />
      </svg>
    ),
  },
  {
    i18nKey: 'analytics',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const PILLAR_SPECS: readonly PillarSpec[] = [
  {
    i18nKey: 'acquisition',
    image: whatWeDoImg,
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
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    art: (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ab-spec-acq-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#576DB5" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8FBC8F" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect width="320" height="120" rx="14" fill="url(#ab-spec-acq-grad)" />
        <g stroke="#576DB5" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="2 4" fill="none">
          <path d="M 12 92 L 64 76 L 116 84 L 168 56 L 220 60 L 272 32 L 308 22" />
        </g>
        <g fill="#576DB5">
          <circle cx="64" cy="76" r="3.4" />
          <circle cx="168" cy="56" r="3.4" />
          <circle cx="272" cy="32" r="3.4" />
        </g>
        <g transform="translate(232, 60)">
          <circle r="22" fill="rgba(87,109,181,0.16)" />
          <circle r="14" fill="none" stroke="#576DB5" strokeWidth="1.6" />
          <path d="M 9 9 L 18 18" stroke="#576DB5" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <g transform="translate(56, 36)">
          <path
            d="M 0 0 C 0 -8 12 -8 12 0 C 12 8 6 12 6 16 C 6 12 0 8 0 0 Z"
            fill="#8FBC8F"
            opacity="0.7"
          />
          <circle cx="6" cy="0" r="3" fill="#fff" />
        </g>
      </svg>
    ),
    features: ACQUISITION_FEATURES,
  },
  {
    i18nKey: 'infrastructure',
    image: whatWeDoImg1,
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    art: (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ab-spec-ops-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8FBC8F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#B38B6D" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect width="320" height="120" rx="14" fill="url(#ab-spec-ops-grad)" />
        <g transform="translate(24, 22)">
          <rect
            width="140"
            height="76"
            rx="6"
            fill="#fff"
            stroke="#8FBC8F"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <rect width="140" height="14" rx="6" fill="#8FBC8F" fillOpacity="0.18" />
          <circle cx="9" cy="7" r="2" fill="#8FBC8F" />
          <circle cx="17" cy="7" r="2" fill="#B38B6D" />
          <circle cx="25" cy="7" r="2" fill="#576DB5" />
          <rect x="12" y="26" width="60" height="6" rx="2" fill="#2D3748" fillOpacity="0.55" />
          <rect x="12" y="38" width="92" height="4" rx="2" fill="#2D3748" fillOpacity="0.25" />
          <rect x="12" y="48" width="80" height="4" rx="2" fill="#2D3748" fillOpacity="0.25" />
          <rect x="12" y="60" width="40" height="10" rx="3" fill="#8FBC8F" />
        </g>
        <g transform="translate(184, 22)">
          <rect
            width="112"
            height="76"
            rx="6"
            fill="#fff"
            stroke="#B38B6D"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <text
            x="10"
            y="22"
            fontFamily="system-ui, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#718096"
            letterSpacing="1.4"
          >
            ANALYTICS
          </text>
          <polyline
            points="10,58 28,46 46,52 64,38 82,42 100,28"
            fill="none"
            stroke="#576DB5"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="#576DB5">
            <circle cx="28" cy="46" r="2" />
            <circle cx="64" cy="38" r="2" />
            <circle cx="100" cy="28" r="2" />
          </g>
          <rect x="10" y="64" width="92" height="3" rx="1.5" fill="#8FBC8F" fillOpacity="0.55" />
        </g>
      </svg>
    ),
    features: INFRA_FEATURES,
  },
];

/** React hook for the About services-spectrum pillars. */
export function usePillars(): readonly Pillar[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      PILLAR_SPECS.map((spec) => {
        const base = `spectrum.pillars.${spec.i18nKey}`;
        return {
          tag: t(`${base}.tag`),
          title: t(`${base}.title`),
          text: t(`${base}.text`),
          icon: spec.icon,
          art: spec.art,
          image: spec.image,
          features: spec.features.map((f) => ({
            icon: f.icon,
            title: t(`${base}.features.${f.i18nKey}.title`),
            desc: t(`${base}.features.${f.i18nKey}.desc`),
          })),
          metric: {
            value: t(`${base}.metricValue`),
            label: t(`${base}.metricLabel`),
          },
        };
      }),
    [t]
  );
}
