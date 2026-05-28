import type { ReactNode } from 'react';

interface SectionProps {
  no: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}

const Section = ({ no, title, kicker, children }: SectionProps) => (
  <section className="border-t border-line-faint">
    <div className="container-shell py-[clamp(56px,8vw,112px)]">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="text-line font-mono text-[13px] tracking-[0.18em]">{no}</span>
            <span className="h-px flex-1 bg-line-soft" />
          </div>
          <h2 className="mt-4 text-heading text-[clamp(22px,2vw,30px)] font-bold tracking-[-0.02em] leading-[1.1]">
            {title}
          </h2>
          {kicker && (
            <p className="mt-3 text-muted text-[14px] leading-[1.55] max-w-[34ch]">{kicker}</p>
          )}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  </section>
);

export default Section;
