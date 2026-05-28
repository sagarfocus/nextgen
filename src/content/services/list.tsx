import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import fieldImg from '../../assets/nextgen-image/Onsitefieldmarketing.png';
import seoImg from '../../assets/nextgen-image/Seoimg.png';
import socialImg from '../../assets/nextgen-image/Socialmediaimg.png';
import metaImg from '../../assets/nextgen-image/Metaadsimg.png';
import brandImg from '../../assets/nextgen-image/Brandidentityimg.png';
import emailImg from '../../assets/nextgen-image/Emailcampingimg.png';
import adsImg from '../../assets/nextgen-image/googleadsimg.png';
import contentImg from '../../assets/nextgen-image/Content&copywriting.png';
import gbpImg from '../../assets/nextgen-image/Googlebuisnessprofile.png';
import webImg from '../../assets/nextgen-image/Websiteimg.png';
import strategyImg from '../../assets/nextgen-image/Strategy&planning.png';
import analyticsImg from '../../assets/nextgen-image/Analytics&report.png';

export interface ServiceItem {
  ariaId: string;
  illustration: ReactElement;
  image?: string;
  imgFocus?: 'left' | 'right' | 'center';
  meta: string;
  title: string;
  sub: string;
  to: string;
  extra?: boolean;
}

/* ---- Card illustrations ---- */

const SeoCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="148" cy="118" r="64" fill="none" stroke="#B38B6D" strokeWidth="2.4" />
    <line
      x1="194"
      y1="164"
      x2="226"
      y2="196"
      stroke="#B38B6D"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <circle cx="226" cy="196" r="3" fill="#B38B6D" />
    <path
      d="M148 84 C 162 84 172 94 172 108 C 172 124 148 148 148 148 C 148 148 124 124 124 108 C 124 94 134 84 148 84 Z"
      fill="#8FBC8F"
    />
    <circle cx="148" cy="106" r="7" fill="#fff" />
  </svg>
);

const AdsCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line
      x1="60"
      y1="180"
      x2="260"
      y2="180"
      stroke="#B38B6D"
      strokeOpacity=".4"
      strokeWidth="1.4"
    />
    <rect
      x="80"
      y="140"
      width="32"
      height="40"
      rx="4"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.6"
    />
    <rect
      x="124"
      y="115"
      width="32"
      height="65"
      rx="4"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.6"
    />
    <rect
      x="168"
      y="90"
      width="32"
      height="90"
      rx="4"
      fill="#8FBC8F"
      fillOpacity=".30"
      stroke="#8FBC8F"
      strokeWidth="1.6"
    />
    <rect x="212" y="60" width="32" height="120" rx="4" fill="#576DB5" />
    <path
      d="M80 70 L 230 70"
      fill="none"
      stroke="#B38B6D"
      strokeWidth="1.6"
      strokeDasharray="3 4"
    />
    <polyline
      points="220,62 230,70 220,78"
      fill="none"
      stroke="#B38B6D"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MetaCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M 80 120 C 80 86 124 86 160 120 C 196 154 240 154 240 120 C 240 86 196 86 160 120 C 124 154 80 154 80 120 Z"
      fill="none"
      stroke="#576DB5"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="160" cy="120" r="5" fill="#B38B6D" />
  </svg>
);

const SocialCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M76 80 H160 a16 16 0 0 1 16 16 v40 a16 16 0 0 1 -16 16 H110 l-20 20 v-20 H76 a16 16 0 0 1 -16 -16 v-40 a16 16 0 0 1 16 -16 z"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.8"
    />
    <circle cx="100" cy="118" r="3.5" fill="#B38B6D" />
    <circle cx="120" cy="118" r="3.5" fill="#B38B6D" />
    <circle cx="140" cy="118" r="3.5" fill="#B38B6D" />
    <path
      d="M170 60 H244 a14 14 0 0 1 14 14 v34 a14 14 0 0 1 -14 14 H202 l-16 16 v-16 H170 a14 14 0 0 1 -14 -14 v-34 a14 14 0 0 1 14 -14 z"
      fill="#576DB5"
    />
    <circle cx="190" cy="89" r="3" fill="#fff" />
    <circle cx="208" cy="89" r="3" fill="#fff" />
    <circle cx="226" cy="89" r="3" fill="#fff" />
  </svg>
);

const ContentCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect
      x="98"
      y="62"
      width="120"
      height="138"
      rx="8"
      fill="#fff"
      stroke="#B38B6D"
      strokeOpacity=".45"
      strokeWidth="1.5"
      transform="rotate(-4 158 131)"
    />
    <rect
      x="100"
      y="60"
      width="120"
      height="138"
      rx="8"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.8"
    />
    <line x1="118" y1="92" x2="200" y2="92" stroke="#B38B6D" strokeWidth="1.5" opacity=".75" />
    <line x1="118" y1="110" x2="200" y2="110" stroke="#B38B6D" strokeWidth="1.5" opacity=".55" />
    <line x1="118" y1="128" x2="180" y2="128" stroke="#B38B6D" strokeWidth="1.5" opacity=".55" />
    <line x1="118" y1="146" x2="200" y2="146" stroke="#B38B6D" strokeWidth="1.5" opacity=".4" />
    <rect x="118" y="166" width="48" height="16" rx="3" fill="#8FBC8F" fillOpacity=".5" />
  </svg>
);

const GbpCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M160 50 C 188 50 208 70 208 98 C 208 132 160 184 160 184 C 160 184 112 132 112 98 C 112 70 132 50 160 50 Z"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.8"
    />
    <circle cx="160" cy="98" r="16" fill="#576DB5" />
    <path
      d="M152 98 L 158 104 L 168 92"
      fill="none"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g fill="#8FBC8F">
      <circle cx="120" cy="206" r="3.2" />
      <circle cx="140" cy="206" r="3.2" />
      <circle cx="160" cy="206" r="3.2" />
      <circle cx="180" cy="206" r="3.2" />
      <circle cx="200" cy="206" r="3.2" />
    </g>
  </svg>
);

const WebCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect
      x="68"
      y="56"
      width="184"
      height="128"
      rx="10"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.8"
    />
    <line x1="68" y1="84" x2="252" y2="84" stroke="#B38B6D" strokeWidth="1.5" />
    <circle cx="82" cy="70" r="3" fill="#B38B6D" />
    <circle cx="94" cy="70" r="3" fill="#B38B6D" fillOpacity=".55" />
    <circle cx="106" cy="70" r="3" fill="#B38B6D" fillOpacity=".30" />
    <rect
      x="86"
      y="100"
      width="56"
      height="68"
      rx="4"
      fill="#8FBC8F"
      fillOpacity=".30"
      stroke="#8FBC8F"
      strokeWidth="1.2"
    />
    <rect x="156" y="100" width="78" height="14" rx="3" fill="#576DB5" fillOpacity=".75" />
    <rect x="156" y="120" width="78" height="6" rx="2" fill="#B38B6D" fillOpacity=".4" />
    <rect x="156" y="132" width="62" height="6" rx="2" fill="#B38B6D" fillOpacity=".3" />
    <rect x="156" y="150" width="48" height="16" rx="4" fill="#576DB5" />
  </svg>
);

const BrandCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="80" y="60" width="46" height="100" rx="6" fill="#576DB5" />
    <rect x="138" y="60" width="46" height="100" rx="6" fill="#B38B6D" />
    <rect x="196" y="60" width="46" height="100" rx="6" fill="#8FBC8F" />
    <text
      x="160"
      y="195"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fontSize="16"
      fontWeight="700"
      fill="#2D3748"
      letterSpacing="-0.5"
      textAnchor="middle"
    >
      Aa Bb Cc
    </text>
  </svg>
);

const EmailCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="translate(70, 60)">
      <rect
        x="0"
        y="0"
        width="180"
        height="120"
        rx="6"
        fill="#fff"
        stroke="#B38B6D"
        strokeWidth="1.8"
      />
      <path
        d="M0 8 L 90 70 L 180 8"
        fill="none"
        stroke="#B38B6D"
        strokeWidth="1.6"
        strokeOpacity=".7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="14" y="84" width="86" height="22" rx="3" fill="#576DB5" />
      <rect
        x="108"
        y="84"
        width="58"
        height="6"
        rx="2"
        fill="#B38B6D"
        fillOpacity=".4"
      />
      <rect
        x="108"
        y="96"
        width="46"
        height="6"
        rx="2"
        fill="#B38B6D"
        fillOpacity=".3"
      />
      <circle cx="160" cy="-4" r="14" fill="#8FBC8F" fillOpacity=".25" />
      <circle cx="160" cy="-4" r="8" fill="#8FBC8F" />
      <path
        d="M156 -4 L 159 -1 L 164 -7"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const StrategyCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle
      cx="170"
      cy="120"
      r="76"
      fill="none"
      stroke="#B38B6D"
      strokeOpacity=".45"
      strokeWidth="1.5"
      strokeDasharray="4 6"
    />
    <circle
      cx="170"
      cy="120"
      r="50"
      fill="none"
      stroke="#B38B6D"
      strokeOpacity=".7"
      strokeWidth="1.5"
    />
    <circle cx="170" cy="120" r="26" fill="#fff" stroke="#576DB5" strokeWidth="1.8" />
    <circle cx="170" cy="120" r="8" fill="#576DB5" />
    <line
      x1="78"
      y1="50"
      x2="163"
      y2="113"
      stroke="#B38B6D"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <polygon points="74,64 74,42 92,52" fill="#B38B6D" />
  </svg>
);

const FieldCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle
      cx="160"
      cy="130"
      r="86"
      fill="none"
      stroke="#B38B6D"
      strokeOpacity=".30"
      strokeWidth="1.2"
      strokeDasharray="3 5"
    />
    <circle
      cx="160"
      cy="130"
      r="58"
      fill="none"
      stroke="#B38B6D"
      strokeOpacity=".5"
      strokeWidth="1.2"
      strokeDasharray="3 5"
    />
    <rect
      x="123"
      y="78"
      width="74"
      height="84"
      rx="3"
      fill="#fff"
      stroke="#B38B6D"
      strokeWidth="1.8"
    />
    <rect x="153" y="100" width="14" height="40" fill="#8FBC8F" fillOpacity=".50" />
    <rect x="139" y="113" width="42" height="14" fill="#8FBC8F" fillOpacity=".50" />
    <rect
      x="197"
      y="110"
      width="40"
      height="52"
      rx="2"
      fill="#576DB5"
      fillOpacity=".18"
      stroke="#576DB5"
      strokeWidth="1.2"
    />
    <rect
      x="83"
      y="110"
      width="40"
      height="52"
      rx="2"
      fill="#576DB5"
      fillOpacity=".18"
      stroke="#576DB5"
      strokeWidth="1.2"
    />
    <circle cx="160" cy="130" r="5" fill="#576DB5" />
  </svg>
);

const AnalyticsCard = (
  <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle
      cx="160"
      cy="120"
      r="60"
      fill="none"
      stroke="#B38B6D"
      strokeWidth="22"
      strokeDasharray="120 376"
      transform="rotate(-90 160 120)"
    />
    <circle
      cx="160"
      cy="120"
      r="60"
      fill="none"
      stroke="#576DB5"
      strokeWidth="22"
      strokeDasharray="84 376"
      strokeDashoffset="-120"
      transform="rotate(-90 160 120)"
    />
    <circle
      cx="160"
      cy="120"
      r="60"
      fill="none"
      stroke="#8FBC8F"
      strokeWidth="22"
      strokeDasharray="64 376"
      strokeDashoffset="-204"
      transform="rotate(-90 160 120)"
    />
    <circle cx="160" cy="120" r="46" fill="#FAFAF8" />
    <text
      x="160"
      y="116"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fontSize="22"
      fontWeight="700"
      fill="#2D3748"
      textAnchor="middle"
    >
      87%
    </text>
    <text
      x="160"
      y="136"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fontSize="9"
      fontWeight="700"
      fill="#718096"
      textAnchor="middle"
      letterSpacing="2"
    >
      ROI
    </text>
  </svg>
);

