import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Home page — Contact section content.
 *
 * Site-wide contact info (email, phone, social, address parts) lives in
 * `content/site.ts`. This file holds the page-local section copy (via
 * hooks) and the map URLs that are bespoke to the Home → Contact section.
 */

export interface HomeContactHead {
  eyebrow: string;
  title: string;
  sub: string;
}

/** React hook for the section header copy. */
export function useHomeContactHead(): HomeContactHead {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('contactSection.head.eyebrow'),
      title: t('contactSection.head.title'),
      sub: t('contactSection.head.sub'),
    }),
    [t]
  );
}

export interface HomeContactCard {
  mapChip: string;
  headquartersEyebrow: string;
  cityRegionHeading: string;
  hqName: string;
  hoursLabel: string;
  countryName: string;
  mapLinkAriaLabel: string;
  getDirectionsText: string;
}

/** React hook for the right-hand info card copy. */
export function useHomeContactCard(): HomeContactCard {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      mapChip: t('contactSection.card.mapChip'),
      headquartersEyebrow: t('contactSection.card.headquartersEyebrow'),
      cityRegionHeading: t('contactSection.card.cityRegionHeading'),
      hqName: t('contactSection.card.hqName'),
      hoursLabel: t('contactSection.card.hoursLabel'),
      countryName: t('contactSection.card.countryName'),
      mapLinkAriaLabel: t('contactSection.card.mapLinkAriaLabel'),
      getDirectionsText: t('contactSection.card.getDirectionsText'),
    }),
    [t]
  );
}

export const HOME_CONTACT_MAP_URLS = {
  embed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.9323492505287!2d-96.98322979999999!3d32.8735093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e82728572860b%3A0xd7e7c0a9ee1d6a04!2s3001%20Skyway%20Cir%20N%2C%20Irving%2C%20TX%2075038%2C%20USA!5e0!3m2!1sen!2snp!4v1777236289640!5m2!1sen!2snp',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=3001+Skyway+Cir+N+Irving+TX+75038',
} as const;
