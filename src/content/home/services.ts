import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import fieldImg from '../../assets/nextgen-image/Onsitefieldmarketing.png';
import autoImg from '../../assets/nextgen-image/Medicalautomationimg.png';
import seoImg from '../../assets/nextgen-image/Seoimg.png';
import socialImg from '../../assets/nextgen-image/Socialmediaimg.png';
import emailImg from '../../assets/nextgen-image/Emailcampingimg.png';
import adsImg from '../../assets/nextgen-image/googleadsimg.png';

/**
 * Home page — "Marketing built for healthcare practices." section.
 *
 * The GSAP scroll-pin / horizontal track behavior lives in
 * `src/pages/Home/Services.tsx`. This file just supplies the card data
 * (translated via `useHomeServices`) and the section's header copy
 * (via `useHomeServicesHead`).
 */

type HomeServiceKey =
  | 'seo'
  | 'social'
  | 'googleAds'
  | 'field'
  | 'automation'
  | 'email';

export interface HomeServiceCard {
  key: HomeServiceKey;
  tag: string;
  title: string;
  sub: string;
  ariaLabel: string;
  image: string;
  imgFocus?: 'left' | 'right' | 'center';
  to: string;
}

interface HomeServiceStatic {
  key: HomeServiceKey;
  image: string;
  imgFocus?: 'left' | 'right' | 'center';
  to: string;
}

const HOME_SERVICE_STATIC: readonly HomeServiceStatic[] = [
  { key: 'seo', image: seoImg, to: '/services/seo' },
  { key: 'social', image: socialImg, to: '/services/social-media-marketing' },
  { key: 'googleAds', image: adsImg, to: '/services/google-ads' },
  { key: 'field', image: fieldImg, to: '/onsite-field-marketing' },
  { key: 'automation', image: autoImg, imgFocus: 'left', to: '/medical-automation' },
  { key: 'email', image: emailImg, to: '/services/email-drip-campaigns' },
];

export interface HomeServicesHead {
  eyebrow: string;
  title: string;
  sub: string;
  allLinkText: string;
  allLinkTo: string;
}

/** React hook for the Services section header copy. */
export function useHomeServicesHead(): HomeServicesHead {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('services.head.eyebrow'),
      title: t('services.head.title'),
      sub: t('services.head.sub'),
      allLinkText: t('services.head.allLinkText'),
      allLinkTo: '/services',
    }),
    [t]
  );
}

/** React hook for the Services section card data. */
export function useHomeServices(): readonly HomeServiceCard[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_SERVICE_STATIC.map((s) => ({
        key: s.key,
        tag: t(`services.items.${s.key}.tag`),
        title: t(`services.items.${s.key}.title`),
        sub: t(`services.items.${s.key}.sub`),
        ariaLabel: t(`services.items.${s.key}.ariaLabel`),
        image: s.image,
        imgFocus: s.imgFocus,
        to: s.to,
      })),
    [t]
  );
}
