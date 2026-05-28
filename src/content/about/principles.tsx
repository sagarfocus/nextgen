import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

export interface Principle {
  title: string;
  text: string;
  icon: ReactElement;
}

interface PrincipleSpec {
  i18nKey: 'healthcare' | 'hipaa' | 'empathy' | 'data';
  icon: ReactElement;
}

const PRINCIPLE_SPECS: readonly PrincipleSpec[] = [
  {
    i18nKey: 'healthcare',
    icon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    i18nKey: 'hipaa',
    icon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
        <path d="M9 12 L 11 14 L 15 10" />
      </svg>
    ),
  },
  {
    i18nKey: 'empathy',
    icon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    i18nKey: 'data',
    icon: (
      <svg
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
  },
];

/** React hook for the Genesis principles list. */
export function usePrinciples(): readonly Principle[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      PRINCIPLE_SPECS.map((spec) => ({
        title: t(`genesis.principles.${spec.i18nKey}.title`),
        text: t(`genesis.principles.${spec.i18nKey}.text`),
        icon: spec.icon,
      })),
    [t]
  );
}
