import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface FAQItem {
  q: string;
  a: ReactNode;
  defaultOpen?: boolean;
}

/** React hook for the Pricing FAQ items. */
export function usePricingFAQs(): readonly FAQItem[] {
  const { t } = useTranslation('pricing');
  return useMemo(
    () => [
      {
        q: t('faqs.items.included.q'),
        a: (
          <>
            {t('faqs.items.included.aBefore')}
            <strong>{t('faqs.items.included.aBold1')}</strong>
            {t('faqs.items.included.aAfter')}
          </>
        ),
        defaultOpen: true,
      },
      {
        q: t('faqs.items.adSpend.q'),
        a: (
          <>
            <strong>{t('faqs.items.adSpend.aBold1')}</strong>
            {t('faqs.items.adSpend.aMid')}
            <strong>{t('faqs.items.adSpend.aBold2')}</strong>
            {t('faqs.items.adSpend.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.contract.q'),
        a: (
          <>
            {t('faqs.items.contract.aBefore')}
            <strong>{t('faqs.items.contract.aBold1')}</strong>
            {t('faqs.items.contract.aMid')}
            <strong>{t('faqs.items.contract.aBold2')}</strong>
            {t('faqs.items.contract.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.scaleElite.q'),
        a: (
          <>
            {t('faqs.items.scaleElite.aBefore')}
            <strong>{t('faqs.items.scaleElite.aBold1')}</strong>
            {t('faqs.items.scaleElite.aMid')}
            <strong>{t('faqs.items.scaleElite.aBold2')}</strong>
            {t('faqs.items.scaleElite.aMid2')}
            <strong>{t('faqs.items.scaleElite.aBold3')}</strong>
            {t('faqs.items.scaleElite.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.roi.q'),
        a: (
          <>
            {t('faqs.items.roi.aBefore')}
            <strong>{t('faqs.items.roi.aBold1')}</strong>
            {t('faqs.items.roi.aMid')}
            <strong>{t('faqs.items.roi.aBold2')}</strong>
            {t('faqs.items.roi.aMid2')}
            <strong>{t('faqs.items.roi.aBold3')}</strong>
            {t('faqs.items.roi.aAfter')}
          </>
        ),
      },
    ],
    [t]
  );
}
