import type { DoCard } from '@/components/service/WhatWeDo';
import { ChartIcon, FileIcon, LinkIcon, NetworkIcon, PinIcon, StarIcon } from '@/components/icons';

export const DO_CARDS: DoCard[] = [
  { name: 'UX Design', desc: 'Patient journey maps drive every layout, click target, and copy choice.', icon: <PinIcon /> },
  { name: 'Conversion Design', desc: 'Hero, proof, offer, CTA - every section earns its scroll.', icon: <LinkIcon /> },
  { name: 'Speed Optimization', desc: 'Sub-2s loads on 4G, image pipeline, lazy-load, edge cached.', icon: <FileIcon /> },
  { name: 'Mobile-First', desc: "70% of patient traffic is mobile - that's where the design starts.", icon: <NetworkIcon /> },
  { name: 'CMS & Handoff', desc: 'Built on Webflow, WordPress, or Next.js - your team owns it after.', icon: <StarIcon /> },
  { name: 'Accessibility', desc: 'WCAG 2.2 AA compliant by default. Healthcare requires it.', icon: <ChartIcon /> },
];
