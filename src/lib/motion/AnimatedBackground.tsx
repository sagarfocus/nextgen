import type { CSSProperties } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'aurora' | 'mesh' | 'spotlight' | 'grid';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  style?: CSSProperties;
}

/**
 * Premium animated background layer - pure CSS keyframes + radial
 * gradients. Drop behind a hero or section, mark aria-hidden, done.
 * Variants:
 *  - aurora    : slowly drifting multi-color radial blobs
 *  - mesh      : layered conic + radial gradient mesh
 *  - spotlight : a single moving radial light
 *  - grid      : animated tech grid with mask fade
 */
export const AnimatedBackground = ({
  variant = 'aurora',
  intensity = 'medium',
  className,
  style,
}: AnimatedBackgroundProps) => {
  return (
    <div
      aria-hidden="true"
      className={`ab-bg ab-${variant} ab-${intensity}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="ab-layer ab-l1" />
      <div className="ab-layer ab-l2" />
      <div className="ab-layer ab-l3" />
      <div className="ab-grid-overlay" />
    </div>
  );
};