interface ServiceConfig {
  ariaId: string;
  illustration: ReactElement;
  image?: string;
  imgFocus?: 'left' | 'right' | 'center';
  to: string;
  extra?: boolean;
  key:
    | 'seo'
    | 'googleAds'
    | 'metaAds'
    | 'socialMedia'
    | 'content'
    | 'gbp'
    | 'web'
    | 'brand'
    | 'email'
    | 'strategy'
    | 'field'
    | 'analytics';
}

const SERVICE_CONFIG: ServiceConfig[] = [
  { ariaId: 'svc-1', illustration: SeoCard, image: seoImg, to: '/services/seo', key: 'seo' },
  {
    ariaId: 'svc-2',
    illustration: AdsCard,
    image: adsImg,
    to: '/services/google-ads',
    key: 'googleAds',
  },
  { ariaId: 'svc-3', illustration: MetaCard, image: metaImg, to: '/meta-ads', key: 'metaAds' },
  {
    ariaId: 'svc-4',
    illustration: SocialCard,
    image: socialImg,
    to: '/services/social-media-marketing',
    key: 'socialMedia',
  },
  {
    ariaId: 'svc-5',
    illustration: ContentCard,
    image: contentImg,
    to: '/services/content-copywriting',
    key: 'content',
  },
  {
    ariaId: 'svc-6',
    illustration: GbpCard,
    image: gbpImg,
    to: '/services/google-business-profile',
    key: 'gbp',
  },
  {
    ariaId: 'svc-7',
    illustration: WebCard,
    image: webImg,
    imgFocus: 'right',
    to: '/services/website-design-dev',
    extra: true,
    key: 'web',
  },
  {
    ariaId: 'svc-8',
    illustration: BrandCard,
    image: brandImg,
    to: '/services/brand-identity-design',
    extra: true,
    key: 'brand',
  },
  {
    ariaId: 'svc-9',
    illustration: EmailCard,
    image: emailImg,
    to: '/services/email-drip-campaigns',
    extra: true,
    key: 'email',
  },
  {
    ariaId: 'svc-10',
    illustration: StrategyCard,
    image: strategyImg,
    to: '/growth-plan',
    extra: true,
    key: 'strategy',
  },
  {
    ariaId: 'svc-11',
    illustration: FieldCard,
    image: fieldImg,
    to: '/onsite-field-marketing',
    extra: true,
    key: 'field',
  },
  {
    ariaId: 'svc-12',
    illustration: AnalyticsCard,
    image: analyticsImg,
    to: '/services/analytics-reporting',
    extra: true,
    key: 'analytics',
  },
];

/** React hook for the Services index card list — live-translates. */
export function useServices(): readonly ServiceItem[] {
  const { t } = useTranslation('services');
  return useMemo(
    () =>
      SERVICE_CONFIG.map((c) => ({
        ariaId: c.ariaId,
        illustration: c.illustration,
        ...(c.image ? { image: c.image } : {}),
        ...(c.imgFocus ? { imgFocus: c.imgFocus } : {}),
        to: c.to,
        ...(c.extra ? { extra: true } : {}),
        meta: t(`list.items.${c.key}.meta`),
        title: t(`list.items.${c.key}.title`),
        sub: t(`list.items.${c.key}.sub`),
      })),
    [t]
  );
}
