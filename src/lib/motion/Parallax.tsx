import { useEffect, useRef } from 'react';
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ParallaxProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * Multiplier for vertical translation per pixel of scroll.
   * 0.05–0.15 reads as subtle premium parallax. Default 0.08.
   */
  speed?: number;
  /** Render element. Defaults to 'div'. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Subtle scroll-linked vertical parallax. Reads the element's position
 * once per rAF, applies a `translate3d` - never touches layout
 * properties. Disabled entirely under prefers-reduced-motion.
 */
export const Parallax = ({
  children,
  speed = 0.08,
  as: Tag = 'div',
  className,
  style,
  ...rest
}: ParallaxProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    let rafId = 0;
    let queued = false;

    const update = () => {
      queued = false;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      // Distance of element center from viewport center
      const offset = rect.top + rect.height / 2 - viewportCenter;
      const translate = -offset * speed;
      node.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced, speed]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform', ...style }} {...rest}>
      {children}
    </Tag>
  );
};
