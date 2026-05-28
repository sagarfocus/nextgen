import type { IconProps } from './types';

/**
 * Up-right / "out" arrow (diagonal line + arrowhead at top-right corner),
 * 24×24 viewBox.
 *
 * Used as an "external link" / "open" indicator in the case-study carousel
 * cards and detail pages. Visually distinct from `ArrowIcon` (which points
 * horizontally right and lives in CTAs).
 *
 * Default `size` is 16, `strokeWidth` is 2.2. Decorative by default.
 */
export const ArrowOutIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);
