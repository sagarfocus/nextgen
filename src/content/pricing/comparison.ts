import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type CellValue = boolean;

export interface FeatureRow {
  feature: string;
  values: [CellValue, CellValue, CellValue];
}

export interface FeatureGroup {
  label: string;
  rows: FeatureRow[];
}

interface RowSpec {
  i18nKey: string;
  values: [CellValue, CellValue, CellValue];
}

interface GroupSpec {
  i18nKey: 'marketing' | 'automation' | 'scaleSupport' | 'enterprise';
  rows: readonly RowSpec[];
}

const GROUP_SPECS: readonly GroupSpec[] = [
  {
    i18nKey: 'marketing',
    rows: [
      { i18nKey: 'seo', values: [true, true, true] },
      { i18nKey: 'gmb', values: [true, true, true] },
      { i18nKey: 'googleAds', values: [true, true, true] },
      { i18nKey: 'metaAds', values: [true, true, true] },
      { i18nKey: 'social', values: [true, true, true] },
      { i18nKey: 'content', values: [true, true, true] },
    ],
  },
  {
    i18nKey: 'automation',
    rows: [
      { i18nKey: 'chatbot', values: [true, true, true] },
      { i18nKey: 'reports', values: [true, true, true] },
      { i18nKey: 'callHandling', values: [false, true, true] },
      { i18nKey: 'insurance', values: [false, true, true] },
    ],
  },
  {
    i18nKey: 'scaleSupport',
    rows: [
      { i18nKey: 'multiLocation', values: [false, true, true] },
      { i18nKey: 'monitoring', values: [false, true, true] },
      { i18nKey: 'accountManager', values: [false, true, true] },
      { i18nKey: 'sla', values: [false, true, true] },
    ],
  },
  {
    i18nKey: 'enterprise',
    rows: [
      { i18nKey: 'customDev', values: [false, false, true] },
      { i18nKey: 'apis', values: [false, false, true] },
      { i18nKey: 'multiState', values: [false, false, true] },
      { i18nKey: 'bi', values: [false, false, true] },
      { i18nKey: 'devTeam', values: [false, false, true] },
      { i18nKey: 'onboarding', values: [false, false, true] },
    ],
  },
];

/** React hook for the comparison-table groups. */
export function useGroups(): readonly FeatureGroup[] {
  const { t } = useTranslation('pricing');
  return useMemo(
    () =>
      GROUP_SPECS.map((group) => ({
        label: t(`comparison.groups.${group.i18nKey}.label`),
        rows: group.rows.map((row) => ({
          feature: t(`comparison.groups.${group.i18nKey}.rows.${row.i18nKey}`),
          values: row.values,
        })),
      })),
    [t]
  );
}
