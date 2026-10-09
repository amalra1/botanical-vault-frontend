import { Icon } from '@/components/ui/Icon/Icon';
import { LIGHT_EXPOSURES } from '@/constants/lightExposure';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { lightExposureLabel } from '@/lib/lightExposure';
import type { LightMeterProps } from '@/types/components/plants';
import styles from './LightMeter.module.css';

export function LightMeter({ exposures, className }: LightMeterProps) {
  const label = lightExposureLabel(exposures);
  if (!label) {
    return null;
  }
  const description = formatCopy(copy.light.meter, { light: label });

  return (
    <span
      role="img"
      aria-label={description}
      title={description}
      className={cx(styles.meter, className)}
    >
      <Icon name="sun" className={styles.icon} />
      {LIGHT_EXPOSURES.map((exposure) => (
        <span
          key={exposure}
          className={cx(
            styles.tick,
            exposures.includes(exposure) && styles.lit,
          )}
        />
      ))}
    </span>
  );
}
