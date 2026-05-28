import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface PillarPane {
  id: string;
  num: string;
  /** Short tag shown next to the number (e.g. "Patient Portal"). */
  tag: string;
  /** Tab label in the left list. */
  listTitle: string;
  /** Subtitle in the left list. */
  listSub: string;
  /** Detail title (right pane). */
  detailTitle: string;
  /** Detail body. */
  detailText: ReactNode;
  /** Bullet list. Use <strong> for emphasis. */
  bullets: ReactNode[];
  /** Footer label (timeline). */
  foot: string;
}

interface PaneConfig {
  id: string;
  num: string;
  pillarKey: 'customSoftware' | 'automation';
  paneKey: 'portal' | 'integrations' | 'intake' | 'scheduling';
}

const CUSTOM_SOFTWARE_CONFIG: PaneConfig[] = [
  { id: 'p1-1', num: '01', pillarKey: 'customSoftware', paneKey: 'portal' },
  { id: 'p1-2', num: '02', pillarKey: 'customSoftware', paneKey: 'integrations' },
];

const AUTOMATION_CONFIG: PaneConfig[] = [
  { id: 'p2-1', num: '01', pillarKey: 'automation', paneKey: 'intake' },
  { id: 'p2-2', num: '02', pillarKey: 'automation', paneKey: 'scheduling' },
];

function paneFromConfig(
  t: (key: string, opts?: { returnObjects?: boolean }) => string,
  c: PaneConfig
): PillarPane {
  const base = `pillars.${c.pillarKey}.panes.${c.paneKey}`;
  const bullets = t(`${base}.bullets`, { returnObjects: true }) as unknown as string[];
  return {
    id: c.id,
    num: c.num,
    tag: t(`${base}.tag`),
    listTitle: t(`${base}.listTitle`),
    listSub: t(`${base}.listSub`),
    detailTitle: t(`${base}.detailTitle`),
    detailText: t(`${base}.detailText`),
    bullets: bullets.map((html, i) => (
      <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
    )),
    foot: t(`${base}.foot`),
  };
}

/** React hook for the "Custom Software" pillar panes — live-translates. */
export function useCustomSoftwarePanes(): PillarPane[] {
  const { t } = useTranslation('services');
  return useMemo(
    () => CUSTOM_SOFTWARE_CONFIG.map((c) => paneFromConfig(t, c)),
    [t]
  );
}

/** React hook for the "Automation & AI" pillar panes — live-translates. */
export function useAutomationPanes(): PillarPane[] {
  const { t } = useTranslation('services');
  return useMemo(
    () => AUTOMATION_CONFIG.map((c) => paneFromConfig(t, c)),
    [t]
  );
}
