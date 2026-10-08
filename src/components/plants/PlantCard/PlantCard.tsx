import Image from 'next/image';
import { FavoriteButton } from '@/components/plants/FavoriteButton/FavoriteButton';
import { PlantTags } from '@/components/plants/PlantTags/PlantTags';
import { Icon } from '@/components/ui/Icon/Icon';
import { PLANT_CARD_IMAGE_SIZES } from '@/constants/plantFilters';
import { copy } from '@/data/copy';
import { cx } from '@/lib/classNames';
import { pluralCopy } from '@/lib/pluralCopy';
import type { PlantCardProps } from '@/types/components/plants';
import styles from './PlantCard.module.css';

const CARD_COPY = copy.plants.card;

export function PlantCard({ plant, origins, onOpen }: PlantCardProps) {
  return (
    <article className={styles.card}>
      <div className={cx(styles.thumb, 'checker')}>
        {plant.coverUrl ? (
          <Image
            src={plant.coverUrl}
            alt=""
            fill
            sizes={PLANT_CARD_IMAGE_SIZES}
            className={styles.image}
          />
        ) : (
          <span className={styles.placeholder} title={CARD_COPY.noCover}>
            <Icon name="image" />
          </span>
        )}
        <span className={cx(styles.badge, styles.sizeBadge)}>
          {plant.size.description ?? plant.size.name}
        </span>
        <span className={cx(styles.badge, styles.countBadge)}>
          {pluralCopy(plant.imageCount, CARD_COPY.images)}
        </span>
      </div>
      <FavoriteButton
        plant={plant}
        variant="glass"
        className={styles.favorite}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>
          <button
            type="button"
            className={styles.open}
            onClick={() => onOpen(plant.id)}
          >
            {plant.commonName}
          </button>
        </h3>
        {plant.scientificName && (
          <p className={styles.scientific}>{plant.scientificName}</p>
        )}
        <PlantTags plant={plant} origins={origins} />
      </div>
    </article>
  );
}
