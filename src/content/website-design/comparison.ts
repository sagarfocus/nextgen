import type { ComparisonRow } from '@/components/service/ServiceScenario';

export const COMPARISON: ComparisonRow[] = [
  {
    label: 'Largest Contentful Paint',
    before: 'Multi-second LCP on most Wix or WordPress builds.',
    after: 'Green-band Core Web Vitals on every page we ship.',
  },
  {
    label: 'Booking conversion',
    before: 'Generic contact form, no clear next step.',
    after: 'EHR-wired booking widget embedded into the page.',
  },
  {
    label: 'Service / location pages',
    before: 'One generic "Services" page covering every line.',
    after: 'One unique page per service × per location, with schema.',
  },
  {
    label: 'Accessibility',
    before: 'Common WCAG failures on Lighthouse / axe.',
    after: 'WCAG 2.2 AA at launch with a documented audit trail.',
  },
  {
    label: 'Editing experience',
    before: 'Editing requires the agency every time.',
    after: 'Headless CMS - your team ships copy without dev help.',
  },
];
