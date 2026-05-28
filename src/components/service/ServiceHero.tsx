import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';

interface ServiceHeroProps {
  crumbRoot?: { label: string; href: string };
  crumb: string;
  title: ReactNode;
  lede: ReactNode;
  metric: {
    icon: ReactElement;
    num: ReactNode;
    label: string;
  };
  keyword: ReactNode;
  rankBadge: {
    num: ReactNode;
    label: string;
  };
  mainCard: ReactNode;
}

const ArrowDiag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" />
  </svg>
);

const ServiceHero = ({
  crumbRoot,
  crumb,
  title,
  lede,
  metric,
  keyword,
  rankBadge,
  mainCard,
}: ServiceHeroProps) => {
  const { t } = useTranslation('common');
  const root = crumbRoot ?? { label: t('components.serviceHero.rootLabel'), href: '/services' };
  return (
    <section className="sv-hero">
      <div className="container-shell">
        <div className="sv-hero-grid">
          <div>
            <div className="sv-hero-crumb">
              <Link to={root.href}>{root.label}</Link>
              <span className="sep">/</span>
              <span className="cur">{crumb}</span>
            </div>
            <h1 className="sv-hero-title">{title}</h1>
            <p className="sv-hero-lede">{lede}</p>
            <div className="sv-hero-ctas">
              <a href="#audit" className="sv-btn-primary">
                {t('components.serviceHero.getFreeAudit')}
                <ArrowIcon />
              </a>
              <a href="#how" className="sv-btn-ghost">
                {t('components.serviceHero.seeHowItWorks')}
                <ArrowDiag />
              </a>
            </div>
          </div>

          <div className="sv-h3d" aria-hidden="true">
            <div className="sv-h3d-metric">
              <div className="sv-h3d-metric-row">
                <div className="sv-h3d-metric-icon">{metric.icon}</div>
                <div>
                  <div className="sv-h3d-metric-num">{metric.num}</div>
                  <div className="sv-h3d-metric-label">{metric.label}</div>
                </div>
              </div>
            </div>

            <div className="sv-h3d-keyword">
              <span className="arrow-up">↑</span>
              {keyword}
            </div>

            <div className="sv-h3d-main">{mainCard}</div>

            <div className="sv-h3d-rank-badge">
              <div className="sv-h3d-rank-icon">
                <StarIcon />
              </div>
              <div>
                <div className="sv-h3d-rank-num">{rankBadge.num}</div>
                <div className="sv-h3d-rank-label">{rankBadge.label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
