import { useEffect, useState } from 'react';

/**
 * Returns `true` when the user has requested reduced motion via
 * the OS-level preference. Listens for live changes and unsubscribes
 * on unmount. Use to gate any non-essential animation.
 */
export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
};
