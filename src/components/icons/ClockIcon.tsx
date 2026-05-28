import type { IconProps } from './types';

/**
 * Analog clock face (circle + hands at 12:00 → 4:00), 24×24 viewBox.
 *
 * Used for "time / cadence / read time" indicators in editorial cards,
 * carousel meta-rows, and SLA copy. Default `size` is 18, `strokeWidth`
 * is 1.8 — common in the editorial chip contexts. Decorative by default.
 */
export const ClockIcon = ({ size = 18, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
