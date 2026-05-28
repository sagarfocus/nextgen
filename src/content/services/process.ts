import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  active?: boolean;
}

interface StepConfig {
  num: string;
  key: 'discovery' | 'strategy' | 'build' | 'launch' | 'optimize' | 'scale';
  active?: boolean;
}

const STEP_CONFIG: StepConfig[] = [
  { num: '/01', key: 'discovery' },
  { num: '/02', key: 'strategy' },
  { num: '/03', key: 'build' },
  { num: '/04', key: 'launch', active: true },
  { num: '/05', key: 'optimize' },
  { num: '/06', key: 'scale' },
];

/** React hook for the Services page process steps — live-translates. */
export function useProcessSteps(): readonly ProcessStep[] {
  const { t } = useTranslation('services');
  return useMemo(
    () =>
      STEP_CONFIG.map((s) => ({
        num: s.num,
        title: t(`process.steps.${s.key}.title`),
        desc: t(`process.steps.${s.key}.desc`),
        ...(s.active ? { active: true } : {}),
      })),
    [t]
  );
}
