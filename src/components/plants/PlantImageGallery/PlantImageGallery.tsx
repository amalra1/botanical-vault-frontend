'use client';

import { useState } from 'react';
import { PlantImageCard } from '@/components/plants/PlantImageCard/PlantImageCard';
import { Viewfinder } from '@/components/ui/Viewfinder/Viewfinder';
import { MIN_VIEWS_FOR_FILTER } from '@/constants/plantDetail';
import { ALL_OPTION } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { filterImagesByView, viewsOf } from '@/lib/plantImages';
import { pluralCopy } from '@/lib/pluralCopy';
import type { PlantImageGalleryProps } from '@/types/components/plantDetail';
import type { SelectOption } from '@/types/components/ui';
import type { ImageViewFilter } from '@/types/plantImage';
import styles from './PlantImageGallery.module.css';

const DETAIL_COPY = copy.plantDetail;

export function PlantImageGallery({ images }: PlantImageGalleryProps) {
  const [filter, setFilter] = useState<ImageViewFilter>(ALL_OPTION);
  const views = viewsOf(images);
  const options: SelectOption<ImageViewFilter>[] = [
    { value: ALL_OPTION, label: DETAIL_COPY.allViews },
    ...views.map((view) => ({ value: view.id, label: view.name })),
  ];

  return (
    <section className={styles.gallery}>
      <div className={styles.toolbar}>
        <span className={styles.count}>
          {pluralCopy(images.length, DETAIL_COPY.images)}
        </span>
        {views.length >= MIN_VIEWS_FOR_FILTER && (
          <Viewfinder
            label={DETAIL_COPY.viewFilter}
            options={options}
            value={filter}
            onChange={setFilter}
          />
        )}
      </div>
      <ul className={styles.grid}>
        {filterImagesByView(images, filter).map((image) => (
          <PlantImageCard key={image.id} image={image} />
        ))}
      </ul>
    </section>
  );
}
