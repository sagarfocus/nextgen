import type { ReactNode } from 'react';

interface DetailSectionHeadProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

const DetailSectionHead = ({ eyebrow, title, intro, id }: DetailSectionHeadProps) => (
  <header className="adv-head det-head">
    <span className="adv-eyebrow">{eyebrow}</span>
    <h2 id={id} className="adv-h2">
      {title}
    </h2>
    {intro && <p className="adv-intro">{intro}</p>}
  </header>
);

export default DetailSectionHead;
