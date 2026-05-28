import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ClockIcon, UsersIcon } from '@/components/icons';

export interface InfraCard {
  featured?: boolean;
  tag: string;
  title: string;
  text: string;
  bullets: string[];
  icon: ReactElement;
  to: string;
}

interface InfraSpec {
  featured?: boolean;
  i18nKey: 'growthTeam' | 'compliance' | 'sla';
  icon: ReactElement;
  to: string;
}

const INFRA_SPECS: readonly InfraSpec[] = [
  {
    featured: true,
    i18nKey: 'growthTeam',
    to: '/infrastructure/growth-team',
    icon: <UsersIcon />,
  },
  {
    i18nKey: 'compliance',
    to: '/infrastructure/compliance-protocol',
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
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    i18nKey: 'sla',
    to: '/infrastructure/service-level-agreements',
    icon: <ClockIcon size={26} strokeWidth={1.7} />,
  },
];

/** React hook for the infrastructure cards. */
export function useInfraCards(): readonly InfraCard[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      INFRA_SPECS.map((spec) => {
        const base = `infrastructure.cards.${spec.i18nKey}`;
        const bulletsRaw = t(`${base}.bullets`, { returnObjects: true }) as unknown;
        const bullets = Array.isArray(bulletsRaw) ? (bulletsRaw as string[]) : [];
        return {
          featured: spec.featured,
          tag: t(`${base}.tag`),
          title: t(`${base}.title`),
          text: t(`${base}.text`),
          bullets,
          icon: spec.icon,
          to: spec.to,
        };
      }),
    [t]
  );
}
