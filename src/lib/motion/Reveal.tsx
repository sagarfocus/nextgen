import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from './useReveal';

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface RevealProps {
  children: ReactNode;
  /** Animation variant. Defaults to 'up'. */
  variant?: RevealVariant;
  /** Stagger delay in ms (applied as inline CSS var). */
  delay?: number;
  /** Render element. Defaults to 'div'. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Optional intersection threshold (0–1). */
  threshold?: number;
}

/**
 * Drop-in scroll-reveal wrapper. Uses `data-reveal` to opt in to the
 * shared CSS animation defined in index.css. Performance: animates
 * only `transform` and `opacity`, with `will-change` set on the
 * un-revealed state and dropped after reveal.
 */
export const Reveal = ({
  children,
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  className,
  style,
  threshold,
}: RevealProps) => {
  const { ref, inView } = useReveal<HTMLElement>({ threshold });

  const mergedStyle: CSSProperties = {
    ...style,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : null),
  };

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={inView ? 'true' : 'false'}
      className={className}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
};
