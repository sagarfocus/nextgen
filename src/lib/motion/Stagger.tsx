import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  /** Delay added per child, in ms. Default 80. */
  step?: number;
  /** Initial delay applied to the first child, in ms. */
  initialDelay?: number;
}

/**
 * Pass-through wrapper that injects an incremental `--reveal-delay`
 * (and matching `transitionDelay`) into each direct child so they
 * cascade in sequence when revealed. Pair with <Reveal> or any
 * element using the `data-reveal` opt-in pattern.
 */
export const Stagger = ({ children, step = 80, initialDelay = 0 }: StaggerProps) => {
  return (
    <>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const delay = initialDelay + i * step;
        const el = child as ReactElement<{ style?: React.CSSProperties }>;
        const prevStyle = el.props.style ?? {};
        return cloneElement(el, {
          style: { ...prevStyle, transitionDelay: `${delay}ms` },
        });
      })}
    </>
  );
};
