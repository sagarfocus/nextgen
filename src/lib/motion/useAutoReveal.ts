import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Selector patterns that get auto-attached `data-reveal` on every
 * route mount. Items already carrying `data-reveal`, `.reveal`, or
 * `data-no-reveal` are skipped so explicit / pre-existing animations
 * keep ownership.
 *
 * Each selector pairs with a variant + optional stagger step (in ms).
 */
type AutoTarget = {
  selector: string;
  variant: 'up' | 'left' | 'right' | 'fade' | 'scale';
  /** Stagger step in ms; applied across matched siblings. 0 = none. */
  stagger?: number;
  /** Initial delay added to every match (ms). */
  baseDelay?: number;
};

const TARGETS: AutoTarget[] = [
  // Hero blocks
  { selector: '.ph-page-head .container-shell > *', variant: 'up', stagger: 90 },
  { selector: '.au-hero .au-hero-grid > *', variant: 'up', stagger: 120 },
  { selector: '.svc-hero-grid > *, .svc-hero .container-shell > *', variant: 'up', stagger: 100 },
  { selector: '.ind-hero-grid > *', variant: 'up', stagger: 110 },
  { selector: '.ab-hero-grid > *', variant: 'up', stagger: 100 },
  { selector: '.ngt-hero > *', variant: 'up', stagger: 100 },
  { selector: '.pr-hero-grid > *', variant: 'up', stagger: 100 },
  { selector: '.sl-hero-grid > *', variant: 'up', stagger: 100 },
  { selector: '.ct-hero-grid > *', variant: 'up', stagger: 100 },
  { selector: '.bl-hero-grid > *', variant: 'up', stagger: 100 },
  { selector: '.hn-hero > *', variant: 'up', stagger: 100 },

  // Section headers - universal
  { selector: 'section h2', variant: 'up' },
  {
    selector: 'section header > *, section .section-head > *, section .sv-sec-head > *',
    variant: 'up',
    stagger: 80,
  },
  // Home-specific section heads (eyebrow + h2 + intro cascade)
  { selector: '.services-head > *', variant: 'up', stagger: 90 },
  { selector: '.process-head > *', variant: 'up', stagger: 90 },
  { selector: '.results-head > *', variant: 'up', stagger: 90 },
  { selector: '.method-head > *', variant: 'up', stagger: 90 },
  { selector: '.testimonials-head > *', variant: 'up', stagger: 90 },
  { selector: '.industries-section .ind-eyebrow', variant: 'up' },
  { selector: '.industries-section .ind-panel > *', variant: 'up', stagger: 80 },
  { selector: '.faq-left > *', variant: 'up', stagger: 90 },
  { selector: '.contact-section .contact-grid > *', variant: 'up', stagger: 90 },
  { selector: '.cert-strip > *, .certs > *', variant: 'up', stagger: 80 },

  // Card grids - stagger across siblings
  { selector: '.services-grid > .service-card', variant: 'up', stagger: 90 },
  { selector: '.pair-grid > *', variant: 'up', stagger: 110 },
  { selector: '.process-steps > .step', variant: 'up', stagger: 100 },
  { selector: '.results-grid > *', variant: 'up', stagger: 100 },
  { selector: '.method-grid > *', variant: 'up', stagger: 100 },
  { selector: '.ind-tag', variant: 'scale', stagger: 80 },
  { selector: '.testimonials-grid > *', variant: 'up', stagger: 100 },
  { selector: '.industries-grid > *', variant: 'up', stagger: 90 },
  { selector: '.faq-grid > *', variant: 'up', stagger: 80 },
  { selector: '.faq-item', variant: 'up', stagger: 50 },
  { selector: '.cs-card', variant: 'up', stagger: 90 },
  { selector: '.blog-grid > *, .blog-card', variant: 'up', stagger: 80 },
  {
    selector: '.au-pillars > *, .au-features > *, .au-uc-grid > *, .au-templates > *',
    variant: 'up',
    stagger: 90,
  },
  { selector: '.sl-pillars > *, .sl-pillars-grid > *', variant: 'up', stagger: 90 },
  { selector: '.ngt-grid > .ngt-card', variant: 'up', stagger: 90 },
  { selector: '.ind-stats > *', variant: 'up', stagger: 90 },
  { selector: '.pr-tiers > *, .pr-table-row', variant: 'up', stagger: 70 },

  // Bento + work tiles (OurWork + FreeGrowthAudit)
  { selector: '.ow-bento > *', variant: 'up', stagger: 110 },
  { selector: '.ow-feat-grid > *', variant: 'up', stagger: 120 },
  { selector: '.ow-ind-pills li', variant: 'scale', stagger: 50 },
  { selector: '.fga-bento > *', variant: 'up', stagger: 110 },
  { selector: '.fga-stats-grid > *', variant: 'up', stagger: 90 },
  { selector: '.fga-timeline', variant: 'fade' },
  { selector: '.fga-tl-item', variant: 'up', stagger: 110 },
  { selector: '.fga-pact-list li', variant: 'up', stagger: 110 },
  { selector: '.fga-compare-grid', variant: 'up' },
  { selector: '.fga-outcomes-grid > *', variant: 'up', stagger: 100 },

  // Stats strips
  { selector: '.ow-stats-grid > *', variant: 'up', stagger: 100 },

  // Closing CTAs
  { selector: '.ow-close-card > *', variant: 'up', stagger: 100 },
  { selector: '.fga-close-card > *', variant: 'up', stagger: 100 },
  { selector: '.svc-cta-panel > *, .sv-cta-panel > *', variant: 'up', stagger: 100 },
];

