import type { IconProps } from './types';

/**
 * Down-pointing chevron (`v`), 24×24 viewBox.
 *
 * Used for dropdown indicators (Navbar Resources menu, language picker),
 * select-like controls, and "expand" affordances on cards. Default
 * `size` is 18, `strokeWidth` is 2.2 — most consumers; override per call.
 * Decorative by default.
 */
export const ChevronDownIcon = ({ size = 18, ...rest }: IconProps) => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
