import type { ReactElement } from 'react';

/**
 * Home page — Hero section content.
 *
 * The 6 floating-pill icons and 5 hub-bubble icons are visual data paired
 * with labels, so they live here alongside the metadata they belong to.
 * Pure copy (eyebrow, title, lede, CTAs) is in `HOME_HERO_COPY`.
 */

const SearchIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ChartIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const StarIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const LayoutIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
const ChatIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l.9 2.2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.4.7 1 1.5 1.6 2 .8.6 1.5.9 1.7 1 .2.1.4.1.6-.1l.7-.8c.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4 0 .1 0 .8-.3 1.5Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.5A1.5 1.5 0 1 1 8 6 1.5 1.5 0 0 1 6.5 7.5ZM19 19h-3v-5.3c0-1.3-.5-1.8-1.4-1.8a1.6 1.6 0 0 0-1.6 1.7V19h-3V9h2.9v1.4a3.4 3.4 0 0 1 3-1.7c1.8 0 3.1 1.1 3.1 3.5V19Z" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export interface HomeHeroPill {
  slot: 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6';
  label: string;
  icon: ReactElement;
}

export const HOME_HERO_PILLS: readonly HomeHeroPill[] = [
  { slot: 'f1', label: 'SEO & Local', icon: <SearchIcon /> },
  { slot: 'f2', label: 'Paid Media', icon: <ChartIcon /> },
  { slot: 'f3', label: 'Branding', icon: <StarIcon /> },
  { slot: 'f4', label: 'Automation', icon: <SettingsIcon /> },
  { slot: 'f5', label: 'Web Design', icon: <LayoutIcon /> },
  { slot: 'f6', label: 'Content', icon: <ChatIcon /> },
];

export interface HomeHeroBubble {
  slot: 'b1' | 'b2' | 'b3' | 'b4' | 'b5';
  tone: 'fb' | 'ig' | 'wa' | 'li' | 'em';
  ariaLabel: string;
  icon: ReactElement;
}

export const HOME_HERO_BUBBLES: readonly HomeHeroBubble[] = [
  { slot: 'b1', tone: 'fb', ariaLabel: 'Facebook', icon: <FacebookIcon /> },
  { slot: 'b2', tone: 'ig', ariaLabel: 'Instagram', icon: <InstagramIcon /> },
  { slot: 'b3', tone: 'wa', ariaLabel: 'WhatsApp', icon: <WhatsAppIcon /> },
  { slot: 'b4', tone: 'li', ariaLabel: 'LinkedIn', icon: <LinkedInIcon /> },
  { slot: 'b5', tone: 'em', ariaLabel: 'Email', icon: <EmailIcon /> },
];

export const HOME_HERO_COPY = {
  eyebrow: 'Healthcare Growth Partner',
  titleLine1: 'We Market Healthcare.',
  titleAccent: 'Relentlessly.',
  lede: 'SEO, paid ads, branding, content, and websites built for clinics, medspas, urgent care centers, and healthcare brands that want measurable growth.',
  ctaPrimaryText: 'Get a Free Growth Audit',
  ctaPrimaryTo: '/free-growth-audit',
  ctaSecondaryText: 'See Our Work',
  ctaSecondaryTo: '/our-work',
  hubMark: 'N+',
  hubName: 'TheNextGen',
  hubTag: 'Healthcare',
} as const;
