/**
 * Single source of truth for application route paths.
 *
 * All static paths are typed as their narrow string literal via `as const`,
 * so callers get autocomplete and a refactor-safe link between Navbar,
 * Footer, schema.org breadcrumbs, and the router definition in `App.tsx`.
 *
 * Dynamic routes (those that take a `:slug` or `:kind` segment) are exposed
 * as builder functions — pass the param, get back a string path.
 *
 * Convention: a section with multiple sub-paths gets a nested object with
 * an `index` key for the section's landing page; a section with a single
 * path is a flat string at the top level.
 */
export const ROUTES = {
  home: '/',
  about: {
    index: '/about',
    value: (slug: string) => `/about/value/${slug}`,
  },
  services: {
    index: '/services',
    seo: '/services/seo',
    googleBusinessProfile: '/services/google-business-profile',
    googleAds: '/services/google-ads',
    analyticsReporting: '/services/analytics-reporting',
    emailDripCampaigns: '/services/email-drip-campaigns',
    brandIdentityDesign: '/services/brand-identity-design',
    websiteDesignDev: '/services/website-design-dev',
    socialMediaMarketing: '/services/social-media-marketing',
    contentCopywriting: '/services/content-copywriting',
  },
  team: '/team',
  industries: {
    index: '/industries',
    clinics: '/industries/clinics',
    medspas: '/industries/medspas',
    specialtyEmergency: '/industries/specialty-emergency',
    detail: (slug: string) => `/industries/detail/${slug}`,
  },
  caseStudies: {
    index: '/case-studies',
    detail: (slug: string) => `/case-studies/${slug}`,
  },
  healthcareNews: {
    index: '/healthcare-news',
    detail: (slug: string) => `/healthcare-news/${slug}`,
  },
  healthcareContent: '/healthcare-content',
  healthcareGrowthEngine: '/healthcare-growth-engine',
  growthPlan: '/growth-plan',
  metaAds: '/meta-ads',
  hipaaCompliance: '/hipaa-compliance',
  reviewsReputation: '/reviews-reputation',
  patientExperience: '/patient-experience',
  citationBuilding: '/citation-building',
  hyperLocalContent: '/hyper-local-content',
  aeoSchema: '/aeo-schema',
  automation: {
    index: '/automation',
    moreInfo: '/automation/more-info',
    templates: '/automation/templates',
  },
  onsiteFieldMarketing: '/onsite-field-marketing',
  medicalAutomation: '/medical-automation',
  freeGrowthAudit: '/free-growth-audit',
  ourWork: {
    index: '/our-work',
    detail: (kind: string, slug: string) => `/our-work/${kind}/${slug}`,
  },
  pricing: '/pricing',
  blog: {
    index: '/blog',
    post: (slug: string) => `/blog/${slug}`,
  },
  faq: '/faq',
  contact: '/contact',
  methodology: {
    phase1: '/methodology/phase-1',
    phase2: '/methodology/phase-2',
    phase3: '/methodology/phase-3',
  },
  infrastructure: {
    growthTeam: '/infrastructure/growth-team',
    complianceProtocol: '/infrastructure/compliance-protocol',
    serviceLevelAgreements: '/infrastructure/service-level-agreements',
  },
  privacy: '/privacy',
  terms: '/terms',
  accessibility: '/accessibility',
  sitemap: '/sitemap',
} as const;
