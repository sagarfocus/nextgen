'use client';

import dynamic from 'next/dynamic';

// ssr: false keeps BrowserRouter + i18next detector + GSAP/Lenis off the server.
const SpaShell = dynamic(() => import('@/SpaShell'), { ssr: false });

export default function SpaClient() {
  return <SpaShell />;
}
