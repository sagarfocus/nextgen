// Shared admin-route helpers.

export const SERVICE_CATEGORIES = [
  'SEO & Local Search',
  'Google Business Profile',
  'Google Ads / Paid Search',
  'Social Media',
  'Blog / Content',
  'Email Campaigns',
  'Strategy & Planning',
  'Brand Identity / Graphic Design',
  'Brochure / Print Design',
  'Medical Automation',
  'Custom Software / Dashboard / Integrations',
] as const;

export function normalizeServiceCategories(input: unknown): string[] {
  const values = Array.isArray(input)
    ? input
    : typeof input === 'string'
      ? input.split(',')
      : [];
  const seen = new Set<string>();
  for (const v of values) {
    if (typeof v !== 'string') continue;
    const found = SERVICE_CATEGORIES.find((c) => c.toLowerCase() === v.trim().toLowerCase());
    if (found) seen.add(found);
  }
  return SERVICE_CATEGORIES.filter((c) => seen.has(c));
}

export const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  avatar: true,
  plan: true,
  planId: true,
  subscriptionStatus: true,
  createdAt: true,
  updatedAt: true,
} as const;

export function isoWeek(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date.getTime() - firstDayOfYear.getTime()) / 86_400_000;
  return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
}
