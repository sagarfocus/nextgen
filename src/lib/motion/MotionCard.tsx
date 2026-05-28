import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useIsTouchDevice } from './useIsTouchDevice';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Max tilt angle in degrees. 0 disables tilt. Default 6. */
  tilt?: number;
  /** Show gradient border. Default true. */
  gradientBorder?: boolean;
  /** Glow color for hover. Default gold. */
  glow?: string;
  /**
   * Naked mode - skips the inner white background / inner wrapper /
   * gradient border, keeping only tilt + spotlight. Use this when
   * wrapping cards that already have their own background + border.
   */
  naked?: boolean;
}

/**
 * Premium card with 3D tilt-on-pointer, animated gradient border,
 * and hover glow. Reduced-motion safe.
 *
 * Wrap any existing card markup or grid item.
 */
export const MotionCard = ({
  children,
  className,
  style,
  tilt = 6,
  gradientBorder = true,
  glow = 'rgba(212, 175, 55, 0.35)',
  naked = false,
}: MotionCardProps) => {
  const reduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  /** Effects disabled entirely on touch devices and under reduced-motion. */
  const interactive = !reduced && !isTouch;
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [`${-tilt}deg`, `${tilt}deg`]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [`${tilt}deg`, `${-tilt}deg`]);
  const gx = useTransform(sx, [-0.5, 0.5], ['0%', '100%']);
  const gy = useTransform(sy, [-0.5, 0.5], ['0%', '100%']);

  const onMove: React.MouseEventHandler = (e) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (naked) {
    return (
      <motion.div
        ref={ref}
        className={`m-card-naked${className ? ` ${className}` : ''}`}
        style={
          {
            ...style,
            rotateX: interactive ? rotateX : 0,
            rotateY: interactive ? rotateY : 0,
            '--m-card-gx': gx,
            '--m-card-gy': gy,
            '--m-card-glow': glow,
          } as unknown as CSSProperties
        }
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <span className="m-card-spot m-card-spot-naked" aria-hidden="true" />
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`m-card${gradientBorder ? ' m-card-grad' : ''}${className ? ` ${className}` : ''}`}
      style={
        {
          ...style,
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          '--m-card-gx': gx,
          '--m-card-gy': gy,
          '--m-card-glow': glow,
        } as unknown as CSSProperties
      }
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <span className="m-card-spot" aria-hidden="true" />
      <span className="m-card-edge" aria-hidden="true" />
      <div className="m-card-inner">{children}</div>
    </motion.div>
  );
};
