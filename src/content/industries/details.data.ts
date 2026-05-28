import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import urgentCareImg from '../../assets/nextgen-image/Urgentcareimg.png';
import medspaImg from '../../assets/nextgen-image/Medspas&wellnessimg.png';
import freestandingErImg from '../../assets/nextgen-image/Erimg.png';
import dentalImg from '../../assets/nextgen-image/Dentalimg.png';
import mentalHealthImg from '../../assets/nextgen-image/Mentalhealthimg.png';
import primaryCareImg from '../../assets/nextgen-image/Primarycareimg.png';
import chiropracticImg from '../../assets/nextgen-image/Chiropracticimg.png';
import plasticSurgeryImg from '../../assets/nextgen-image/Plasticsurgeryimg.png';
import ophthalmologyImg from '../../assets/nextgen-image/Opthalmologyimg.png';
import dermatologyImg from '../../assets/nextgen-image/Dermatologyimg.png';

export interface IndustryFAQ {
  q: string;
  a: string;
}

export interface IndustryDetailEntry {
  slug: string;
  label: string;
  meta: string;
  image: string;
  description: string;
  longBody: string[];
  services: string[];
  metric: { v: string; l: string };
  ctaTo: string;
  faqs: IndustryFAQ[];
}

/**
 * Slug-keyed static config: ordering, image, and CTA route per industry.
 * Translatable copy (label, meta, description, longBody, services, metric labels,
 * FAQs) lives in `industries.json` under `entries.{slug}`.
 */
interface IndustryStatic {
  slug: string;
  image: string;
  ctaTo: string;
}

const STATIC_ENTRIES: IndustryStatic[] = [
  { slug: 'dental', image: dentalImg, ctaTo: '/industries/clinics' },
  { slug: 'urgent-care', image: urgentCareImg, ctaTo: '/industries/clinics' },
  { slug: 'medspa', image: medspaImg, ctaTo: '/industries/medspas' },
  { slug: 'freestanding-er', image: freestandingErImg, ctaTo: '/industries/specialty-emergency' },
  { slug: 'mental-health', image: mentalHealthImg, ctaTo: '/industries/clinics' },
  { slug: 'primary-care', image: primaryCareImg, ctaTo: '/industries/clinics' },
  { slug: 'chiropractic', image: chiropracticImg, ctaTo: '/industries/clinics' },
  { slug: 'plastic-surgery', image: plasticSurgeryImg, ctaTo: '/industries/medspas' },
  { slug: 'ophthalmology', image: ophthalmologyImg, ctaTo: '/industries/specialty-emergency' },
  { slug: 'dermatology', image: dermatologyImg, ctaTo: '/industries/clinics' },
];

/** Ordered industry slugs — used by the IndustryDetail page for numbering and ItemList ordering. */
export const INDUSTRY_SLUGS: readonly string[] = STATIC_ENTRIES.map((e) => e.slug);

/** Stable href builder for industry-detail pages. Safe to call outside React. */
export const industryDetailHref = (slug: string): string => `/industries/detail/${slug}`;

/** React hook returning the fully translated entry list. */
export function useIndustryDetailEntries(): IndustryDetailEntry[] {
  const { t } = useTranslation('industries');
  return useMemo(
    () =>
      STATIC_ENTRIES.map((s) => {
        const base = `entries.${s.slug}`;
        const services = t(`${base}.services`, { returnObjects: true }) as unknown;
        const faqs = t(`${base}.faqs`, { returnObjects: true }) as unknown;
        return {
          slug: s.slug,
          image: s.image,
          ctaTo: s.ctaTo,
          label: t(`${base}.label`),
          meta: t(`${base}.meta`),
          description: t(`${base}.description`),
          longBody: [
            t(`${base}.longBody1`),
            t(`${base}.longBody2`),
            t(`${base}.longBody3`),
          ],
          services: Array.isArray(services) ? (services as string[]) : [],
          metric: {
            v: t(`${base}.metricValue`),
            l: t(`${base}.metricLabel`),
          },
          faqs: Array.isArray(faqs) ? (faqs as IndustryFAQ[]) : [],
        };
      }),
    [t]
  );
}

/** React hook returning a single industry entry by slug, or undefined. */
export function useIndustryDetail(slug: string | undefined): IndustryDetailEntry | undefined {
  const entries = useIndustryDetailEntries();
  return useMemo(() => entries.find((e) => e.slug === slug), [entries, slug]);
}
