import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

// Flip to `true` to enable Lenis smooth scroll. Disabled by default so the
// site uses fast, responsive native browser scrolling. The Lenis code below
// stays in place - flipping this flag is the only switch needed to re-enable.
const ENABLE_LENIS = false;

// Shared module-level reference to the active Lenis instance so other
// utilities (e.g. ScrollToTop on route change) can scroll authoritatively
// without fighting Lenis's internal scroll state.
let currentLenis: Lenis | null = null;
export const getLenis = (): Lenis | null => currentLenis;

/**
 * Lenis smooth-scroll mount. Safe defaults:
 *  - Falls back to native scroll if user prefers reduced motion
 *  - Stops touching scroll on mobile (where native momentum is better)
 *  - Anchor links still work via Lenis.scrollTo on hashchange
 *  - GSAP ScrollTrigger gets refreshed on Lenis tick when present
 */
export const SmoothScroll = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ENABLE_LENIS) return;
    if (reduced) return;
    if (typeof window === 'undefined') return;
    // Touch devices: skip Lenis, use native scrolling
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Lerp-based config: feels snappy and responsive on Windows wheel /
    // trackpad / desktop browser. `lerp` is the per-frame catch-up factor
    // (0 = instant, 1 = never moves) - 0.12 lands the viewport within a
    // few frames without feeling abrupt. No `duration` so each input
    // event is independently smoothed instead of queued.
    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });
    currentLenis = lenis;

    let rafId = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Anchor link support - intercept clicks on same-page hash links
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!target) return;
      const id = (target as HTMLAnchorElement).getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (currentLenis === lenis) currentLenis = null;
    };
  }, [reduced]);

  return null;
};
