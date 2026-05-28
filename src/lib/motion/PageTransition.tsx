import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps the route outlet and fades each route in on path change.
 * Pure CSS transition driven by a key+class swap - no layout thrash,
 * no library, no continuous animation. Reduced-motion users see a
 * straight cut (gated in CSS).
 */
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [stage, setStage] = useState<'entering' | 'idle'>('entering');
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the very first paint - the static markup is already on screen
    if (firstRender.current) {
      firstRender.current = false;
      // Promote to idle on next frame so transition class kicks in
      const id = requestAnimationFrame(() => setStage('idle'));
      return () => cancelAnimationFrame(id);
    }
    // On every subsequent path change: mount the new tree as 'entering',
    // then promote to 'idle' on the next frame so the transition runs.
    setStage('entering');
    const id = requestAnimationFrame(() => setStage('idle'));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="route-fade" data-stage={stage}>
      {children}
    </div>
  );
};
