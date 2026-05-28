import { useTranslation } from 'react-i18next';
import SectionHead from './SectionHead';
import { CheckIcon } from '../icons';

export interface PainPoint {
  title: string;
  desc: string;
}

export interface OutcomeRow {
  label: string;
  value: string;
}

interface ProblemOutcomeProps {
  pains: PainPoint[];
  outcomes: OutcomeRow[];
}

const AlertIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ProblemOutcome = ({ pains, outcomes }: ProblemOutcomeProps) => {
  const { t } = useTranslation('common');
  return (
    <section className="sv-section sv-po">
      <div className="container-shell">
        <SectionHead
          num={t('components.problemOutcome.sectionNum')}
          title={
            <>
              {t('components.problemOutcome.titlePart1')}{' '}
              <em>{t('components.problemOutcome.titleEm')}</em>{' '}
              {t('components.problemOutcome.titlePart2')}
            </>
          }
          meta={
            <>
              {t('components.problemOutcome.metaLine1')}
              <br />
              {t('components.problemOutcome.metaLine2')}
            </>
          }
        />
        <div className="sv-po-grid">
          <ul className="sv-po-list">
            {pains.map((p) => (
              <li key={p.title} className="sv-po-pain">
                <span className="sv-po-icon">
                  <AlertIcon />
                </span>
                <div>
                  <h3 className="sv-po-pain-title">{p.title}</h3>
                  <p className="sv-po-pain-desc">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="sv-po-out">
            <span className="sv-po-out-eyebrow">
              {t('components.problemOutcome.outcomeEyebrow')}
            </span>
            <h3>{t('components.problemOutcome.outcomeHeading')}</h3>
            {outcomes.map((o) => (
              <div key={o.label} className="sv-po-out-line">
                <CheckIcon />
                <span>{o.label}</span>
                <strong>{o.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemOutcome;
