import type { IconProps } from './types';

/**
 * Right-pointing arrow (horizontal line + arrowhead polyline), 24×24 viewBox.
 *
 * The single most-duplicated SVG in the codebase — appears in 35+ files
 * (CTA buttons, "Learn more" links, FAQ expand cues, breadcrumb chevrons,
 * paginators). Stroke style varies slightly per call-site context:
 *
 *   `strokeWidth`: 2 (heavier UI), 2.2 (mid), 2.4 (default — chips/inline CTAs)
 *   `size`:        11 (inline text), 12, 14, 16 (button/CTA)
 *
 * Default `size` is 16, `strokeWidth` is 2.4 (the most common pair across
 * consumers). Callers needing different values pass `size`/`strokeWidth`
 * explicitly.
 *
 * Decorative by default. For navigation links where the arrow IS the only
 * visual affordance, pair with an accessible label on the parent anchor.
 */
export const ArrowIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
