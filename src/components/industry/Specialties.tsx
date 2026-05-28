import { useTranslation } from 'react-i18next';

export interface SpecialtyRow {
  name: string;
  desc: string;
}

interface SpecialtiesProps {
  rows: SpecialtyRow[];
}

const ACCENTS = ['#576DB5', '#8FBC8F', '#B38B6D', '#576DB5', '#8FBC8F', '#B38B6D'];

const SpecialtyIcon = ({ idx, color }: { idx: number; color: string }) => {
  // 6 distinct minimal motifs - each card gets a visual marker without
  // needing a separate icon library or per-row asset.
  switch (idx % 6) {
    case 0:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v8l5 3" />
        </svg>
      );
    case 1:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 10h16M10 4v16" />
        </svg>
      );
    case 2:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h4l3-8 4 16 3-8h4" />
        </svg>
      );
    case 3:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case 4:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 18V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" />
          <line x1="4" y1="14" x2="20" y2="14" />
          <line x1="9" y1="6" x2="9" y2="18" />
        </svg>
      );
    case 5:
    default:
      return (
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 14 15 20 7" />
          <polyline points="14 7 20 7 20 13" />
        </svg>
      );
  }
};

/**
 * Bento-style card grid for industry specialties. Replaces the previous
 * 6-row text list with a visually distinct 3-column card grid; each card
 * carries an icon, accent rail, and short description. Stays clearly
 * different from the service WhatWeDo bento (which has a hero card) so
 * industry and service templates no longer share a structural rhythm.
 */
const Specialties = ({ rows }: SpecialtiesProps) => {
  const { t } = useTranslation('common');
  return (
    <section className="iv-section iv-specialties" aria-labelledby="iv-spec-title">
      <div className="container-shell">
        <header className="iv-section-head">
          <span className="iv-section-num">01</span>
          <h2 id="iv-spec-title" className="iv-section-title">
            {t('components.industrySpecialties.title')}
          </h2>
        </header>

        <div className="iv-specs-bento">
          {rows.map((r, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <article
                key={r.name}
                className="iv-spec-card"
                style={{ ['--iv-spec-accent' as string]: accent }}
              >
                <div className="iv-spec-icon">
                  <SpecialtyIcon idx={i} color={accent} />
                </div>
                <h3 className="iv-spec-name">{r.name}</h3>
                <p className="iv-spec-desc">{r.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
