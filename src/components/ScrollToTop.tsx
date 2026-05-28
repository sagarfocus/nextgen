import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/motion';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      // SPA hash navigation: the browser won't auto-scroll because the URL
      // change happens via pushState. Find the target and scroll to it. Retry
      // a couple of frames so the destination DOM has time to mount.
      const id = decodeURIComponent(hash.slice(1));
      if (!id) return;

      let cancelled = false;
      let attempts = 0;
      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { offset: -80, immediate: true, force: true });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, left: 0, behavior: 'auto' });
          }
          return;
        }
        if (attempts++ < 20) requestAnimationFrame(tryScroll);
      };
      requestAnimationFrame(tryScroll);
      return () => {
        cancelled = true;
      };
    }

    if (lenis) {
      // Use Lenis's authoritative scrollTo so we don't fight its internal
      // scroll state. `immediate: true` avoids the easing animation on
      // route change - feels like a clean page load.
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      // No Lenis (mobile / touch / reduced-motion) - native fallback.
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
