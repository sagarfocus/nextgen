import type { ServiceFAQItem } from '@/components/service/ServiceFAQ';

export const FAQS: ServiceFAQItem[] = [
  {
    q: 'How long does a new clinic site take?',
    a: 'Design plus build runs 6 to 9 weeks for single-location practices, 10 to 14 for multi-location systems. We sequence content collection up front so the build never stalls waiting on copy.',
  },
  {
    q: 'Will the new site be HIPAA-compliant?',
    a: 'Yes. Every site we ship runs on BAA-covered hosting with encrypted forms, audit-friendly logging, and zero third-party pixels on pages that touch PHI. We hand you a HIPAA-architecture diagram at launch.',
  },
  {
    q: 'Can the booking widget connect to our EHR?',
    a: 'Most modern EHRs (Athena, eClinicalWorks, NextGen, Kareo, Cerner, Epic via integration partners) expose schedule APIs we can wire to. We also support widget-style providers (Solv, Zocdoc) when direct API isn’t available.',
  },
  {
    q: 'Does it have to be in WordPress?',
    a: 'No. We default to a modern Next.js stack for new builds because it’s faster, more secure, and easier to update. WordPress is fine when the team needs to ship blog posts daily; we still harden it for HIPAA.',
  },
  {
    q: 'What about Core Web Vitals and SEO impact?',
    a: 'Every new site ships with green-band LCP, INP, and CLS, structured data on every service and location, and a redirect map so legacy URLs don’t lose authority. We measure SEO impact monthly post-launch.',
  },
  {
    q: 'How do you handle ADA / WCAG compliance?',
    a: 'We run automated axe / Lighthouse checks throughout the build and a manual screen-reader pass before launch. Every site ships with a written WCAG 2.2 AA audit report you can hand to legal if a demand letter arrives.',
  },
  {
    q: 'Will the redesign hurt our existing rankings?',
    a: 'Not if it is done right. We map every legacy URL to its new destination with 301s, preserve title / meta / heading equity on top pages, and re-submit the sitemap. Most sites we relaunch hold or gain rank within 60 days.',
  },
  {
    q: 'Who owns the site after launch?',
    a: 'You do. Code, design files, hosting account, domain - all in your name from day one. We can manage hosting and updates as a retainer, or hand off cleanly.',
  },
];
