import type { IconProps } from './types';

/**
 * Stroked checkmark, 24×24 viewBox.
 *
 * Default `size` is 12 (the median size across the codebase). Default
 * `strokeWidth` is 3 (the most common value); callers using 2.6 or 3.2
 * pass `strokeWidth` explicitly.
 *
 * Rendered as decorative by default (`aria-hidden="true"`). When the
 * checkmark carries meaning (e.g. signals a completed step rather than
 * decorating bulleted copy), pass `aria-hidden={false}` and a `role="img"`
 * + `aria-label`.
 */
export const CheckIcon = ({ size = 12, ...rest }: IconProps) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
