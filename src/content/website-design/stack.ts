export interface StackBadge {
  name: string;
  note: string;
}

export interface StackGroup {
  label: string;
  caption: string;
  items: StackBadge[];
}

export const STACK_GROUPS: StackGroup[] = [
  {
    label: 'Build stack',
    caption: 'We pick the stack the project needs - not the one we resell.',
    items: [
      { name: 'Next.js',     note: 'Default for new builds' },
      { name: 'Astro',       note: 'Marketing-first sites' },
      { name: 'Webflow',     note: 'Non-dev editing' },
      { name: 'WordPress',   note: 'Daily blog publishing' },
      { name: 'Sanity',      note: 'Headless CMS' },
      { name: 'Tailwind',    note: 'Design system' },
      { name: 'Cloudflare',  note: 'Edge + WAF' },
      { name: 'Vercel',      note: 'Hosting' },
    ],
  },
  {
    label: 'Healthcare integrations',
    caption: 'Booking, EHR, payments, and analytics - wired to the systems you already run.',
    items: [
      { name: 'Athena',          note: 'EHR schedule API' },
      { name: 'eClinicalWorks',  note: 'EHR + intake' },
      { name: 'NextGen',         note: 'EHR' },
      { name: 'Kareo / Tebra',   note: 'PM + booking' },
      { name: 'Dr. Chrono',      note: 'Booking API' },
      { name: 'Zocdoc',          note: 'Widget embed' },
      { name: 'Calendly Health', note: 'BAA-covered' },
      { name: 'GA4 server-side', note: 'PHI-clean tracking' },
    ],
  },
];
