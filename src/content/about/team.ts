import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/** React hook for the founder credentials list. */
export function useFounderCreds(): readonly string[] {
  const { t } = useTranslation('about');
  return useMemo(() => {
    const raw = t('team.founder.creds', { returnObjects: true }) as unknown;
    return Array.isArray(raw) ? (raw as string[]) : [];
  }, [t]);
}
