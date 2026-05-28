import SpaClient from './SpaClient';

// The whole React app renders here under one catch-all route so the existing
// react-router-dom + BrowserRouter setup keeps working unchanged. Any URL not
// matched by app/api/** falls through to this page.
//
// SSR is disabled inside SpaClient (BrowserRouter, i18next-browser-language-
// detector, GSAP, and Lenis all need `window`).
export default function CatchAllPage() {
  return <SpaClient />;
}
