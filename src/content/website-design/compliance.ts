export interface ComplianceBullet {
  label: string;
  detail: string;
}

export interface CompliancePillar {
  tag: string;
  title: string;
  lede: string;
  bullets: ComplianceBullet[];
  link: { to: string; label: string };
}

export const COMPLIANCE_PILLARS: CompliancePillar[] = [
  {
    tag: 'WCAG 2.2 AA',
    title: 'Accessibility-defensible at launch.',
    lede: 'Healthcare websites are the most-sued vertical for ADA accessibility. Every site we ship is audited before it goes live.',
    bullets: [
      { label: 'Automated axe + Lighthouse', detail: 'Continuous CI checks throughout the build.' },
      { label: 'Manual screen-reader pass',  detail: 'JAWS / NVDA / VoiceOver on every template.' },
      { label: 'Contrast & focus guarantee', detail: 'Body ≥ 4.5:1, large text ≥ 3:1, visible keyboard focus.' },
      { label: 'Written audit report',       detail: 'Hand it to legal if a demand letter arrives.' },
    ],
    link: { to: '/accessibility', label: 'Our accessibility commitment' },
  },
  {
    tag: 'HIPAA-aware build',
    title: 'PHI-clean, BAA-covered, audit-friendly.',
    lede: 'The 2022 HHS Bulletin made third-party pixels on PHI pages a real liability. We build around it - not on top of it.',
    bullets: [
      { label: 'BAA-covered hosting',         detail: 'AWS / GCP / Vercel Enterprise with signed BAAs.' },
      { label: 'Encrypted forms in transit',  detail: 'TLS 1.3, no PHI in URLs, server-side validation.' },
      { label: 'No pixels on PHI pages',      detail: 'GA4 server-side, consent-aware loading.' },
      { label: 'HIPAA-architecture diagram',  detail: 'Delivered at launch for your compliance file.' },
    ],
    link: { to: '/hipaa-compliance', label: 'How we handle HIPAA' },
  },
];
