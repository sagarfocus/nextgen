import type { IconProps } from './types';

/**
 * "X" / close / negation glyph (two diagonal lines), 24×24 viewBox.
 *
 * Pairs with `CheckIcon` for do/don't and feature comparison lists.
 *
 * Default `size` is 12, `strokeWidth` is 3 — the values used in the
 * About values, HipaaCompliance, and ValueDetail consumers. Pricing
 * tiers use `size={9} strokeWidth={3}` and pass those explicitly.
 *
 * Decorative by default (`aria-hidden="true"`).
 */
export const XIcon = ({ size = 12, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
