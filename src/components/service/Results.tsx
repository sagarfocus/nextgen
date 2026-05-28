import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHead from './SectionHead';

export interface ResultStat {
  num: ReactNode;
  label: string;
}

interface ResultsProps {
  stats: ResultStat[];
}

/**
 * Asymmetric Swiss layout - first stat rendered as an oversized hero metric on a
 * dark panel; remaining stats stacked as supporting tiles on the right. Replaces
 * the previous 4-column glass strip so adjacent service pages no longer share
 * an identical visual rhythm.
 */
const Results = ({ stats }: ResultsProps) => {
  const { t } = useTranslation('common');
  const lead = stats[0];
  const rest = stats.slice(1);

  return (
    <section className="sv-section sv-results">
      <div className="container-shell">
        <SectionHead
          num={t('components.results.sectionNum')}
          title={
            <>
              {t('components.results.titlePart1')} <em>{t('components.results.titleEm')}</em>
            </>
          }
          meta={
            <>
              {t('components.results.metaLine1')}
              <br />
              {t('components.results.metaLine2')}
            </>
          }
        />
        <div className="sv-res-redesign">
          {lead ? (
            <article className="sv-res-hero">
              <span className="sv-res-hero-eyebrow">
                {t('components.results.heroEyebrow')}
              </span>
              <div>
                <div className="sv-res-hero-num">{lead.num}</div>
                <p className="sv-res-hero-label">{lead.label}</p>
              </div>
            </article>
          ) : null}

          <div className="sv-res-tiles">
            {rest.map((s) => (
              <article key={s.label} className="sv-res-tile">
                <div className="sv-res-tile-num">{s.num}</div>
                <div className="sv-res-tile-lbl">{s.label}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
