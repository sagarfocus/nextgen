import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import SectionHead from './SectionHead';

export interface DoCard {
  name: string;
  desc: string;
  icon: ReactElement;
}

interface WhatWeDoProps {
  cards: DoCard[];
}

const ToneA = '#576DB5'; // periwinkle
const ToneB = '#8FBC8F'; // sage
const ToneC = '#B38B6D'; // copper
const ToneD = '#2D3748'; // charcoal

const ACCENTS = [ToneA, ToneB, ToneC, ToneA, ToneB, ToneD];

/**
 * Bento layout - 1 hero card (2x2 desktop), 4 supporting cards (1x1), and a final
 * outcome chip card. Solid surfaces, no backdrop-filter, strong icon panels and a
 * thin accent rail on each card. Mobile collapses to a single column.
 */
const WhatWeDo = ({ cards }: WhatWeDoProps) => {
  const { t } = useTranslation('common');
  const hero = cards[0];
  const rest = cards.slice(1);

  return (
    <section className="sv-section sv-do sv-do-bento">
      <div className="container-shell">
        <SectionHead
          num={t('components.whatWeDo.sectionNum')}
          title={
            <>
              {t('components.whatWeDo.titlePart1')}{' '}
              <em>{t('components.whatWeDo.titleEm')}</em>
            </>
          }
          meta={
            <>
              {t('components.whatWeDo.metaLine1')}
              <br />
              {t('components.whatWeDo.metaLine2')}
            </>
          }
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'minmax(170px, auto)',
            gap: 'clamp(12px, 1.4vw, 18px)',
          }}
          className="bento-grid"
        >
          {/* HERO CARD - 6 columns × 2 rows on desktop */}
          {hero ? (
            <article
              style={{
                gridColumn: 'span 6',
                gridRow: 'span 2',
                background: ToneD,
                color: '#fff',
                borderRadius: 22,
                padding: 'clamp(28px, 3.2vw, 44px)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 'clamp(320px, 32vw, 420px)',
              }}
              className="bento-hero"
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${ToneA}, ${ToneB}, ${ToneC})`,
                }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: ToneC,
                  }}
                >
                  {t('components.whatWeDo.cornerstoneLabel')}
                </span>
                <div
                  className="bento-icon-slot bento-icon-slot--hero"
                  style={{
                    marginTop: 18,
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                  }}
                >
                  {hero.icon}
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(24px, 2.8vw, 34px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    margin: '0 0 12px',
                  }}
                >
                  {hero.name}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.78)',
                    margin: 0,
                    maxWidth: '46ch',
                  }}
                >
                  {hero.desc}
                </p>
              </div>
            </article>
          ) : null}

          {/* SUPPORTING CARDS - 3 columns × 1 row each, total 6 columns, 2 rows */}
          {rest.slice(0, 4).map((c, idx) => {
            const accent = ACCENTS[(idx + 1) % ACCENTS.length];
            return (
              <article
                key={c.name}
                style={{
                  gridColumn: 'span 3',
                  gridRow: 'span 1',
                  background: '#fff',
                  border: '1px solid rgba(45,55,72,0.10)',
                  borderRadius: 18,
                  padding: 'clamp(18px, 1.8vw, 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
                }}
                className="bento-card"
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 3,
                    background: accent,
                  }}
                />
                <div
                  className="bento-icon-slot bento-icon-slot--card"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(45,55,72,0.04)',
                    border: '1px solid rgba(45,55,72,0.08)',
                    display: 'grid',
                    placeItems: 'center',
                    color: accent,
                  }}
                >
                  {c.icon}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '-0.005em',
                    color: '#1A2438',
                    margin: 0,
                  }}
                >
                  {c.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: '#4A5568',
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </article>
            );
          })}

          {/* OUTCOME CHIP CARD - last item, full width strip */}
          {rest[4] ? (
            <article
              style={{
                gridColumn: 'span 12',
                gridRow: 'span 1',
                background: '#F8F2EA',
                border: '1px solid rgba(179,139,109,0.28)',
                borderRadius: 18,
                padding: 'clamp(16px, 1.8vw, 22px) clamp(20px, 2.2vw, 28px)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 'clamp(14px, 2vw, 28px)',
                minHeight: 'auto',
              }}
              className="bento-chip"
            >
              <div
                className="bento-icon-slot bento-icon-slot--chip"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#fff',
                  border: '1px solid rgba(179,139,109,0.32)',
                  display: 'grid',
                  placeItems: 'center',
                  color: ToneC,
                  flexShrink: 0,
                }}
              >
                {rest[4].icon}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '-0.005em',
                    color: '#1A2438',
                    margin: '0 0 4px',
                  }}
                >
                  {rest[4].name}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    color: '#5D4B3A',
                    margin: 0,
                    maxWidth: '78ch',
                  }}
                >
                  {rest[4].desc}
                </p>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: ToneC,
                  whiteSpace: 'nowrap',
                }}
              >
                {t('components.whatWeDo.outcomeLensLabel')}
              </span>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
