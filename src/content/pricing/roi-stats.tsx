import { useMemo } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ClockIcon } from '@/components/icons';

export interface Stat {
  num: ReactNode;
  label: string;
  text: string;
  icon: ReactElement;
}

/** React hook for the automation ROI stat cards. */
export function useStats(): readonly Stat[] {
  const { t } = useTranslation('pricing');
  return useMemo(
    () => [
      {
        num: (
          <>
            15<em>+</em> hrs
          </>
        ),
        label: t('roi.stats.hours.label'),
        text: t('roi.stats.hours.text'),
        icon: <ClockIcon />,
      },
      {
        num: (
          <>
            300<em>%</em>
          </>
        ),
        label: t('roi.stats.roi.label'),
        text: t('roi.stats.roi.text'),
        icon: (
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
        ),
      },
      {
        num: t('roi.stats.turnover.num'),
        label: t('roi.stats.turnover.label'),
        text: t('roi.stats.turnover.text'),
        icon: (
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        ),
      },
      {
        num: t('roi.stats.claims.num'),
        label: t('roi.stats.claims.label'),
        text: t('roi.stats.claims.text'),
        icon: (
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ),
      },
    ],
    [t]
  );
}
