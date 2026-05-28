import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CountUpProps {
  /** Final numeric value. */
  to: number;
  /** Optional string suffix (%, +, ×, etc.). */
  suffix?: string;
  /** Optional string prefix ($, etc.). */
  prefix?: string;
  /** Animation duration in seconds. Default 1.8. */
  duration?: number;
  /** Format number with thousands separator. Default true. */
  separator?: boolean;
  /** Decimal places. Default 0. */
  decimals?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Animated number counter - runs once when the element scrolls into
 * view. Springs from 0 → `to`. Reduced-motion safe (snaps to value).
 */
export const CountUp = ({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
  separator = true,
  decimals = 0,
  className,
  style,
}: CountUpProps) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(reduced ? to : 0);
  const display = useTransform(mv, (v: number) => {
    const fixed = v.toFixed(decimals);
    return separator
      ? Number(fixed).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : fixed;
  });
  const [text, setText] = useState<string>(() =>
    separator
      ? Number(reduced ? to : 0).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : (reduced ? to : 0).toFixed(decimals)
  );

  useEffect(() => {
    const unsub = display.on('change', (v: string) => setText(v));
    return unsub;
  }, [display]);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced, mv]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {prefix}
      {text}
      {suffix}
    </motion.span>
  );
};
