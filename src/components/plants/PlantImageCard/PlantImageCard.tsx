'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { COPIED_FEEDBACK_MS, PLANT_IMAGE_SIZES } from '@/constants/plantDetail';
import { copy } from '@/data/copy';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useTransientFlag } from '@/hooks/useTransientFlag';
import { cx } from '@/lib/classNames';
import { formatCopy } from '@/lib/formatCopy';
import { copyPngToClipboard, downloadImage } from '@/lib/imageFiles';
import type { PlantImageCardProps } from '@/types/components/plantDetail';
import type { ImageDimensions } from '@/types/plantImage';
import styles from './PlantImageCard.module.css';

const DETAIL_COPY = copy.plantDetail;
const ERRORS = DETAIL_COPY.errors;

export function PlantImageCard({ image }: PlantImageCardProps) {
  const { notify } = useSnackbar();
  const copied = useTransientFlag(COPIED_FEEDBACK_MS);
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  const file = image.originalFilename;
  const view = image.view.name;

  const copyImage = async () => {
    try {
      await copyPngToClipboard(image.url);
      copied.trigger();
    } catch {
      notify({ title: ERRORS.copyTitle, description: ERRORS.copy });
    }
  };

  const download = async () => {
    try {
      await downloadImage(image.url, file);
    } catch {
      notify({ title: ERRORS.downloadTitle, description: ERRORS.download });
    }
  };

  return (
    <li className={styles.card}>
      <div className={cx(styles.thumb, 'checker')}>
        <Image
          src={image.url}
          alt={formatCopy(DETAIL_COPY.imageAlt, { view, file })}
          fill
          sizes={PLANT_IMAGE_SIZES}
          className={styles.image}
          onLoad={({ currentTarget }) =>
            setDimensions({
              width: currentTarget.naturalWidth,
              height: currentTarget.naturalHeight,
            })
          }
        />
        <span className={styles.view}>{view}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.filename} title={file}>
          {file}
        </span>
        {dimensions && (
          <span className={styles.dimensions}>
            {formatCopy(DETAIL_COPY.dimensions, {
              width: dimensions.width,
              height: dimensions.height,
            })}
          </span>
        )}
      </div>
      <div className={styles.actions}>
        <Button
          className={cx(styles.copy, copied.isOn && styles.copied)}
          onClick={copyImage}
        >
          <Icon name={copied.isOn ? 'check' : 'copy'} />
          <span aria-live="polite">
            {copied.isOn ? DETAIL_COPY.copied : DETAIL_COPY.copy}
          </span>
        </Button>
        <IconButton
          icon="download"
          label={formatCopy(DETAIL_COPY.download, { file })}
          onClick={download}
        />
      </div>
    </li>
  );
}
