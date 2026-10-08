import Image from 'next/image';
import { COLLECTION_MOSAIC_IMAGE_SIZES } from '@/constants/collections';
import { cx } from '@/lib/classNames';
import { mosaicCells } from '@/lib/collectionMosaic';
import type { CollectionMosaicProps } from '@/types/components/collections';
import styles from './CollectionMosaic.module.css';

export function CollectionMosaic({ urls }: CollectionMosaicProps) {
  return (
    <span className={styles.mosaic}>
      {mosaicCells(urls).map((cell) => (
        <span key={cell.key} className={cx(styles.cell, 'checker')}>
          {cell.url && (
            <Image
              src={cell.url}
              alt=""
              fill
              sizes={COLLECTION_MOSAIC_IMAGE_SIZES}
              className={styles.image}
            />
          )}
        </span>
      ))}
    </span>
  );
}
