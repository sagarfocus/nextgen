import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionHead from './SectionHead';
import { ArrowIcon } from '../icons';

export interface CaseCard {
  emoji: string;
  num: string;
  numLbl: string;
  sector: string;
  name: string;
  problem: string;
  result: string;
}

interface CaseStudiesProps {
  cases: CaseCard[];
}

const CaseStudies = ({ cases }: CaseStudiesProps) => {
  const { t } = useTranslation('common');
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const len = cases.length;
  const maxIndex = Math.max(0, len - visibleCount);

  const measure = useCallback(() => {
    const w = window.innerWidth;
    const v = w <= 640 ? 1 : w <= 1024 ? 2 : 3;
    setVisibleCount(v);
    const card = trackRef.current?.children[0] as HTMLElement | undefined;
    if (card) setCardWidth(card.getBoundingClientRect().width);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(measure, 120);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [measure]);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const go = (delta: number) => {
    setIndex((i) => Math.max(0, Math.min(maxIndex, i + delta)));
  };

  const startX = useRef(0);
  const isDown = useRef(false);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDown.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDown.current) return;
    isDown.current = false;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  const gap = 20;
  const offset = -(index * (cardWidth + gap));
  const minFill = (visibleCount / len) * 100;
  const span = 100 - minFill;
  const ratio = maxIndex === 0 ? 1 : index / maxIndex;
  const fill = `${minFill + span * ratio}%`;

  return (
    <section className="sv-section sv-cases">
      <div className="container-shell">
        <SectionHead
          num={t('components.caseStudies.sectionNum')}
          title={
            <>
              {t('components.caseStudies.titlePart1')}{' '}
              <em>{t('components.caseStudies.titleEm')}</em>
            </>
          }
          meta={
            <>
              {t('components.caseStudies.metaLine1')}
              <br />
              {t('components.caseStudies.metaLine2')}
            </>
          }
        />

        <div className="sv-cs-slider" tabIndex={0} onKeyDown={onKeyDown}>
          <div className="sv-cs-track-wrap">
            <div
              ref={trackRef}
              className="sv-cs-track"
              style={{ transform: `translateX(${offset}px)` }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {cases.map((c) => (
                <article key={c.name} className="sv-cs-card">
                  <div className="sv-cs-top">
                    <span className="sv-cs-emoji">{c.emoji}</span>
                    <div>
                      <div className="sv-cs-num">{c.num}</div>
                      <div className="sv-cs-num-lbl">{c.numLbl}</div>
                    </div>
                  </div>
                  <span className="sv-cs-sector">{c.sector}</span>
                  <h3 className="sv-cs-name">{c.name}</h3>
                  <div className="sv-cs-block">
                    <strong>{t('components.caseStudies.problemLabel')}</strong>
                    {c.problem}
                  </div>
                  <div className="sv-cs-block">
                    <strong>{t('components.caseStudies.resultLabel')}</strong>
                    {c.result}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="sv-cs-controls">
            <button
              type="button"
              className="sv-cs-btn"
              data-dir="prev"
              aria-label={t('components.caseStudies.prevAriaLabel')}
              onClick={() => go(-1)}
              disabled={index <= 0}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div
              className="sv-cs-progress"
              aria-hidden="true"
              style={{ '--sv-cs-fill': fill } as CSSProperties}
            />
            <button
              type="button"
              className="sv-cs-btn"
              data-dir="next"
              aria-label={t('components.caseStudies.nextAriaLabel')}
              onClick={() => go(1)}
              disabled={index >= maxIndex}
            >
              <ArrowIcon strokeWidth={2} />
            </button>
          </div>

          <div className="sv-cs-cta-row">
            <Link to="/case-studies" className="sv-cs-cta">
              {t('components.caseStudies.viewAllCases')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
