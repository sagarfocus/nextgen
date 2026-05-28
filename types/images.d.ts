// Tell TS that image imports return URL strings (matching the Vite-era
// behavior + the runtime behavior enforced by `images.disableStaticImages`
// in next.config.ts). Without this, TS would use Next.js's built-in
// StaticImageData type and ~150 callsites would fail to compile.

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
