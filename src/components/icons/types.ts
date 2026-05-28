import type { SVGProps } from 'react';

/**
 * Shared prop signature for every component in `components/icons/`.
 *
 * Extends the native `SVGProps<SVGSVGElement>` so any standard SVG attribute
 * (`className`, `aria-label`, `role`, `onClick`, `stroke`, `fill`, `strokeWidth`,
 * etc.) passes through transparently to the underlying `<svg>` element.
 *
 * The single icon-library convention added on top is `size` — a shorthand that
 * maps to both `width` and `height` so callers don't have to set them twice.
 * Every icon picks its own sensible default for `size`; callers can override
 * by passing `size`, or by passing `width`/`height` directly.
 */
export type IconProps = SVGProps<SVGSVGElement> & {
  /**
   * Width and height in pixels (or any valid CSS length). Maps to both the
   * `width` and `height` SVG attributes. Pass `width`/`height` directly to
   * override one dimension independently.
   */
  size?: number | string;
};
