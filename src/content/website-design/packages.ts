export interface Package {
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  bestFor: string;
  bullets: string[];
  featured?: boolean;
  badge?: string;
  ctaHref: string;
  ctaLabel: string;
}

export const PACKAGES: Package[] = [
  {
    name: 'Essential',
    price: 'from $7,500',
    priceNote: 'one-time, 6-8 wk delivery',
    tagline: 'Single-location practices that need a modern, conversion-focused site.',
    bestFor: 'Solo clinics, single MedSpas, individual physicians',
    bullets: [
      'Up to 12 unique pages',
      'Modern Next.js or Webflow build',
      'WCAG 2.2 AA audit report',
      'Booking widget (provider of your choice)',
      'GA4 server-side + Search Console',
      'Hosting setup + 30-day post-launch support',
    ],
    ctaHref: '/contact?topic=website-essential',
    ctaLabel: 'Get a quote',
  },
  {
    featured: true,
    badge: 'Most popular',
    name: 'Growth',
    price: 'from $14,500',
    priceNote: 'one-time, 8-10 wk delivery',
    tagline: 'Growing practices that need CRO-baked design and ongoing SEO momentum.',
    bestFor: 'Clinics ready to expand or rebrand for higher-tier patients',
    bullets: [
      'Up to 30 unique pages',
      'Headless CMS so your team ships posts',
      'EHR / PMS booking integration',
      'CRO baseline: heatmaps + 2 launch experiments',
      'Blog + condition pillar architecture',
      '90-day post-launch optimization',
    ],
    ctaHref: '/contact?topic=website-growth',
    ctaLabel: 'Get a quote',
  },
  {
    name: 'Multi-location',
    price: 'from $28,000',
    priceNote: 'one-time, 10-14 wk delivery',
    tagline: 'Groups with multiple clinics, complex integrations, or compliance scrutiny.',
    bestFor: '4+ locations, specialty surgery groups, dental DSOs',
    bullets: [
      '50+ pages w/ dynamic location templates',
      'Per-location LocalBusiness + Physician schema',
      'Direct EHR API integration (Athena / eCW / NextGen)',
      'HIPAA-architecture diagram + threat model',
      'Multi-region CDN + edge functions',
      'Dedicated launch + 6-mo white-glove support',
    ],
    ctaHref: '/contact?topic=website-multi-location',
    ctaLabel: 'Get a quote',
  },
];
