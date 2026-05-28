import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../lib/routes';

/**
 * Navigation link data for Navbar and Footer.
 *
 * Routes come from `ROUTES`. Labels and descriptions come from i18n —
 * call the hook in a component, or use the static EN fallbacks if you
 * need data outside React (e.g. in schema.ts).
 */

export interface NavLink {
  to: string;
  label: string;
}

export interface ResourceLink extends NavLink {
  desc: string;
}

/** React hook for primary nav links — live-translates on language change. */
export function useNavPrimary(): readonly NavLink[] {
  const { t } = useTranslation('navigation');
  return useMemo(
    () => [
      { to: ROUTES.services.index, label: t('primary.services') },
      { to: ROUTES.industries.index, label: t('primary.industries') },
      { to: ROUTES.about.index, label: t('primary.about') },
      { to: ROUTES.contact, label: t('primary.contactUs') },
    ],
    [t]
  );
}

/** React hook for "Resources" dropdown links. */
export function useNavResources(): readonly ResourceLink[] {
  const { t } = useTranslation('navigation');
  return useMemo(
    () => [
      {
        to: ROUTES.blog.index,
        label: t('resources.items.blog.label'),
        desc: t('resources.items.blog.desc'),
      },
      {
        to: ROUTES.caseStudies.index,
        label: t('resources.items.caseStudies.label'),
        desc: t('resources.items.caseStudies.desc'),
      },
      {
        to: ROUTES.healthcareNews.index,
        label: t('resources.items.healthcareNews.label'),
        desc: t('resources.items.healthcareNews.desc'),
      },
      {
        to: ROUTES.automation.index,
        label: t('resources.items.automation.label'),
        desc: t('resources.items.automation.desc'),
      },
      {
        to: ROUTES.pricing,
        label: t('resources.items.pricing.label'),
        desc: t('resources.items.pricing.desc'),
      },
    ],
    [t]
  );
}

/** React hook for footer "Services" column. */
export function useFooterServices(): readonly NavLink[] {
  const { t } = useTranslation('navigation');
  return useMemo(
    () => [
      { to: ROUTES.services.seo, label: t('footerServices.seo') },
      { to: ROUTES.services.googleAds, label: t('footerServices.googleAds') },
      { to: ROUTES.services.socialMediaMarketing, label: t('footerServices.socialMedia') },
      { to: ROUTES.services.websiteDesignDev, label: t('footerServices.websiteDesign') },
      { to: ROUTES.services.emailDripCampaigns, label: t('footerServices.emailCampaigns') },
      { to: ROUTES.services.contentCopywriting, label: t('footerServices.contentMarketing') },
      { to: ROUTES.services.googleBusinessProfile, label: t('footerServices.googleBusinessProfile') },
      { to: ROUTES.services.analyticsReporting, label: t('footerServices.analytics') },
      { to: ROUTES.services.brandIdentityDesign, label: t('footerServices.branding') },
    ],
    [t]
  );
}

/** React hook for footer "Company" column. */
export function useFooterCompany(): readonly NavLink[] {
  const { t } = useTranslation('navigation');
  return useMemo(
    () => [
      { to: ROUTES.about.index, label: t('footerCompany.about') },
      { to: ROUTES.faq, label: t('footerCompany.faq') },
      { to: ROUTES.freeGrowthAudit, label: t('footerCompany.freeGrowthAudit') },
      { to: ROUTES.pricing, label: t('footerCompany.pricing') },
      { to: ROUTES.blog.index, label: t('footerCompany.blog') },
      { to: ROUTES.industries.index, label: t('footerCompany.industries') },
      { to: ROUTES.team, label: t('footerCompany.team') },
    ],
    [t]
  );
}

/** React hook for footer legal/accessibility/sitemap links. */
export function useFooterLegal(): readonly NavLink[] {
  const { t } = useTranslation('navigation');
  return useMemo(
    () => [
      { to: ROUTES.privacy, label: t('footerLegal.privacy') },
      { to: ROUTES.terms, label: t('footerLegal.terms') },
      { to: ROUTES.sitemap, label: t('footerLegal.sitemap') },
      { to: ROUTES.accessibility, label: t('footerLegal.accessibility') },
    ],
    [t]
  );
}

/**
 * Static fallbacks (English only) — used outside React (e.g. JSON-LD schema
 * generation in schema.ts). Components should use the hooks above.
 */
export const NAV_PRIMARY: readonly NavLink[] = [
  { to: ROUTES.services.index, label: 'Services' },
  { to: ROUTES.industries.index, label: 'Industries' },
  { to: ROUTES.about.index, label: 'About' },
  { to: ROUTES.contact, label: 'Contact Us' },
];

export const NAV_RESOURCES: readonly ResourceLink[] = [
  { to: ROUTES.blog.index, label: 'Blog', desc: "Practitioner's brief, weekly tactics" },
  { to: ROUTES.caseStudies.index, label: 'Case Studies', desc: 'Real client growth stories' },
  {
    to: ROUTES.healthcareNews.index,
    label: 'Healthcare News',
    desc: 'HIPAA & industry updates',
  },
  { to: ROUTES.automation.index, label: 'Automation', desc: 'AI workflows & integrations' },
  { to: ROUTES.pricing, label: 'Pricing', desc: 'Transparent engagement plans' },
];

export const FOOTER_SERVICES: readonly NavLink[] = [
  { to: ROUTES.services.seo, label: 'SEO Services' },
  { to: ROUTES.services.googleAds, label: 'Google Ads' },
  { to: ROUTES.services.socialMediaMarketing, label: 'Social Media' },
  { to: ROUTES.services.websiteDesignDev, label: 'Website Design' },
  { to: ROUTES.services.emailDripCampaigns, label: 'Email Campaigns' },
  { to: ROUTES.services.contentCopywriting, label: 'Content Marketing' },
  { to: ROUTES.services.googleBusinessProfile, label: 'Google Business Profile' },
  { to: ROUTES.services.analyticsReporting, label: 'Analytics' },
  { to: ROUTES.services.brandIdentityDesign, label: 'Branding' },
];

export const FOOTER_COMPANY: readonly NavLink[] = [
  { to: ROUTES.about.index, label: 'About' },
  { to: ROUTES.faq, label: 'FAQ' },
  { to: ROUTES.freeGrowthAudit, label: 'Free Growth Audit' },
  { to: ROUTES.pricing, label: 'Pricing' },
  { to: ROUTES.blog.index, label: 'Blog' },
  { to: ROUTES.industries.index, label: 'Industries' },
  { to: ROUTES.team, label: 'Team' },
];

export const FOOTER_LEGAL: readonly NavLink[] = [
  { to: ROUTES.privacy, label: 'Privacy' },
  { to: ROUTES.terms, label: 'Terms' },
  { to: ROUTES.sitemap, label: 'Sitemap' },
  { to: ROUTES.accessibility, label: 'Accessibility' },
];