const SKIP_IF_CLASSES = ['reveal', 'route-fade'];
const SKIP_IF_ATTRS = ['data-reveal', 'data-no-reveal'];

const isSkippable = (el: Element): boolean => {
  for (const c of SKIP_IF_CLASSES) {
    if (el.classList.contains(c)) return true;
  }
  for (const a of SKIP_IF_ATTRS) {
    if (el.hasAttribute(a)) return true;
  }
  return false;
};

const attachObserver = (elements: Element[], baseDelay: number, stagger: number) => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute('data-revealed', 'true');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  elements.forEach((el, i) => {
    const html = el as HTMLElement;
    const delay = baseDelay + i * stagger;
    if (delay > 0) html.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });

  return observer;
};

/**
 * Hook that runs once per route mount, scans the DOM for known
 * structural patterns, and attaches scroll-reveal observers to
 * anything that doesn't already carry an explicit animation hook.
 *
 * Performance:
 * - Observers disconnect per-element on first reveal
 * - All targeting work runs after a `requestAnimationFrame` so the
 *   route content has had a chance to paint
 * - No mutation observers, no continuous work
 */
export const useAutoReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const observers: IntersectionObserver[] = [];
    let rafId = 0;
    let timerId = 0;

    const apply = () => {
      const seen = new WeakSet<Element>();

      TARGETS.forEach(({ selector, variant, stagger = 0, baseDelay = 0 }) => {
        const matched = Array.from(document.querySelectorAll(selector));
        const eligible = matched.filter((el) => {
          if (seen.has(el)) return false;
          if (isSkippable(el)) return false;
          // Don't double-wrap an element that was caught by a wider rule
          if ((el as HTMLElement).dataset.revealed === 'true') return false;
          return true;
        });
        if (!eligible.length) return;
        eligible.forEach((el) => {
          seen.add(el);
          (el as HTMLElement).setAttribute('data-reveal', variant);
        });
        observers.push(attachObserver(eligible, baseDelay, stagger));
      });
    };

    // Wait two frames so the route's content tree has rendered + laid out
    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        // A small additional tick handles routes whose data fetches sync state
        timerId = window.setTimeout(apply, 16);
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);
};
