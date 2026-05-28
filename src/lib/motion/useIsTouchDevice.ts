import { useEffect, useState } from 'react';

/**
 * Returns true if the user is on a coarse-pointer device (touchscreen,
 * mobile, most tablets) where hover-based effects don't apply. Listens
 * for live changes (orientation/connected pointer) and updates on the
 * fly. Use to gate magnetic / tilt / spotlight pointer effects.
 *
 * NOTE: `pointer: coarse` is the W3C-recommended detection - more
 * reliable than viewport width because hybrid laptops with touch
 * screens also benefit from disabling pointer-follow.
 */
export const useIsTouchDevice = (): boolean => {
  const [isTouch, setIsTouch] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(pointer: coarse)').matches ?? false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isTouch;
};
