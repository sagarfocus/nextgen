import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface Snapshot {
  image: string;
  label: string;
  caption: string;
}

interface IndustrySnapshotsProps {
  items: Snapshot[];
  eyebrow?: string;
  title?: ReactNode;
}

const IndustrySnapshots = ({ items, eyebrow, title }: IndustrySnapshotsProps) => {
  const { t } = useTranslation('common');
  const resolvedEyebrow = eyebrow ?? t('components.industrySnapshots.defaultEyebrow');
  return (
    <section className="iv-section iv-snapshots" aria-labelledby="iv-snap-title">
      <div className="container-shell">
        <header className="iv-snap-head">
          <span className="iv-snap-eyebrow">{resolvedEyebrow}</span>
          <h2 id="iv-snap-title" className="iv-snap-title">
            {title}
          </h2>
        </header>

        <div className="iv-snap-grid">
          {items.map((s, i) => (
            <figure key={i} className="iv-snap-card">
              <div className="iv-snap-img">
                <img src={s.image} alt={s.label} loading="lazy" decoding="async" />
              </div>
              <div className="iv-snap-overlay" aria-hidden="true" />
              <figcaption className="iv-snap-cap">
                <span className="iv-snap-label">
                  <span className="iv-snap-idx">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </span>
                <p className="iv-snap-body">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySnapshots;
