import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export interface TrustCardData {
  featured?: boolean;
  ariaId: string;
  icon: ReactElement;
  tag: string;
  title: string;
  text: string;
  bullets: string[];
  to: string;
}

const StarShieldIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 L 14.6 9 L 22 9.5 L 16.5 14 L 18 21.5 L 12 17.5 L 6 21.5 L 7.5 14 L 2 9.5 L 9.4 9 Z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
    <path d="M9 12 L 11 14 L 15 10" />
  </svg>
);

interface CardConfig {
  featured?: boolean;
  ariaId: string;
  icon: ReactElement;
  to: string;
  key: 'reputation' | 'hipaaWeb';
}

const CARD_CONFIG: CardConfig[] = [
  {
    featured: true,
    ariaId: 'trust-1',
    icon: <StarShieldIcon />,
    to: '/reviews-reputation',
    key: 'reputation',
  },
  {
    ariaId: 'trust-2',
    icon: <ShieldCheckIcon />,
    to: '/hipaa-compliance',
    key: 'hipaaWeb',
  },
];

/** React hook for the Trust Infrastructure cards — live-translates. */
export function useTrustCards(): readonly TrustCardData[] {
  const { t } = useTranslation('services');
  return useMemo(
    () =>
      CARD_CONFIG.map((c) => ({
        ...(c.featured ? { featured: true } : {}),
        ariaId: c.ariaId,
        icon: c.icon,
        to: c.to,
        tag: t(`trust.cards.${c.key}.tag`),
        title: t(`trust.cards.${c.key}.title`),
        text: t(`trust.cards.${c.key}.text`),
        bullets: t(`trust.cards.${c.key}.bullets`, { returnObjects: true }) as string[],
      })),
    [t]
  );
}
