import type { ReactElement } from 'react';

/**
 * Home page — CertStrip (capabilities & compliance marquee).
 *
 * Six certification badges paired with their own SVG icons + tone class.
 * The marquee animation lives in `src/pages/Home/CertStrip.tsx`.
 */

const GoogleIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.35 11.1H12v2.85h5.36c-.24 1.42-1.71 4.16-5.36 4.16-3.22 0-5.86-2.66-5.86-5.95s2.64-5.95 5.86-5.95c1.84 0 3.07.78 3.78 1.45l2.58-2.49C16.65 3.6 14.5 2.7 12 2.7 6.95 2.7 2.85 6.8 2.85 11.85s4.1 9.15 9.15 9.15c5.28 0 8.78-3.71 8.78-8.93 0-.6-.07-1.06-.16-1.5l-9.62.53z" />
  </svg>
);

const MetaIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const HipaaIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 4 5v7c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SeoIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PaidAdsIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="15 7 21 7 21 13" />
  </svg>
);

const WebDesignIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </svg>
);

export interface HomeCertDefinition {
  name: string;
  /** Tone class - `g` Google blue, `m` Meta tan, `h` HIPAA sage, `b` navy, `o` gold. */
  tone: 'g' | 'm' | 'h' | 'b' | 'o';
  Icon: () => ReactElement;
}

export const HOME_CERTS: readonly HomeCertDefinition[] = [
  { name: 'HIPAA Aware', tone: 'h', Icon: HipaaIcon },
  { name: 'Google Certified', tone: 'g', Icon: GoogleIcon },
  { name: 'Meta Certified', tone: 'm', Icon: MetaIcon },
  { name: 'SEO', tone: 'b', Icon: SeoIcon },
  { name: 'Paid Ads', tone: 'o', Icon: PaidAdsIcon },
  { name: 'Website Design', tone: 'g', Icon: WebDesignIcon },
];
