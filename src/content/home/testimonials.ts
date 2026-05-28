import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Home page — Testimonials section content.
 *
 * Pure data — the carousel rendering (scroll snap, chevrons, progress bar)
 * lives in `src/pages/Home/Testimonials.tsx`.
 */

type TestimonialKey = 'chen' | 'reynolds' | 'rodriguez' | 'park';

export interface HomeTestimonial {
  key: TestimonialKey;
  initials: string;
  text: string;
  name: string;
  title: string;
}

export interface HomeTestimonialsHead {
  eyebrow: string;
  title: string;
  sub: string;
}

/** React hook for the section header copy. */
export function useHomeTestimonialsHead(): HomeTestimonialsHead {
  const { t } = useTranslation('home');
  return useMemo(
    () => ({
      eyebrow: t('testimonials.head.eyebrow'),
      title: t('testimonials.head.title'),
      sub: t('testimonials.head.sub'),
    }),
    [t]
  );
}

interface TestimonialStatic {
  key: TestimonialKey;
  initials: string;
}

const HOME_TESTIMONIALS_STATIC: readonly TestimonialStatic[] = [
  { key: 'chen', initials: 'SC' },
  { key: 'reynolds', initials: 'MR' },
  { key: 'rodriguez', initials: 'ER' },
  { key: 'park', initials: 'JP' },
];

/** React hook for the testimonial card list. */
export function useHomeTestimonials(): readonly HomeTestimonial[] {
  const { t } = useTranslation('home');
  return useMemo(
    () =>
      HOME_TESTIMONIALS_STATIC.map((tst) => ({
        key: tst.key,
        initials: tst.initials,
        text: t(`testimonials.items.${tst.key}.text`),
        name: t(`testimonials.items.${tst.key}.name`),
        title: t(`testimonials.items.${tst.key}.title`),
      })),
    [t]
  );
}
