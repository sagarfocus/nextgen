import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  /** 0–1, fraction of element that must be visible to trigger. Default 0.15. */
  threshold?: number;
  /** Root margin passed to IntersectionObserver. Default '0px 0px -10% 0px'. */
  rootMargin?: string;
  /** If true, observer disconnects after first reveal (default). */
  once?: boolean;
}

/**
 * One-shot scroll-reveal hook. Attaches an IntersectionObserver to the
 * returned ref and flips `inView` to true the first time the element
 * crosses the threshold. Disconnects immediately after to avoid any
 * ongoing work - animations only run once per page load.
 */
export const useReveal = <T extends HTMLElement = HTMLElement>(opts: UseRevealOptions = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = opts;
  const ref = useRef<T | null>(null);
  // If IntersectionObserver isn't available (very old browser / SSR fallback),
  // start in the "revealed" state so content is visible.
  const [inView, setInView] = useState<boolean>(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};
