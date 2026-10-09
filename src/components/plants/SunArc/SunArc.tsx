import type { CSSProperties } from 'react';
import { Icon } from '@/components/ui/Icon/Icon';
import {
  LIGHT_EXPOSURE_ICONS,
  LIGHT_EXPOSURES,
} from '@/constants/lightExposure';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { stopPoint, toPercent } from '@/lib/lightExposure';
import type { SunArcProps } from '@/types/components/plants';
import type { LightExposure } from '@/types/lightExposure';
import { SunArcTrack } from './SunArcTrack';
import styles from './SunArc.module.css';

const OPTIONS_COPY = copy.light.options;

function stopStyle(exposure: LightExposure) {
  const { left, top } = toPercent(stopPoint(exposure));
  return { '--arc-x': left, '--arc-y': top } as CSSProperties;
}

export function SunArc({
  selected,
  onSelect,
  allLabel,
  onSelectAll,
  compact = false,
}: SunArcProps) {
  return (
    <div className={cx(styles.arc, compact && styles.compact)}>
      {allLabel && onSelectAll && (
        <button
          type="button"
          className={styles.all}
          aria-pressed={selected.length === 0}
          onClick={onSelectAll}
        >
          {allLabel}
        </button>
      )}
      <div className={styles.sky}>
        <SunArcTrack selected={selected} />
        {LIGHT_EXPOSURES.map((exposure) => (
          <div
            key={exposure}
            className={styles.stop}
            style={stopStyle(exposure)}
          >
            <button
              type="button"
              className={styles.sun}
              aria-pressed={selected.includes(exposure)}
              aria-label={OPTIONS_COPY[exposure].label}
              title={OPTIONS_COPY[exposure].label}
              onClick={() => onSelect(exposure)}
            >
              <Icon
                name={LIGHT_EXPOSURE_ICONS[exposure]}
                className={styles.icon}
              />
            </button>
            <span className={styles.label} aria-hidden="true">
              {OPTIONS_COPY[exposure].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
