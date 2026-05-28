import aboutImg1 from '../../assets/nextgen-image/Abooutimg1.png';
import aboutImg2 from '../../assets/nextgen-image/Aboutimg2.png';
import aboutImg3 from '../../assets/nextgen-image/Aboutimg3.png';

/**
 * Home page — "About Us" section content (3-row layout).
 *
 * The three icons used in the section (`leaf`, `shield`, `target`) stay
 * inline in `src/pages/Home/AboutUs.tsx` — each is used exactly once.
 * Data here references them by string key; the component maps key → SVG.
 */

export type HomeAboutIconKey = 'leaf' | 'shield' | 'target';

export interface HomeAboutPillar {
  iconKey: HomeAboutIconKey;
  title: string;
  desc: string;
}

export const HOME_ABOUT_IMAGES = {
  secondary: aboutImg1,
  hero: aboutImg2,
  collab: aboutImg3,
} as const;

export const HOME_ABOUT_INTRO = {
  eyebrow: 'About Us',
  title: 'Built for the healthcare practices ready to grow.',
  text: 'We help healthcare practices grow faster with marketing systems built specifically for clinics, medspas, and wellness brands - HIPAA-aware, ROI-tracked, and engineered to compound month over month so your patient pipeline never goes quiet.',
  statNum: '200+',
  statLabel: 'Partner Practices',
} as const;

export const HOME_ABOUT_FEATURE = {
  iconKey: 'leaf' as const,
  title: 'Healthcare Growth Engine',
  desc: 'Integrated SEO, paid media, and automation - every channel optimized for patient acquisition and retention.',
  to: '/healthcare-growth-engine',
  ariaLabel: 'Learn more about the Healthcare Growth Engine',
} as const;

export const HOME_ABOUT_FLOAT_STAT = {
  num: '120+',
  label: 'Programs Launched',
  linkText: 'Learn More',
  linkTo: '/about',
} as const;

export const HOME_ABOUT_COLLAB = {
  title: 'Collaborate to build a patient-first growth system.',
  text: 'We embed inside your team so strategy, execution, and reporting move as one. Every decision is grounded in patient data and real revenue impact - not vanity metrics.',
} as const;

export const HOME_ABOUT_PILLARS: readonly HomeAboutPillar[] = [
  {
    iconKey: 'shield',
    title: 'Built With Expert Strategy',
    desc: 'Senior healthcare strategists owning every roadmap.',
  },
  {
    iconKey: 'target',
    title: 'Focused on Revenue',
    desc: 'Appointments, retention, and patient lifetime value.',
  },
];

export const HOME_ABOUT_QUOTE = {
  title: 'Collaboration is the Key of Success',
  text: 'Embedded growth partners - not vendors.',
  ctaText: 'More About Us',
  ctaTo: '/about',
} as const;
