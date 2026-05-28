import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface TimelineRow {
  marker: string;
  label: string;
  detail: string;
}

export interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

export interface VignetteMetric {
  value: string;
  label: string;
}

/**
 * Three discrete Swiss-design variants for per-service "Scenario" sections.
 *
 *   timeline   - vertical ramp (Day 0 → Day 30 → Day 90 etc.)
 *   comparison - left/right table contrasting status quo with engagement
 *   sketch     - neutral third-person scenario sketch (no attribution, no quote)
 *
 * Important: this component must never render fabricated client quotes or
 * proof attributions. Use the `sketch` variant for descriptive scenarios.
 */
interface ServiceScenarioProps {
  sectionNum?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  variant: 'timeline' | 'comparison' | 'sketch';
  timeline?: TimelineRow[];
  comparison?: ComparisonRow[];
  sketch?: {
    /** Third-person scenario sketch - no quotes, no attribution. */
    narrative: string;
    /** Neutral context label (e.g. "Typical multi-location engagement"). */
    contextLabel: string;
    /** Benchmark tiles - frame as ranges or targets, not client outcomes. */
    benchmarks: VignetteMetric[];
  };
}

const ServiceScenario = ({
  sectionNum = '04',
  eyebrow,
  title,
  intro,
  variant,
  timeline,
  comparison,
  sketch,
}: ServiceScenarioProps) => {
  const { t } = useTranslation('common');
  return (
    <section
      className="sv-section sv-scenario"
      aria-labelledby="sv-scenario-title"
      style={{ background: '#fff' }}
    >
      <div className="container-shell">
        <div className="sv-sec-head">
          <div>
            <div className="sv-sec-num">
              {sectionNum} - {eyebrow}
            </div>
            <h2 id="sv-scenario-title" className="sv-sec-title">
              {title}
            </h2>
          </div>
          {intro ? (
            <p
              style={{
                margin: 0,
                maxWidth: '36ch',
                fontSize: 14,
                lineHeight: 1.65,
                color: '#4A5568',
              }}
            >
              {intro}
            </p>
          ) : null}
        </div>

        {variant === 'timeline' && timeline ? (
          <ol
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: 1,
              background: 'rgba(45,55,72,0.10)',
              border: '1px solid rgba(45,55,72,0.10)',
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            {timeline.map((row) => (
              <li
                key={row.marker}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(120px, 160px) minmax(0, 1fr) minmax(0, 2fr)',
                  gap: 'clamp(16px, 2vw, 32px)',
                  alignItems: 'baseline',
                  padding: 'clamp(20px, 2.4vw, 28px) clamp(20px, 2.6vw, 32px)',
                  background: '#fff',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B38B6D',
                  }}
                >
                  {row.marker}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(16px, 1.6vw, 19px)',
                    fontWeight: 700,
                    color: '#1A2438',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#4A5568',
                  }}
                >
                  {row.detail}
                </span>
              </li>
            ))}
          </ol>
        ) : null}

        {variant === 'comparison' && comparison ? (
          <div
            style={{
              border: '1px solid rgba(45,55,72,0.10)',
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1.4fr)',
                padding: 'clamp(14px, 1.8vw, 22px) clamp(20px, 2.4vw, 32px)',
                background: '#2D3748',
                color: '#fff',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                gap: 'clamp(16px, 2vw, 32px)',
              }}
            >
              <span>{t('components.serviceScenario.comparisonHeaders.lever')}</span>
              <span>{t('components.serviceScenario.comparisonHeaders.before')}</span>
              <span style={{ color: '#B38B6D' }}>
                {t('components.serviceScenario.comparisonHeaders.after')}
              </span>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 1.4fr)',
                  padding: 'clamp(16px, 2vw, 24px) clamp(20px, 2.4vw, 32px)',
                  background: i % 2 === 0 ? '#fff' : 'rgba(45,55,72,0.025)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#2D3748',
                  borderTop: i === 0 ? '0' : '1px solid rgba(45,55,72,0.06)',
                  gap: 'clamp(16px, 2vw, 32px)',
                }}
              >
                <span style={{ fontWeight: 700, color: '#1A2438' }}>{row.label}</span>
                <span style={{ color: '#718096' }}>{row.before}</span>
                <span style={{ color: '#2D5A3D', fontWeight: 600 }}>{row.after}</span>
              </div>
            ))}
          </div>
        ) : null}

        {variant === 'sketch' && sketch ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
              gap: 'clamp(24px, 3vw, 48px)',
              alignItems: 'stretch',
            }}
            className="sv-scenario-sketch"
          >
            <article
              style={{
                margin: 0,
                padding: 'clamp(28px, 3.4vw, 48px)',
                background: '#2D3748',
                color: '#fff',
                borderRadius: 18,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 24,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B38B6D',
                }}
              >
                {sketch.contextLabel}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(17px, 1.8vw, 22px)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                  fontWeight: 500,
                }}
              >
                {sketch.narrative}
              </p>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  borderTop: '1px solid rgba(255,255,255,0.16)',
                  paddingTop: 18,
                }}
              >
                {t('components.serviceScenario.sketchDisclaimer')}
              </span>
            </article>
            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gridTemplateRows: `repeat(${sketch.benchmarks.length}, 1fr)`,
                gap: 12,
              }}
            >
              {sketch.benchmarks.map((m) => (
                <li
                  key={m.label}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(45,55,72,0.10)',
                    borderRadius: 14,
                    padding: 'clamp(20px, 2.2vw, 28px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(26px, 3.2vw, 36px)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#1A2438',
                      lineHeight: 1.05,
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#718096',
                    }}
                  >
                    {m.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceScenario;
