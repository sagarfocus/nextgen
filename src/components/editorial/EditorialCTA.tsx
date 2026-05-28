import { Link } from 'react-router-dom';

interface EditorialCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}

const EditorialCTA = ({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: EditorialCTAProps) => (
  <div className="bg-heading text-white p-10 sm:p-14 relative overflow-hidden">
    <div className="absolute left-0 bottom-0 w-full h-[5px] bg-gradient-to-r from-accent-soft via-line to-cta" />
    <div className="font-mono text-[12px] tracking-[0.22em] text-line uppercase">{eyebrow}</div>
    <h3 className="mt-5 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.028em] max-w-[22ch]">
      {title}
    </h3>
    <p className="mt-6 text-white/75 text-[16px] leading-[1.6] max-w-[58ch]">{description}</p>
    <div className="mt-10 flex flex-wrap items-center gap-5">
      <Link to={primaryHref} className="btn-primary">
        {primaryLabel}
      </Link>
      <Link
        to={secondaryHref}
        className="text-white/85 text-[14px] font-medium underline-offset-4 hover:underline"
      >
        {secondaryLabel}
      </Link>
    </div>
  </div>
);

export default EditorialCTA;
