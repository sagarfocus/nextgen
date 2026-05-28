import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';

export interface RelatedServiceLink {
  to: string;
  name: string;
  blurb: string;
  tag?: string;
}

interface RelatedServicesProps {
  sectionNum?: string;
  title?: string;
  intro?: string;
  items: RelatedServiceLink[];
}

const RelatedServices = ({
  sectionNum = '06',
  title,
  intro,
  items,
}: RelatedServicesProps) => {
  const { t } = useTranslation('common');
  const resolvedTitle = title ?? t('components.relatedServices.defaultTitle');
  const resolvedIntro = intro ?? t('components.relatedServices.defaultIntro');
  return (
    <section className="sv-section sv-related" aria-labelledby="sv-related-title">
      <div className="container-shell">
        <div className="sv-sec-head">
          <div>
            <div className="sv-sec-num">
              {sectionNum} - {t('components.relatedServices.sectionLabel')}
            </div>
            <h2 id="sv-related-title" className="sv-sec-title">
              {resolvedTitle}
            </h2>
          </div>
          <p
            style={{
              maxWidth: '34ch',
              fontSize: 14,
              lineHeight: 1.6,
              color: '#4A5568',
              margin: 0,
            }}
          >
            {resolvedIntro}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(14px, 1.6vw, 22px)',
          }}
        >
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                background: '#fff',
                border: '1px solid rgba(45,55,72,0.10)',
                borderRadius: 18,
                padding: 'clamp(20px, 2.2vw, 28px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                color: '#1A2438',
                transition: 'border-color .2s ease, transform .2s ease, box-shadow .2s ease',
              }}
              className="sv-related-card"
            >
              {item.tag ? (
                <span
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#B38B6D',
                    padding: '6px 12px',
                    background: 'rgba(255, 255, 255, 0.55)',
                    backdropFilter: 'blur(10px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                    border: '1px solid rgba(179, 139, 109, 0.28)',
                    borderRadius: 999,
                    boxShadow:
                      '0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 6px 16px -10px rgba(179, 139, 109, 0.25)',
                  }}
                >
                  {item.tag}
                </span>
              ) : null}
              <h3
                style={{
                  margin: 0,
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: '#2D3748',
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#4A5568',
                  flexGrow: 1,
                }}
              >
                {item.blurb}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#576DB5',
                }}
              >
                {t('components.relatedServices.explore')} <ArrowIcon size={14} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;
