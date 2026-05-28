import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import type { MouseEvent, ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useIsTouchDevice } from './useIsTouchDevice';

const MotionLink = motion.create(Link);

interface MotionButtonProps {
  children: ReactNode;
  /** Pointer follow strength. 0 = no magnet, 0.3 = noticeable. Default 0.18. */
  magnet?: number;
  /** Glow color. Default gold. */
  glow?: string;
  className?: string;
  /** Click handler for buttons. */
  onClick?: () => void;
  /** Render as react-router Link to this internal route. */
  to?: string;
  /** Render as anchor with this href (external). */
  href?: string;
  /** Anchor target. */
  target?: string;
  /** ARIA label. */
  'aria-label'?: string;
}

/**
 * Premium CTA with magnetic pointer follow + gold glow + soft press.
 * Reduced-motion safe (magnet + glow disabled).
 *
 * Renders <button> by default. Pass `href` to render an anchor.
 */
export const MotionButton = ({
  children,
  className,
  magnet = 0.18,
  glow = 'rgba(212, 175, 55, 0.55)',
  onClick,
  to,
  href,
  target,
  'aria-label': ariaLabel,
}: MotionButtonProps) => {
  const reduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  /** Magnet + glow follow only on desktop with a fine pointer. */
  const interactive = !reduced && !isTouch;
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: MouseEvent) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * magnet);
    y.set(dy * magnet);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyle = {
    x: tx,
    y: ty,
    '--mb-glow': glow,
  } as unknown as React.CSSProperties;

  if (to) {
    return (
      <MotionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        aria-label={ariaLabel}
        className={`m-btn${className ? ` ${className}` : ''}`}
        style={baseStyle}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        whileHover={interactive ? { y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <span className="m-btn-glow" aria-hidden="true" />
        <span className="m-btn-inner">{children}</span>
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        aria-label={ariaLabel}
        className={`m-btn${className ? ` ${className}` : ''}`}
        style={baseStyle}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        whileHover={interactive ? { y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <span className="m-btn-glow" aria-hidden="true" />
        <span className="m-btn-inner">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`m-btn${className ? ` ${className}` : ''}`}
      style={baseStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <span className="m-btn-glow" aria-hidden="true" />
      <span className="m-btn-inner">{children}</span>
    </motion.button>
  );
};
