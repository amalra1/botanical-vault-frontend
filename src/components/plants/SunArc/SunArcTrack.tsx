import {
  LIGHT_ARC,
  LIGHT_CANOPY,
  LIGHT_STOP_ANGLES,
} from '@/constants/lightExposure';
import { arcPath, selectedSegments } from '@/lib/lightExposure';
import type { SunArcTrackProps } from '@/types/components/plants';
import type { CanopyTone } from '@/types/lightExposure';
import styles from './SunArc.module.css';

const VIEW_BOX = `0 0 ${LIGHT_ARC.width} ${LIGHT_ARC.height}`;
const SKY_PATH = arcPath(LIGHT_ARC.sunriseAngle, LIGHT_ARC.zenithAngle);
const CANOPY_CLASSES: Record<CanopyTone, string> = {
  dark: styles.canopyDark,
  base: styles.canopyBase,
  light: styles.canopyLight,
};

export function SunArcTrack({ selected }: SunArcTrackProps) {
  return (
    <svg
      className={styles.track}
      viewBox={VIEW_BOX}
      aria-hidden="true"
      focusable="false"
    >
      <line
        className={styles.ground}
        x1={0}
        y1={LIGHT_ARC.centerY}
        x2={LIGHT_ARC.width}
        y2={LIGHT_ARC.centerY}
      />
      <path className={styles.path} d={SKY_PATH} />
      {selectedSegments(selected).map(({ from, to }) => (
        <path
          key={`${from}-${to}`}
          className={styles.range}
          d={arcPath(LIGHT_STOP_ANGLES[from], LIGHT_STOP_ANGLES[to])}
        />
      ))}
      {LIGHT_CANOPY.map(({ tone, ...ellipse }) => (
        <ellipse
          key={`${ellipse.cx}-${ellipse.cy}`}
          className={CANOPY_CLASSES[tone]}
          {...ellipse}
        />
      ))}
    </svg>
  );
}
