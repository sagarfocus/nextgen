import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';

export type ServiceCTAVariant = 'panel' | 'band' | 'editorial';

interface ServiceCTAProps {
  /**
   * Visual treatment. Distributing variants across services breaks the
   * "every service ends with the same CTA card" pattern.
   *   panel      - original centered dark panel (Section)
   *   band       - wide split band, copy left + button right
   *   editorial  - two-column with bullet rail + dual buttons
   */
  variant?: ServiceCTAVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Primary CTA destination. Defaults to /contact. */
  primaryTo?: string;
  primaryLabel?: string;
  /** Optional secondary CTA, only used by the editorial variant. */
  secondaryTo?: string;
  secondaryLabel?: string;
  /** Optional bullet items for editorial variant. */
  bullets?: string[];
}

const ServiceCTA = ({
  variant = 'panel',
  eyebrow,
  title,
  description,
  primaryTo = '/contact',
  primaryLabel,
  secondaryTo,
  secondaryLabel,
  bullets,
}: ServiceCTAProps) => {
  const { t } = useTranslation('common');
  const resolvedEyebrow = eyebrow ?? t('components.serviceCTA.defaultEyebrow');
  const resolvedTitle = title ?? t('components.serviceCTA.defaultTitle');
  const resolvedDescription = description ?? t('components.serviceCTA.defaultDescription');
  const resolvedPrimaryLabel = primaryLabel ?? t('components.serviceCTA.defaultPrimaryLabel');
  if (variant === 'band') {
    return (
      <section className="sv-cta sv-cta--band" id="audit">
        <div className="container-shell">
          <div className="sv-cta-band">
            <div>
              <span className="sv-cta-band-eyebrow">{resolvedEyebrow}</span>
              <h2 className="sv-cta-band-title">{resolvedTitle}</h2>
              <p className="sv-cta-band-sub">{resolvedDescription}</p>
            </div>
            <Link to={primaryTo} className="sv-cta-band-btn">
              {resolvedPrimaryLabel}
              <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'editorial') {
    return (
      <section className="sv-cta sv-cta--editorial" id="audit">
        <div className="container-shell">
          <div className="sv-cta-editorial">
            <div>
              <span className="sv-cta-editorial-eyebrow">{resolvedEyebrow}</span>
              <h2 className="sv-cta-editorial-h">{resolvedTitle}</h2>
            </div>
            <div className="sv-cta-editorial-aside">
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4A5568' }}>
                {resolvedDescription}
              </p>
              {bullets && bullets.length ? (
                <div>
                  {bullets.map((b) => (
                    <div key={b} className="sv-cta-editorial-line">
                      <span aria-hidden="true" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="sv-cta-editorial-actions">
                <Link to={primaryTo}>
                  {resolvedPrimaryLabel}
                  <ArrowIcon size={14} />
                </Link>
                {secondaryTo && secondaryLabel ? (
                  <Link to={secondaryTo}>{secondaryLabel}</Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // panel (default - keeps existing class names for the legacy centered design)
  return (
    <section className="sv-cta" id="audit">
      <div className="container-shell">
        <div className="sv-cta-panel">
          <div className="sv-cta-eyebrow">{resolvedEyebrow}</div>
          <h2 className="sv-cta-title">{resolvedTitle}</h2>
          <p className="sv-cta-desc">{resolvedDescription}</p>
          <Link to={primaryTo} className="sv-btn-primary">
            {resolvedPrimaryLabel}
            <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
