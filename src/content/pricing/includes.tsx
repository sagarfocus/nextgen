import { useMemo } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { UsersIcon } from '@/components/icons';

export interface IncludeCard {
  tag: string;
  title: string;
  text: ReactNode;
  bullets: ReactNode[];
  icon: ReactElement;
}

interface CardSpec {
  i18nKey: 'team' | 'launch' | 'hipaa';
  icon: ReactElement;
}

const CARD_SPECS: readonly CardSpec[] = [
  {
    i18nKey: 'team',
    icon: <UsersIcon size={22} strokeWidth={1.8} />,
  },
  {
    i18nKey: 'launch',
    icon: (
      <svg
        width={22}
        height={22}
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
    i18nKey: 'hipaa',
    icon: (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
        <path d="M9 12 L 11 14 L 15 10" />
      </svg>
    ),
  },
];

/** React hook for the "What your investment includes" cards. */
export function useIncludeCards(): readonly IncludeCard[] {
  const { t } = useTranslation('pricing');
  return useMemo(
    () =>
      CARD_SPECS.map((spec) => {
        const base = `includes.cards.${spec.i18nKey}`;
        const bulletsRaw = t(`${base}.bullets`, { returnObjects: true }) as unknown;
        const bullets = Array.isArray(bulletsRaw) ? (bulletsRaw as string[]) : [];
        return {
          tag: t(`${base}.tag`),
          title: t(`${base}.title`),
          text: t(`${base}.text`),
          bullets,
          icon: spec.icon,
        };
      }),
    [t]
  );
}
