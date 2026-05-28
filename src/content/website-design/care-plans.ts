export interface CarePlan {
  name: string;
  price: string;
  period: string;
  tagline: string;
  includes: string[];
  featured?: boolean;
  badge?: string;
}

export const CARE_PLANS: CarePlan[] = [
  {
    name: 'Maintain',
    price: '$249',
    period: '/ mo',
    tagline: 'Hosting, monitoring, and security patches so the site you just launched stays fast and safe.',
    includes: [
      'BAA-covered managed hosting',
      '99.9% uptime monitoring + alerts',
      'Monthly security patches & dep updates',
      'Quarterly performance & a11y re-audit',
      'Backups (daily, 30-day retention)',
    ],
  },
  {
    featured: true,
    badge: 'Most popular',
    name: 'Optimize',
    price: '$899',
    period: '/ mo',
    tagline: 'Everything in Maintain, plus a monthly CRO experiment and ongoing content updates.',
    includes: [
      'One A/B test or CRO experiment / month',
      'Heatmap + session-replay review',
      '2 hours of content / copy updates',
      'Booking-funnel diagnostics',
      'Monthly performance retro w/ video',
    ],
  },
  {
    name: 'Growth Partner',
    price: '$1,899',
    period: '/ mo',
    tagline: 'Optimize, plus a quarterly redesign cycle and integrated SEO so the site keeps compounding.',
    includes: [
      'Quarterly redesign cycle (one section)',
      'Integrated local & technical SEO',
      'Schema additions for new services',
      'Editorial content (2 articles / mo)',
      'Dedicated growth lead',
    ],
  },
];
