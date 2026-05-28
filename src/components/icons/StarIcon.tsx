import type { IconProps } from './types';

/**
 * Five-pointed star outline, 24×24 viewBox.
 *
 * Part of the 6-icon set used in service-page "What we do" card grids.
 */
export const StarIcon = ({ size = 24, ...rest }: IconProps) => (
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
    <polygon points="12 2 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" />
  </svg>
);
