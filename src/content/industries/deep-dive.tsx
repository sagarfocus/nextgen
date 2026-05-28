import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClockIcon } from '@/components/icons';

export interface SubCard {
  num: string;
  category: string;
  title: string;
  text: string;
}

export interface IndustryBlock {
  id: string;
  num: string;
  badge: string;
  iconClass: string;
  icon: ReactElement;
  title: ReactElement;
  desc: string;
  tags: string[];
  subs: SubCard[];
}

const ERIcon = () => (
  <svg
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/** React hook for the deep-dive industry blocks — live-translates on language change. */
export function useIndustryDeepDiveBlocks(): IndustryBlock[] {
  const { t } = useTranslation('industries');
  return useMemo(
    () => [
      {
        id: 'emergency-room',
        num: '01',
        badge: t('deepDive.blocks.emergencyRoom.badge'),
        iconClass: 'ind-block-icon cta-blue',
        icon: <ERIcon />,
        title: <>{t('deepDive.blocks.emergencyRoom.title')}</>,
        desc: t('deepDive.blocks.emergencyRoom.desc'),
        tags: [
          t('deepDive.blocks.emergencyRoom.tags.trauma'),
          t('deepDive.blocks.emergencyRoom.tags.localPack'),
          t('deepDive.blocks.emergencyRoom.tags.geofencing'),
        ],
        subs: [
          {
            num: '/01',
            category: t('deepDive.blocks.emergencyRoom.subs.visibility.category'),
            title: t('deepDive.blocks.emergencyRoom.subs.visibility.title'),
            text: t('deepDive.blocks.emergencyRoom.subs.visibility.text'),
          },
          {
            num: '/02',
            category: t('deepDive.blocks.emergencyRoom.subs.searchIntent.category'),
            title: t('deepDive.blocks.emergencyRoom.subs.searchIntent.title'),
            text: t('deepDive.blocks.emergencyRoom.subs.searchIntent.text'),
          },
          {
            num: '/03',
            category: t('deepDive.blocks.emergencyRoom.subs.capture.category'),
            title: t('deepDive.blocks.emergencyRoom.subs.capture.title'),
            text: t('deepDive.blocks.emergencyRoom.subs.capture.text'),
          },
          {
            num: '/04',
            category: t('deepDive.blocks.emergencyRoom.subs.reputation.category'),
            title: t('deepDive.blocks.emergencyRoom.subs.reputation.title'),
            text: t('deepDive.blocks.emergencyRoom.subs.reputation.text'),
          },
        ],
      },
      {
        id: 'urgent-care',
        num: '02',
        badge: t('deepDive.blocks.urgentCare.badge'),
        iconClass: 'ind-block-icon',
        icon: <ClockIcon size={26} strokeWidth={1.7} />,
        title: <>{t('deepDive.blocks.urgentCare.title')}</>,
        desc: t('deepDive.blocks.urgentCare.desc'),
        tags: [
          t('deepDive.blocks.urgentCare.tags.volume'),
          t('deepDive.blocks.urgentCare.tags.reviews'),
          t('deepDive.blocks.urgentCare.tags.waitTimes'),
        ],
        subs: [
          {
            num: '/01',
            category: t('deepDive.blocks.urgentCare.subs.throughput.category'),
            title: t('deepDive.blocks.urgentCare.subs.throughput.title'),
            text: t('deepDive.blocks.urgentCare.subs.throughput.text'),
          },
          {
            num: '/02',
            category: t('deepDive.blocks.urgentCare.subs.trust.category'),
            title: t('deepDive.blocks.urgentCare.subs.trust.title'),
            text: t('deepDive.blocks.urgentCare.subs.trust.text'),
          },
          {
            num: '/03',
            category: t('deepDive.blocks.urgentCare.subs.convenience.category'),
            title: t('deepDive.blocks.urgentCare.subs.convenience.title'),
            text: t('deepDive.blocks.urgentCare.subs.convenience.text'),
          },
          {
            num: '/04',
            category: t('deepDive.blocks.urgentCare.subs.coverage.category'),
            title: t('deepDive.blocks.urgentCare.subs.coverage.title'),
            text: t('deepDive.blocks.urgentCare.subs.coverage.text'),
          },
        ],
      },
      {
        id: 'wellness',
        num: '03',
        badge: t('deepDive.blocks.wellness.badge'),
        iconClass: 'ind-block-icon tan',
        icon: <HeartIcon />,
        title: <>{t('deepDive.blocks.wellness.title')}</>,
        desc: t('deepDive.blocks.wellness.desc'),
        tags: [
          t('deepDive.blocks.wellness.tags.highLtv'),
          t('deepDive.blocks.wellness.tags.socialLed'),
          t('deepDive.blocks.wellness.tags.retention'),
        ],
        subs: [
          {
            num: '/01',
            category: t('deepDive.blocks.wellness.subs.acquisition.category'),
            title: t('deepDive.blocks.wellness.subs.acquisition.title'),
            text: t('deepDive.blocks.wellness.subs.acquisition.text'),
          },
          {
            num: '/02',
            category: t('deepDive.blocks.wellness.subs.nurture.category'),
            title: t('deepDive.blocks.wellness.subs.nurture.title'),
            text: t('deepDive.blocks.wellness.subs.nurture.text'),
          },
          {
            num: '/03',
            category: t('deepDive.blocks.wellness.subs.retention.category'),
            title: t('deepDive.blocks.wellness.subs.retention.title'),
            text: t('deepDive.blocks.wellness.subs.retention.text'),
          },
          {
            num: '/04',
            category: t('deepDive.blocks.wellness.subs.brand.category'),
            title: t('deepDive.blocks.wellness.subs.brand.title'),
            text: t('deepDive.blocks.wellness.subs.brand.text'),
          },
        ],
      },
    ],
    [t]
  );
}
