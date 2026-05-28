import type { IconProps } from './types';

/**
 * Right-pointing chevron (`>`), 24×24 viewBox.
 *
 * Used in breadcrumbs, pagination/next buttons, carousel forward controls,
 * and as a "view more" affordance. Default `size` is 14, `strokeWidth`
 * is 2.2 — covers the majority of consumers; callers needing 2/2.4 pass
 * explicitly. Decorative by default.
 */
export const ChevronRightIcon = ({ size = 14, ...rest }: IconProps) => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
