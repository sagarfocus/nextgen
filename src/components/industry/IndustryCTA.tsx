import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '../icons';

interface IndustryCTAProps {
  tag: string;
  title: ReactNode;
  body: ReactNode;
}

const IndustryCTA = ({ tag, title, body }: IndustryCTAProps) => {
  const { t } = useTranslation('common');
  return (
    <section className="iv-cta" aria-labelledby="iv-cta-title">
      <div className="iv-cta-inner">
        <span className="iv-cta-tag">{tag}</span>
        <h2 id="iv-cta-title" className="iv-cta-title">
          {title}
        </h2>
        <p className="iv-cta-body">{body}</p>
        <Link to="/contact" className="iv-cta-btn">
          {t('components.industryCTA.bookStrategyCall')}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
};

export default IndustryCTA;
