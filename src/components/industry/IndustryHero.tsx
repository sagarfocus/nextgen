import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface QuickStat {
  num: ReactNode;
  label: string;
}

interface IndustryHeroProps {
  tag: string;
  title: ReactNode;
  lede: ReactNode;
  illustration: ReactElement;
  quickStats: QuickStat[];
}

const IndustryHero = ({ tag, title, lede, illustration, quickStats }: IndustryHeroProps) => {
  const { t } = useTranslation('common');
  return (
    <section className="iv-hero" aria-labelledby="iv-hero-title">
      <div className="iv-hero-inner">
        <div className="iv-hero-crumb">
          <Link to="/industries">{t('components.industryHero.rootLabel')}</Link>
          <span className="sep" aria-hidden="true">
            /
          </span>
          <span className="cur">{tag}</span>
        </div>

        <div className="iv-hero-grid">
          <div className="iv-hero-copy">
            <span className="iv-hero-tag">{tag}</span>
            <h1 id="iv-hero-title" className="iv-hero-title">
              {title}
            </h1>
            <p className="iv-hero-lede">{lede}</p>
          </div>

          <div className="iv-hero-fig" aria-hidden="true">
            {illustration}
          </div>
        </div>

        <ol className="iv-hero-stats">
          {quickStats.map((s, i) => (
            <li key={i} className="iv-hero-stat">
              <span className="iv-hero-stat-num">{s.num}</span>
              <span className="iv-hero-stat-label">{s.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default IndustryHero;
