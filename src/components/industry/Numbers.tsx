import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface BigNumber {
  num: ReactNode;
  label: string;
  caption: string;
}

interface NumbersProps {
  stats: BigNumber[];
}

/**
 * Numbers wall - first stat on a dark hero panel as the lead metric, with the
 * remaining stats laid out as supporting tiles. Mirrors the asymmetric Swiss
 * rhythm used in the service Results section, but stays visually distinct
 * because the tile grid here is 2×N instead of 1×N.
 */
const Numbers = ({ stats }: NumbersProps) => {
  const { t } = useTranslation('common');
  const lead = stats[0];
  const rest = stats.slice(1);

  return (
    <section className="iv-section iv-numbers" aria-labelledby="iv-num-title">
      <div className="container-shell">
        <header className="iv-section-head">
          <span className="iv-section-num">03</span>
          <h2 id="iv-num-title" className="iv-section-title">
            {t('components.industryNumbers.title')}
          </h2>
        </header>

        <div className="iv-numbers-wall">
          {lead ? (
            <article className="iv-numbers-hero">
              <span className="iv-num-eyebrow">{t('components.industryNumbers.eyebrow')}</span>
              <div>
                <div className="iv-num-big">{lead.num}</div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: 8,
                  }}
                >
                  {lead.label}
                </div>
                <p className="iv-num-cap">{lead.caption}</p>
              </div>
            </article>
          ) : null}
          <div className="iv-numbers-tiles">
            {rest.map((s) => (
              <article key={s.label} className="iv-numbers-tile">
                <div className="iv-num-tile-num">{s.num}</div>
                <div className="iv-num-tile-lbl">{s.label}</div>
                <p className="iv-num-tile-cap">{s.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Numbers;
