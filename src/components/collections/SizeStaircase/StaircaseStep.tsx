import type { CSSProperties } from 'react';
import Image from 'next/image';
import { STAIRCASE_IMAGE_SIZES } from '@/constants/collections';
import { staircaseLevel } from '@/lib/staircase';
import type { StaircaseStepProps } from '@/types/components/collections';
import styles from './StaircaseStep.module.css';

const MIN_LEVEL_SPAN = 1;

export function StaircaseStep({ plant, coverage, index }: StaircaseStepProps) {
  const stepStyle = {
    '--staircase-level': staircaseLevel(plant.size.id, coverage),
    '--staircase-span': Math.max(coverage.length - 1, MIN_LEVEL_SPAN),
    '--step-index': index,
  } as CSSProperties;

  return (
    <li className={styles.step} style={stepStyle}>
      <div className={styles.stage}>
        <div className={styles.plant}>
          {plant.coverUrl && (
            <Image
              src={plant.coverUrl}
              alt=""
              fill
              sizes={STAIRCASE_IMAGE_SIZES}
              className={styles.image}
            />
          )}
        </div>
      </div>
      <span className={styles.name}>{plant.commonName}</span>
      <span className={styles.size}>
        {plant.size.description ?? plant.size.name}
      </span>
    </li>
  );
}
