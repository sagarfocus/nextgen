import type { IconProps } from './types';

/**
 * Group / "users" glyph (primary user + smaller secondary figure), 24×24 viewBox.
 *
 * Used in About/Infrastructure and Pricing/InvestmentIncludes to represent
 * "the team you hire" / "dedicated specialists". Default `size` is 26,
 * `strokeWidth` is 1.7 — matches both source call sites. Decorative by
 * default.
 */
export const UsersIcon = ({ size = 26, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
