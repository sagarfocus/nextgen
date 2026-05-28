import { useTranslation } from 'react-i18next';
import SectionHead from './SectionHead';

export interface HowStep {
  num: string;
  name: string;
  desc: string;
}

interface HowItWorksProps {
  steps: HowStep[];
  /** Optional duration label shown alongside each step (e.g. "Week 1"). */
  durations?: string[];
}

/**
 * Fully vertical timeline. Every element inside a phase stacks top-to-bottom:
 * dot → phase label → title → description. A vertical rail connects each
 * phase to the next. Nothing renders side-by-side within a step.
 */
const HowItWorks = ({ steps, durations }: HowItWorksProps) => {
  const { t } = useTranslation('common');
  return (
    <section className="sv-section sv-how" id="how">
      <div className="container-shell">
        <SectionHead
          num={t('components.howItWorks.sectionNum')}
          title={
            <>
              {t('components.howItWorks.titlePart1')}{' '}
              <em>{t('components.howItWorks.titleEm')}</em>
            </>
          }
          meta={
            <>
              {t('components.howItWorks.metaLine1')}
              <br />
              {t('components.howItWorks.metaLine2')}
            </>
          }
        />
        <ol className="sv-vstep">
          {steps.map((s, i) => (
            <li key={s.num} className="sv-vstep-item">
              <span className="sv-vstep-dot">{s.num}</span>
              <span className="sv-vstep-label">
                {t('components.howItWorks.phasePrefix')} {s.num}
              </span>
              <h3 className="sv-vstep-name">{s.name}</h3>
              <p className="sv-vstep-desc">{s.desc}</p>
              {durations?.[i] ? <span className="sv-vstep-duration">{durations[i]}</span> : null}
              {i < steps.length - 1 ? <span className="sv-vstep-rail" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
