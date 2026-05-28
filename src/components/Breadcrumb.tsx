import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from './icons';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  current?: string;
  items?: BreadcrumbItem[];
  section?: string;
}

// Path-aware breadcrumb. New callers pass `items` (each can be a link or label).
// Legacy callers passing only `current` (and optionally `section`) keep working
// as Home > Resources > current.
const Breadcrumb = ({ current, items, section }: BreadcrumbProps) => {
  const { t } = useTranslation('common');
  const fallbackSection = section ?? t('breadcrumb.defaultSection');
  const trail: BreadcrumbItem[] = items
    ? items
    : [{ label: fallbackSection }, { label: current ?? '' }];

  const lastIdx = trail.length - 1;

  return (
    <nav className="crumb" aria-label={t('common.breadcrumb')}>
      <ol className="crumb-list">
        <li>
          <Link to="/">{t('breadcrumb.home')}</Link>
        </li>
        {trail.map((item, idx) => {
          const isLast = idx === lastIdx;
          return (
            <Fragment key={`${item.label}-${idx}`}>
              <li aria-hidden="true">
                <ChevronRightIcon size={10} strokeWidth={2.4} />
              </li>
              <li>
                {isLast ? (
                  <span className="crumb-here" aria-current="page">
                    {item.label}
                  </span>
                ) : item.to ? (
                  <Link to={item.to} className="crumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="crumb-section">{item.label}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
