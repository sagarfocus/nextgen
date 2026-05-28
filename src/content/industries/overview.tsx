import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import emergencyImg from '../../assets/nextgen-image/Erofwhiterockimg.jpg';
import urgentCareImg from '../../assets/nextgen-image/Irvingmedspaimg.webp';
import medspaImg from '../../assets/nextgen-image/Napervilleimg.jpg';

export interface OverviewCard {
  slug: string;
  ariaId: string;
  meta: string;
  titleText: string;
  title: ReactElement;
  text: string;
  image: string;
  imageAlt: string;
}

/** React hook for the Industries overview cards — live-translates on language change. */
export function useIndustriesOverview(): OverviewCard[] {
  const { t } = useTranslation('industries');
  return useMemo(
    () => [
      {
        slug: 'freestanding-er',
        ariaId: 'ov-1',
        meta: t('overview.cards.freestandingEr.meta'),
        titleText: t('overview.cards.freestandingEr.title'),
        title: <>{t('overview.cards.freestandingEr.title')}</>,
        text: t('overview.cards.freestandingEr.text'),
        image: emergencyImg,
        imageAlt: t('overview.cards.freestandingEr.imageAlt'),
      },
      {
        slug: 'urgent-care',
        ariaId: 'ov-2',
        meta: t('overview.cards.urgentCare.meta'),
        titleText: t('overview.cards.urgentCare.title'),
        title: <>{t('overview.cards.urgentCare.title')}</>,
        text: t('overview.cards.urgentCare.text'),
        image: urgentCareImg,
        imageAlt: t('overview.cards.urgentCare.imageAlt'),
      },
      {
        slug: 'medspa',
        ariaId: 'ov-3',
        meta: t('overview.cards.medspa.meta'),
        titleText: t('overview.cards.medspa.title'),
        title: <>{t('overview.cards.medspa.title')}</>,
        text: t('overview.cards.medspa.text'),
        image: medspaImg,
        imageAlt: t('overview.cards.medspa.imageAlt'),
      },
    ],
    [t]
  );
}
