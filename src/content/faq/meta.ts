import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface MetaRow {
  label: string;
  value: string;
}

/** React hook for the FAQ head meta rows. */
export function useMetaRows(): readonly MetaRow[] {
  const { t } = useTranslation('pages');
  return useMemo(
    () => [
      {
        label: t('faq.head.meta.sectionsLabel'),
        value: t('faq.head.meta.sectionsValue'),
      },
      {
        label: t('faq.head.meta.updatedLabel'),
        value: t('faq.head.meta.updatedValue'),
      },
      {
        label: t('faq.head.meta.responseLabel'),
        value: t('faq.head.meta.responseValue'),
      },
    ],
    [t]
  );
}
