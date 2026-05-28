import type { IconProps } from './types';

/**
 * Map-pin glyph (location marker), 24×24 viewBox.
 *
 * Part of the 6-icon set used in service-page "What we do" card grids.
 * The set shares stroke style (`strokeWidth={1.7}`, currentColor) and
 * viewBox; only the path geometry varies.
 *
 * Default `size` is 24; service pages typically let CSS in the parent slot
 * (`.bento-icon-slot--card svg { width: 18px }`) drive the actual rendered
 * size, so the inline default is rarely the visible size.
 */
export const PinIcon = ({ size = 24, ...rest }: IconProps) => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
