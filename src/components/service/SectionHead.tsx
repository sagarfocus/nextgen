import type { ReactNode } from 'react';

interface SectionHeadProps {
  num: string;
  title: ReactNode;
  meta: ReactNode;
}

const SectionHead = ({ num, title, meta }: SectionHeadProps) => (
  <div className="sv-sec-head">
    <div>
      <div className="sv-sec-num">{num}</div>
      <h2 className="sv-sec-title">{title}</h2>
    </div>
    <div className="sv-sec-meta">{meta}</div>
  </div>
);

export default SectionHead;
