import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export interface FAQItem {
  q: string;
  a: ReactNode;
  defaultOpen?: boolean;
}

/** React hook for the Industries FAQ list — live-translates on language change. */
export function useIndustriesFaqs(): FAQItem[] {
  const { t } = useTranslation('industries');
  return useMemo(
    () => [
      {
        q: t('faqs.items.specialize.q'),
        a: (
          <Trans
            i18nKey="faqs.items.specialize.a"
            ns="industries"
            components={{ strong: <strong /> }}
          />
        ),
        defaultOpen: true,
      },
      {
        q: t('faqs.items.erVsMedspa.q'),
        a: (
          <Trans
            i18nKey="faqs.items.erVsMedspa.a"
            ns="industries"
            components={{ strong: <strong /> }}
          />
        ),
      },
      {
        q: t('faqs.items.multiSpecialty.q'),
        a: (
          <Trans
            i18nKey="faqs.items.multiSpecialty.a"
            ns="industries"
            components={{ strong: <strong /> }}
          />
        ),
      },
      {
        q: t('faqs.items.timing.q'),
        a: (
          <Trans
            i18nKey="faqs.items.timing.a"
            ns="industries"
            components={{ strong: <strong /> }}
          />
        ),
      },
      {
        q: t('faqs.items.compliance.q'),
        a: (
          <Trans
            i18nKey="faqs.items.compliance.a"
            ns="industries"
            components={{ strong: <strong /> }}
          />
        ),
      },
    ],
    [t]
  );
}
