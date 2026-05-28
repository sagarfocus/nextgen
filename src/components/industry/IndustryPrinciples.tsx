import type { ReactNode } from 'react';

export interface Principle {
  title: string;
  body: string;
  accent: string;
}

interface IndustryPrinciplesProps {
  items: Principle[];
  sectionNum?: string;
  title?: ReactNode;
  intro?: ReactNode;
}

const IndustryPrinciples = ({
  items,
  sectionNum = '04',
  title,
  intro,
}: IndustryPrinciplesProps) => {
  return (
    <section className="iv-section iv-principles" aria-labelledby="iv-principle-title">
      <div className="container-shell">
        <header className="iv-principles-head">
          <div className="iv-principles-head-left">
            <span className="iv-section-num">{sectionNum}</span>
            <h2 id="iv-principle-title" className="iv-section-title">
              {title}
            </h2>
          </div>
          {intro ? <p className="iv-principles-intro">{intro}</p> : null}
        </header>

        <div className="iv-principles-grid">
          {items.map((p, i) => (
            <article
              key={p.title}
              className="iv-principle-card"
              style={{ ['--iv-principle-accent' as string]: p.accent }}
            >
              <span className="iv-principle-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="iv-principle-name">{p.title}</h3>
              <p className="iv-principle-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryPrinciples;
