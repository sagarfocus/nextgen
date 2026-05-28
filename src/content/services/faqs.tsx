import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface FAQItem {
  q: string;
  a: ReactNode;
  defaultOpen?: boolean;
}

/** React hook for Services FAQ items — pulls translated HTML answers and
 *  renders them via dangerouslySetInnerHTML so the existing component
 *  layout (which expects ReactNode) keeps working. */
export function useServicesFaqs(): readonly FAQItem[] {
  const { t } = useTranslation('services');
  return useMemo(() => {
    const items = t('faqs.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
    return items.map((item, i) => ({
      q: item.q,
      a: <span dangerouslySetInnerHTML={{ __html: item.a }} />,
      ...(i === 0 ? { defaultOpen: true } : {}),
    }));
  }, [t]);
}

/** Plain-text FAQ items for schema.org payload (no markup). */
export function useServicesFaqsPlain(): readonly { q: string; a: string }[] {
  const { t } = useTranslation('services');
  return useMemo(() => {
    const items = t('faqs.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
    return items.map((item) => ({
      q: item.q,
      a: item.a.replace(/<[^>]+>/g, ''),
    }));
  }, [t]);
}
