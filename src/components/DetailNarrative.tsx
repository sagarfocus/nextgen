import { Link } from 'react-router-dom';
import { ArrowIcon } from './icons';

export interface NarrativeBlock {
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
  ctaTo: string;
  image: string;
  imageAlt: string;
}

interface DetailNarrativeProps {
  about: NarrativeBlock;
  approach: NarrativeBlock;
}

const DetailNarrative = ({ about, approach }: DetailNarrativeProps) => (
  <>
    <section className="dn-section dn-about" aria-labelledby="dn-about-title">
      <div className="container-shell">
        <div className="dn-grid">
          <div className="dn-text">
            <span className="dn-eyebrow">{about.eyebrow}</span>
            <h2 id="dn-about-title" className="dn-title">
              {about.title}
            </h2>
            <p className="dn-body">{about.body}</p>
            <Link to={about.ctaTo} className="dn-cta">
              {about.ctaText}
              <ArrowIcon size={14} />
            </Link>
          </div>
          <figure className="dn-image dn-image-round" aria-hidden="true">
            <img src={about.image} alt={about.imageAlt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>

    <section className="dn-section dn-approach" aria-labelledby="dn-approach-title">
      <div className="container-shell">
        <div className="dn-grid dn-grid-reverse">
          <figure className="dn-image dn-image-tall" aria-hidden="true">
            <img src={approach.image} alt={approach.imageAlt} loading="lazy" />
          </figure>
          <div className="dn-text">
            <span className="dn-eyebrow">{approach.eyebrow}</span>
            <h2 id="dn-approach-title" className="dn-title">
              {approach.title}
            </h2>
            <p className="dn-body">{approach.body}</p>
            <Link to={approach.ctaTo} className="dn-cta">
              {approach.ctaText}
              <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default DetailNarrative;
