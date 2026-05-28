import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  /** Alignment. Default 'left'. */
  align?: 'left' | 'center';
  /** Visual emphasis variant. */
  variant?: 'default' | 'dark';
  className?: string;
}

/**
 * Cinematic section header: eyebrow + title + intro animate in
 * sequence as the header enters viewport. Uses Motion's whileInView
 * for one-shot triggers (matches the rest of the site's reveal
 * behavior). Reduced-motion safe.
 */
export const SectionHeader = ({
  eyebrow,
  title,
  intro,
  align = 'left',
  variant = 'default',
  className,
}: SectionHeaderProps) => {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };
  const item = {
    hidden: reduced ? {} : { opacity: 0, y: 28, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.header
      className={`m-sec-head m-sec-${align} m-sec-${variant}${className ? ` ${className}` : ''}`}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
    >
      {eyebrow && (
        <motion.span className="m-sec-eyebrow" variants={item}>
          <span className="m-sec-eyebrow-dot" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 className="m-sec-title" variants={item}>
        {title}
      </motion.h2>
      {intro && (
        <motion.p className="m-sec-intro" variants={item}>
          {intro}
        </motion.p>
      )}
    </motion.header>
  );
};
