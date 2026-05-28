export interface IndustryChip {
  label: string;
  blurb: string;
  to: string;
}

export const INDUSTRIES: IndustryChip[] = [
  { label: 'Dental groups',          blurb: 'Multi-location, schema-rich, per-clinic landing pages.', to: '/industries' },
  { label: 'MedSpas',                blurb: 'Editorial visual systems and consult-driving offers.',  to: '/industries/medspas' },
  { label: 'Specialty & emergency',  blurb: 'High-acuity intent, fast bookings, condition pages.',   to: '/industries/specialty-emergency' },
  { label: 'Wellness clinics',       blurb: 'Membership flows, content depth, retention loops.',     to: '/industries' },
  { label: 'Mental health',          blurb: 'Therapist directories, condition pillars, encrypted intake.', to: '/industries' },
  { label: 'Plastic surgery',        blurb: 'Procedure pages, gallery performance, PHI-safe forms.', to: '/industries' },
  { label: 'Urgent & primary care',  blurb: 'Walk-in volume, wait-time signals, GBP-linked locations.', to: '/industries/clinics' },
  { label: 'Vision & optometry',     blurb: 'Per-city dominance, frame catalogs, exam booking.',     to: '/industries' },
];
