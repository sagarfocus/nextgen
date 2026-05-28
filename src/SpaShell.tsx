'use client';

// Mounts the existing React app under react-router-dom's BrowserRouter, just
// like the original Vite main.tsx did. CSS is loaded once by app/layout.tsx.
// This module is dynamic-imported with { ssr: false } from app/[[...slug]]/
// SpaClient.tsx so BrowserRouter / i18next-detector / GSAP / Lenis never run
// on the server.

import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import App from './App';

export default function SpaShell() {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
