import advantagesImg from '../../assets/nextgen-image/Ouradvantageimg1.png';

/**
 * Home page — "Our Advantages" section content.
 *
 * The four icons (`hand`, `price`, `manager`, `shield`) live in
 * `src/pages/Home/Advantages.tsx` — the section's `<Icon>` switch maps
 * each `AdvantageCardIcon` literal to its SVG path.
 */

export type HomeAdvantageCardIcon = 'hand' | 'price' | 'manager' | 'shield';

export interface HomeAdvantageStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface HomeAdvantageCard {
  title: string;
  desc: string;
  icon: HomeAdvantageCardIcon;
}

export const HOME_ADVANTAGES_HEAD = {
  eyebrow: 'Our Advantages',
  title: 'One partner for healthcare growth.',
  intro:
    'SEO, paid media, automation, and reporting under one roof - so your team has one accountable partner, not five disconnected vendors.',
} as const;

export const HOME_ADVANTAGES_IMAGE = advantagesImg;

export const HOME_ADVANTAGES_STATS: readonly HomeAdvantageStat[] = [
  { value: 98, suffix: '%', label: 'Client retention rate' },
  { value: 200, suffix: '+', label: 'Healthcare practices grown' },
  { value: 30, prefix: '≤', suffix: ' Days', label: 'To first qualified leads' },
];

export const HOME_ADVANTAGES_CARDS_LEFT: readonly HomeAdvantageCard[] = [
  {
    icon: 'hand',
    title: 'Everything under one roof',
    desc: 'SEO, paid media, content, automation, and reporting - one team, one source of truth. No vendor stitching, no finger-pointing across agencies.',
  },
  {
    icon: 'manager',
    title: 'Your dedicated growth lead',
    desc: 'A single accountable strategist who owns your roadmap, runs weekly reviews, and is reachable when patient volume needs to move now - not next sprint.',
  },
];

export const HOME_ADVANTAGES_CARDS_RIGHT: readonly HomeAdvantageCard[] = [
  {
    icon: 'price',
    title: 'Fixed pricing & clear timelines',
    desc: 'Transparent monthly plans with milestones you can map to your board. No surprise invoices, no buried retainer creep - what you sign is what you pay.',
  },
  {
    icon: 'shield',
    title: 'HIPAA-aware specialists',
    desc: 'Every campaign, pixel, and intake form is built by healthcare-trained operators using BAA-ready stacks and server-side tracking. Compliance is the default, not an afterthought.',
  },
];
