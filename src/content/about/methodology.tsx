import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import phase1Img from '../../assets/nextgen-image/Analytics&report.png';
import phase2Img from '../../assets/nextgen-image/Strategy&planning.png';
import { PLACEHOLDER_IMAGE as phase3Img } from '@/lib/placeholderImage';

export interface Phase {
  num: string;
  phase: string;
  title: string;
  body: string;
  foot: string;
  href: string;
  image: string;
}

interface PhaseSpec {
  i18nKey: 'phase1' | 'phase2' | 'phase3';
  href: string;
  image: string;
}

const PHASE_SPECS: readonly PhaseSpec[] = [
  { i18nKey: 'phase1', href: '/methodology/phase-1', image: phase1Img },
  { i18nKey: 'phase2', href: '/methodology/phase-2', image: phase2Img },
  { i18nKey: 'phase3', href: '/methodology/phase-3', image: phase3Img },
];

/** React hook for the methodology phases. */
export function usePhases(): readonly Phase[] {
  const { t } = useTranslation('about');
  return useMemo(
    () =>
      PHASE_SPECS.map((spec) => {
        const base = `methodology.phases.${spec.i18nKey}`;
        return {
          num: t(`${base}.num`),
          phase: t(`${base}.phase`),
          title: t(`${base}.title`),
          body: t(`${base}.body`),
          foot: t(`${base}.foot`),
          href: spec.href,
          image: spec.image,
        };
      }),
    [t]
  );
}
