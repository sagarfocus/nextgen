import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface AboutHeroPill {
  cls: string;
  label: string;
}

interface PillSpec {
  cls: string;
  /** Translation key under `about:hero.orbitPills`. */
  i18nKey:
    | 'patientAcquisition'
    | 'hipaa'
    | 'localSeo'
    | 'automation'
    | 'reputation'
    | 'branding';
}

const PILL_SPECS: readonly PillSpec[] = [
  { cls: 'p1', i18nKey: 'patientAcquisition' },
  { cls: 'p2', i18nKey: 'hipaa' },
  { cls: 'p3', i18nKey: 'localSeo' },
  { cls: 'p4', i18nKey: 'automation' },
  { cls: 'p5', i18nKey: 'reputation' },
  { cls: 'p6', i18nKey: 'branding' },
];

/** React hook for the AboutHero orbit pills. */
export function useOrbitPills(): readonly AboutHeroPill[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      PILL_SPECS.map((spec) => ({
        cls: spec.cls,
        label: t(`hero.orbitPills.${spec.i18nKey}`),
      })),
    [t]
  );
}
