import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export interface OrbitPill {
  slot: 'o1' | 'o2' | 'o3' | 'o4' | 'o5' | 'o6';
  label: string;
  sub: string;
  icon: ReactElement;
}

const SearchIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const StarIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const LayoutIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

interface OrbitConfig {
  slot: OrbitPill['slot'];
  key: 'seo' | 'paid' | 'branding' | 'automation' | 'web' | 'content';
  icon: ReactElement;
}

const ORBIT_CONFIG: OrbitConfig[] = [
  { slot: 'o1', key: 'seo', icon: <SearchIcon /> },
  { slot: 'o2', key: 'paid', icon: <ChartIcon /> },
  { slot: 'o3', key: 'branding', icon: <StarIcon /> },
  { slot: 'o4', key: 'automation', icon: <SettingsIcon /> },
  { slot: 'o5', key: 'web', icon: <LayoutIcon /> },
  { slot: 'o6', key: 'content', icon: <ChatIcon /> },
];

/** React hook for the Services hero orbit pills — live-translates. */
export function useOrbitPills(): readonly OrbitPill[] {
  const { t } = useTranslation('services');
  return useMemo(
    () =>
      ORBIT_CONFIG.map((o) => ({
        slot: o.slot,
        icon: o.icon,
        label: t(`hero.orbit.${o.key}.label`),
        sub: t(`hero.orbit.${o.key}.sub`),
      })),
    [t]
  );
}

const CAPABILITY_KEYS = [
  'seo',
  'googleAds',
  'metaAds',
  'socialMedia',
  'content',
  'gbp',
  'web',
  'brand',
  'print',
  'strategy',
  'field',
  'analytics',
] as const;

/** React hook for the capability marquee items — live-translates. */
export function useCapabilities(): readonly string[] {
  const { t } = useTranslation('services');
  return useMemo(() => CAPABILITY_KEYS.map((k) => t(`hero.capabilities.${k}`)), [t]);
}
