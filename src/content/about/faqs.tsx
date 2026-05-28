import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface FAQItem {
  q: string;
  a: ReactNode;
  defaultOpen?: boolean;
}

/** React hook for the About FAQ items. Live-translates on language change. */
export function useAboutFAQs(): readonly FAQItem[] {
  const { t } = useTranslation('about');
  return useMemo(
    () => [
      {
        q: t('faqs.items.hipaa.q'),
        a: (
          <>
            {t('faqs.items.hipaa.aBefore')}
            <strong>{t('faqs.items.hipaa.aBold1')}</strong>
            {t('faqs.items.hipaa.aMid')}
          </>
        ),
        defaultOpen: true,
      },
      {
        q: t('faqs.items.onlyHealthcare.q'),
        a: (
          <>
            <strong>{t('faqs.items.onlyHealthcare.aBold1')}</strong>
            {t('faqs.items.onlyHealthcare.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.practicesType.q'),
        a: (
          <>
            {t('faqs.items.practicesType.aBefore')}
            <strong>{t('faqs.items.practicesType.aBold1')}</strong>
            {t('faqs.items.practicesType.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.speed.q'),
        a: (
          <>
            {t('faqs.items.speed.aBefore')}
            <strong>{t('faqs.items.speed.aBold1')}</strong>
            {t('faqs.items.speed.aMid')}
            <strong>{t('faqs.items.speed.aBold2')}</strong>
            {t('faqs.items.speed.aAfter')}
          </>
        ),
      },
      {
        q: t('faqs.items.internalTeam.q'),
        a: (
          <>
            {t('faqs.items.internalTeam.aBefore')}
            <strong>{t('faqs.items.internalTeam.aBold1')}</strong>
            {t('faqs.items.internalTeam.aMid')}
          </>
        ),
      },
    ],
    [t]
  );
}
