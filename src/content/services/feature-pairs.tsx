import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import gbpImg from '../../assets/nextgen-image/Googleebuisness.png';
import citationImg from '../../assets/nextgen-image/Citationbuilding.png';
import hyperLocalImg from '../../assets/nextgen-image/Hyperlocalcontent.png';
import aeoImg from '../../assets/nextgen-image/Aeo&schemaimg.png';

export interface PairCard {
  ariaId: string;
  bg: ReactElement;
  tag: string;
  title: string;
  desc: string;
  to: string;
}

const GbpBg = <img src={gbpImg} alt="" loading="lazy" decoding="async" />;

const CitationBg = <img src={citationImg} alt="" loading="lazy" decoding="async" />;

const HyperLocalBg = <img src={hyperLocalImg} alt="" loading="lazy" decoding="async" />;

const AeoBg = <img src={aeoImg} alt="" loading="lazy" decoding="async" />;

interface CardConfig {
  ariaId: string;
  bg: ReactElement;
  to: string;
  key: 'gbp' | 'citation' | 'hyperLocal' | 'aeo';
}

const ROW_1_CONFIG: CardConfig[] = [
  { ariaId: 'card-gbp', bg: GbpBg, to: '/services/google-business-profile', key: 'gbp' },
  { ariaId: 'card-citation', bg: CitationBg, to: '/citation-building', key: 'citation' },
];

const ROW_2_CONFIG: CardConfig[] = [
  { ariaId: 'card-hl', bg: HyperLocalBg, to: '/hyper-local-content', key: 'hyperLocal' },
  { ariaId: 'card-aeo', bg: AeoBg, to: '/aeo-schema', key: 'aeo' },
];

function cardFromConfig(t: (key: string) => string, c: CardConfig): PairCard {
  return {
    ariaId: c.ariaId,
    bg: c.bg,
    to: c.to,
    tag: t(`featurePairs.cards.${c.key}.tag`),
    title: t(`featurePairs.cards.${c.key}.title`),
    desc: t(`featurePairs.cards.${c.key}.desc`),
  };
}

/** React hook for the first row of feature pair cards. */
export function useFeaturePairsRow1(): readonly PairCard[] {
  const { t } = useTranslation('services');
  return useMemo(() => ROW_1_CONFIG.map((c) => cardFromConfig(t, c)), [t]);
}

/** React hook for the second row of feature pair cards. */
export function useFeaturePairsRow2(): readonly PairCard[] {
  const { t } = useTranslation('services');
  return useMemo(() => ROW_2_CONFIG.map((c) => cardFromConfig(t, c)), [t]);
}
